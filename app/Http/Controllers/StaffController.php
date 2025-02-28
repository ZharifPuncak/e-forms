<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Http\Resources\User\StaffResource as UserStaffResource;
use App\Http\Resources\Staff\StaffResource;
use App\Http\Requests\Staff\StaffStoreRequest;
use Illuminate\Validation\Rule;
use App\Models\Staff\Staff;
use App\Models\User;
use App\Models\Form\FormIssuance;
use App\Models\Form\FormAcknowledgement;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StaffController extends Controller
{
    use HttpResponses;
    public function index(){

        $staffs = Staff::with(['user' => function ($query) {
             $query->orderBy('name', 'asc'); 
        }, 'details'])->orderBy('id','desc')->get();

         return $this->success([
             'staffs' =>  UserStaffResource::collection($staffs),
        ]);
    }


    public function store(StaffStoreRequest $request){

        $request->validated($request->all());

        DB::beginTransaction();

        try { 

            $user = User::create(['name' => $request->name, 'email' => $request->email, 'password' => '$2y$10$9SVgshmudNbixCWH4v4g7Oa0rLBgec65Z37tLOs9.HIyocvVPHRMW']);
            $user->assignRole('staff');


            $staff = Staff::create([
                'user_id'     => $user->id,
                'staff_no'    => $request->staffId,
                'staff_ic_no' => $request->staffIC,
                'gender'      => $request->gender,
                'status'      => 'pending'
            ]);
    
            $staff->details()->create([
                'company_id'     => $request?->company['id'],
                'department_id'  => $request?->department['id'],
                'category_id'    => $request?->category['id'],
                'grade_id'       => $request?->grade['id'],
                'position_id'    => $request?->position['id'],
                'date_joined'    => Carbon::parse($request?->dateJoined)->format('y-m-d')
             ]);

             DB::commit();
             return $this->success([], 'Staff Created.');

        }catch (\Throwable $e) {

            DB::rollback();
            return $this->error(null, $e, 422);

        }

    }


    public function update(Request $request){


        $staff =  Staff::where('staff_no',$request->staffId)->first();
        

        if(!$staff){
            return $this->error(null, 'Staff not found', 422);
        }

        $validatedData = $request->validate([
            'name'       => ['required','string','max:30','min:3'],
            'gender'     => ['required'],
            'staffId' => ['required','string','max:12','min:5',Rule::unique('staffs', 'staff_no')->ignore($staff->id)],
            'staffIC'    => ['required', 'size:12', 'regex:/^\d{12}$/',Rule::unique('staffs', 'staff_ic_no')->ignore($staff->id)],
            'email'      => ['required',Rule::unique('users', 'email')->ignore($staff->user->id)],
            'company'    => ['required'],
            'department' => ['required'],
            'category'   => ['required'],
            'position'   => ['required'],
            'dateJoined' => ['required','date']
        ]);

        $staff->update([
            'staff_no'    => $request->staffId,
            'staff_ic_no' => $request->staffIC,
            'gender'      => $request->gender,
        ]);

        $staff->details()->update([
            'company_id'     => $request?->company['id'],
            'department_id'  => $request?->department['id'],
            'category_id'    => $request?->category['id'],
            'grade_id'       => $request?->grade['id'],
            'position_id'    => $request?->position['id'],
            'date_joined'    => Carbon::parse($request?->dateJoined)->format('y-m-d')
        ]);

        $staff->user()->update(['name' => $request->name, 'email' => $request->email]);

        return $this->success([], 'Staff Updated.');
  
    }


    public function delete(Request $request){

        $staff =  Staff::where('staff_no',$request->staffId)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 422);
        }

        if($staff->status != 'pending'){
            return $this->error(null, 'Staff cannot be deleted', 404);
        }

        $staff->details()->delete();
        $staff->user()->delete();
        $staff->delete();

        return $this->success([], 'Staff Deleted.');
    }


    public function confirm(Request $request){

        $staff =  Staff::with('details')->where('staff_no',$request->staffId)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 422);
        }

        $issuances = FormIssuance::with('form')->whereHas('companies',function($query) use($staff){
            $query->where('company_id',$staff->details?->company_id);
        })->get();

        if($issuances){
            foreach($issuances as $issuance){
                if($issuance->status == 'dispatched' && $issuance->form->status == 'ongoing'){
                    FormAcknowledgement::create(['form_id' => $issuance?->form?->id,'staff_id' => $staff->id, 'form_issuance_id' => $issuance->id]);
                }
            }
        }
        
       // Update staff status
        $staff->update(['status' => 'active']);

        return $this->success([], 'Staff Confirmed.');

    }

    public function details($staffNo){

        $staff = Staff::with('user','details')->where('staff_no',$staffNo)->first();

        if(!$staff){
            return $this->error(null, 'Staff not found', 404);
        }

        return $this->success([
            'details' =>  new StaffResource($staff),
       ]);

    }
}
