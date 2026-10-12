<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * BRD rule: "Validation based on cost for below 50 million system should produce project
 * concept note, above 50 million system should produce project proposal."
 *
 * Note: the BRD does not say what happens at exactly 50,000,000. The implementation treats
 * the threshold as inclusive (>= 50,000,000 requires a Project Proposal). Confirm with the BRD owner.
 */
class InitiationBudgetDocumentRuleTest extends TestCase
{
    use RefreshDatabase;

    private function makeProject(?float $budget, User $supervisor): Project
    {
        return Project::create([
            'name' => 'Budget rule project',
            'budget' => $budget,
            'project_source' => 'System Development',
            'project_nature' => 'Planned',
            'project_activity' => 'New Implementation (Major)',
            'custom_system_name' => 'Budget rule system '.uniqid(),
            'supervisor_id' => $supervisor->id,
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);
    }

    public function test_budget_below_threshold_requires_concept_note_not_proposal(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->makeProject(49_999_999, $supervisor);

        $required = $project->requiredDocumentsForPhase('Initiation');

        $this->assertContains('Approved Concept Note', $required);
        $this->assertNotContains('Project Proposal', $required);
        $this->assertContains('e-Government Authority Letter', $required);
    }

    public function test_budget_at_or_above_threshold_requires_project_proposal_not_concept_note(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);

        foreach ([50_000_000, 120_000_000] as $budget) {
            $project = $this->makeProject($budget, $supervisor);
            $required = $project->requiredDocumentsForPhase('Initiation');

            $this->assertContains('Project Proposal', $required, "Budget {$budget} should require a Project Proposal");
            $this->assertNotContains('Approved Concept Note', $required, "Budget {$budget} should not require a Concept Note");
            $this->assertContains('e-Government Authority Letter', $required);
        }
    }

    public function test_missing_budget_is_treated_as_below_threshold(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->makeProject(null, $supervisor);

        $this->assertContains('Approved Concept Note', $project->requiredDocumentsForPhase('Initiation'));
    }

    public function test_threshold_only_affects_initiation_phase(): void
    {
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $small = $this->makeProject(1_000, $supervisor);
        $large = $this->makeProject(900_000_000, $supervisor);

        foreach (['Planning', 'Execution', 'Closure'] as $phase) {
            $this->assertSame(
                $small->requiredDocumentsForPhase($phase),
                $large->requiredDocumentsForPhase($phase),
                "{$phase} documents must not depend on budget"
            );
        }
    }

    public function test_supervisor_can_upload_proposal_but_not_concept_note_for_large_budget_project(): void
    {
        Storage::fake('private');
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->makeProject(80_000_000, $supervisor);

        $this->actingAs($supervisor)->postJson("/project/{$project->id}/documents", [
            'document_type' => 'Approved Concept Note',
            'phase' => 'Initiation',
            'file' => UploadedFile::fake()->create('concept-note.pdf', 100, 'application/pdf'),
        ])->assertStatus(422)->assertJsonValidationErrors('document_type');

        $this->actingAs($supervisor)->postJson("/project/{$project->id}/documents", [
            'document_type' => 'Project Proposal',
            'phase' => 'Initiation',
            'file' => UploadedFile::fake()->create('proposal.pdf', 100, 'application/pdf'),
        ])->assertCreated();

        $this->assertDatabaseHas('documents', [
            'project_id' => $project->id,
            'document_type' => 'Project Proposal',
            'phase' => 'Initiation',
        ]);
    }

    public function test_supervisor_can_upload_concept_note_but_not_proposal_for_small_budget_project(): void
    {
        Storage::fake('private');
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->makeProject(10_000_000, $supervisor);

        $this->actingAs($supervisor)->postJson("/project/{$project->id}/documents", [
            'document_type' => 'Project Proposal',
            'phase' => 'Initiation',
            'file' => UploadedFile::fake()->create('proposal.pdf', 100, 'application/pdf'),
        ])->assertStatus(422)->assertJsonValidationErrors('document_type');

        $this->actingAs($supervisor)->postJson("/project/{$project->id}/documents", [
            'document_type' => 'Approved Concept Note',
            'phase' => 'Initiation',
            'file' => UploadedFile::fake()->create('concept-note.pdf', 100, 'application/pdf'),
        ])->assertCreated();
    }

    public function test_all_initiation_documents_complete_follows_the_budget_rule(): void
    {
        Storage::fake('private');
        $supervisor = User::factory()->create(['role' => 'supervisor']);
        $project = $this->makeProject(75_000_000, $supervisor);

        foreach (['Project Proposal', 'e-Government Authority Letter'] as $type) {
            $project->documents()->create([
                'phase' => 'Initiation',
                'document_type' => $type,
                'file_path' => 'documents/'.$project->id.'/x.pdf',
                'original_filename' => 'x.pdf',
                'uploaded_by' => $supervisor->id,
                'status' => 'Approved',
                'is_required' => true,
            ]);
        }

        // A large-budget project is complete with a Proposal + Authority Letter (no Concept Note needed).
        $this->assertTrue($project->allInitiationDocumentsComplete());
    }
}
