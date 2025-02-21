<?php

namespace App\Http\Resources\Acknowledgement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcknowledgementResource extends JsonResource
{
 

    public function toArray(Request $request): array
    {
         $details = $this->staff?->details;
         $details?->load('company','department','position');

        return [
            'name' => $this->staff?->user?->name,
            'staffNo' => $this->staff?->staff_no,
            'company' =>  $details,
            // 'department' => $this->category?->name,
            // 'position' => $this->category?->name,
            'status'   => $this->status
        ];
    }
}
