<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

class FormIssuanceCompany extends Model
{
    protected $fillable = ['id','form_issuance_id','company_id'];
    protected $table = 'form_issuance_companies';

    public function issuance(){
       return $this->belongsTo(FormIssuance::class);
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }
}
