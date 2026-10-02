<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DocumentDownload;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DocumentController extends Controller
{
    private function requiredDocuments(string $phase): array
    {
        return config("project.required_documents.{$phase}", []);
    }

    public function library(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'nullable|integer|exists:projects,id',
            'search' => 'nullable|string|max:255',
        ]);

        $selectedProject = isset($validated['project_id'])
            ? Project::query()->findOrFail($validated['project_id'])
            : null;
        $requiredDocuments = $selectedProject
            ? config("project.required_documents.{$selectedProject->phase}", [])
            : [];
        $documentStatus = [];

        if ($selectedProject) {
            foreach ($selectedProject->documents()->where('phase', $selectedProject->phase)->get(['document_type', 'status']) as $document) {
                if (! isset($documentStatus[$document->document_type]) || $document->status === 'Approved') {
                    $documentStatus[$document->document_type] = $document->status;
                }
            }
        }

        $projects = Project::query()
            ->orderBy('name')
            ->get(['id', 'name', 'phase']);

        $documentsQuery = Document::query()
            ->with(['project:id,name,phase', 'uploader:id,name', 'latestDownload.user:id,name'])
            ->withCount('downloads')
            ->when($selectedProject, fn ($query) => $query->where('project_id', $selectedProject->id))
            ->when($validated['search'] ?? null, function ($query, $term) {
                $query->where(function ($documents) use ($term) {
                    $documents->where('document_type', 'like', "%{$term}%")
                        ->orWhere('original_filename', 'like', "%{$term}%")
                        ->orWhereHas('project', fn ($project) => $project->where('name', 'like', "%{$term}%"));
                });
            })
            ->latest();

        return Inertia::render('Project/Modules', [
            'module' => 'documents',
            'projects' => $projects,
            'selectedProject' => $selectedProject,
            'requiredDocuments' => $requiredDocuments,
            'documentStatus' => $documentStatus,
            'documents' => $documentsQuery->paginate(20)->withQueryString(),
            'filters' => [
                'project_id' => $selectedProject?->id,
                'search' => $validated['search'] ?? '',
            ],
        ]);
    }

    /**
     * Upload a new document (web alias used by routes/web.php).
     */
    public function upload(Request $request, Project $project)
    {
        $request->merge(['project_id' => $project->id]);

        return $this->store($request);
    }

    public function storeForProject(Request $request, Project $project)
    {
        $request->merge(['project_id' => $project->id]);

        return $this->store($request);
    }

    /**
     * Get all documents for a project
     */
    public function index(Project $project, Request $request)
    {
        $query = $project->documents();

        if ($request->has('phase')) {
            $query->where('phase', $request->phase);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $term = $request->string('search')->toString();
            $query->where(function ($documents) use ($term) {
                $documents->where('document_type', 'like', "%{$term}%")
                    ->orWhere('original_filename', 'like', "%{$term}%")
                    ->orWhere('reviewer_comments', 'like', "%{$term}%");
            });
        }

        return response()->json([
            'documents' => $query->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Upload a new document
     */
    public function store(Request $request)
    {
        $phase = $request->input('phase');
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'document_type' => ['required', Rule::in($this->requiredDocuments(is_string($phase) ? $phase : ''))],
            'phase' => 'required|in:Initiation,Planning,Execution,Closure',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,csv,txt,rtf,odt,ods,ppt,pptx,jpg,jpeg,png,zip|max:10240',
            'is_required' => 'sometimes|boolean',
            'replaces_document_id' => 'nullable|integer|exists:documents,id',
        ]);

        $project = Project::findOrFail($validated['project_id']);

        abort_unless($project->phase === $validated['phase'], 422, 'Documents must be uploaded in the current project phase.');

        $role = $request->user()->role;
        abort_unless(
            ($role !== 'analyst' || $project->assigned_analyst_id === Auth::id())
                && ($role !== 'supervisor' || $project->supervisor_id === Auth::id()),
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
                || (!$isInitiation && in_array($role, ['analyst', 'supervisor'], true))
                || ($role === 'analyst' && isset($validated['replaces_document_id'])),
            403,
            'Your role cannot upload documents for this phase.'
        );

        $replacedDocument = null;
        if (isset($validated['replaces_document_id'])) {
            $replacedDocument = Document::query()->findOrFail($validated['replaces_document_id']);
            abort_unless(
                $replacedDocument->project_id === $project->id
                    && $replacedDocument->phase === $validated['phase']
                    && $replacedDocument->document_type === $validated['document_type']
                    && $replacedDocument->status === 'Returned',
                422,
                'Only a returned document of the same type and phase can be replaced.'
            );
            abort_unless(
                (! in_array($validated['phase'], ['Planning', 'Execution', 'Closure'], true) && $role === 'supervisor')
                    || ($role === 'analyst' && $project->assigned_analyst_id === Auth::id()),
                403,
                'Only the assigned analyst can replace returned Planning, Execution, or Closure documents.'
            );
        } elseif ($role === 'analyst' && $isInitiation) {
            abort(403, 'Analysts can only upload an initiation document as a replacement after supervisor feedback.');
        }

        $filePath = $request->file('file')->store('documents/' . $project->id, 'private');

        $document = Document::create([
            'project_id' => $validated['project_id'],
            'phase' => $validated['phase'],
            'document_type' => $validated['document_type'],
            'file_path' => $filePath,
            'original_filename' => $request->file('file')->getClientOriginalName(),
            'uploaded_by' => Auth::id(),
            'status' => 'Pending Review',
            'is_required' => $validated['is_required'] ?? false,
            'replaces_document_id' => $replacedDocument?->id,
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully',
            'document' => $document,
        ], Response::HTTP_CREATED);
    }

    /**
     * Get a single document
     */
    public function show(Document $document)
    {
        return response()->json($document->load(['uploader', 'reviewer']));
    }

    /**
     * Review document (approve or return)
     */
    public function review(Request $request, Document $document)
    {
        $this->authorizeAssignedSupervisor($document->project);
        $validated = $request->validate([
            'status' => 'required|in:Approved,Returned',
            'reviewer_comments' => 'nullable|string|required_if:status,Returned',
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
     * Download document
     */
    public function download(Document $document)
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('private');
        abort_unless($disk->exists($document->file_path), 404, 'The document file could not be found.');

        DocumentDownload::create([
            'document_id' => $document->id,
            'user_id' => Auth::id(),
            'downloaded_at' => now(),
        ]);

        return $disk->download(
            $document->file_path,
            $document->original_filename
        );
    }

    /**
     * Delete document
     */
    public function destroy(Document $document)
    {
        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('private');
        $disk->delete($document->file_path);
        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully',
        ]);
    }

    /**
     * Get required documents by phase
     */
    public function getRequiredDocuments(Project $project, $phase)
    {
        $requiredDocs = $project->documents()
            ->where('phase', $phase)
            ->where('is_required', true)
            ->get();

        return response()->json([
            'phase' => $phase,
            'required_documents' => $requiredDocs,
            'completed_count' => $requiredDocs->where('status', 'Approved')->count(),
            'total_count' => $requiredDocs->count(),
        ]);
    }
}
