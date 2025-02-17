<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Staff extends Model
{
    protected $table = 'staffs';
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
