<?php

namespace App\Models\Shared;

use Illuminate\Database\Eloquent\Model;

class PermissionModule extends Model
{
    protected $fillable = ['name','code','description','isHidden','isRestricted'];

    public function sub_modules(){
       return $this->hasMany(PermissionSubModule::class);
    }
 
}
