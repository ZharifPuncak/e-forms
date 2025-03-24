<?php

namespace App\Http\Resources\Report;

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
            'name'       => $this?->staff?->user?->name,
            'company'    =>  $this?->staff?->details?->company?->code,
            'department' => $this?->staff?->details?->department?->name,
            'position'   => $this?->staff?->details?->position?->name,
            'status'     => $this?->status,
            'submitted'  => $this?->submitted_at ? Carbon::parse($this?->submitted_at)->format('M d, Y H:i') : null,
        ];
    }
}
