<?php

namespace Database\Seeders\Form;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       //Run seeder for respective permissions
       $this->call([
         CategorySeeder::class,
       ]);
    }
}
