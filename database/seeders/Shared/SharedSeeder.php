<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SharedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CompanySeeder::class,
            CategorySeeder::class,
            DepartmentSeeder::class,
            GradeSeeder::class,
            PositionSeeder::class,
        ]);
    }
}
