<?php

namespace App\Http\Controllers;

use App\Models\RequirementComponent;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RequirementComponentController extends Controller
{
    public function storeForProject(Request $request, Project $project)
    {
        $request->merge(['project_id' => $project->id]);

        return $this->store($request);
    }
    /**
     * Get all requirements for a project
     */
    public function index(Project $project)
    {
        return response()->json([
            'requirements' => $project->requirements()->orderBy('created_at')->get(),
            'overall_percentage' => $project->getOverallImplementationPercentage(),
        ]);
    }

    /**
     * Create a new requirement component
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'requirement_description' => 'required|string',
            'planned_start_date' => 'required|date',
            'planned_end_date' => 'required|date|after:planned_start_date',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        abort_unless($project->phase === 'Execution', 422, 'Requirements can only be added during Execution.');
        abort_unless($project->documents()->where('phase', 'Planning')->where('document_type', 'SRS')->where('status', 'Approved')->exists(), 422, 'An approved SRS is required before submitting requirements.');

        $requirement = RequirementComponent::create([
            ...$validated,
            'status' => 'Pending',
            'review_status' => 'Pending Review',
        ]);

        return response()->json([
            'message' => 'Requirement created successfully',
            'requirement' => $requirement,
        ], Response::HTTP_CREATED);
    }

    /** Review an individual RTM component. */
    public function review(Request $request, RequirementComponent $requirementComponent)
    {
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'review_comments' => 'nullable|string|required_if:status,Returned',
        ]);

        $requirementComponent->update([
            'review_status' => $validated['status'],
            'review_comments' => $validated['review_comments'] ?? null,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return response()->json(['message' => 'Requirement reviewed successfully.', 'requirement' => $requirementComponent]);
    }

    /**
     * Get a single requirement
     */
    public function show(RequirementComponent $requirementComponent)
    {
        return response()->json($requirementComponent);
    }

    /**
     * Update requirement component
     */
    public function update(Request $request, RequirementComponent $requirementComponent)
    {
        $validated = $request->validate([
            'requirement_description' => 'sometimes|string',
            'actual_start_date' => 'sometimes|nullable|date|after_or_equal:planned_start_date|before_or_equal:' . now()->toDateString(),
            'actual_end_date' => 'sometimes|nullable|date|after_or_equal:actual_start_date|before_or_equal:' . now()->toDateString(),
            'status' => 'sometimes|in:Pending,Ongoing,Completed',
            'test_score' => 'sometimes|nullable|in:Pass,Fail',
            'test_comments' => 'sometimes|nullable|string',
            'remarks' => 'sometimes|nullable|string',
        ]);

        $requirementComponent->update($validated);

        if ($requirementComponent->review_status === 'Returned') {
            $requirementComponent->update([
                'review_status' => 'Pending Review',
                'review_comments' => null,
                'reviewed_by' => null,
                'reviewed_at' => null,
            ]);
        }

        // Auto-update status based on dates
        if ($request->has('actual_start_date') || $request->has('actual_end_date')) {
            if (! $requirementComponent->actual_start_date) {
                $requirementComponent->status = 'Pending';
            } elseif ($requirementComponent->actual_start_date && ! $requirementComponent->actual_end_date) {
                $requirementComponent->status = 'Ongoing';
            } elseif ($requirementComponent->actual_start_date && $requirementComponent->actual_end_date) {
                $requirementComponent->status = 'Completed';
            }
            $requirementComponent->save();
        }

        return response()->json([
            'message' => 'Requirement updated successfully',
            'requirement' => $requirementComponent,
        ]);
    }

    /**
     * Delete requirement component
     */
    public function destroy(RequirementComponent $requirementComponent)
    {
        $requirementComponent->delete();

        return response()->json([
            'message' => 'Requirement deleted successfully',
        ]);
    }

    /**
     * Get overall project implementation percentage
     */
    public function getOverallPercentage(Project $project)
    {
        return response()->json([
            'overall_percentage' => $project->getOverallImplementationPercentage(),
            'breakdown' => [
                'pending' => $project->requirements()->where('status', 'Pending')->count(),
                'ongoing' => $project->requirements()->where('status', 'Ongoing')->count(),
                'completed' => $project->requirements()->where('status', 'Completed')->count(),
            ],
        ]);
    }
}
