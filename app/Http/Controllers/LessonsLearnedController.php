<?php

namespace App\Http\Controllers;

use App\Models\LessonLearned;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LessonsLearnedController extends Controller
{
    public function storeForProject(Request $request, Project $project)
    {
        $request->merge(['project_id' => $project->id]);

        return $this->store($request);
    }
    /**
     * Get all lessons learned for a project
     */
    public function index(Project $project, Request $request)
    {
        $query = $project->lessonsLearned();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json([
            'lessons_learned' => $query->with(['creator', 'reviewer'])->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Create a new lesson learned
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'category' => 'required|string|max:255',
            'lesson_description' => 'required|string',
            'recommendations' => 'sometimes|nullable|string',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        abort_unless($project->phase === 'Closure', 422, 'Lessons learned can only be recorded during Closure.');

        $lesson = LessonLearned::create([
            ...$validated,
            'created_by' => Auth::id(),
            'status' => 'Draft',
        ]);

        return response()->json([
            'message' => 'Lesson learned created successfully',
            'lesson' => $lesson->load('creator'),
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single lesson learned
     */
    public function show(LessonLearned $lessonLearned)
    {
        return response()->json($lessonLearned->load(['creator', 'reviewer', 'project']));
    }

    /**
     * Update lesson learned
     */
    public function update(Request $request, LessonLearned $lessonLearned)
    {
        // Only allow editing if status is Draft
        if ($lessonLearned->status !== 'Draft') {
            return response()->json([
                'message' => 'Only draft lessons learned can be edited.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validate([
            'category' => 'sometimes|string|max:255',
            'lesson_description' => 'sometimes|string',
            'recommendations' => 'sometimes|nullable|string',
        ]);

        $lessonLearned->update($validated);

        return response()->json([
            'message' => 'Lesson learned updated successfully',
            'lesson' => $lessonLearned,
        ]);
    }

    /**
     * Submit lesson learned for review
     */
    public function submit(LessonLearned $lessonLearned)
    {
        if (! in_array($lessonLearned->status, ['Draft', 'Returned'], true)) {
            return response()->json([
                'message' => 'Only draft or returned lessons learned can be submitted.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $lessonLearned->update(['status' => 'Submitted']);

        return response()->json([
            'message' => 'Lesson learned submitted for review',
            'lesson' => $lessonLearned,
        ]);
    }

    /**
     * Review lesson learned (approve or return)
     */
    public function review(Request $request, LessonLearned $lessonLearned)
    {
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'review_comments' => 'nullable|string',
        ]);

        $lessonLearned->update([
            'status' => $validated['status'],
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'review_comments' => $validated['review_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Lesson learned reviewed successfully',
            'lesson' => $lessonLearned,
        ]);
    }

    /**
     * Delete lesson learned
     */
    public function destroy(LessonLearned $lessonLearned)
    {
        if ($lessonLearned->status !== 'Draft') {
            return response()->json([
                'message' => 'Only draft lessons learned can be deleted.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $lessonLearned->delete();

        return response()->json([
            'message' => 'Lesson learned deleted successfully',
        ]);
    }

    /**
     * Generate lessons learned report
     */
    public function generateReport(Project $project)
    {
        $lessons = $project->lessonsLearned()->where('status', 'Approved')->get();

        return response()->json([
            'project' => $project->name,
            'total_lessons' => $lessons->count(),
            'by_category' => $lessons->groupBy('category')->map(fn($items) => $items->count()),
            'lessons' => $lessons,
        ]);
    }
}
