<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;

class DashboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Create module
        $dashboard = PermissionModule::create(['name' => 'Dashboard','code' => 'dashboard', 'description' => 'Access Dashboard']);

        // Create sub-modules
        $dashboard->sub_modules()->create(['name' => 'Overview','prefix' => $dashboard->code.'.view_overview', 'method' => 'view']);


      
    }
}
