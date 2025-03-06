<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Staff\Staff;
use App\Models\Staff\StaffDetail;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;
use App\Models\Shared\Category;
use App\Models\Shared\Grade;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
        
        //Create User Admin
        $user1 = User::create(['name' => 'Mr.Admin', 'email' => 'admin@test.com','password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
        $user1->assignRole('Admin');

        //Create User Admin-HR
        $user2 = User::create(['name' => 'Mr.HR','email' => 'hr@test.com','password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
        $user2->assignRole('Admin-HR');


        //Create User Staff by File
        ImportData('seeder/shared/users.csv',  function ($row) {

            //Create User
            $user = User::create([
                'name' => $row[0],
            ]);

            $user?->assignRole('Staff');

            // Create Staff
            $staff = Staff::create([
                'user_id'      => $user->id,
                'gender'       => $row[1],
                'staff_no'     => $row[2],
                'staff_ic_no'  => $row[3]
            ]);

            //Get shared data
            $company = Company::where('code','like',$row[4])->first();
            $department = Department::where('name','like',$row[5])->first();
            $grade = Grade::where('name','like',$row[6])->first();
            $position = Position::where('name','like',$row[7])->first();
            $category = Category::where('name','like',$row[8])->first();

         
            // Create Staff Details
            StaffDetail::create([
                'staff_id' => $staff->id,
                'company_id' => $company?->id,
                'department_id' => $department?->id,
                'category_id' => $category?->id,
                'grade_id' => $grade?->id,
                'position_id' => $position?->id,
                'date_joined' => $row[9]
            ]);
        });

    }
}
