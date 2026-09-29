<?php

namespace App\Http\Controllers;

use App\Models\Project;

abstract class Controller
{
    protected function authorizeAssignedSupervisor(Project $project): void
    {
        abort_unless(
            $project->supervisor_id === request()->user()?->id,
            403,
            'Only the assigned supervisor can perform this action.'
        );
    }
}
