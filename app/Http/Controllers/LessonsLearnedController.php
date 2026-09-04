<?php

namespace App\Http\Controllers;

use App\Models\LessonLearned;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LessonsLearnedController extends Controller
{
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
    public function show(LessonLearned $lesson)
    {
        return response()->json($lesson->load(['creator', 'reviewer', 'project']));
    }

    /**
     * Update lesson learned
     */
    public function update(Request $request, LessonLearned $lesson)
    {
        // Only allow editing if status is Draft
        if ($lesson->status !== 'Draft') {
            return response()->json([
                'message' => 'Only draft lessons learned can be edited.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validate([
            'category' => 'sometimes|string|max:255',
            'lesson_description' => 'sometimes|string',
            'recommendations' => 'sometimes|nullable|string',
        ]);

        $lesson->update($validated);

        return response()->json([
            'message' => 'Lesson learned updated successfully',
            'lesson' => $lesson,
        ]);
    }

    /**
     * Submit lesson learned for review
     */
    public function submit(LessonLearned $lesson)
    {
        if ($lesson->status !== 'Draft') {
            return response()->json([
                'message' => 'Only draft lessons learned can be submitted.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $lesson->update(['status' => 'Submitted']);

        return response()->json([
            'message' => 'Lesson learned submitted for review',
            'lesson' => $lesson,
        ]);
    }

    /**
     * Review lesson learned (approve or return)
     */
    public function review(Request $request, LessonLearned $lesson)
    {
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'review_comments' => 'nullable|string',
        ]);

        $lesson->update([
            'status' => $validated['status'],
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'review_comments' => $validated['review_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Lesson learned reviewed successfully',
            'lesson' => $lesson,
        ]);
    }

    /**
     * Delete lesson learned
     */
    public function destroy(LessonLearned $lesson)
    {
        if ($lesson->status !== 'Draft') {
            return response()->json([
                'message' => 'Only draft lessons learned can be deleted.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $lesson->delete();

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
