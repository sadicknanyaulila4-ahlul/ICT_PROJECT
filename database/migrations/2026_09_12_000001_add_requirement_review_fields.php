<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('requirement_components', function (Blueprint $table) {
            $table->string('review_status')->default('Pending Review')->after('status');
            $table->text('review_comments')->nullable()->after('review_status');
            $table->unsignedBigInteger('reviewed_by')->nullable()->after('review_comments');
            $table->timestamp('reviewed_at')->nullable()->after('reviewed_by');
        });
    }

    public function down(): void
    {
        Schema::table('requirement_components', function (Blueprint $table) {
            $table->dropColumn(['review_status', 'review_comments', 'reviewed_by', 'reviewed_at']);
        });
    }
};
