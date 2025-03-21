<?php

namespace App\Http\Resources\Report;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

use App\Models\Form\FormIssuanceCompany;

use Carbon\Carbon;

class FormResource extends JsonResource
{
    
   

    public function toArray(Request $request): array
    {
        $total   = $this->acknowledgements;
        $pending = $this->acknowledgements->where('status','pending');
        $completed = $this->acknowledgements->where('status','completed');

        $issuances = FormIssuanceCompany::with('company','issuance')->where('form_issuance_id',$this->issuance->pluck('id'))->get();

        return [
            'date' => Carbon::now()->format('M d, Y H:i'),
            'name' => $this->name,
            'alias' => $this->alias,
            'code'  => $this->code,
            'category' => $this->category?->name,
            'effective_from' => Carbon::parse($this->effective_from)->format('M d, Y'),
            'effective_to' => Carbon::parse($this->effective_to)->format('M d, Y'),
            'status' => Str::title($this?->status),
            'total'  => count($total),
            'pending'  => count($pending),
            'completed'  => count($completed),
            'remarks' => '',
            'submission' => number_format(count($completed) / count($total),2),
            'acknowledgements' => AcknowledgementResource::collection($this->acknowledgements),
            'issuance' => IssuanceResource::collection($issuances),
        ];
    }
}
