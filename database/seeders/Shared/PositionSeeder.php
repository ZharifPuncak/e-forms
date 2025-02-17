<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Seeder;

use App\Models\Shared\Position;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
            ImportData('seeder/shared/positions.csv',  function ($row) {
                Position::create([
                    'name' => $row[0],
                ]);
            });

    }
}
