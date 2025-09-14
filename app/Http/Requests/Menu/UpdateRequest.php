<?php

namespace App\Http\Requests\Menu;

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
            'nama'      => 'required|string|max:255|unique:menu,nama',
            'harga'     => 'required|numeric|min:0',
            'deskripsi' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Pesan error custom.
     */
    public function messages(): array
    {
        return [
            'nama.required'      => 'Nama menu wajib diisi.',
            'nama.string'        => 'Nama menu harus berupa teks.',
            'nama.max'           => 'Nama menu maksimal 255 karakter.',
            'nama.unique'        => 'Nama menu sudah ada di database.',

            'harga.required'     => 'Harga wajib diisi.',
            'harga.numeric'      => 'Harga harus berupa angka.',
            'harga.min'          => 'Harga minimal 0.',

            'deskripsi.string'   => 'Deskripsi harus berupa teks.',
            'deskripsi.max'      => 'Deskripsi maksimal 1000 karakter.',
        ];
    }
}
