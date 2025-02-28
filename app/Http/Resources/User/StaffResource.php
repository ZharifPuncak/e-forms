<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Shared\Company;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $company = Company::where('id',$this->details?->company_id)->value('code');

        return [
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'status' => $this->status,
            'staff_no' => $this->staff_no,
            'staff_ic_no' => $this->staff_ic_no,
            'role' => $this?->user?->roles->first()?->name,
            'company' => $company
        ];
    }
}
