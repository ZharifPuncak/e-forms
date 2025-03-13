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
use App\Http\Requests\Auth\LoginRequest;

use App\Http\Resources\User\AdminResource;
use App\Http\Resources\User\StaffResource;
use Spatie\Permission\Models\Permission;





class AuthController extends Controller
{
    use HttpResponses;

    public function staffLogin(LoginUserRequest $request){

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
            'user' => new StaffResource($staff),
            'permissions' => auth()->user()->getPermissionsViaRoles()->pluck("name"),
            'token' => $staff?->user?->createToken('API Token '.$staff?->user?->name)->plainTextToken,
        ]);

    }


    public function adminLogin(LoginRequest $request){

       
        $request->validated($request->all());

        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return $this->error('','Credentials do not match',401);
        };

        if(!User::where('email',$request->email)->first()){
            return $this->error('','Email is not found',401);
        }
        
        $user = User::where('email',$request->email)->first();

        return $this->success([
            'user' => new AdminResource($user),
            'permissions' => auth()->user()->getPermissionsViaRoles()->pluck("name"),
            'token' => $user->createToken('API Token '.$user->name)->plainTextToken,
            'roles' => $user->roles->pluck('name')->toArray()
        ]);

    }

    public function logout(Request $request){


        $user = request()->user();

        if($user){
            // Revoke current user token
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        }
  
        return response()->json(['message' => 'Logged out.'],200);
    }


}