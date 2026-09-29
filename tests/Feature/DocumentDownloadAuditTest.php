<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DocumentDownloadAuditTest extends TestCase
{
    use RefreshDatabase;

    public function test_each_successful_document_download_is_recorded_and_redownloads_remain_allowed(): void
    {
        Storage::fake('private');
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = Project::create([
            'name' => 'Download audit project',
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Download audit system',
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
        $document = Document::create([
            'project_id' => $project->id,
            'phase' => 'Initiation',
            'document_type' => 'Approved Concept Note',
            'file_path' => "documents/{$project->id}/concept-note.pdf",
            'original_filename' => 'concept-note.pdf',
            'uploaded_by' => $supervisor->id,
            'status' => 'Approved',
        ]);
        Storage::disk('private')->put($document->file_path, 'document contents');

        $this->actingAs($supervisor)->get("/project/documents/{$document->id}/download")->assertOk();
        $this->actingAs($supervisor)->get("/project/documents/{$document->id}/download")->assertOk();

        $this->assertDatabaseCount('document_downloads', 2);
        $this->assertDatabaseHas('document_downloads', [
            'document_id' => $document->id,
            'user_id' => $supervisor->id,
        ]);
    }
}
