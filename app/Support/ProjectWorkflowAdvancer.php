<?php

namespace App\Support;

use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectWorkflowAdvancer
{
    public static function advanceIfReady(Project $project): bool
    {
        return DB::transaction(function () use ($project): bool {
            $project = Project::query()->lockForUpdate()->findOrFail($project->id);
            $nextPhase = match ($project->phase) {
                'Initiation' => self::initiationReady($project) ? 'Planning' : null,
                'Planning' => self::planningReady($project) ? 'Execution' : null,
                'Execution' => self::executionReady($project) ? 'Closure' : null,
                'Closure' => self::closureReady($project) ? 'Completed' : null,
                default => null,
            };

            if ($nextPhase === null) {
                return false;
            }

            if ($nextPhase === 'Completed') {
                $project->update(['status' => 'Completed']);
                $title = 'Project completed';
                $message = "Project {$project->name} has completed all required workflow steps.";
            } else {
                $project->update(['phase' => $nextPhase]);
                $title = "Project moved to {$nextPhase}";
                $message = "Project {$project->name} advanced automatically to the {$nextPhase} phase.";
            }

            ProjectNotifications::notifyTeam(
                $project,
                $title,
                $message,
                'Status Update',
                "/projects/{$project->id}/workflow",
            );

            return true;
        });
    }

    private static function phaseDocumentsApproved(Project $project, string $phase): bool
    {
        $requiredDocuments = config("project.required_documents.{$phase}", []);
        $approvedDocuments = $project->documents()
            ->where('phase', $phase)
            ->where('status', 'Approved')
            ->pluck('document_type')
            ->all();

        return $requiredDocuments !== []
            && array_diff($requiredDocuments, $approvedDocuments) === [];
    }

    private static function initiationReady(Project $project): bool
    {
        return self::phaseDocumentsApproved($project, 'Initiation');
    }

    private static function planningReady(Project $project): bool
    {
        return self::phaseDocumentsApproved($project, 'Planning')
            && $project->activities()->exists()
            && $project->implementation_plan_status === 'Approved';
    }

    private static function executionReady(Project $project): bool
    {
        return self::phaseDocumentsApproved($project, 'Execution')
            && ! $project->activities()->where('status', '!=', 'Completed')->exists()
            && $project->requirements()->exists()
            && ! $project->requirements()->where('status', '!=', 'Completed')->exists()
            && ! $project->requirements()->where(function ($query) {
                $query->whereNull('review_status')
                    ->orWhere('review_status', '!=', 'Approved');
            })->exists()
            && ! $project->requirements()->whereNull('test_score')->exists();
    }

    private static function closureReady(Project $project): bool
    {
        return self::phaseDocumentsApproved($project, 'Closure')
            && ! $project->documents()
                ->where('phase', 'Closure')
                ->where('status', '!=', 'Approved')
                ->exists();
    }
}
