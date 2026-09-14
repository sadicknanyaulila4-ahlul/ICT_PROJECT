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
        $requirements = $project->requirements()->orderBy('created_at')->get();
        if (request()->header('X-Inertia')) {
            return Inertia::render('Project/Execution/Traceability', [
                'project' => $project,
                'requirements' => $requirements,
            ]);
        }

        return response()->json(['requirements' => $requirements]);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'requirement_description' => 'required|string',
            'planned_start_date' => 'required|date',
            'planned_end_date' => 'required|date|after:planned_start_date',
        ]);
        $project->requirements()->create([
            ...$validated,
            'status' => 'Pending',
            'review_status' => 'Pending Review',
        ]);
        return back()->with('success', 'Requirement added.');
    }

    public function update(Request $request, Project $project, RequirementComponent $requirement)
    {
        abort_if($requirement->project_id !== $project->id, 404);

        $validated = $request->validate([
            'actual_start_date' => 'nullable|date|after_or_equal:planned_start_date|before_or_equal:today',
            'actual_end_date' => 'nullable|date|before_or_equal:today',
            'test_score' => 'nullable|in:Pass,Fail',
            'test_comments' => 'nullable|string',
            'remarks' => 'nullable|string',
            'status' => 'nullable|in:Pending,Ongoing,Completed',
        ]);

        $requirement->update($validated);

        // Auto-update status if not manually set
        if (!$request->has('status')) {
            if ($requirement->actual_start_date && !$requirement->actual_end_date) {
                $requirement->status = 'Ongoing';
            } elseif ($requirement->actual_end_date) {
                $requirement->status = 'Completed';
            } else {
                $requirement->status = 'Pending';
            }
            $requirement->save();
        }

        return back()->with('success', 'Requirement updated.');
    }

    public function destroy(Project $project, RequirementComponent $requirement)
    {
        abort_if($requirement->project_id !== $project->id, 404);
        $requirement->delete();
        return back()->with('success', 'Requirement deleted.');
    }
}
