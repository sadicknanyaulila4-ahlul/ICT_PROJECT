<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get all notifications for authenticated user
     */
    public function index(Request $request)
    {
        $userId = $request->user()?->id;
        $query = Notification::where('user_id', $userId);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $notifications = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => Notification::where('user_id', $userId)
                ->where('status', 'Unread')
                ->count(),
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Request $request, Notification $notification)
    {
        // Check if notification belongs to authenticated user
        if ($notification->user_id !== $request->user()?->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $notification->markAsRead();

        return response()->json([
            'message' => 'Notification marked as read',
            'notification' => $notification,
        ]);
    }
}
