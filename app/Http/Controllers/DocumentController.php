<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
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
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'document_type' => 'required|string|max:255',
            'phase' => 'required|in:Initiation,Planning,Execution,Closure',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,csv,txt,rtf,odt,ods,ppt,pptx,jpg,jpeg,png,zip|max:10240',
            'is_required' => 'sometimes|boolean',
        ]);

        $project = Project::find($validated['project_id']);

        abort_unless($project->phase === $validated['phase'], 422, 'Documents must be uploaded in the current project phase.');

        $role = Auth::user()->role;
        $isInitiation = $validated['phase'] === 'Initiation';
        abort_unless(
            ($isInitiation && $role === 'supervisor') || (!$isInitiation && in_array($role, ['analyst', 'supervisor'], true)),
            403,
            'Your role cannot upload documents for this phase.'
        );

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
