<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Model;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;


class StaffDetail extends Model
{
   public function company(){
      $this->belongsTo(Company::class);
   }

   public function department(){
      $this->belongsTo(Department::class);
   }

   public function position(){
      $this->belongsTo(Position::class);
   }
}
