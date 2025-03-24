<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;
use App\Models\Shared\Company;

class FormIssuanceCompany extends Model
{
    protected $fillable = ['id','form_issuance_id','company_id'];
    protected $table = 'form_issuance_companies';

    public function issuance(){
       return $this->belongsTo(FormIssuance::class,'form_issuance_id');
    }

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
}
