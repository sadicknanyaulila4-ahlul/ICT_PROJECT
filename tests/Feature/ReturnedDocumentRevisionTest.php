<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ReturnedDocumentRevisionTest extends TestCase
{
    use RefreshDatabase;

    public function test_assigned_analyst_can_resubmit_a_supervisor_returned_initiation_document(): void
    {
        Storage::fake('private');
        $analyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'Returned document test project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Returned document test system',
            'assigned_analyst_id' => $analyst->id,
            'supervisor_id' => $supervisor->id,
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
        $returnedDocument = Document::create([
            'project_id' => $project->id,
            'phase' => 'Initiation',
            'document_type' => 'Approved Concept Note',
            'file_path' => 'documents/'.$project->id.'/old.pdf',
            'original_filename' => 'old.pdf',
            'uploaded_by' => $supervisor->id,
            'status' => 'Returned',
            'reviewer_comments' => 'Please correct the missing approval signature.',
            'reviewed_by' => $supervisor->id,
            'is_required' => true,
        ]);

        $response = $this->actingAs($analyst)->post("/project/{$project->id}/documents", [
            'document_type' => 'Approved Concept Note',
            'phase' => 'Initiation',
            'replaces_document_id' => $returnedDocument->id,
            'file' => UploadedFile::fake()->create('corrected-concept-note.pdf', 100, 'application/pdf'),
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('documents', [
            'id' => $returnedDocument->id,
            'status' => 'Returned',
            'reviewer_comments' => 'Please correct the missing approval signature.',
        ]);
        $this->assertDatabaseHas('documents', [
            'project_id' => $project->id,
            'document_type' => 'Approved Concept Note',
            'original_filename' => 'corrected-concept-note.pdf',
            'uploaded_by' => $analyst->id,
            'status' => 'Pending Review',
            'replaces_document_id' => $returnedDocument->id,
        ]);
    }

    public function test_analyst_cannot_replace_another_projects_returned_document(): void
    {
        Storage::fake('private');
        $analyst = User::factory()->create(['role' => 'analyst']);
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'First project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'First system',
            'assigned_analyst_id' => $analyst->id,
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
        $otherProject = Project::create([
            'name' => 'Other project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Other system',
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
        $returnedDocument = Document::create([
            'project_id' => $otherProject->id,
            'phase' => 'Initiation',
            'document_type' => 'Approved Concept Note',
            'file_path' => 'documents/'.$otherProject->id.'/old.pdf',
            'original_filename' => 'old.pdf',
            'uploaded_by' => $supervisor->id,
            'status' => 'Returned',
            'reviewer_comments' => 'Please correct this document.',
        ]);

        $this->actingAs($analyst)->post("/project/{$project->id}/documents", [
            'document_type' => 'Approved Concept Note',
            'phase' => 'Initiation',
            'replaces_document_id' => $returnedDocument->id,
            'file' => UploadedFile::fake()->create('corrected.pdf', 100, 'application/pdf'),
        ])->assertUnprocessable();

        $this->assertDatabaseCount('documents', 1);
    }
}
