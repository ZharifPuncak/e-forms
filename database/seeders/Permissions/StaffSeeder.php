<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            // Create module
            $staff = PermissionModule::create(['name' => 'Staffs','code' => 'stf', 'description' => 'Manage Staff']);//

            // Create sub-modules
            $staff->sub_modules()->create(['name' => 'Staff','prefix' => $staff->code.'.view_staff','method' => 'view']);
            $staff->sub_modules()->create(['name' => 'Staff','prefix' => $staff->code.'.create_staff','method' => 'create']);
            $staff->sub_modules()->create(['name' => 'Staff','prefix' => $staff->code.'.update_staff','method' => 'update']);
            $staff->sub_modules()->create(['name' => 'Staff','prefix' => $staff->code.'.delete_staff','method' => 'delete']);
            
            //Give access to Admin, Admin-HR
    }
}
