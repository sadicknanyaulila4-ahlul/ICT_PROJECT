<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use App\Models\ProjectActivity;
use App\Models\RequirementComponent;
use App\Models\ProjectAttestation;
use App\Models\System;
use App\Models\InfrastructureComponent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function requiredDocuments(string $phase): array
    {
        return match ($phase) {
            'Initiation' => ['Approved Concept Note', 'e-Government Authority Letter'],
            'Planning' => ['Project Proposal', 'Project Charter', 'BRD', 'SRS', 'SDD', 'Risk Management Plan', 'Change Management Plan', 'QA Management Plan', 'Procurement Management Plan'],
            'Execution' => ['FAT Report', 'UAT Report', 'Stakeholder Form', 'Installation Plan'],
            'Closure' => ['System Implementation Form', 'User Manual', 'Data Migration Report', 'Integration Report', 'Training Report', 'Final Report', 'Post Go-Live Tracker', 'Updated SRS Document', 'Updated SDD Document'],
            default => [],
        };
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
        $query = Project::with(['supervisor', 'analyst', 'activities', 'requirements', 'documents']);

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
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $projects = $query->paginate(15);

        if ($request->wantsJson()) {
            return response()->json($projects);
        }

        return Inertia::render('Dashboard', compact('projects'));
    }

    /** Show the project creation form. */
    public function create()
    {
        return Inertia::render('Project/initiation/Register', [
            'systems' => System::where('is_active', true)->get(),
            'infrastructure' => InfrastructureComponent::where('is_active', true)->get(),
        ]);
    }

    public function workflow(Project $project)
    {
        $project->load([
            'activities', 'requirements.reviewer', 'documents.uploader', 'documents.reviewer',
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

        // Role-based visibility flags consumed by the frontend.
        $data['permissions'] = [
            'can_assign' => in_array($role, ['supervisor'], true),
            'can_upload_initiation' => $role === 'supervisor',
            'can_upload_other' => in_array($role, ['analyst', 'supervisor'], true),
            'can_review_documents' => $role === 'supervisor',
            'can_plan' => $role === 'analyst',
            'can_review_plan' => $role === 'supervisor',
            'can_update_progress' => $role === 'analyst',
            'can_review_requirements' => $role === 'supervisor',
            'can_change' => $role === 'analyst',
            'can_decide_change' => $role === 'supervisor',
            'can_lesson' => $role === 'analyst',
            'can_review_lesson' => $role === 'supervisor',
            'can_attest_manager' => $role === 'manager',
            'can_attest_dict' => $role === 'dict',
            'can_transition' => $role === 'supervisor',
            'can_close' => $role === 'supervisor',
            'can_view_financials' => in_array($role, ['supervisor', 'manager', 'dict', 'admin'], true),
        ];

        $analysts = [];
        if (in_array($role, ['supervisor', 'admin'], true)) {
            $analysts = User::query()->where('role', 'analyst')->select('id', 'name', 'email')->orderBy('name')->get();
        }

        return Inertia::render('Project/Workflow', [
            'project' => $data,
            'analysts' => $analysts,
        ]);
    }

    /**
     * Store a new project (Project Initiation)
     */
    public function store(Request $request)
    {
        // Badilisha empty-string kuwa null ili nullable validation ifanye kazi
        $request->merge([
            'budget' => $request->input('budget') === '' || $request->input('budget') === null ? null : $request->input('budget'),
            'description' => $request->input('description') === '' ? null : $request->input('description'),
            'existing_system_id' => $request->input('existing_system_id') === '' || $request->input('existing_system_id') === null ? null : $request->input('existing_system_id'),
            'existing_infrastructure_id' => $request->input('existing_infrastructure_id') === '' || $request->input('existing_infrastructure_id') === null ? null : $request->input('existing_infrastructure_id'),
            'custom_system_name' => $request->input('custom_system_name') === '' ? null : $request->input('custom_system_name'),
            'custom_infrastructure_name' => $request->input('custom_infrastructure_name') === '' ? null : $request->input('custom_infrastructure_name'),
            'implementation_team_names' => $request->input('implementation_team_names') === '' ? null : $request->input('implementation_team_names'),
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'implementation_team_type' => 'required|in:Internal,External',
            'implementation_team_names' => 'required|string',
            'project_source' => 'required|in:System Development,Infrastructure Development',
            'project_nature' => 'required|in:Planned,Adhoc',
            'project_activity' => 'required|in:New Implementation (Major),New Implementation (Minor),Change Request,Additional Requirements,Review/Enhancement,Integration',
            'existing_system_id' => 'nullable|numeric',
            'existing_infrastructure_id' => 'nullable|numeric',
            'custom_system_name' => 'nullable|string',
            'custom_infrastructure_name' => 'nullable|string',
        ]);

        $usesExistingComponent = in_array($validated['project_activity'], ['Change Request', 'Additional Requirements', 'Review/Enhancement'], true);
        if ($validated['project_source'] === 'System Development') {
            $request->validate($usesExistingComponent
                ? ['existing_system_id' => 'required|exists:systems,id']
                : ['custom_system_name' => 'required|string|max:255']);
        }
        if ($validated['project_source'] === 'Infrastructure Development') {
            $request->validate($usesExistingComponent
                ? ['existing_infrastructure_id' => 'required|exists:infrastructure_components,id']
                : ['custom_infrastructure_name' => 'required|string|max:255']);
        }

        $project = Project::create([
            ...$validated,
            'supervisor_id' => Auth::id(),
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
            'documents', 'changeRequests', 'lessonsLearned', 'attestations'
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
        $validated = $request->validate([
            'document_type' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,csv,txt,rtf,odt,ods,ppt,pptx,jpg,jpeg,png,zip|max:10240',
            'phase' => 'required|in:Initiation,Planning,Execution,Closure',
        ]);

        $filePath = $request->file('file')->store('documents/' . $project->id, 'private');

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
        $validated = $request->validate([
            'assigned_analyst_id' => 'required|exists:users,id',
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

        if (!$project->requirements()->exists()) {
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
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'approval_comments' => 'nullable|string',
        ]);

        $tracker = $project->requirementsTracker;
        if (!$tracker) {
            return response()->json(['message' => 'The requirements tracker has not been submitted yet.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $tracker->update([
            'status' => $validated['status'],
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'approval_comments' => $validated['approval_comments'] ?? null,
        ]);

        return response()->json([
            'message' => 'Requirements tracker ' . strtolower($validated['status']),
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
            'message' => 'Requirement component updated successfully',
            'requirement' => $requirement,
        ]);
    }

    /**
     * Transition to Planning phase
     */
    public function transitionToPlanning(Request $request, Project $project)
    {
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

        if (!$project->activities()->exists()) {
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

        if (!$project->requirements()->exists()) {
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
        if (!$project->manager_attested) {
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
    public function destroy(Project $project)
    {
        if ($project->phase !== 'Initiation') {
            return response()->json([
                'message' => 'Projects can only be deleted during the Initiation phase.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }
}
