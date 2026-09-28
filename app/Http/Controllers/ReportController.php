<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class ReportController extends Controller
{
    public function exportTrackerExcel(Project $project)
    {
        return response()->streamDownload(function () use ($project) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Activity', 'Deliverable', 'Planned Start', 'Planned End', 'Status', 'Responsible']);

            foreach ($project->activities as $activity) {
                fputcsv($output, [
                    $activity->activity_name,
                    $activity->expected_deliverable,
                    $activity->planned_start_date,
                    $activity->planned_end_date,
                    $activity->status,
                    $activity->responsible_person,
                ]);
            }

            fclose($output);
        }, 'project_tracker.csv', ['Content-Type' => 'text/csv']);
    }

    public function exportTrackerPdf(Project $project)
    {
        $activities = $project->activities;
        $pdf = Pdf::loadView('pdf.tracker', ['project' => $project, 'activities' => $activities]);
        return $pdf->download('project_tracker.pdf');
    }

    public function exportProjectData(Project $project)
    {
        $project->load([
            'activities',
            'requirements',
            'documents',
            'changeRequests',
            'lessonsLearned',
            'attestations',
        ]);
        $filename = (Str::slug($project->name) ?: "project-{$project->id}").'-project-data.json';
        $data = [
            'project' => $project,
            'activities' => $project->activities,
            'requirements' => $project->requirements,
            'documents' => $project->documents,
            'change_requests' => $project->changeRequests,
            'lessons_learned' => $project->lessonsLearned,
            'attestations' => $project->attestations,
        ];

        return response()->streamDownload(
            fn () => print json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR),
            $filename,
            ['Content-Type' => 'application/json; charset=UTF-8'],
        );
    }

    public function exportLessonsLearned(Project $project)
    {
        $lessons = $project->lessonsLearned()->where('status', 'Approved')->get();
        $data = [
            'project' => $project->name,
            'total_lessons' => $lessons->count(),
            'by_category' => $lessons->groupBy('category')->map->count(),
            'lessons' => $lessons,
        ];
        $filename = (Str::slug($project->name) ?: "project-{$project->id}").'-lessons-learned.json';

        return response()->streamDownload(
            fn () => print json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR),
            $filename,
            ['Content-Type' => 'application/json; charset=UTF-8'],
        );
    }
}