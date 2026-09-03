<?php

namespace App\Http\Controllers;

use App\Models\ProjectActivity;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProjectActivityController extends Controller
{
    /**
     * Get all activities for a project
     */
    public function index(Project $project)
    {
        return response()->json([
            'activities' => $project->activities()->orderBy('planned_start_date')->get(),
        ]);
    }

    /**
     * Create a new activity
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'activity_name' => 'required|string|max:255',
            'expected_deliverable' => 'nullable|string',
            'planned_start_date' => 'required|date',
            'planned_end_date' => 'required|date|after:planned_start_date',
            'responsible_person' => 'nullable|string|max:255',
        ]);

        $activity = ProjectActivity::create([
            ...$validated,
            'status' => 'Not Started',
        ]);

        return response()->json([
            'message' => 'Activity created successfully',
            'activity' => $activity,
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single activity
     */
    public function show(ProjectActivity $activity)
    {
        return response()->json($activity);
    }

    /**
     * Update activity
     */
    public function update(Request $request, ProjectActivity $activity)
    {
        $validated = $request->validate([
            'activity_name' => 'sometimes|string|max:255',
            'expected_deliverable' => 'sometimes|nullable|string',
            'planned_start_date' => 'sometimes|date',
            'planned_end_date' => 'sometimes|date',
            'actual_start_date' => 'sometimes|nullable|date',
            'actual_end_date' => 'sometimes|nullable|date',
            'responsible_person' => 'sometimes|nullable|string|max:255',
            'remarks' => 'sometimes|nullable|string',
            'attachments' => 'sometimes|nullable|array',
        ]);

        $activity->update($validated);
        $activity->updateStatusFromDates();

        return response()->json([
            'message' => 'Activity updated successfully',
            'activity' => $activity,
        ]);
    }

    /**
     * Delete activity
     */
    public function destroy(ProjectActivity $activity)
    {
        if ($activity->project->phase !== 'Planning') {
            return response()->json([
                'message' => 'Activities can only be deleted during the Planning phase.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $activity->delete();

        return response()->json([
            'message' => 'Activity deleted successfully',
        ]);
    }

    /**
     * Record progress on activity
     */
    public function recordProgress(Request $request, ProjectActivity $activity)
    {
        $validated = $request->validate([
            'actual_start_date' => 'sometimes|required|date|before_or_equal:' . now()->toDateString(),
            'actual_end_date' => 'sometimes|nullable|date',
            'remarks' => 'sometimes|nullable|string',
            'attachments' => 'sometimes|nullable|array',
        ]);

        // Validate Actual Start Date is not before Planned Start Date
        if ($request->has('actual_start_date')) {
            if ($validated['actual_start_date'] < $activity->planned_start_date) {
                return response()->json([
                    'message' => 'Actual start date cannot be earlier than planned start date.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        // Validate Actual End Date is not after current date
        if ($request->has('actual_end_date') && $validated['actual_end_date']) {
            if ($validated['actual_end_date'] > now()->toDateString()) {
                return response()->json([
                    'message' => 'Actual end date cannot be later than current date.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        $activity->update($validated);
        $activity->updateStatusFromDates();

        return response()->json([
            'message' => 'Activity progress recorded successfully',
            'activity' => $activity,
        ]);
    }
}
