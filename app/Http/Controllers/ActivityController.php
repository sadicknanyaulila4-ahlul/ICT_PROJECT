<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(Project $project)
    {
        $activities = $project->activities()->get();
        return Inertia::render('Project/Planning/Activities', [
            'project' => $project,
            'activities' => $activities,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $request->validate([
            'activity_name' => 'required|string',
            'expected_deliverable' => 'nullable|string',
            'planned_start_date' => 'required|date',
            'planned_end_date' => 'required|date|after:planned_start_date',
            'responsible_person' => 'nullable|string',
        ]);

        $project->activities()->create($request->all());
        return back()->with('success', 'Activity added.');
    }

    public function update(Request $request, ProjectActivity $activity)
    {
        $request->validate([
            'activity_name' => 'string',
            'expected_deliverable' => 'nullable|string',
            'planned_start_date' => 'date',
            'planned_end_date' => 'date|after:planned_start_date',
            'actual_start_date' => 'nullable|date|after_or_equal:planned_start_date|before_or_equal:today',
            'actual_end_date' => 'nullable|date|before_or_equal:today',
            'responsible_person' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        $activity->update($request->all());

        // Auto-update status
        if ($activity->actual_start_date && !$activity->actual_end_date) {
            $activity->status = 'ongoing';
        } elseif ($activity->actual_end_date) {
            $activity->status = 'completed';
        } else {
            $activity->status = 'not_started';
        }
        $activity->save();

        return back()->with('success', 'Activity updated.');
    }

    public function destroy(ProjectActivity $activity)
    {
        $activity->delete();
        return back()->with('success', 'Activity deleted.');
    }
}