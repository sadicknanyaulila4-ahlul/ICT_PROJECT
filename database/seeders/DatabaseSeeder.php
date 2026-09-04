<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $roles = ['supervisor', 'analyst', 'coordinator', 'approver'];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        // Create a supervisor user
        $supervisor = User::create([
            'name' => 'Supervisor User',
            'email' => 'supervisor@example.com',
            'password' => Hash::make('password'),
        ]);
        $supervisor->assignRole('supervisor');

        // Create an analyst user
        $analyst = User::create([
            'name' => 'Analyst User',
            'email' => 'analyst@example.com',
            'password' => Hash::make('password'),
        ]);
        $analyst->assignRole('analyst');

        // Create an admin user (for testing)
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('supervisor'); // or any role

        // Seed systems and infrastructure components
        \App\Models\System::create(['name' => 'CFMS']);
        \App\Models\System::create(['name' => 'ERP']);
        \App\Models\System::create(['name' => 'HRMS']);
        \App\Models\System::create(['name' => 'IPEMS']);

        \App\Models\InfrastructureComponent::create(['name' => 'Network']);
        \App\Models\InfrastructureComponent::create(['name' => 'Hardware']);
        \App\Models\InfrastructureComponent::create(['name' => 'Data Center']);
        \App\Models\InfrastructureComponent::create(['name' => 'Server']);
        \App\Models\InfrastructureComponent::create(['name' => 'Database']);

        // Create a sample project with activities and requirements for testing
        $project = \App\Models\Project::create([
            'name' => 'Sample Project',
            'description' => 'Test project',
            'budget' => 100000,
            'project_source' => 'system_development',
            'project_nature' => 'planned',
            'project_activity' => 'new_implementation',
            'custom_system_name' => 'MyNewSystem',
            'supervisor_id' => $supervisor->id,
            'assigned_analyst_id' => $analyst->id,
            'status' => 'ongoing',
            'is_approved' => true,
        ]);

        // Add activities
        $project->activities()->create([
            'activity_name' => 'Requirement Analysis',
            'expected_deliverable' => 'BRD',
            'planned_start_date' => now()->addDays(1),
            'planned_end_date' => now()->addDays(10),
            'responsible_person' => 'Analyst A',
            'status' => 'not_started',
        ]);
        $project->activities()->create([
            'activity_name' => 'Design',
            'expected_deliverable' => 'SDD',
            'planned_start_date' => now()->addDays(11),
            'planned_end_date' => now()->addDays(20),
            'responsible_person' => 'Analyst B',
            'status' => 'not_started',
        ]);

        // Add requirement components
        $project->requirements()->create([
            'requirement_description' => 'User login',
            'planned_start_date' => now()->addDays(1),
            'planned_end_date' => now()->addDays(3),
            'status' => 'pending',
        ]);
        $project->requirements()->create([
            'requirement_description' => 'Dashboard',
            'planned_start_date' => now()->addDays(4),
            'planned_end_date' => now()->addDays(6),
            'status' => 'pending',
        ]);
    }
}