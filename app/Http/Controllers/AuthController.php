<?php

namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Staff\Staff;

use App\Traits\HttpResponses;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\LoginUserRequest;

use App\Http\Resources\User\UserResource;
use Spatie\Permission\Models\Permission;





class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request){

        $request->validated($request->all());

        // Load staff with user details
        $staff = Staff::with('user')->where('staff_ic_no',$request->staff_ic_no)->first();

        // Check if staff exists and verify password
        if (!$staff || !Hash::check($request->password, $staff->user->password)) {
            return $this->error('', 'Credentials do not match', 401);
        }

    
        // Log the staff in manually
        Auth::login($staff->user);

        return $this->success([
            'user' => new UserResource($staff),
            'permissions' => auth()->user()->getPermissionsViaRoles()->pluck("name"),
            'token' => $staff?->user?->createToken('API Token '.$staff?->user?->name)->plainTextToken,
        ]);

    }

    public function logout(Request $request){


        $user = request()->user();

        if($user){
            // Revoke current user token
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        }
        return $this->success([
            'message' => 'Logged out',
        ]);
    }

    public function update(Request $request){

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

        return response()->json(['status' => 'Password updated.'],200);

      }
}