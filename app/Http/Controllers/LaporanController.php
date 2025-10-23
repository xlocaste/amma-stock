<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        $laporan = Laporan::with('menu')
            ->whereDate('tanggal', Carbon::today())
            ->get();

        return Inertia::render('Laporan/List', [
            'laporan' => $laporan,
        ]);
    }
}
