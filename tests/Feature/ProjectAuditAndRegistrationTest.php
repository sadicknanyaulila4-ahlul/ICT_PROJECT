<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\LessonLearned;
use App\Models\System;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectAuditAndRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_deletion_records_the_supervisor_and_reason(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'Incorrect project entry',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Test system',
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);

        $response = $this->actingAs($supervisor)->deleteJson("/api/projects/{$project->id}", [
            'reason' => 'This project was registered by mistake.',
        ]);

        $response->assertOk();
        $this->assertSoftDeleted('projects', ['id' => $project->id]);
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'deleted_by' => $supervisor->id,
            'deletion_reason' => 'This project was registered by mistake.',
        ]);
    }

    public function test_project_registration_rejects_an_existing_system_name_case_insensitively(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);
        System::create([
            'name' => 'NSSF Portal',
            'system_type' => 'Other',
            'is_active' => true,
        ]);

        $response = $this->actingAs($analyst)->postJson('/project', [
            'name' => 'New portal project',
            'implementation_team_type' => 'Internal',
            'implementation_team_names' => 'Project team',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => ' nssf portal ',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors('custom_system_name');
    }

    public function test_assigned_analyst_can_save_a_lesson_through_the_web_session_route(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);
        $project = Project::create([
            'name' => 'Closure lesson project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Closure lesson system',
            'assigned_analyst_id' => $analyst->id,
            'status' => 'Ongoing',
            'phase' => 'Closure',
        ]);

        $this->actingAs($analyst)
            ->postJson("/project/{$project->id}/lessons-learned", [
                'category' => 'Planning',
                'lesson_description' => 'Start stakeholder engagement earlier.',
                'recommendations' => 'Involve stakeholders during initiation.',
            ])
            ->assertCreated()
            ->assertJsonPath('lesson.status', 'Draft');

        $this->assertDatabaseHas('lessons_learned', [
            'project_id' => $project->id,
            'created_by' => $analyst->id,
            'category' => 'Planning',
            'status' => 'Draft',
        ]);
    }

    public function test_assigned_analyst_can_submit_lesson_for_review_through_web_session(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);
        $otherAnalyst = User::factory()->create(['role' => 'analyst']);
        $project = Project::create([
            'name' => 'Lesson review submission project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Lesson review submission system',
            'assigned_analyst_id' => $analyst->id,
            'status' => 'Ongoing',
            'phase' => 'Closure',
        ]);
        $lesson = LessonLearned::create([
            'project_id' => $project->id,
            'category' => 'Planning',
            'lesson_description' => 'Start stakeholder engagement earlier.',
            'created_by' => $analyst->id,
            'status' => 'Draft',
        ]);

        $this->actingAs($otherAnalyst)
            ->postJson("/project/lessons-learned/{$lesson->id}/submit")
            ->assertForbidden();

        $this->actingAs($analyst)
            ->postJson("/project/lessons-learned/{$lesson->id}/submit")
            ->assertOk()
            ->assertJsonPath('lesson.status', 'Submitted');

        $this->assertDatabaseHas('lessons_learned', [
            'id' => $lesson->id,
            'status' => 'Submitted',
        ]);
    }

    public function test_assigned_supervisor_can_review_lesson_through_web_session(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $otherSupervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'Lesson review project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Lesson review system',
            'assigned_analyst_id' => $analyst->id,
            'supervisor_id' => $supervisor->id,
            'status' => 'Ongoing',
            'phase' => 'Closure',
        ]);
        $lesson = LessonLearned::create([
            'project_id' => $project->id,
            'category' => 'Planning',
            'lesson_description' => 'Start stakeholder engagement earlier.',
            'created_by' => $analyst->id,
            'status' => 'Submitted',
        ]);

        $this->actingAs($otherSupervisor)
            ->patchJson("/project/lessons-learned/{$lesson->id}/review", [
                'status' => 'Approved',
            ])
            ->assertForbidden();

        $this->actingAs($supervisor)
            ->patchJson("/project/lessons-learned/{$lesson->id}/review", [
                'status' => 'Approved',
            ])
            ->assertOk()
            ->assertJsonPath('lesson.status', 'Approved');

        $this->assertDatabaseHas('lessons_learned', [
            'id' => $lesson->id,
            'status' => 'Approved',
            'reviewed_by' => $supervisor->id,
        ]);
    }

    public function test_analyst_can_open_the_project_registration_form(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);

        $this->actingAs($analyst)
            ->get('/project/register')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Project/Initiation/Register')
                ->has('systems')
                ->has('infrastructure'));
    }

    public function test_supervisor_can_register_a_project(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);

        $this->actingAs($supervisor)
            ->postJson('/project', [
                'name' => 'Supervisor registered project',
                'implementation_team_type' => 'Internal',
                'implementation_team_names' => 'Project team',
                'project_source' => 'System Development',
                'project_nature' => 'Planned',
                'project_activity' => 'New Implementation (Major)',
                'custom_system_name' => 'Supervisor registered system',
            ])
            ->assertCreated();

        $this->assertDatabaseHas('projects', [
            'name' => 'Supervisor registered project',
            'supervisor_id' => $supervisor->id,
        ]);
    }
}
