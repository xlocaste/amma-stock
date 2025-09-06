<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GudangController extends Controller
{
    public function index()
    {
        $daftarGudang = Gudang::all();

        return Inertia::render('Gudang/List', [
            'daftarGudang' => $daftarGudang,
        ]);
    }
}
