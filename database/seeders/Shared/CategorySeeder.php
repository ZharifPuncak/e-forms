<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Shared\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            Category::create(['name' => 'Director']);
            Category::create(['name' => 'Exec Director']);
            Category::create(['name' => 'Managerial']);
            Category::create(['name' => 'Executive']);
            Category::create(['name' => 'Non Executive']);
            Category::create(['name' => 'General Worker']);
    
    }
}
