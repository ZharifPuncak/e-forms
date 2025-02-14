<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;

class ACLSeeder extends Seeder
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
    }
}
