<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;

use Database\Seeders\Permissions\PermissionSeeder;
use Database\Seeders\Shared\SharedSeeder;
use Database\Seeders\Form\FormSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            SharedSeeder::class,
            UserSeeder::class,
            FormSeeder::class
        ]);
    }
}
