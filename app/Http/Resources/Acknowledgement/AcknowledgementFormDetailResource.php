<?php

namespace App\Http\Resources\Acknowledgement;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AcknowledgementFormDetailResource extends JsonResource
{



    public function toArray(Request $request): array
    {

        $file = $this->form?->file()?->select(['title', 'file_path as path'])->first();
        
        return [
            'name'        => $this->form?->name,
            'code'        => $this->form?->code,
            'descriptions'=> $this->form?->descriptions,
            'status'      => $this->status,
            'issued'      => Carbon::parse($this?->issuance?->issued_at)->format('d M, Y'),
            'deadline'    =>  Carbon::parse($this?->issuance?->deadlined_at)->format('d M, Y'),
            'title'       => $file->title,
            'file'        => asset('storage/' . $file->path),
            'submitted'   => $this?->submitted_at,
            'sign'        => $this->signature,
        ];
    }
}
