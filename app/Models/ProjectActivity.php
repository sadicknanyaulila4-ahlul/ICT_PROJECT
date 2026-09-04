<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'activity_name',
        'expected_deliverable',
        'planned_start_date',
        'planned_end_date',
        'actual_start_date',
        'actual_end_date',
        'responsible_person',
        'status',
        'remarks',
        'attachments',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Auto-update status based on dates
    public function updateStatusFromDates()
    {
        if (!$this->actual_start_date) {
            $this->status = 'Not Started';
        } elseif ($this->actual_start_date && !$this->actual_end_date) {
            $this->status = 'Ongoing';
        } elseif ($this->actual_start_date && $this->actual_end_date) {
            $this->status = 'Completed';
        }
        $this->save();
    }
}