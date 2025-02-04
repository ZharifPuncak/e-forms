<?php

namespace Database\Seeders;

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

        // Create module
        $acl = PermissionModule::create(['name' => 'Access Control List','code' => 'acl', 'description' => 'Manage user, role and permissions']);

        // Create sub-modules
         $acl->sub_modules()->create(['name' => 'User','prefix' => $acl->code.'.view_user','method' => 'view']);
         $acl->sub_modules()->create(['name' => 'User','prefix' => $acl->code.'.create_user', 'method' => 'create']);
         $acl->sub_modules()->create(['name' => 'User','prefix' => $acl->code.'.update_user', 'method' => 'update']);
         $acl->sub_modules()->create(['name' => 'User','prefix' => $acl->code.'.delete_user', 'method' => 'delete']);

         $acl->sub_modules()->create(['name' => 'Role','prefix' =>  $acl->code.'.view_role', 'method' => 'view']);
         $acl->sub_modules()->create(['name' => 'Role','prefix' =>  $acl->code.'.create_role', 'method' => 'create']);
         $acl->sub_modules()->create(['name' => 'Role','prefix' =>  $acl->code.'.update_role', 'method' => 'update']);
         $acl->sub_modules()->create(['name' => 'Role','prefix' =>  $acl->code.'.delete_role', 'method' => 'delete']);

         $acl->sub_modules()->create(['name' => 'Permission','prefix' => $acl->code.'.view_permission', 'method' => 'view']);
         $acl->sub_modules()->create(['name' => 'Permission','prefix' => $acl->code.'.create_permission', 'method' => 'create']);
         $acl->sub_modules()->create(['name' => 'Permission','prefix' => $acl->code.'.update_permission', 'method' => 'update']);
         $acl->sub_modules()->create(['name' => 'Permission','prefix' => $acl->code.'.delete_permission', 'method' => 'delete']);


        // Create module
        $profile = PermissionModule::create(['name' => 'Profile','code' => 'profile', 'description' => 'Update password, logout browser sessions']);

        // Create sub-modules
        $profile->sub_modules()->create(['name' => 'Password','prefix' => $profile->code.'.update_password', 'method' => 'update']);
        $profile->sub_modules()->create(['name' => 'Session','prefix' => $profile->code.'.update_session', 'method' => 'delete']);


        //Load all permissions
        $arrayPermissions =  PermissionSubModule::with('module')->get();
 

        $permissions = $arrayPermissions->map(function($permission){
            return [ "name" => $permission['prefix'] , "guard_name" => "web", "permission_sub_module_id" => $permission?->id];
        });
       

        Permission::insert($permissions->toArray());
        Role::firstOrCreate(['name' => 'Superadmin'])->givePermissionTo(Permission::all());
        Role::firstOrCreate(['name' => 'Admin']);
        // ->givePermissionTo(Permission::all())->revokePermissionTo(['create.enquiry','edit.enquiry','delete.enquiry']);
        // ->revokePermissionTo(['']);
        // ->givePermissionTo(['create.quotation','edit.quotation','delete.quotation']);
        // Role::firstOrCreate(['name' => 'Management']);
        // Role::firstOrCreate(['name' => 'System Coordinator'])->givePermissionTo(['view.dashboard','view.profilling','add.profilling','edit.profilling','delete.profilling','view.schedule']);
        // Role::firstOrCreate(['name' => 'Inspector'])->givePermissionTo(['view.dashboard','view.info','edit.info','view.appointment','cancel.job']);


    }
}
