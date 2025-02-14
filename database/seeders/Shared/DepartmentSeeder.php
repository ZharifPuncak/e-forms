<?php

namespace Database\Seeders\Shared;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Shared\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        Department::create(['name' => 'ARAU ESTATE']);
        Department::create(['name' => 'REGIONAL OFFICE BINTULU']);
        Department::create(['name' => 'FINANCE & ACCOUNTS']);
        Department::create(['name' => 'MAIN GATE']);
        Department::create(['name' => 'MARONG 2 ESTATE']);
        Department::create(['name' => 'MARONG 1 ESTATE']);
        Department::create(['name' => 'HUMAN RESOURCE ADMINISTRATION']);
        Department::create(['name' => "PC'S OFFICE"]);
        Department::create(['name' => "PROCUREMENT"]);
        Department::create(['name' => "MANAGING DIRECTOR'S OFFICE"]);
        Department::create(['name' => "LAKIN ESTATE"]);
        Department::create(['name' => "CENTRAL STORE"]);
        Department::create(['name' => "JABON ESTATE"]);
        Department::create(['name' => "NEW DEVELOPMENT, PLANTING & NURSERY"]);
        Department::create(['name' => "HUMAN RESOURCE MANAGEMENT"]);
        Department::create(['name' => "CORPORATE SERVICES DEPARTMENT"]);
        Department::create(['name' => "INTERNAL AUDIT"]);
        Department::create(['name' => "PROJECT ENGINEERING"]);
        Department::create(['name' => "ED'S OFFICE - HR & ADM DIVISION"]);
        Department::create(['name' => "ADMINISTRATION DEPT"]);
        Department::create(['name' => "INFORMATION & COMMUNICATION TECHNOLOGY"]);
        Department::create(['name' => "JABATAN HAL EHWAL AGAMA"]);
        Department::create(['name' => "SPECIAL FUNCTIONS"]);
        Department::create(['name' => "COMPLIANCE & SUSTAINABILITY"]);
        Department::create(['name' => "Z1P2(FMS)"]);
        Department::create(['name' => "Z1P3(AMS)"]);
        Department::create(['name' => "CONTRACT & PROCUREMENT"]);
        Department::create(['name' => "COMPENSATION & BENEFITS DEPARTMENT"]);
        Department::create(['name' => "HEALTH, SAFETY, SECURITY & ENVIRONMENT"]);
        Department::create(['name' => "SECURITY DEPARTMENT"]);
        Department::create(['name' => "CHAIRMAN'S OFFICE"]);
        Department::create(['name' => "LEGAL DEPARTMENT"]);
        Department::create(['name' => "ED'S OFFICE - SPECIAL FUNCTIONS"]);
        Department::create(['name' => "GOLF CLUB DRIVING RANGE"]);
        Department::create(['name' => "CORPORATE FINANCE"]);
        Department::create(['name' => "PROPERTY MANAGEMENT DEPARTMENT"]);
        Department::create(['name' => "ED'S OFFICE - FINANCE DIVISION"]);
        Department::create(['name' => "EXECUTIVE CHAIRMAN'S OFFICE"]);


    }
}
