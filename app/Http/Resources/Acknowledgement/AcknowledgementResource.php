<?php

namespace App\Http\Resources\Acknowledgement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;

use Carbon\Carbon;

class AcknowledgementResource extends JsonResource
{
 

    public function toArray(Request $request): array
    {
     
        return [
            'name' => $this->staff?->user?->name,
            'email' => $this->staff?->user?->email,
            'company' => Company::where('id',$this->staff?->details?->company_id)->value('code'),
            'department' => Department::where('id',$this->staff?->details?->department_id)->value('name'),
            'position' => Position::where('id',$this->staff?->details?->position_id)->value('name'),
            'status'  => $this?->status,
            'submitted_at'  => $this?->submitted_at ? Carbon::parse($this?->submitted_at)->format('d M, Y H:i') : ''
        ];
    }
}
