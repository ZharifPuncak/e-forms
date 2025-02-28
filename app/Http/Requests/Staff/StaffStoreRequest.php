<?php

namespace App\Http\Requests\Staff;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StaffStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'       => ['required','string','max:30','min:3'],
            'gender'     => ['required'],
            'staffId'    => ['required','string','max:12','min:5','unique:staffs,staff_no'],
            'staffIC'    => ['required', 'size:12', 'regex:/^\d{12}$/','unique:staffs,staff_ic_no'],
            'email'      => ['required','email','unique:users,email'],
            'company'    => ['required'],
            'department' => ['required'],
            'category'   => ['required'],
            'position'   => ['required'],
            'dateJoined' => ['required','date']
        ];
    }
}
