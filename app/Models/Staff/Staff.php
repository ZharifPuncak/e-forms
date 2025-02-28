<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Form\FormAcknowledgement;

class Staff extends Model
{
    protected $table = 'staffs';
    protected $fillable = ['user_id','gender','staff_no','staff_ic_no','status'];
    
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function details(){
        return $this->hasOne(StaffDetail::class);
    }

    public function acknowledgements(){
        return $this->belongsToMany(FormAcknowledgement::class,'form_acknowledgements','form_id');
    }

    
}
