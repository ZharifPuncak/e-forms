<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Create module
        $profile = PermissionModule::create(['name' => 'Profile','code' => 'profile', 'description' => 'Update password, logout browser sessions']);

        // Create sub-modules
        $profile->sub_modules()->create(['name' => 'Password','prefix' => $profile->code.'.update_password', 'method' => 'update']);
        $profile->sub_modules()->create(['name' => 'Session','prefix' => $profile->code.'.update_session', 'method' => 'delete']);

      
    }
}
