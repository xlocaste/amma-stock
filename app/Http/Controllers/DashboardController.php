<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\Laporan;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $penjualanHariIni = Laporan::whereDate('created_at', today())->sum('total_harga');

        $totalTransaksiHariIni = Laporan::whereDate('created_at', today())->count();

        $totalMenu = Menu::count();

        $stokMenipis = Gudang::where('kuantitas', '<', 10)->count();

        $transaksiTerakhir = Laporan::with('menu')
            ->whereDate('created_at', today())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'penjualanHariIni' => $penjualanHariIni,
            'totalTransaksiHariIni' => $totalTransaksiHariIni,
            'totalMenu' => $totalMenu,
            'stokMenipis' => $stokMenipis,
            'transaksiTerakhir' => $transaksiTerakhir,
        ]);
    }
}
