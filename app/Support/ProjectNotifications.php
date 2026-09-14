<?php

namespace App\Support;

use App\Models\Project;
use App\Models\User;

class ProjectNotifications
{
    public static function notifyUser(?int $userId, ?int $projectId, string $title, string $message, string $type = 'general', ?string $actionUrl = null): void
    {
        if (! $userId) {
            return;
        }

        \App\Models\Notification::create([
            'project_id' => $projectId,
            'user_id' => $userId,
            'title' => $title,
            'message' => $message,
            'type' => $type,
            'status' => 'Unread',
            'action_url' => $actionUrl,
        ]);
    }

    public static function team(Project $project): array
    {
        return array_values(array_unique(array_filter([
            $project->assigned_analyst_id,
            $project->supervisor_id,
        ])));
    }

    public static function notifyTeam(Project $project, string $title, string $message, string $type = 'general', ?string $actionUrl = null): void
    {
        foreach (self::team($project) as $userId) {
            self::notifyUser($userId, $project->id, $title, $message, $type, $actionUrl ?? "/projects/{$project->id}/workflow");
        }
    }

    public static function notifyRole(string $role, ?int $projectId, string $title, string $message, string $type = 'general', ?string $actionUrl = null): void
    {
        $ids = User::where('role', $role)->pluck('id');
        foreach ($ids as $userId) {
            self::notifyUser($userId, $projectId, $title, $message, $type, $actionUrl);
        }
    }
}
