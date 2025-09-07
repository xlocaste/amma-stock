<?php

namespace App\Http\Requests\Gudang;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'nama' => 'required|string|max:255',
            'kuantitas' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama gudang wajib diisi.',
            'nama.string' => 'Nama gudang harus berupa teks.',
            'nama.max' => 'Nama gudang maksimal :max karakter.',

            'kuantitas.required' => 'Kuantitas wajib diisi.',
            'kuantitas.numeric' => 'Kuantitas harus berupa angka.',
            'kuantitas.min' => 'Kuantitas minimal :min.',
        ];
    }
}
