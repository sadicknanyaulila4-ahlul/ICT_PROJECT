<?php

namespace Tests\Feature;

use App\Models\Project;
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
}
