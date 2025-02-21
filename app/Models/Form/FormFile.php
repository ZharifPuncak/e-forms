<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

class FormFile extends Model
{
    protected $fillable = ['form_id','title','file_name','file_path','file_size','file_ext'];
    
    public function form(){
        return $this->belongsTo(Form::class);
    }
}
