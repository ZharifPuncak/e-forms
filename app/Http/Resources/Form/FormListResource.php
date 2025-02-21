<?php

namespace App\Http\Resources\Form;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            
            'name' => $this->name,
            'alias' => $this->alias,
            'code' =>  $this->code,
            'category' => $this->category?->name,
            'status'   => $this->status

        ];
    }
}
