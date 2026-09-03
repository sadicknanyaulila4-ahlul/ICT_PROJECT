<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequirementComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'requirement_description',
        'planned_start_date',
        'planned_end_date',
        'actual_start_date',
        'actual_end_date',
        'status',
        'test_score',
        'test_comments',
        'remarks',
        'overall_percentage',
    ];

    protected $casts = [
        'overall_percentage' => 'decimal:2',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Calculate status percentage based on dates
    public function getStatusPercentage()
    {
        if ($this->status === 'Pending') {
            return 0;
        } elseif ($this->status === 'Ongoing') {
            return 50;
        } elseif ($this->status === 'Completed') {
            return 100;
        }
        return 0;
    }
}