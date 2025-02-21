<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{   
    protected $fillable = ['name','alias','code','form_category_id','descriptions','status','effective_from','effective_to'];
   
    public function category(){
        return $this->belongsTo(FormCategory::class,'form_category_id','id');
    }

    public function file(){
        return $this->hasOne(FormFile::class);
    }

}
