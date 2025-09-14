<?php

namespace App\Http\Controllers;

use App\Http\Requests\Menu\StoreRequest;
use App\Http\Requests\Menu\UpdateRequest;
use App\Models\Gudang;
use App\Models\Menu;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $daftarMenu = Menu::with('gudang')->get();

        return Inertia::render('Menu/List', [
            'daftarMenu' => $daftarMenu,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $menu = Menu::create([
            'nama'=>$request->nama,
            'harga'=>$request->harga,
            'deskripsi'=>$request->deskripsi,
        ]);

        if ($request->filled('bahan')) {
            $pivotData = collect($request->bahan)
                ->filter(fn ($item) => $item['gudang_id'] && $item['jumlah_bahan'])
                ->mapWithKeys(function ($item) {
                    return [$item['gudang_id'] => ['jumlah_bahan' => $item['jumlah_bahan']]];
                })
                ->toArray();

            $menu->gudang()->attach($pivotData);
        }

        return redirect()->route('menu.index');
    }

    public function create()
    {
        $gudang = Gudang::select('id','nama')->get();

        return Inertia::render('Menu/Add', [
            'gudang' => $gudang,
        ]);
    }

    public function update(UpdateRequest $request, Menu $menu)
    {
        $menu->update([
            'nama'=>$request->nama,
            'harga'=>$request->harga,
            'deskripsi'=>$request->deskripsi,
        ]);

        $pivotData = [];
        foreach ($request->bahan as $bahan) {
            if ($bahan['gudang_id']) {
                $pivotData[$bahan['gudang_id']] = ['jumlah_bahan' => $bahan['jumlah_bahan']];
            }
        }
        $menu->gudang()->sync($pivotData);

        return redirect()->route('menu.index');
    }

    public function edit(Menu $menu)
    {
        $menu->load('gudang');

        $gudang = Gudang::select('id','nama')->get();

        return Inertia::render('Menu/Update', [
            'menu' => $menu,
            'gudang' => $gudang,
        ]);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('menu.index');
    }
}
