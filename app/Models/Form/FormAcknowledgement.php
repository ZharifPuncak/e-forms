<?php

namespace App\Models\Form;

use Illuminate\Database\Eloquent\Model;

use App\Models\Form\Form;
use App\Models\Staff\Staff;

class FormAcknowledgement extends Model
{
    public function staff(){
        return $this->belongsToMany(Staff::class);
    }

    public function form(){
        return $this->belongsTo(Form::class);
    }
}
