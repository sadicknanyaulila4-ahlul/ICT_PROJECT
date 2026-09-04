<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Project Tracker</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #1f2937; }
        h1 { color: #0f766e; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
        th { background: #e2e8f0; }
    </style>
</head>
<body>
    <h1>{{ $project->name }}: Project Tracker</h1>
    <table>
        <thead>
            <tr>
                <th>Activity</th>
                <th>Deliverable</th>
                <th>Planned start</th>
                <th>Planned end</th>
                <th>Status</th>
                <th>Responsible</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($activities as $activity)
                <tr>
                    <td>{{ $activity->activity_name }}</td>
                    <td>{{ $activity->expected_deliverable }}</td>
                    <td>{{ $activity->planned_start_date }}</td>
                    <td>{{ $activity->planned_end_date }}</td>
                    <td>{{ $activity->status }}</td>
                    <td>{{ $activity->responsible_person }}</td>
                </tr>
            @empty
                <tr><td colspan="6">No activities found.</td></tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
