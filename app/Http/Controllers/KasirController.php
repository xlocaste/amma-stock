<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    public function index()
    {
        $daftarMenu = Menu::with('gudang')->get();

        return Inertia::render('Kasir/List', [
            'daftarMenu' => $daftarMenu,
        ]);
    }
}
