<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            if (! Schema::hasColumn('projects', 'implementation_team_type')) {
                $table->string('implementation_team_type')->default('Internal')->after('budget');
            }
            if (! Schema::hasColumn('projects', 'implementation_team_names')) {
                $table->text('implementation_team_names')->nullable()->after('implementation_team_type');
            }
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            if (Schema::hasColumn('projects', 'implementation_team_names')) {
                $table->dropColumn('implementation_team_names');
            }
            if (Schema::hasColumn('projects', 'implementation_team_type')) {
                $table->dropColumn('implementation_team_type');
            }
        });
    }
};
