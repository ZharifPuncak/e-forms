<?php

namespace App\Http\Resources\Staff;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;
use App\Models\Shared\Category;
use App\Models\Shared\Grade;

class StaffResource extends JsonResource
{
   
    
    $company = Company::where('id',$this->details?->company_id)->value('code');
    $department = Department::where('id',$this->details?->department_id)->value('name');
    $position = Position::where('id',$this->details?->position_id)->value('name');
    $category = Category::where('id',$this->details?->category_id)->value('name');
    $grade = Grade::where('id',$this->details?->grade_id)->value('name');


    public function toArray(Request $request): array
    {
        return [
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'staffIcNo' => $this->staff_ic_no,
            'staffId' => $this->staff_no,
            'company' => $company,
            'department' => $department,
            'position' => $position,
            'grade' => $grade,
            'category' => $category,
            'status'   => $this->status
        ];
    }
}
