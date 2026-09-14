<?php

namespace App\Console\Commands;

use App\Models\Notification;
use App\Models\ProjectActivity;
use Illuminate\Console\Command;

class SendProjectDeadlineAlerts extends Command
{
    protected $signature = 'projects:send-deadline-alerts';

    protected $description = 'Create one-week, one-day, and overdue planned-activity alerts.';

    public function handle(): int
    {
        $today = now()->startOfDay();
        $activities = ProjectActivity::with('project')->whereIn('planned_start_date', [
            $today->copy()->addWeek()->toDateString(),
            $today->copy()->addDay()->toDateString(),
            $today->copy()->subDay()->toDateString(),
            $today->copy()->subDays(3)->toDateString(),
        ])->get();

        foreach ($activities as $activity) {
            $days = (int) $today->diffInDays($activity->planned_start_date, false);
            $type = $days < 0 ? 'Overdue Alert' : 'Deadline Alert';
            $when = match (true) {
                $days === 7 => 'starts in one week',
                $days === 1 => 'starts tomorrow',
                $days === -1 => 'was due to start yesterday',
                $days === -3 => 'was due to start three days ago',
                $days > 1 => "starts in {$days} days",
                $days === 0 => 'starts today',
                default => 'is overdue',
            };
            foreach (array_filter([$activity->project->assigned_analyst_id, $activity->project->supervisor_id]) as $userId) {
                Notification::firstOrCreate([
                    'project_id' => $activity->project_id,
                    'user_id' => $userId,
                    'title' => "Activity alert: {$activity->activity_name}",
                    'message' => "{$activity->activity_name} {$when}.",
                    'type' => $type,
                ], ['action_url' => "/projects/{$activity->project_id}/activities"]);
            }
        }

        $this->info('Deadline alerts processed.');

        return self::SUCCESS;
    }
}
