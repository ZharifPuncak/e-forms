<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Shared\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Company::create(['code' => 'UCI', 'name' => '']);
         Company::create(['code' => 'PNH', 'name' => '']);
         Company::create(['code' => 'TRI', 'name' => '']);
         Company::create(['code' => 'TRIFMS', 'name' => '']);
         Company::create(['code' => 'TRIMED', 'name' => '']);
         Company::create(['code' => 'TRVSB', 'name' => '']);
         Company::create(['code' => 'MESB', 'name' => '']);
         Company::create(['code' => 'PBSB', 'name' => '']);
         Company::create(['code' => 'PNC', 'name' => '']);
         Company::create(['code' => 'PNMS', 'name' => '']);
         Company::create(['code' => 'PS', 'name' => '']);
    }
    
}
