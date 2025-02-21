<?php

namespace Database\Seeders\Form;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Form\FormCategory;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FormCategory::create(['name' => 'Onboarding Policy']);
        FormCategory::create(['name' => 'Yearly Notice']);
    }
}
