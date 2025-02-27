<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Http\Resources\User\StaffResource as UserStaffResource;
use App\Http\Resources\Staff\StaffResource;

use App\Http\Request\Staff\StaffStoreRequest;
use App\Models\Staff\Staff;

class StaffController extends Controller
{
    use HttpResponses;
    public function index(){

        $staffs = Staff::with(['user' => function ($query) {
             $query->orderBy('name', 'asc'); 
        }, 'details'])->get();

         return $this->success([
             'staffs' =>  UserStaffResource::collection($staffs),
        ]);
    }


    public function store(StaffStoreRequest $request){

        $request->validated($request->all());

        $staff = Staff::create([

        ]);


        return $this->success([], 'Staff Created.');

    }


    public function update(StaffStoreRequest $request){

        $request->validated($request->all());

        $staff =  Staff::where('id',$request->id)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 422);
        }

        $staff->update([

        ]);


        return $this->success([], 'Staff Updated.');
  
    }


    public function delete(Request $request){

        $staff =  Staff::where('id',$request->id)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 422);
        }

        if($staff->status != 'pending'){
            
        }

        $staff->details()->delete();
        $staff->user()->delete();
        $staff->delete();

        return $this->success([], 'Staff Deleted.');
    }


    public function confirm(Request $request){

        $staff =  Staff::where('id',$request->id)->first();

    }

    public function details(Request $request){

        $staff = Staff::with('user','details')->where('staff_no',$request->staffNo)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 404);
        }

        return $this->success([
            'details' =>  new StaffResource($staff),
       ]);

    }
}
