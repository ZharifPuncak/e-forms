<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

class AcknowledgementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->form?->name,
            'alias' => $this->form?->alias,
            'code'  => $this->form?->code,
            'start' =>  Carbon::parse($this->effective_from)->toDateString(), 
            'end'   =>  Carbon::parse($this->effective_to)->toDateString(), 
            'color' => $this?->status == 'completed' ? '#81D6CE' : '#fff4e5',
            'textColor' => "#ffffff"
        ];

    }
}
