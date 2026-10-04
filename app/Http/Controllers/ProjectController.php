<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRegistrationRequest;
use App\Models\Document;
use App\Models\InfrastructureComponent;
use App\Models\Project;
use App\Models\ProjectActivity;
use App\Models\ProjectAttestation;
use App\Models\RequirementComponent;
use App\Models\System;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function requiredDocuments(string $phase): array
    {
        return config("project.required_documents.{$phase}", []);
    }

    private function missingDocuments(Project $project, string $phase): array
    {
        $approved = $project->documents()
            ->where('phase', $phase)
            ->where('status', 'Approved')
            ->pluck('document_type')
            ->all();

        return array_values(array_diff($this->requiredDocuments($phase), $approved));
    }

    /** Display the project dashboard. */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Project::with(['supervisor', 'analyst', 'activities', 'requirements', 'documents']);

        if ($user->role === 'supervisor') {
            // Supervisor: only projects they registered/oversee
            $query->where('supervisor_id', $user->id);
        } elseif ($user->role === 'analyst') {
            // Analyst: only projects assigned to them
            $query->where('assigned_analyst_id', $user->id);
        } elseif ($user->role === 'manager') {
            // Manager: projects awaiting their attestation
            $query->where('manager_attested', false);
        } elseif ($user->role === 'dict') {
            // DICT: projects Manager already attested, awaiting final sign-off
            $query->where('manager_attested', true)->where('dict_attested', false);
        }
        // Admin: no restriction — full visibility across all projects.

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('phase')) {
            $query->where('phase', $request->phase);
        }
        if ($request->has('project_source')) {
            $query->where('project_source', $request->project_source);
        }
        if ($request->has('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $projects = $query->paginate(15);

        if ($request->wantsJson()) {
            return response()->json($projects);
        }

        $archivedProjects = $user->role === 'supervisor'
            ? Project::onlyTrashed()
                ->with('deletedByUser:id,name')
                ->latest('deleted_at')
                ->paginate(10, ['id', 'name', 'project_source', 'deleted_at', 'deleted_by', 'deletion_reason'])
            : null;

        return Inertia::render('Dashboard', compact('projects', 'archivedProjects'));
    }

    /** Show the project creation form. */
    public function create()
    {
        return Inertia::render('Project/Initiation/Register', [
            'systems' => System::where('is_active', true)->get(),
            'infrastructure' => InfrastructureComponent::where('is_active', true)->get(),
        ]);
    }

    public function workflow(Project $project)
    {
        $project->load([
            'activities', 'requirements.reviewer', 'documents.uploader', 'documents.reviewer', 'documents.replacesDocument', 'documents.replacement',
            'changeRequests.requester', 'changeRequests.approver', 'lessonsLearned.creator',
            'lessonsLearned.reviewer', 'attestations.attestor', 'requirementsTracker', 'supervisor', 'analyst',
        ]);

        $role = Auth::user()?->role;

        // Serialize with camelCase aliases expected by the React Workflow page.
        $data = $project->toArray();
        $data['change_requests'] = $data['change_requests'] ?? [];
        $data['changeRequests'] = $project->changeRequests;
        $data['lessons_learned'] = $data['lessons_learned'] ?? [];
        $data['lessonsLearned'] = $project->lessonsLearned;
        $data['requirements_tracker'] = $data['requirements_tracker'] ?? null;
        $data['requirementsTracker'] = $project->requirementsTracker;
        $data['overall_implementation'] = $project->getOverallImplementationPercentage();
        $data['missing_documents'] = $this->missingDocuments($project, $project->phase);

        // Role-based visibility flags consumed by the frontend.
        $isAssignedSupervisor = $project->supervisor_id === Auth::id();
        $isAssignedAnalyst = $project->assigned_analyst_id === Auth::id();
        $data['permissions'] = [
            'can_assign' => $role === 'admin' || ($role === 'supervisor' && $isAssignedSupervisor),
            'can_upload_initiation' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_replace_returned_documents' => ($role === 'supervisor' && $isAssignedSupervisor)
                || ($role === 'analyst' && $isAssignedAnalyst),
            'can_upload_other' => ($role === 'analyst' && $isAssignedAnalyst)
                || ($role === 'supervisor' && $isAssignedSupervisor),
            'can_review_documents' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_plan' => $role === 'analyst' && $isAssignedAnalyst,
            'can_review_plan' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_update_progress' => $role === 'analyst' && $isAssignedAnalyst,
            'can_review_requirements' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_change' => $role === 'analyst' && $isAssignedAnalyst,
            'can_decide_change' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_lesson' => $role === 'analyst' && $isAssignedAnalyst,
            'can_review_lesson' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_attest_manager' => $role === 'manager',
            'can_attest_dict' => $role === 'dict',
            'can_transition' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_close' => $role === 'supervisor' && $isAssignedSupervisor,
            'can_view_financials' => in_array($role, ['supervisor', 'manager', 'dict', 'admin'], true),
        ];

        $analysts = [];
        $supervisors = [];
        if (in_array($role, ['supervisor', 'admin'], true)) {
            $analysts = User::query()->where('role', 'analyst')->select('id', 'name', 'email')->orderBy('name')->get();
        }
        if ($role === 'admin') {
            $supervisors = User::query()->where('role', 'supervisor')->select('id', 'name', 'email')->orderBy('name')->get();
        }

        return Inertia::render('Project/Workflow', [
            'project' => $data,
            'analysts' => $analysts,
            'supervisors' => $supervisors,
        ]);
    }

    /**
     * Store a new project (Project Initiation)
     */
    public function store(ProjectRegistrationRequest $request)
    {
        $validated = $request->validated();

        $project = Project::create([
            ...$validated,
            'supervisor_id' => Auth::user()?->role === 'supervisor' ? Auth::id() : null,
            'status' => 'Not Started',
            'phase' => 'Initiation',
        ]);

        if ($request->header('X-Inertia')) {
            return redirect()->route('project.workflow', $project)->with('success', 'Project created successfully.');
        }

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project->load(['supervisor', 'analyst']),
        ], Response::HTTP_CREATED);
    }

    /**
     * Display project details
     */
    public function show(Project $project)
    {
        return response()->json($project->load([
            'supervisor', 'analyst', 'activities', 'requirements',
            'documents', 'changeRequests', 'lessonsLearned', 'attestations',
        ]));
    }

    /**
     * Show documents for current phase
     */
    public function showDocuments(Project $project)
    {
        $documents = $project->documents()->where('phase', $project->phase)->get();
        $missingDocuments = $this->missingDocuments($project, $project->phase);

        return response()->json([
            'project_id' => $project->id,
            'phase' => $project->phase,
            'documents' => $documents,
            'required_document_types' => $this->requiredDocuments($project->phase),
            'missing_documents' => $missingDocuments,
        ]);
    }

    /**
     * Upload document
     */
    public function uploadDocument(Request $request, Project $project)
    {
        $phase = $request->input('phase');
        $validated = $request->validate([
            'document_type' => ['required', Rule::in($this->requiredDocuments(is_string($phase) ? $phase : ''))],
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,csv,txt,rtf,odt,ods,ppt,pptx,jpg,jpeg,png,zip|max:10240',
            'phase' => 'required|in:Initiation,Planning,Execution,Closure',
        ]);

        abort_unless($project->phase === $validated['phase'], 422, 'Documents must be uploaded in the current project phase.');
        $role = $request->user()?->role;
        abort_unless(
            ($role === 'analyst' && $project->assigned_analyst_id === Auth::id())
                || ($role === 'supervisor' && $project->supervisor_id === Auth::id()),
            403,
            'Only the assigned analyst or project supervisor can upload documents.'
        );
        abort_unless(
            ! in_array($validated['phase'], ['Planning', 'Execution', 'Closure'], true) || $role === 'analyst',
            403,
            'Planning, Execution, and Closure documents must be uploaded by the assigned analyst.'
        );
        $isInitiation = $validated['phase'] === 'Initiation';
        abort_unless(
            ($isInitiation && $role === 'supervisor')
                || (! $isInitiation && in_array($role, ['analyst', 'supervisor'], true)),
            403,
            'Your role cannot upload documents for this phase.'
        );

        $filePath = $request->file('file')->store('documents/'.$project->id, 'private');

        $document = Document::create([
            'project_id' => $project->id,
            'phase' => $validated['phase'],
            'document_type' => $validated['document_type'],
            'file_path' => $filePath,
            'original_filename' => $request->file('file')->getClientOriginalName(),
            'uploaded_by' => Auth::id(),
            'status' => 'Pending Review',
            'is_required' => true,
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully',
            'document' => $document,
        ], Response::HTTP_CREATED);
    }

    /**
     * Review and approve/return document
     */
    public function reviewDocument(Request $request, Document $document)
    {
        $this->authorizeAssignedSupervisor($document->project);
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'reviewer_comments' => 'nullable|string',
        ]);

        $document->update([
            'status' => $validated['status'],
            'reviewer_comments' => $validated['reviewer_comments'] ?? null,
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Document reviewed successfully',
            'document' => $document,
        ]);
    }

    /**
     * Assign project to analyst
     */
    public function assignAnalyst(Request $request, Project $project)
    {
        if ($request->user()?->role === 'supervisor') {
            $this->authorizeAssignedSupervisor($project);
        }

        $validated = $request->validate([
            'assigned_analyst_id' => ['required', Rule::exists('users', 'id')->where('role', 'analyst')],
        ]);

        $project->update([
            'assigned_analyst_id' => $validated['assigned_analyst_id'],
            'status' => 'Ongoing',
        ]);

        return response()->json([
            'message' => 'Project assigned to analyst successfully',
            'project' => $project->load(['supervisor', 'analyst']),
        ]);
    }

    public function assignSupervisor(Request $request, Project $project)
    {
        $validated = $request->validate([
            'supervisor_id' => 'required|exists:users,id',
        ]);

        abort_unless(
            User::whereKey($validated['supervisor_id'])->where('role', 'supervisor')->exists(),
            422,
            'The selected user must have the supervisor role.',
        );

        $project->update([
            'supervisor_id' => $validated['supervisor_id'],
        ]);

        return response()->json([
            'message' => 'Project assigned to Supervisor successfully.',
            'project' => $project->load(['supervisor', 'analyst']),
        ]);
    }

    /**
     * Create Implementation Plan (Planning phase)
     */
    public function createImplementationPlan(Request $request, Project $project)
    {
        $validated = $request->validate([
            'activities' => 'required|array|min:1',
            'activities.*.activity_name' => 'required|string',
            'activities.*.expected_deliverable' => 'nullable|string',
            'activities.*.planned_start_date' => 'required|date',
            'activities.*.planned_end_date' => 'required|date|after:activities.*.planned_start_date',
            'activities.*.responsible_person' => 'nullable|string',
        ]);

        // Delete existing activities if updating
        if ($request->has('replace_existing')) {
            $project->activities()->delete();
        }

        foreach ($validated['activities'] as $activity) {
            ProjectActivity::create([
                'project_id' => $project->id,
                ...$activity,
                'status' => 'Not Started',
            ]);
        }

        $project->update([
            'implementation_plan_status' => 'Pending Review',
            'implementation_plan_review_comments' => null,
            'implementation_plan_reviewed_at' => null,
            'implementation_plan_reviewed_by' => null,
        ]);

        return response()->json([
            'message' => 'Implementation plan created successfully',
            'activities' => $project->activities,
        ], Response::HTTP_CREATED);
    }

    /** Approve or return the implementation plan after a supervisor review. */
    public function reviewImplementationPlan(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        abort_unless($project->phase === 'Planning', 422, 'The implementation plan can only be reviewed during the Planning phase.');

        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'comments' => 'nullable|string',
        ]);

        $project->update([
            'implementation_plan_status' => $validated['status'],
            'implementation_plan_review_comments' => $validated['comments'] ?? null,
            'implementation_plan_reviewed_at' => now(),
            'implementation_plan_reviewed_by' => Auth::id(),
        ]);

        return response()->json(['message' => 'Implementation plan reviewed.', 'project' => $project]);
    }

    /**
     * Update project activity
     */
    public function updateActivity(Request $request, ProjectActivity $activity)
    {
        $validated = $request->validate([
            'activity_name' => 'sometimes|string',
            'expected_deliverable' => 'sometimes|nullable|string',
            'planned_start_date' => 'sometimes|date',
            'planned_end_date' => 'sometimes|date',
            'actual_start_date' => 'sometimes|nullable|date',
            'actual_end_date' => 'sometimes|nullable|date',
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
     * Submit Requirements Traceability Matrix
     */
    public function submitRequirementsTracker(Request $request, Project $project)
    {
        $validated = $request->validate([
            'requirements' => 'sometimes|array',
            'requirements.*.requirement_description' => 'required|string',
            'requirements.*.planned_start_date' => 'required|date',
            'requirements.*.planned_end_date' => 'required|date|after:requirements.*.planned_start_date',
        ]);

        foreach ($validated['requirements'] ?? [] as $requirement) {
            RequirementComponent::create([
                'project_id' => $project->id,
                ...$requirement,
                'status' => 'Pending',
            ]);
        }

        if (! $project->requirements()->exists()) {
            return response()->json(['message' => 'Add at least one requirement before submitting the tracker.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->requirementsTracker()->updateOrCreate([], [
            'status' => 'Submitted',
            'submitted_by' => Auth::id(),
            'submitted_at' => now(),
        ]);

        return response()->json([
            'message' => 'Requirements tracker submitted for approval',
            'requirements' => $project->requirements,
        ], Response::HTTP_CREATED);
    }

    /**
     * Approve/Reject Requirements Traceability Matrix
     */
    public function approveRequirementsTracker(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'approval_comments' => 'nullable|string',
        ]);

        $tracker = $project->requirementsTracker;
        if (! $tracker) {
            return response()->json(['message' => 'The requirements tracker has not been submitted yet.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tracker->update([
            'status' => $validated['status'],
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'approval_comments' => $validated['approval_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Requirements tracker '.strtolower($validated['status']),
            'tracker' => $project->requirementsTracker,
        ]);
    }

    /**
     * Update requirement component status
     */
    public function updateRequirementComponent(Request $request, RequirementComponent $requirement)
    {
        $validated = $request->validate([
            'actual_start_date' => 'sometimes|nullable|date',
            'actual_end_date' => 'sometimes|nullable|date',
            'status' => 'sometimes|in:Pending,Ongoing,Completed',
            'test_score' => 'sometimes|nullable|in:Pass,Fail',
            'test_comments' => 'sometimes|nullable|string',
            'remarks' => 'sometimes|nullable|string',
        ]);

        $requirement->update($validated);

        // Auto-update status based on dates if provided
        if ($request->has('actual_start_date') || $request->has('actual_end_date')) {
            if (! $requirement->actual_start_date) {
                $requirement->status = 'Pending';
            } elseif ($requirement->actual_start_date && ! $requirement->actual_end_date) {
                $requirement->status = 'Ongoing';
            } elseif ($requirement->actual_start_date && $requirement->actual_end_date) {
                $requirement->status = 'Completed';
            }
            $requirement->save();
        }

        return response()->json([
            'message' => 'Requirement component updated successfully',
            'requirement' => $requirement,
        ]);
    }

    /**
     * Transition to Planning phase
     */
    public function transitionToPlanning(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        if ($project->phase !== 'Initiation') {
            return response()->json([
                'message' => 'Project must be in Initiation phase to transition to Planning.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $missingDocs = $this->missingDocuments($project, 'Initiation');

        if ($missingDocs) {
            return response()->json([
                'message' => 'All required Initiation phase documents must be approved before proceeding to Planning.',
                'missing_documents' => $missingDocs,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->update(['phase' => 'Planning']);

        return response()->json([
            'message' => 'Project transitioned to Planning phase successfully',
            'project' => $project,
        ]);
    }

    /**
     * Transition to Execution phase
     */
    public function transitionToExecution(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        if ($project->phase !== 'Planning') {
            return response()->json([
                'message' => 'Project must be in Planning phase to transition to Execution.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $missingDocs = $this->missingDocuments($project, 'Planning');

        if ($missingDocs) {
            return response()->json([
                'message' => 'All required Planning phase documents must be approved.',
                'missing_documents' => $missingDocs,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (! $project->activities()->exists()) {
            return response()->json([
                'message' => 'Implementation plan must be created before execution.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($project->implementation_plan_status !== 'Approved') {
            return response()->json([
                'message' => 'The implementation plan must be approved by the Analyst Supervisor before execution.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->update(['phase' => 'Execution']);

        return response()->json([
            'message' => 'Project transitioned to Execution phase successfully',
            'project' => $project,
        ]);
    }

    /**
     * Transition to Closure phase
     */
    public function transitionToClosure(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        if ($project->phase !== 'Execution') {
            return response()->json([
                'message' => 'Project must be in Execution phase to transition to Closure.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $incompleteActivities = $project->activities()
            ->where('status', '!=', 'Completed')
            ->count();

        if ($incompleteActivities > 0) {
            return response()->json([
                'message' => 'All planned activities must be marked as Completed.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $pendingRequirements = $project->requirements()
            ->whereIn('status', ['Pending', 'Ongoing'])
            ->count();

        if ($pendingRequirements > 0) {
            return response()->json([
                'message' => 'All requirements must be marked as Completed.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($project->requirements()->where('review_status', '!=', 'Approved')->exists()) {
            return response()->json([
                'message' => 'Every requirement component must be approved by the Analyst Supervisor before closure.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (! $project->requirements()->exists()) {
            return response()->json([
                'message' => 'At least one requirement must be submitted and completed before closure.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($project->requirements()->whereNull('test_score')->exists()) {
            return response()->json([
                'message' => 'UAT test scores are required for every requirement before closure.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $missingDocs = $this->missingDocuments($project, 'Execution');

        if ($missingDocs) {
            return response()->json([
                'message' => 'All required Execution phase documents must be approved.',
                'missing_documents' => $missingDocs,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->update(['phase' => 'Closure']);

        return response()->json([
            'message' => 'Project transitioned to Closure phase successfully',
            'project' => $project,
        ]);
    }

    /**
     * Submit Lessons Learned report
     */
    public function submitLessonsLearned(Request $request, Project $project)
    {
        $validated = $request->validate([
            'lessons' => 'required|array|min:1',
            'lessons.*.category' => 'required|string',
            'lessons.*.lesson_description' => 'required|string',
            'lessons.*.recommendations' => 'nullable|string',
        ]);

        foreach ($validated['lessons'] as $lesson) {
            $project->lessonsLearned()->create([
                ...$lesson,
                'created_by' => Auth::id(),
                'status' => 'Submitted',
            ]);
        }

        return response()->json([
            'message' => 'Lessons learned submitted for review',
            'lessons' => $project->lessonsLearned,
        ], Response::HTTP_CREATED);
    }

    /**
     * Close project
     */
    public function closeProject(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        if ($project->phase !== 'Closure') {
            return response()->json([
                'message' => 'Project must be in Closure phase to close.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $missingDocs = $this->missingDocuments($project, 'Closure');

        if ($missingDocs) {
            return response()->json([
                'message' => 'All required Closure phase documents must be approved.',
                'missing_documents' => $missingDocs,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($project->documents()->where('phase', 'Closure')->where('status', '!=', 'Approved')->exists()) {
            return response()->json([
                'message' => 'All submitted closure documents must be reviewed and approved before closure.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->update([
            'status' => 'Completed',
        ]);

        return response()->json([
            'message' => 'Project closed successfully',
            'project' => $project,
        ]);
    }

    /**
     * Get project progress and statistics
     */
    public function getProjectProgress(Project $project)
    {
        $overallPercentage = $project->getOverallImplementationPercentage();
        $completedActivities = $project->activities()->where('status', 'Completed')->count();
        $totalActivities = $project->activities()->count();
        $completedRequirements = $project->requirements()->where('status', 'Completed')->count();
        $totalRequirements = $project->requirements()->count();

        return response()->json([
            'overall_percentage' => $overallPercentage,
            'activities' => [
                'completed' => $completedActivities,
                'total' => $totalActivities,
            ],
            'requirements' => [
                'completed' => $completedRequirements,
                'total' => $totalRequirements,
            ],
            'phase' => $project->phase,
            'status' => $project->status,
        ]);
    }

    /**
     * Approve by Supervisor
     */
    public function approveBySupervisor(Request $request, Project $project)
    {
        $this->authorizeAssignedSupervisor($project);
        $project->update(['supervisor_approved' => true]);

        return response()->json([
            'message' => 'Project approved by supervisor',
            'project' => $project,
        ]);
    }

    /**
     * Attest by Manager
     */
    public function attestByManager(Request $request, Project $project)
    {
        $validated = $request->validate([
            'attestation_role' => 'required|in:SDMM,IDMM',
            'attestation_details' => 'nullable|string',
        ]);

        ProjectAttestation::create([
            'project_id' => $project->id,
            'attestor_role' => $validated['attestation_role'],
            'attested_by' => Auth::id(),
            'attestation_details' => $validated['attestation_details'] ?? null,
            'status' => 'Attested',
            'attested_at' => now(),
        ]);

        $project->update(['manager_attested' => true]);

        return response()->json([
            'message' => 'Project attested by manager',
            'project' => $project,
        ]);
    }

    /**
     * Attest by DICT
     */
    public function attestByDICT(Request $request, Project $project)
    {
        if (! $project->manager_attested) {
            return response()->json([
                'message' => 'A Manager (SDMM or IDMM) must attest before DICT.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($project->dict_attested) {
            return response()->json(['message' => 'DICT has already attested this project.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validate([
            'attestation_details' => 'nullable|string',
        ]);

        ProjectAttestation::create([
            'project_id' => $project->id,
            'attestor_role' => 'DICT',
            'attested_by' => Auth::id(),
            'attestation_details' => $validated['attestation_details'] ?? null,
            'status' => 'Attested',
            'attested_at' => now(),
        ]);

        $project->update(['dict_attested' => true]);

        return response()->json([
            'message' => 'Project attested by DICT',
            'project' => $project,
        ]);
    }

    /**
     * Get project reports
     */
    public function getProjectReport(Project $project)
    {
        return response()->json([
            'project' => $project,
            'activities' => $project->activities,
            'requirements' => $project->requirements,
            'documents' => $project->documents,
            'change_requests' => $project->changeRequests,
            'lessons_learned' => $project->lessonsLearned,
            'attestations' => $project->attestations,
        ]);
    }

    /**
     * Update project
     */
    public function update(Request $request, Project $project)
    {
        if ($project->phase !== 'Initiation') {
            return response()->json([
                'message' => 'Projects can only be edited during the Initiation phase.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'budget' => 'sometimes|nullable|numeric|min:0',
            'project_nature' => 'sometimes|in:Planned,Adhoc',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }

    /**
     * Delete project
     */
    public function destroy(Request $request, Project $project)
    {
        if ($project->phase !== 'Initiation') {
            $message = 'Projects can only be deleted during the Initiation phase.';

            return $request->header('X-Inertia')
                ? back()->withErrors(['project' => $message])
                : response()->json(['message' => $message], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validate([
            'reason' => 'required|string|min:10|max:1000',
        ]);

        DB::transaction(function () use ($project, $validated) {
            $project->deleted_by = Auth::id();
            $project->deletion_reason = $validated['reason'];
            $project->save();
            $project->delete();
        });

        if ($request->header('X-Inertia')) {
            return redirect()->route('dashboard')->with('success', 'Project archived with deletion responsibility recorded.');
        }

        return response()->json([
            'message' => 'Project archived successfully',
        ]);
    }
}