<?php

namespace Tests\Feature;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserNotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_send_a_notification_to_a_selected_user(): void
    {
        $sender = User::factory()->create(['role' => 'analyst']);
        $recipient = User::factory()->create(['role' => 'supervisor']);

        $this->actingAs($sender)
            ->get('/notifications')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Notifications')
                ->where('users.0.id', $recipient->id)
                ->has('users', 1)
            );

        $this->actingAs($sender)
            ->postJson('/notifications', [
                'recipient_id' => $recipient->id,
                'title' => 'Please review the project',
                'message' => 'The project documents are ready for your review.',
            ])
            ->assertCreated()
            ->assertJsonPath('notification.type', 'User Message')
            ->assertJsonPath('notification.sender_id', $sender->id);

        $this->assertDatabaseHas('notifications', [
            'project_id' => null,
            'user_id' => $recipient->id,
            'sender_id' => $sender->id,
            'title' => 'Please review the project',
            'type' => 'User Message',
            'status' => 'Unread',
        ]);

        $this->actingAs($recipient)
            ->getJson('/notifications/data')
            ->assertOk()
            ->assertJsonPath('notifications.data.0.sender.name', $sender->name);
    }

    public function test_users_cannot_send_a_notification_to_themselves(): void
    {
        $user = User::factory()->create(['role' => 'analyst']);

        $this->actingAs($user)
            ->postJson('/notifications', [
                'recipient_id' => $user->id,
                'title' => 'Self notification',
                'message' => 'This should not be delivered.',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('recipient_id');

        $this->assertDatabaseCount('notifications', 0);
    }
}
