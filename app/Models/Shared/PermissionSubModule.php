<?php

namespace App\Models\Shared;

use Illuminate\Database\Eloquent\Model;

class PermissionSubModule extends Model
{
    protected $fillable = ['permission_module_id','name','prefix','method','description'];

    public function module(){
        return $this->belongsTo(PermissionModule::class);
     }
}
