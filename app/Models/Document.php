<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'phase',
        'document_type',
        'file_path',
        'original_filename',
        'uploaded_by',
        'status',
        'reviewer_comments',
        'reviewed_at',
        'reviewed_by',
        'is_required',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
        'is_required' => 'boolean',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}