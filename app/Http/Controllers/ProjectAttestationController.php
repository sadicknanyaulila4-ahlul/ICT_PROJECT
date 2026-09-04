<?php

namespace App\Http\Controllers;

use App\Models\ProjectAttestation;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProjectAttestationController extends Controller
{
    /**
     * Get all attestations for a project
     */
    public function index(Project $project, Request $request)
    {
        $query = $project->attestations();

        if ($request->has('attestor_role')) {
            $query->where('attestor_role', $request->attestor_role);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json([
            'attestations' => $query->with('attestor')->orderBy('created_at')->get(),
        ]);
    }

    /**
     * Create a new attestation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'attestor_role' => 'required|in:SDMM,IDMM,DICT',
            'attestation_details' => 'sometimes|nullable|string',
        ]);

        // Check if attestation for this role already exists
        $exists = ProjectAttestation::where('project_id', $validated['project_id'])
            ->where('attestor_role', $validated['attestor_role'])
            ->where('status', 'Attested')
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This project has already been attested by ' . $validated['attestor_role'],
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $attestation = ProjectAttestation::create([
            ...$validated,
            'attested_by' => Auth::id(),
            'status' => 'Attested',
            'attested_at' => now(),
        ]);

        return response()->json([
            'message' => 'Project attested successfully by ' . $validated['attestor_role'],
            'attestation' => $attestation->load('attestor'),
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single attestation
     */
    public function show(ProjectAttestation $attestation)
    {
        return response()->json($attestation->load(['attestor', 'project']));
    }

    /**
     * Get attestation status for project
     */
    public function getAttestationStatus(Project $project)
    {
        $attestations = $project->attestations()->where('status', 'Attested')->get();

        return response()->json([
            'project_id' => $project->id,
            'total_attestations' => $attestations->count(),
            'sdmm_attested' => $attestations->where('attestor_role', 'SDMM')->isNotEmpty(),
            'idmm_attested' => $attestations->where('attestor_role', 'IDMM')->isNotEmpty(),
            'dict_attested' => $attestations->where('attestor_role', 'DICT')->isNotEmpty(),
            'all_attested' => $project->manager_attested && $project->dict_attested,
            'attestations' => $attestations,
        ]);
    }

    /**
     * Reject attestation
     */
    public function reject(Request $request, ProjectAttestation $attestation)
    {
        $validated = $request->validate([
            'attestation_comments' => 'required|string',
        ]);

        $attestation->update([
            'status' => 'Pending',
            'attestation_comments' => $validated['attestation_comments'],
        ]);

        return response()->json([
            'message' => 'Attestation rejected. Project status reset to Pending.',
            'attestation' => $attestation,
        ]);
    }

    /**
     * Delete attestation
     */
    public function destroy(ProjectAttestation $attestation)
    {
        $attestation->delete();

        return response()->json([
            'message' => 'Attestation removed successfully',
        ]);
    }
}
