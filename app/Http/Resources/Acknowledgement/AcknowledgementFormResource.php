<?php

namespace App\Http\Resources\Acknowledgement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcknowledgementFormResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->form?->name,
            'code' => $this->form?->code,
            'status' => $this->status,
        ];
    }
}
