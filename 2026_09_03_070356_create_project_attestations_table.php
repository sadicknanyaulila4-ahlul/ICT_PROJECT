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
        Schema::create('project_attestations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->enum('attestor_role', ['SDMM', 'IDMM', 'DICT']);
            $table->unsignedBigInteger('attested_by');
            $table->text('attestation_details')->nullable();
            $table->enum('status', ['Pending', 'Attested'])->default('Pending');
            $table->timestamp('attested_at')->nullable();
            $table->text('attestation_comments')->nullable();
            $table->timestamps();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('attested_by')->references('id')->on('users')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_attestations');
    }
};
