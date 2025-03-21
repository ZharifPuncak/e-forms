<?php

namespace App\Http\Resources\Report;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

class IssuanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'company' => $this?->company?->code,
            'issued'  => Carbon::parse($this?->issuance)->format('M d, Y'),
            'deadline' => Carbon::parse($this?->issuance)->format('M d, Y'),
            'total'    => '',
            'pending' => '',
            'completed' => '',
            'submission' => ''
 
        ];
    }
}
