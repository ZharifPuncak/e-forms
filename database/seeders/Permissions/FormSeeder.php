<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            // Create module
            $form = PermissionModule::create(['name' => 'Forms','code' => 'form', 'description' => 'Manage Forms']);

            // Create sub-modules
            $form->sub_modules()->create(['name' => 'Form','prefix' => $form->code.'.view_form','method' => 'view']);
            $form->sub_modules()->create(['name' => 'Form','prefix' => $form->code.'.create_form','method' => 'create']);
            $form->sub_modules()->create(['name' => 'Form','prefix' => $form->code.'.update_form','method' => 'update']);
            $form->sub_modules()->create(['name' => 'Form','prefix' => $form->code.'.delete_form','method' => 'delete']);
    }
}
