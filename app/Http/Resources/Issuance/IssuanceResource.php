<?php

namespace App\Http\Resources\Issuance;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Shared\Company;
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
    
        $loadedCompanyIds = $this?->companies?->pluck('company_id');
        return [
            'companies' =>  Company::whereIn('id',$loadedCompanyIds)->select('id','code','name')->get(),
            'issued_at' => Carbon::parse($this->issued_at)->format('d M, Y'),
            'deadlined_at'   => Carbon::parse($this->deadlined_at)->format('d M, Y')
        ];

    }
}
