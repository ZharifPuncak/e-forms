<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Seeder;

use App\Models\Shared\Grade;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Path to the CSV file inside storage/app directory
        $filePath = storage_path('seeder/shared/grades.csv');

      
        // // Open the file and read contents
        $file = fopen($filePath, 'r');

        // Skip the first row (header)
        $firstRow = true;
        while (($row = fgetcsv($file, 1000, ',')) !== false) {
            if ($firstRow) {
                $firstRow = false;
                continue;
            }

            // Insert into the database
            if($row[0]){
                Grade::create([
                    'name'  => $row[0],
                ]);
            }
        
        }

        // Close file
        fclose($file);

    }
}
