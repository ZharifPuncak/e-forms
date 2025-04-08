<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

class FormListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->name,
            'subtitle' => $this->code,
            'subtitle2'=> $this?->status,
            'from'=>  Carbon::parse($this->effective_from),
            'to'=>  Carbon::parse($this->effective_to)
        ];

    }
}
