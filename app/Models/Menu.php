<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';

    protected $fillable = [
        'nama',
        'harga',
        'deskripsi',
    ];

    public function gudang()
    {
        return $this->belongsToMany(Gudang::class, 'menu_gudang')->withPivot('jumlah_bahan')->withTimestamps();
    }
}
