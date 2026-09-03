<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\RequirementComponent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequirementController extends Controller
{
    public function index(Project $project)
    {
        $requirements = $project->requirements;
        return Inertia::render('Project/Execution/Traceability', [
            'project' => $project,
            'requirements' => $requirements,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $request->validate([
            'requirement_description' => 'required|string',
            'planned_start_date' => 'required|date',
            'planned_end_date' => 'required|date|after:planned_start_date',
        ]);
        $project->requirements()->create($request->all());
        return back()->with('success', 'Requirement added.');
    }

    public function update(Request $request, RequirementComponent $requirement)
    {
        $request->validate([
            'actual_start_date' => 'nullable|date|after_or_equal:planned_start_date|before_or_equal:today',
            'actual_end_date' => 'nullable|date|before_or_equal:today',
            'test_score' => 'nullable|in:pass,fail',
            'test_comments' => 'nullable|string',
            'remarks' => 'nullable|string',
            'status' => 'nullable|in:pending,ongoing,completed',
        ]);

        $requirement->update($request->all());

        // Auto-update status if not manually set
        if (!$request->has('status')) {
            if ($requirement->actual_start_date && !$requirement->actual_end_date) {
                $requirement->status = 'ongoing';
            } elseif ($requirement->actual_end_date) {
                $requirement->status = 'completed';
            } else {
                $requirement->status = 'pending';
            }
            $requirement->save();
        }

        return back()->with('success', 'Requirement updated.');
    }

    public function destroy(RequirementComponent $requirement)
    {
        $requirement->delete();
        return back()->with('success', 'Requirement deleted.');
    }
}