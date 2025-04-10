<?php

namespace App\Http\Resources\File;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'title' => $this->title,
            'name' => $this->file_name,
            'size' =>  $this->file_size,
            'extension'   => $this->file_ext,
            'status'    => $this->form?->status,
            'file'        => asset('storage/' . $this->file_path),
        ];
    }
}
