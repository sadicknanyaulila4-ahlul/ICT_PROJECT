<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreignId('sender_id')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            $table->unsignedBigInteger('project_id')->nullable()->change();
            $table->string('type')->change();
        });
    }

    public function down(): void
    {
        DB::table('notifications')->where('type', 'User Message')->delete();

        Schema::table('notifications', function (Blueprint $table) {
            $table->dropConstrainedForeignId('sender_id');
            $table->unsignedBigInteger('project_id')->nullable(false)->change();
            $table->enum('type', [
                'Activity Reminder',
                'Document Required',
                'Approval Needed',
                'Status Update',
                'Deadline Alert',
                'Overdue Alert',
            ])->change();
        });
    }
};
