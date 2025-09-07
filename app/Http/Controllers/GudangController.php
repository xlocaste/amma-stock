<?php

namespace App\Http\Controllers;

use App\Http\Requests\Gudang\StoreRequest;
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

    public function store(StoreRequest $request)
    {
        Gudang::create([
            'nama'=>$request->nama,
            'kuantitas'=>$request->kuantitas,
        ]);

        return redirect()->route('gudang.index');
    }

    public function create()
    {
        return Inertia::render('Gudang/Add');
    }
}
