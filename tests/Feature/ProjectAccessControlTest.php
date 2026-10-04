<?php

namespace Tests\Feature;

use App\Models\ChangeRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectAccessControlTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_registration_endpoints_are_disabled(): void
    {
        $this->get('/register')->assertNotFound();
        $this->post('/register')->assertNotFound();
        $this->postJson('/api/register')->assertNotFound();
    }

    public function test_supervisor_can_only_transition_or_approve_assigned_projects(): void
    {
        $assignedSupervisor = User::factory()->create(['role' => 'supervisor']);
        $otherSupervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject(['supervisor_id' => $assignedSupervisor->id]);

        $this->actingAs($otherSupervisor)
            ->postJson("/api/projects/{$project->id}/transition-to-planning")
            ->assertForbidden();

        $this->actingAs($otherSupervisor)
            ->postJson("/api/projects/{$project->id}/approve-supervisor")
            ->assertForbidden();

        $this->actingAs($assignedSupervisor)
            ->postJson("/api/projects/{$project->id}/approve-supervisor")
            ->assertOk();
    }

    public function test_only_the_assigned_supervisor_can_upload_initiation_documents(): void
    {
        Storage::fake('private');
        $assignedSupervisor = User::factory()->create(['role' => 'supervisor']);
        $otherSupervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject(['supervisor_id' => $assignedSupervisor->id]);
        $payload = [
            'document_type' => 'Approved Concept Note',
            'phase' => 'Initiation',
            'file' => UploadedFile::fake()->create('concept-note.pdf', 10, 'application/pdf'),
        ];

        $this->actingAs($otherSupervisor)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $this->actingAs($assignedSupervisor)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertCreated();
    }

    public function test_only_an_assigned_analyst_can_upload_documents_and_types_must_be_required(): void
    {
        Storage::fake('private');
        $assignedAnalyst = User::factory()->create(['role' => 'analyst']);
        $otherAnalyst = User::factory()->create(['role' => 'analyst']);
        $project = $this->createProject([
            'phase' => 'Planning',
            'assigned_analyst_id' => $assignedAnalyst->id,
        ]);

        $payload = [
            'document_type' => 'SRS',
            'phase' => 'Planning',
            'file' => UploadedFile::fake()->create('srs.pdf', 10, 'application/pdf'),
        ];

        $this->actingAs($otherAnalyst)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $this->actingAs($assignedAnalyst)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'document_type' => 'SRS typo',
                'file' => UploadedFile::fake()->create('srs.pdf', 10, 'application/pdf'),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('document_type');

        $this->actingAs($assignedAnalyst)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'file' => UploadedFile::fake()->create('srs.pdf', 10, 'application/pdf'),
            ])
            ->assertCreated()
            ->assertJsonPath('document.document_type', 'SRS');

        $this->assertDatabaseHas('documents', [
            'project_id' => $project->id,
            'uploaded_by' => $assignedAnalyst->id,
            'document_type' => 'SRS',
        ]);
    }

    public function test_planning_documents_are_uploaded_by_analysts_and_reviewed_by_supervisors(): void
    {
        Storage::fake('private');
        $analyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject([
            'phase' => 'Planning',
            'assigned_analyst_id' => $analyst->id,
            'supervisor_id' => $supervisor->id,
        ]);
        $payload = [
            'document_type' => 'Project Proposal',
            'phase' => 'Planning',
            'file' => UploadedFile::fake()->create('proposal.pdf', 10, 'application/pdf'),
        ];

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $document = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$document['id']}/review", [
                'status' => 'Approved',
            ])
            ->assertOk();

        $this->assertDatabaseHas('documents', [
            'id' => $document['id'],
            'uploaded_by' => $analyst->id,
            'status' => 'Approved',
            'reviewed_by' => $supervisor->id,
        ]);

        $returnedDocument = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'document_type' => 'SRS',
                'file' => UploadedFile::fake()->create('srs.pdf', 10, 'application/pdf'),
            ])
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$returnedDocument['id']}/review", [
                'status' => 'Returned',
                'reviewer_comments' => 'Please correct the document.',
            ])
            ->assertOk();

        $this->assertDatabaseHas('documents', [
            'id' => $returnedDocument['id'],
            'uploaded_by' => $analyst->id,
            'status' => 'Returned',
            'reviewed_by' => $supervisor->id,
            'reviewer_comments' => 'Please correct the document.',
        ]);
    }

    public function test_execution_documents_are_uploaded_by_analysts_and_reviewed_by_supervisors(): void
    {
        Storage::fake('private');
        $analyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject([
            'phase' => 'Execution',
            'assigned_analyst_id' => $analyst->id,
            'supervisor_id' => $supervisor->id,
        ]);
        $payload = [
            'document_type' => 'FAT Report',
            'phase' => 'Execution',
            'file' => UploadedFile::fake()->create('fat-report.pdf', 10, 'application/pdf'),
        ];

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $document = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$document['id']}/review", [
                'status' => 'Returned',
                'reviewer_comments' => 'Please correct the report.',
            ])
            ->assertOk();

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'replaces_document_id' => $document['id'],
                'file' => UploadedFile::fake()->create('fat-report-corrected.pdf', 10, 'application/pdf'),
            ])
            ->assertForbidden();

        $replacement = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'replaces_document_id' => $document['id'],
                'file' => UploadedFile::fake()->create('fat-report-corrected.pdf', 10, 'application/pdf'),
            ])
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$replacement['id']}/review", [
                'status' => 'Approved',
            ])
            ->assertOk();

        $this->assertDatabaseHas('documents', [
            'id' => $replacement['id'],
            'uploaded_by' => $analyst->id,
            'status' => 'Approved',
            'reviewed_by' => $supervisor->id,
            'replaces_document_id' => $document['id'],
        ]);
    }

    public function test_closure_documents_are_uploaded_by_analysts_and_reviewed_by_supervisors(): void
    {
        Storage::fake('private');
        $analyst = User::factory()->create(['role' => 'analyst']);
        $otherAnalyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject([
            'phase' => 'Closure',
            'assigned_analyst_id' => $analyst->id,
            'supervisor_id' => $supervisor->id,
        ]);
        $payload = [
            'document_type' => 'User Manual',
            'phase' => 'Closure',
            'file' => UploadedFile::fake()->create('user-manual.pdf', 10, 'application/pdf'),
        ];

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $this->actingAs($otherAnalyst)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertForbidden();

        $document = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", $payload)
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$document['id']}/review", [
                'status' => 'Returned',
                'reviewer_comments' => 'Please update the manual.',
            ])
            ->assertOk();

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'replaces_document_id' => $document['id'],
                'file' => UploadedFile::fake()->create('user-manual-corrected.pdf', 10, 'application/pdf'),
            ])
            ->assertForbidden();

        $replacement = $this->actingAs($analyst)
            ->postJson("/api/projects/{$project->id}/documents", [
                ...$payload,
                'replaces_document_id' => $document['id'],
                'file' => UploadedFile::fake()->create('user-manual-corrected.pdf', 10, 'application/pdf'),
            ])
            ->assertCreated()
            ->json('document');

        $this->actingAs($supervisor)
            ->patchJson("/api/documents/{$replacement['id']}/review", [
                'status' => 'Approved',
            ])
            ->assertOk();

        $this->assertDatabaseHas('documents', [
            'id' => $replacement['id'],
            'uploaded_by' => $analyst->id,
            'status' => 'Approved',
            'reviewed_by' => $supervisor->id,
            'replaces_document_id' => $document['id'],
        ]);
    }

    public function test_assigned_analyst_can_submit_project_change_using_web_session(): void
    {
        $analyst = User::factory()->create(['role' => 'analyst']);
        $otherAnalyst = User::factory()->create(['role' => 'analyst']);
        $project = $this->createProject([
            'phase' => 'Execution',
            'assigned_analyst_id' => $analyst->id,
        ]);
        $payload = [
            'title' => 'Add reporting capability',
            'description' => 'Add a reporting feature requested by stakeholders.',
            'impact_level' => 'Medium',
        ];

        $this->actingAs($otherAnalyst)
            ->postJson("/project/{$project->id}/change-requests", $payload)
            ->assertForbidden();

        $this->actingAs($analyst)
            ->postJson("/project/{$project->id}/change-requests", $payload)
            ->assertCreated()
            ->assertJsonPath('change_request.status', 'Pending');

        $this->assertDatabaseHas('change_requests', [
            'project_id' => $project->id,
            'requested_by' => $analyst->id,
            'title' => 'Add reporting capability',
            'status' => 'Pending',
        ]);
    }

    public function test_supervisor_change_decisions_use_approve_and_reject_routes(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->createProject(['supervisor_id' => $supervisor->id]);
        $approvedChange = $this->createChangeRequest($project, 'Approval test');
        $rejectedChange = $this->createChangeRequest($project, 'Rejection test');

        $this->actingAs($supervisor)
            ->postJson("/project/change-requests/{$approvedChange->id}/approve")
            ->assertOk()
            ->assertJsonPath('change_request.status', 'Approved');

        $this->actingAs($supervisor)
            ->postJson("/project/change-requests/{$rejectedChange->id}/reject", [
                'approval_comments' => 'This change needs revision.',
            ])
            ->assertOk()
            ->assertJsonPath('change_request.status', 'Rejected');

        $this->assertDatabaseHas('change_requests', [
            'id' => $approvedChange->id,
            'approved_by' => $supervisor->id,
            'status' => 'Approved',
        ]);
        $this->assertDatabaseHas('change_requests', [
            'id' => $rejectedChange->id,
            'approved_by' => $supervisor->id,
            'status' => 'Rejected',
            'approval_comments' => 'This change needs revision.',
        ]);
    }

    public function test_analyst_assignment_rejects_users_without_the_analyst_role(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $manager = User::factory()->create(['role' => 'manager']);
        $project = $this->createProject(['supervisor_id' => $supervisor->id]);

        $this->actingAs($supervisor)
            ->postJson("/api/projects/{$project->id}/assign-analyst", [
                'assigned_analyst_id' => $manager->id,
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('assigned_analyst_id');
    }

    private function createProject(array $attributes = []): Project
    {
        return Project::create([
            'name' => 'Access control test project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Access control test system',
            'status' => 'Not Started',
            'phase' => 'Initiation',
            ...$attributes,
        ]);
    }

    private function createChangeRequest(Project $project, string $title): ChangeRequest
    {
        $analyst = User::factory()->create(['role' => 'analyst']);

        return ChangeRequest::create([
            'project_id' => $project->id,
            'title' => $title,
            'description' => "{$title} details",
            'requested_by' => $analyst->id,
            'status' => 'Pending',
        ]);
    }
}
