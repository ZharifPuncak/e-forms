<?php

namespace App\Http\Requests\Form;

use Illuminate\Foundation\Http\FormRequest;

class IssuanceRequest extends FormRequest
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
            'companies' => ['required','array'],
            'issued_at' => ['required','after_or_equal:today'],
            'deadlined_at' => ['required','date','after_or_equal:' . now()->addDays(1)->format('Y-m-d')],
        ];
    }
}
