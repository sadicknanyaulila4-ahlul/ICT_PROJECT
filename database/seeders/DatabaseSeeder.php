<?php
namespace Database\Seeders;

use App\Models\InfrastructureComponent;
use App\Models\System;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed local development accounts and project lookup data.
     *
     * Authorization in this application is based on users.role, not Spatie roles.
     */
    public function run(): void
    {
        // The User model casts password as "hashed", so plain passwords are correct here.
        User::updateOrCreate(
            ['email' => 'ally@gmail.com'],
            ['name' => 'System Administrator', 'password' => 'Ally1234', 'role' => 'admin'],
        );
        User::updateOrCreate(
            ['email' => 'supervisor@example.com'],
            ['name' => 'Analyst Supervisor', 'password' => 'Supervisor@12345', 'role' => 'supervisor'],
        );
        User::updateOrCreate(
            ['email' => 'analyst@example.com'],
            ['name' => 'System Analyst', 'password' => 'Analyst@12345', 'role' => 'analyst'],
        );

        foreach (['CFMS', 'ERP', 'HRMS', 'IPEMS'] as $name) {
            System::updateOrCreate(['name' => $name], ['system_type' => $name, 'is_active' => true]);
        }

        foreach (['Network', 'Hardware', 'Data Center', 'Server', 'Database'] as $name) {
            InfrastructureComponent::updateOrCreate(['name' => $name], ['component_type' => $name, 'is_active' => true]);
        }
    }
}
