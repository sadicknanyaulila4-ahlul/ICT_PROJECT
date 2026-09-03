<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory;

    protected $table = 'systems';

    protected $fillable = [
        'name',
        'description',
        'system_type',
        'owner',
        'go_live_date',
        'is_active',
    ];

    protected $casts = [
        'go_live_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'existing_system_id');
    }
}
