<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Staff\Staff;

use App\Http\Resources\User\StaffResource;

class ProfileController extends Controller
{
    public function updatePassword(Request $request){

        $validated = $request->validate([
            'password' => 'required|min:6',
            'new_password' => 'required|min:6',
            'confirm_new_password' => 'required|min:6',
        ]);

        if (!Hash::check($request['password'], Auth::user()->password)) {
            return response()->json(['status' => 'The old password does not match our records.'],422);
        }

        if($request['new_password'] != $request['confirm_new_password']){
            return response()->json(['status' => 'The confirm password does not match new password.'],422);
        }


        Auth::user()->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Password updated.'],200);
    }

    public function updateEmail(Request $request){

        $validated = $request->validate([
            'email' => 'required|unique:users,email,' . Auth::user()->id,
        ]);

        $staff = Staff::with('user')->whereHas('user',function($query){
             $query->where('id',Auth::user()->id);
        })->first();

        

 
        $staff?->user()->update(['email' => $request->email]);

        return response()->json(['message' => 'Email updated.', 'user' => new StaffResource($staff->refresh())],200); 
    }
}
