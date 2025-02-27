<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Http\Resources\User\StaffResource;
use App\Models\Staff\Staff;

class StaffController extends Controller
{
    use HttpResponses;
    public function index(){

        $staffs = Staff::with(['user' => function ($query) {
             $query->orderBy('name', 'asc'); 
        }, 'details'])->get();

         return $this->success([
             'staffs' =>  StaffResource::collection($staffs),
        ]);
    }
}
