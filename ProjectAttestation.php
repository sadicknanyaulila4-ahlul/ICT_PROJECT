<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectAttestation extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'attestor_role',
        'attested_by',
        'attestation_details',
        'status',
        'attested_at',
        'attestation_comments',
    ];

    protected $casts = [
        'attested_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function attestor()
    {
        return $this->belongsTo(User::class, 'attested_by');
    }
}
