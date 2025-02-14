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

        $this->call([
            ACLSeeder::class,
            ProfileSeeder::class,
            FormSeeder::class,
            AcknowledgementSeeder::class,
            StaffSeeder::class
        ]);
            
        //Load all permissions
        $arrayPermissions =  PermissionSubModule::with('module')->get();
        $permissions = $arrayPermissions->map(function($permission){
            return [ "name" => $permission['prefix'] , "guard_name" => "api", "permission_sub_module_id" => $permission?->id];
        });

        Permission::insert($permissions->toArray());

  
        // ->givePermissionTo(Permission::all())->revokePermissionTo(['create.enquiry','edit.enquiry','delete.enquiry']);
        // ->revokePermissionTo(['']);
        // ->givePermissionTo(['create.quotation','edit.quotation','delete.quotation']);
        // Role::firstOrCreate(['name' => 'Management']);
        // Role::firstOrCreate(['name' => 'System Coordinator'])->givePermissionTo(['view.dashboard','view.profilling','add.profilling','edit.profilling','delete.profilling','view.schedule']);
        // Role::firstOrCreate(['name' => 'Inspector'])->givePermissionTo(['view.dashboard','view.info','edit.info','view.appointment','cancel.job']);
    }
}
