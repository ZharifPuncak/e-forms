<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'name' => $this->user?->name,
            'email' => $this->user?->email,
            'staff_no' => $this->staff_no,
            'staff_ic_no' => $this->staff_ic_no,
            'role' => $this?->user?->roles->first()->name,
        ];
    }
}