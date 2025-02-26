<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

class FormIssuance extends Model
{
    protected $fillable = ['form_id','status','issued_at','deadlined_at'];

    public function form(){
        return $this->belongsTo(Form::class);
    }


    public function companies(){
        return $this->hasMany(FormIssuanceCompany::class);
    }
}
