<?php

namespace App\Http\Controllers;

use App\Models\RequirementComponent;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RequirementComponentController extends Controller
{
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

        $requirement = RequirementComponent::create([
            ...$validated,
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Requirement created successfully',
            'requirement' => $requirement,
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single requirement
     */
    public function show(RequirementComponent $requirement)
    {
        return response()->json($requirement);
    }

    /**
     * Update requirement component
     */
    public function update(Request $request, RequirementComponent $requirement)
    {
        $validated = $request->validate([
            'requirement_description' => 'sometimes|string',
            'actual_start_date' => 'sometimes|nullable|date|before_or_equal:' . now()->toDateString(),
            'actual_end_date' => 'sometimes|nullable|date',
            'status' => 'sometimes|in:Pending,Ongoing,Completed',
            'test_score' => 'sometimes|nullable|in:Pass,Fail',
            'test_comments' => 'sometimes|nullable|string',
            'remarks' => 'sometimes|nullable|string',
        ]);

        $requirement->update($validated);

        // Auto-update status based on dates
        if ($request->has('actual_start_date') || $request->has('actual_end_date')) {
            if (!$requirement->actual_start_date) {
                $requirement->status = 'Pending';
            } elseif ($requirement->actual_start_date && !$requirement->actual_end_date) {
                $requirement->status = 'Ongoing';
            } elseif ($requirement->actual_start_date && $requirement->actual_end_date) {
                $requirement->status = 'Completed';
            }
            $requirement->save();
        }

        return response()->json([
            'message' => 'Requirement updated successfully',
            'requirement' => $requirement,
        ]);
    }

    /**
     * Delete requirement component
     */
    public function destroy(RequirementComponent $requirement)
    {
        $requirement->delete();

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
