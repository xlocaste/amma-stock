<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\Menu;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    public function index()
    {
        $daftarMenu = Menu::with('gudang')->get();

        $daftarMenu->each(function ($menu) {
            $menu->ready = $menu->gudang->every(function ($gudang) {
                return $gudang->kuantitas >= $gudang->pivot->jumlah_bahan;
            });
        });

        return Inertia::render('Kasir/List', [
            'daftarMenu' => $daftarMenu,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:menu,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        foreach ($validated['items'] as $item) {
            $menu = Menu::with('gudang')->findOrFail($item['id']);

            foreach ($menu->gudang as $gudang) {
                $jumlahBahan = $gudang->pivot->jumlah_bahan;
                $totalDipakai = $jumlahBahan * $item['qty'];

                $gudang->kuantitas = max(0, $gudang->kuantitas - $totalDipakai);
                $gudang->save();
            }

            Laporan::create([
                'menu_id' => $menu->id,
                'qty' => $item['qty'],
                'total_harga' => $menu->harga * $item['qty'],
                'tanggal' => Carbon::today(),
            ]);
        }

        return back()->with('success', 'Pesanan berhasil diproses dan stok gudang diperbarui.');
    }

}
