<?php

if (! function_exists('ImportData')) {
    function ImportData($filePath, callable $eloquentQuery)
    {

        // Path to the CSV file inside storage/app directory
        $filePath = storage_path($filePath);

        // Open the file and read contents
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
                 $eloquentQuery($row);
            }
        
        }

        // Close file
        fclose($file);
    
    }
}