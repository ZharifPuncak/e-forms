<?php

namespace App\Http\Requests\Form;

use Illuminate\Foundation\Http\FormRequest;

class FormStoreRequest extends FormRequest
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
    public function rules()
    {
        return [
            'name' => ['required','string','max:30','min:3'],
            'alias' => ['required','string','max:10','min:3'],
            'category' => ['required'],
            'descriptions' => ['required','max:3000'],
            'effective_from' => ['required','date'],
            'effective_to' => ['required','date','after_or_equal:effective_from'],
        ];
    }
}
