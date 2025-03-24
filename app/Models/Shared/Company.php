<?php

namespace App\Models\Shared;

use Illuminate\Database\Eloquent\Model;

use App\Models\Form\FormIssuance;
use App\Models\Staff\StaffDetail;

class Company extends Model
{
    protected $table = 'shared_companies';

    public function staffs(){
        return $this->hasMany(StaffDetail::class);
    }

}
