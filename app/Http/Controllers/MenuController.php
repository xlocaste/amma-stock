<?php

namespace App\Http\Controllers;

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
}
