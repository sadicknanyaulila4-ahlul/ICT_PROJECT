<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectDocumentLibraryTest extends TestCase
{
    use RefreshDatabase;

    public function test_supervisor_can_view_uploaded_files_and_required_documents_for_a_project(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'Library test project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Library test system',
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
        Document::create([
            'project_id' => $project->id,
            'phase' => 'Initiation',
            'document_type' => 'Approved Concept Note',
            'file_path' => 'documents/test/concept-note.pdf',
            'original_filename' => 'concept-note.pdf',
            'uploaded_by' => $supervisor->id,
            'status' => 'Approved',
            'is_required' => true,
        ]);

        $this->actingAs($supervisor)
            ->get("/project-pages/documents?project_id={$project->id}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Project/Modules')
                ->where('module', 'documents')
                ->where('selectedProject.id', $project->id)
                ->where('documentStatus.Approved Concept Note', 'Approved')
                ->has('requiredDocuments', 2)
                ->has('documents.data', 1)
                ->where('documents.data.0.original_filename', 'concept-note.pdf')
            );
    }
}
