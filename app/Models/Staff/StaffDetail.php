<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Model;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;


class StaffDetail extends Model
{

   protected $table = 'staff_details';
   protected $fillable = ['staff_id','company_id','department_id','category_id','grade_id','position_id','date_joined'];
   
   public function company(){
      return $this->belongsTo(Company::class,'company_id');
   }

   public function department(){
      return $this->belongsTo(Department::class,'department_id');
   }

   public function position(){
      return $this->belongsTo(Position::class,'position_id');
   }
}
