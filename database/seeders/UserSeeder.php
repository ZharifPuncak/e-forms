<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        
        //Create User Admin
        $user1 = User::create(['name' => 'Mr.Super','password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
        $user1->assignRole('Admin');

        //Create User Admin-HR
        $user2 = User::create(['name' => 'Mr.HR','password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
        $user2->assignRole('Admin-HR');

        //Create User Staff
        $user3 = User::create(['name' => 'Mr.Staff','password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
        $user3->assignRole('Staff');
    }
}
