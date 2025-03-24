<?php

namespace App\Http\Resources\Report;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Form\FormAcknowledgement;
use Carbon\Carbon;


class IssuanceResource extends JsonResource
{


    public function toArray(Request $request): array
    {

        $companyId =  $this?->company->id;
        $acknowledgementByCompany = FormAcknowledgement::where('form_issuance_id',$this?->issuance?->id)->whereHas('staff.details',function($query) use($companyId){
           return $query->where('company_id',$companyId);
        });

        $total =  $acknowledgementByCompany->clone()->count();
        $pending = $acknowledgementByCompany->clone()->where('status','pending')->count();
        $completed = $acknowledgementByCompany->clone()->where('status','completed')->count();

        
        return [
            'company' => $this?->company?->code,
            'issued'  => Carbon::parse($this?->issuance?->issued_at)->format('M d, Y'),
            'deadline' => Carbon::parse($this?->issuance?->deadlined_at)->format('M d, Y'),
            'total'    =>  $total,
            'pending' => $pending,
            'completed' => $completed,
            'submission' => $total != 0 ? number_format($completed / $total,2) : 0
        ];
    }
}
