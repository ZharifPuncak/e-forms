<?php

namespace App\Http\Resources\Form;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

class FormResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $status = $this->status;
        return [
            
            'id'  => $this->id,
            'name' => $this->name,
            'alias' => $this->alias,
            'code' =>  $this->code,
            'category' => $this->category,
            'closed_status' => $this->closed_status,
            'status'   => $status,
            'remarks'   => $this->remarks,
            'descriptions' => $this->descriptions,
            'effective_from' => Carbon::parse($this->effective_from)->format('d M, Y'),
            'effective_to' => Carbon::parse($this->effective_to)->format('d M, Y'),
            'isFileReady' => !empty($this->file)

        ];
    }
}
