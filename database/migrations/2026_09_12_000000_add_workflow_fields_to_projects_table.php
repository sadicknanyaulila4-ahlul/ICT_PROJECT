<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->enum('implementation_team_type', ['Internal', 'External'])->nullable()->after('budget');
            $table->text('implementation_team_names')->nullable()->after('implementation_team_type');
            $table->string('implementation_plan_status')->default('Draft')->after('phase');
            $table->text('implementation_plan_review_comments')->nullable()->after('implementation_plan_status');
            $table->timestamp('implementation_plan_reviewed_at')->nullable()->after('implementation_plan_review_comments');
            $table->unsignedBigInteger('implementation_plan_reviewed_by')->nullable()->after('implementation_plan_reviewed_at');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'implementation_team_type', 'implementation_team_names', 'implementation_plan_status',
                'implementation_plan_review_comments', 'implementation_plan_reviewed_at',
                'implementation_plan_reviewed_by',
            ]);
        });
    }
};
