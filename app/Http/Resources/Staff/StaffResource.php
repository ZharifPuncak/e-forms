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
   
    
    public function toArray(Request $request): array
    {

        
            $company = Company::where('id',$this->details?->company_id)->select('id','code','name')->first();
            $department = Department::where('id',$this->details?->department_id)->select('id','name')->first();
            $position = Position::where('id',$this->details?->position_id)->select('id','name')->first();
            $category = Category::where('id',$this->details?->category_id)->select('id','name')->first();
            $grade = Grade::where('id',$this->details?->grade_id)->select('id','name')->first();

        return [
            'id'    => $this->id,
             'name' => $this->user?->name,
            'email' => $this->user?->email,
            'staffIcNo' => $this->staff_ic_no,
            'staffId' => $this->staff_no,
            'company' => $company,
            'department' => $department,
            'position' => $position,
            'grade' => $grade,
            'category' => $category,
            'status'   => $this->status,
            'gender'   => $this->gender,
            'dateJoined' => $this?->details?->date_joined
        ];
    }
}
