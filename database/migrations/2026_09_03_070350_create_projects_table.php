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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->enum('project_source', ['System Development', 'Infrastructure Development']);
            $table->enum('project_nature', ['Planned', 'Adhoc']);
            $table->enum('project_activity', ['New Implementation (Major)', 'New Implementation (Minor)', 'Change Request', 'Additional Requirements', 'Review/Enhancement', 'Integration']);
            $table->unsignedBigInteger('existing_system_id')->nullable();
            $table->unsignedBigInteger('existing_infrastructure_id')->nullable();
            $table->string('custom_system_name')->nullable();
            $table->string('custom_infrastructure_name')->nullable();
            $table->unsignedBigInteger('supervisor_id')->nullable();
            $table->unsignedBigInteger('assigned_analyst_id')->nullable();
            $table->enum('status', ['Not Started', 'Ongoing', 'Completed', 'On Hold'])->default('Not Started');
            $table->enum('phase', ['Initiation', 'Planning', 'Execution', 'Closure'])->default('Initiation');
            $table->boolean('is_approved')->default(false);
            $table->boolean('supervisor_approved')->default(false);
            $table->boolean('manager_attested')->default(false);
            $table->boolean('dict_attested')->default(false);
            $table->timestamps();
            $table->foreign('supervisor_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('assigned_analyst_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
