<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'replaces_document_id',
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

    public function replacesDocument()
    {
        return $this->belongsTo(self::class, 'replaces_document_id');
    }

    public function replacement()
    {
        return $this->hasOne(self::class, 'replaces_document_id');
    }

    public function downloads(): HasMany
    {
        return $this->hasMany(DocumentDownload::class);
    }

    public function latestDownload(): HasOne
    {
        return $this->hasOne(DocumentDownload::class)->latestOfMany('downloaded_at');
    }
}