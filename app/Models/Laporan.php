<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $table = 'laporan';

    protected $fillable = [
        'menu_id',
        'qty',
        'total_harga',
        'tanggal'
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
