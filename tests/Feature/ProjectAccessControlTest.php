<?php

namespace Tests\Feature;

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
}
