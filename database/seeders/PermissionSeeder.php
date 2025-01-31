<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


use App\Models\Shared\PermissionModule;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $module = PermissionModule::create(['name' => 'Access Control List','code' => 'acl', 'description' => 'Manage user, role and permissions']);

        $arrayPermissions = [

            //ACL - User
            ['name' => 'acl.create_user', 'method' => 'create','sub_module' => 'user'],
            ['name' => 'acl.update_user', 'method' => 'update','sub_module' => 'user'],
            ['name' => 'acl.view_user', 'method' => 'view','sub_module' => 'user'],
            ['name' => 'acl.delete_user', 'method' => 'delete','sub_module' => 'user'],
         
        
            //ACL - Permissions
            ['name' => 'acl.create_permission', 'method' => 'create','sub_module' => 'permission'],
            ['name' => 'acl.update_permission', 'method' => 'update','sub_module' => 'permission'],
            ['name' => 'acl.view_permission', 'method' => 'view','sub_module' => 'permission'],
            ['name' => 'acl.delete_permission', 'method' => 'delete','sub_module' => 'permission'],
      

            //ACL - Role
            ['name' => 'acl.create_role', 'method' => 'create','sub_module' => 'role'],
            ['name' => 'acl.update_role', 'method' => 'update','sub_module' => 'role'],
            ['name' => 'acl.view_role', 'method' => 'view','sub_module' => 'role'],
            ['name' => 'acl.delete_role', 'method' => 'delete','sub_module' => 'role'],

        ];

        $permissions = collect($arrayPermissions)->map(function($permission) use($module){
            return [ "name" => $permission['name'] , "guard_name" => "web", "permission_module_id" => $module?->id, "method" => $permission['method'], "sub_module" => $permission['sub_module'] ];
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
