<?php

namespace Database\Seeders\Permissions;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;

use App\Models\Shared\PermissionModule;
use App\Models\Shared\PermissionSubModule;


class AcknowledgementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Create module
          $ack = PermissionModule::create(['name' => 'Acknowledgements','code' => 'ack', 'description' => 'Acknowledgements operations']);


            // Create sub-modules
            $ack->sub_modules()->create(['name' => 'Acknowledgement','prefix' => $ack->code.'.view_ack','method' => 'view']);
            $ack->sub_modules()->create(['name' => 'Acknowledgement','prefix' => $ack->code.'.update_ack','method' => 'update']);


  
    }
}
