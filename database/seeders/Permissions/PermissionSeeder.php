<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Run seeder for respective permissions
        $this->call([
            ProfileSeeder::class,
            ACLSeeder::class,
            StaffSeeder::class,
            FormSeeder::class,
            AcknowledgementSeeder::class
        ]);
            
        //Load all permissions
        $permissionModule = PermissionSubModule::with('module');
        $arrayPermissions =  $permissionModule->clone()->get();
        $permissions = $arrayPermissions?->map(function($permission){
            return [ "name" => $permission['prefix'] , "guard_name" => "api", "permission_sub_module_id" => $permission?->id];
        });


        // Insert permission into table
        Permission::insert($permissions->toArray());

  
        //#Assignments for permissions by modules. Load Role first
        $admin = Role::where('name','Admin')->first();
        $HR    = Role::where('name','Admin-HR')->first();
        $staff = Role::where('name','Staff')->first();

        

        // 1. Profile
        $profilePermission = $permissionModule->clone()->whereHas('module',function($query){
            $query->where('name','Forms');
        })->pluck('prefix');


        $admin->givePermissionTo($profilePermission);
        $HR->givePermissionTo($profilePermission);
        $staff->givePermissionTo($profilePermission);


        // 2. ACL

        $aclPermissions = $permissionModule->clone()->whereHas('module',function($query){
            $query->where('name','Access Control List');
        })->pluck('prefix');

        $admin->givePermissionTo($aclPermissions);
        $HR->givePermissionTo($aclPermissions);


        // 3.StaffSeeder

        $staffPermissions = $permissionModule->clone()->whereHas('module',function($query){
            $query->where('name','Staffs');
        })->pluck('prefix');

        $admin->givePermissionTo($staffPermissions);
        $HR->givePermissionTo($staffPermissions);


        // 4. Forms
        $formsPermissions = $permissionModule->clone()->whereHas('module',function($query){
            $query->where('name','Forms');
        })->pluck('prefix');


        $admin->givePermissionTo($formsPermissions);
        $HR->givePermissionTo($formsPermissions);
        $staff->givePermissionTo($formsPermissions)->revokePermissionTo(['form.update_form','form.create_form','form.delete_form']);


        //5. Acknowledgement
        $acknowledgementPermissions = $permissionModule->clone()->whereHas('module',function($query){
            $query->where('name','Acknowledgements');
        })->pluck('prefix');

        $staff->givePermissionTo($acknowledgementPermissions);

    }
}
