<?php

namespace App\Http\Resources\Acknowledgement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcknowledgementStaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'company' => $this->details
        ];
    }
}
