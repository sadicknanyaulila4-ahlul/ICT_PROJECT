<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\Project;
use App\Models\ProjectActivity;
use App\Models\RequirementComponent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AutomaticProjectWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_advances_automatically_when_each_phase_gate_is_satisfied(): void
    {
        $manager = User::factory()->create(['role' => 'manager']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $analyst = User::factory()->create(['role' => 'analyst']);
        $project = Project::create([
            'name' => 'Automatic workflow project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Automatic workflow system',
            'supervisor_id' => $supervisor->id,
            'assigned_analyst_id' => $analyst->id,
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);

        $initiationDocument = $this->createPhaseDocuments($project, 'Initiation', $supervisor, 'Approved Concept Note');
        $this->assertNotNull($initiationDocument);
        $this->actingAs($manager)
            ->patchJson("/project/documents/{$initiationDocument->id}/review", ['status' => 'Approved'])
            ->assertOk();
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'phase' => 'Planning']);
        $this->assertDatabaseHas('notifications', [
            'user_id' => $analyst->id,
            'project_id' => $project->id,
            'title' => 'Project moved to Planning',
            'type' => 'Status Update',
        ]);

        $this->createPhaseDocuments($project, 'Planning', $analyst);
        ProjectActivity::create([
            'project_id' => $project->id,
            'activity_name' => 'Implementation activity',
            'planned_start_date' => '2026-10-01',
            'planned_end_date' => '2026-10-02',
            'status' => 'Not Started',
        ]);
        $project->update(['implementation_plan_status' => 'Pending Review']);

        $this->actingAs($supervisor)
            ->postJson("/project/{$project->id}/activities/plan/review", ['status' => 'Approved'])
            ->assertOk();
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'phase' => 'Execution']);

        $executionDocument = $this->createPhaseDocuments($project, 'Execution', $analyst, 'FAT Report');
        $this->assertNotNull($executionDocument);
        ProjectActivity::query()->where('project_id', $project->id)->update(['status' => 'Completed']);
        RequirementComponent::create([
            'project_id' => $project->id,
            'requirement_description' => 'Approved and completed requirement',
            'planned_start_date' => '2026-10-01',
            'planned_end_date' => '2026-10-02',
            'status' => 'Completed',
            'review_status' => 'Approved',
            'test_score' => 'Pass',
        ]);
        $this->actingAs($supervisor)
            ->patchJson("/project/documents/{$executionDocument->id}/review", ['status' => 'Approved'])
            ->assertOk();
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'phase' => 'Closure']);

        $closureDocument = $this->createPhaseDocuments($project, 'Closure', $analyst, 'System Implementation Form');
        $this->assertNotNull($closureDocument);
        $this->actingAs($supervisor)
            ->patchJson("/project/documents/{$closureDocument->id}/review", ['status' => 'Approved'])
            ->assertOk();
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'phase' => 'Closure',
            'status' => 'Completed',
        ]);
    }

    private function createPhaseDocuments(Project $project, string $phase, User $uploader, ?string $pendingType = null): ?Document
    {
        $pendingDocument = null;

        foreach (config("project.required_documents.{$phase}", []) as $type) {
            $document = Document::create([
                'project_id' => $project->id,
                'phase' => $phase,
                'document_type' => $type,
                'file_path' => "documents/{$project->id}/{$phase}-{$type}.pdf",
                'original_filename' => "{$type}.pdf",
                'uploaded_by' => $uploader->id,
                'status' => $type === $pendingType ? 'Pending Review' : 'Approved',
                'is_required' => true,
            ]);

            if ($type === $pendingType) {
                $pendingDocument = $document;
            }
        }

        return $pendingDocument;
    }
}
