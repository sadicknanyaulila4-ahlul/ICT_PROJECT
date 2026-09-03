<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfrastructureComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'component_type',
        'location',
        'owner',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'existing_infrastructure_id');
    }
}
