<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

use App\Models\Form\Form;
use App\Models\Staff\Staff;

class FormAcknowledgement extends Model
{
    protected $fillable = ['form_id','staff_id','status','submitted_at'];
    protected $table = 'form_acknowledgements';

    public function staff(){
        return $this->belongsTo(Staff::class,'staff_id');
    }

    public function form(){
        return $this->belongsTo(Form::class);
    }
}
