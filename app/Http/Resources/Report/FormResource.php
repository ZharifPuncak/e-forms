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
        $total   = $this->acknowledgements->count();
        $pending = $this->acknowledgements->where('status','pending')->count();
        $completed = $this->acknowledgements->where('status','completed')->count();
        $incompleted = $this->acknowledgements->where('status','incompleted')->count();
        $cancelled = $this->acknowledgements->where('status','cancelled')->count();

        $issuances = FormIssuanceCompany::with('company','issuance')->whereIn('form_issuance_id',$this->issuance->pluck('id'))->get();

        return [
            'date' => Carbon::now()->format('M d, Y H:i'),
            'name' => $this->name,
            'alias' => $this->alias,
            'code'  => $this->code,
            'category' => $this->category?->name,
            'effective_from' => Carbon::parse($this->effective_from)->format('M d, Y'),
            'effective_to' => Carbon::parse($this->effective_to)->format('M d, Y'),
            'status' => Str::title($this?->status),
            'total'  => $total,
            'pending'  => $pending,
            'completed'  => $completed,
            'cancelled' => $cancelled,
            'incompleted' => $incompleted,
            'remarks' => $this->remarks,
            'closed_status' => $this->closed_status,
            'submission' => $total != 0 ? number_format($completed / $total,3) : 0,
            'acknowledgements' => AcknowledgementResource::collection($this->acknowledgements->where('status','completed')),
            'issuance' => IssuanceResource::collection($issuances),
        ];
    }
}
