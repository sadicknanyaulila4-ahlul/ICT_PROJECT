<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('requirement_components', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->text('requirement_description');
            $table->date('planned_start_date');
            $table->date('planned_end_date');
            $table->date('actual_start_date')->nullable();
            $table->date('actual_end_date')->nullable();
            $table->enum('status', ['Pending', 'Ongoing', 'Completed'])->default('Pending');
            $table->enum('test_score', ['Pass', 'Fail'])->nullable();
            $table->text('test_comments')->nullable();
            $table->text('remarks')->nullable();
            $table->decimal('overall_percentage', 5, 2)->default(0);
            $table->timestamps();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requirement_components');
    }
};
