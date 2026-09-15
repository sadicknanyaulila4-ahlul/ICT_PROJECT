<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'category',
        'priority',
        'subject',
        'message',
        'status',
        'admin_reply',
        'replied_by',
        'replied_at',
        'is_need_help',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
        'is_need_help' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replier()
    {
        return $this->belongsTo(User::class, 'replied_by');
    }
}
