<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'Admin','guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'Admin-HR','guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'Staff','guard_name' => 'api']);
    }
}
