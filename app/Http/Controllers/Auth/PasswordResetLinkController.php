<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

use App\Models\Staff\Staff;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
 

    {
        $request->validate([
            'staff_ic_no' => ['required'],
        ]);

        $staff = Staff::with('user')->where('staff_ic_no',$request->staff_ic_no)->first();

        if(!$staff){
            return $this->error(null, 'No staff record found', 422);
        }

        if(filter_var($staff?->user?->email, FILTER_VALIDATE_EMAIL)){

            $status = Password::sendResetLink(
               ['email' => $staff?->user?->email]
            );

            if ($status != Password::RESET_LINK_SENT) {
                throw ValidationException::withMessages([
                    'email' => [__($status)],
                ]);
            }

            return response()->json(['status' => __($status)]);
        }

        return response()->json(['status' => 'Email sent']);
    }
}
