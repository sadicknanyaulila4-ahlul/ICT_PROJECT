<?php
namespace App\Http\Controllers;

use App\Models\Project;
use Barryvdh\DomPDF\Facade\Pdf;

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
}