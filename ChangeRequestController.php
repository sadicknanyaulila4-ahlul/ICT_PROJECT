<?php

namespace App\Http\Controllers;

use App\Models\ChangeRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ChangeRequestController extends Controller
{
    /**
     * Get all change requests for a project
     */
    public function index(Project $project, Request $request)
    {
        $query = $project->changeRequests();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json([
            'change_requests' => $query->with(['requester', 'approver'])->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Create a new change request
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'impact_level' => 'sometimes|in:Low,Medium,High',
            'impact_description' => 'sometimes|nullable|string',
        ]);

        $changeRequest = ChangeRequest::create([
            ...$validated,
            'requested_by' => Auth::id(),
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Change request created successfully',
            'change_request' => $changeRequest->load(['requester']),
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single change request
     */
    public function show(ChangeRequest $changeRequest)
    {
        return response()->json($changeRequest->load(['requester', 'approver', 'project']));
    }

    /**
     * Approve change request
     */
    public function approve(Request $request, ChangeRequest $changeRequest)
    {
        $validated = $request->validate([
            'approval_comments' => 'nullable|string',
        ]);

        $changeRequest->update([
            'status' => 'Approved',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'approval_comments' => $validated['approval_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Change request approved successfully',
            'change_request' => $changeRequest,
        ]);
    }

    /**
     * Reject change request
     */
    public function reject(Request $request, ChangeRequest $changeRequest)
    {
        $validated = $request->validate([
            'approval_comments' => 'nullable|string',
        ]);

        $changeRequest->update([
            'status' => 'Rejected',
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'approval_comments' => $validated['approval_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Change request rejected',
            'change_request' => $changeRequest,
        ]);
    }

    /**
     * Delete change request
     */
    public function destroy(ChangeRequest $changeRequest)
    {
        if ($changeRequest->status !== 'Pending') {
            return response()->json([
                'message' => 'Only pending change requests can be deleted.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $changeRequest->delete();

        return response()->json([
            'message' => 'Change request deleted successfully',
        ]);
    }

    /**
     * Get approved changes report
     */
    public function getApprovedChanges(Project $project)
    {
        $approvedChanges = $project->changeRequests()
            ->where('status', 'Approved')
            ->get();

        return response()->json([
            'approved_changes_count' => $approvedChanges->count(),
            'approved_changes' => $approvedChanges,
        ]);
    }
}
