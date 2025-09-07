<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gudang extends Model
{
    use HasFactory;

    protected $table = 'gudang';

    protected $fillable = [
        'nama',
        'kuantitas',
    ];

    public function menu()
    {
        return $this->belongsToMany(Menu::class, 'menu_gudang')->withPivot('jumlah_bahan')->withTimestamps();
    }
}
