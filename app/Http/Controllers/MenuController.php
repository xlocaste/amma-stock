<?php

namespace App\Http\Controllers;

use App\Http\Requests\Menu\StoreRequest;
use App\Models\Menu;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $daftarMenu = Menu::all();

        return Inertia::render('Menu/List', [
            'daftarMenu' => $daftarMenu,
        ]);
    }

    public function store(StoreRequest $request)
    {
        Menu::create([
            'nama'=>$request->nama,
            'harga'=>$request->harga,
            'deskripsi'=>$request->deskripsi,
        ]);

        return redirect()->route('menu.index');
    }

    public function create()
    {
        return Inertia::render('Menu/Add');
    }
}
