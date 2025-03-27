<?php

namespace App\Models\Form;

use App\Models\Form\FormAcknowledgement;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{   
    protected $fillable = ['name','alias','code','form_category_id','descriptions','status','effective_from','effective_to','closed_status','remarks'];
   
    public function category(){
        return $this->belongsTo(FormCategory::class,'form_category_id','id');
    }

    public function issuance(){
        return $this->hasMany(FormIssuance::class,'form_id');
    }

    public function file(){
        return $this->hasOne(FormFile::class);
    }

    public function acknowledgements(){
        return $this->hasMany(FormAcknowledgement::class);
    }

}
