<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('notifications')) {
            return;
        }

        $driver = DB::getDriverName();

        if ($driver === 'mysql') {
            try {
                DB::statement('ALTER TABLE `notifications` MODIFY `project_id` BIGINT UNSIGNED NULL');
            } catch (\Throwable $e) {
            }
            // type tayari ni enum - 'Status Update' ipo kwenye orodha, hakuna mabadiliko needed
            // is_need_help haipo kwenye notifications - hakuna action
        } elseif ($driver === 'sqlite') {
            // SQLite hai-support MODIFY - jenga upya kupitia backup ikiwa lazima
            // Kwa dev nyingi project_id tayari nullable baada ya fresh migrate; puuza
        }
    }

    public function down(): void
    {
    }
};
