<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menu')->insert([
            [
                'nama'       => 'Nasi Goreng Spesial',
                'harga'      => 25000,
                'deskripsi'  => 'Nasi goreng dengan ayam, telur, dan sayuran segar.',
            ],
            [
                'nama'       => 'Ayam Geprek Sambal Bawang',
                'harga'      => 20000,
                'deskripsi'  => 'Ayam crispy dengan sambal bawang pedas.',
            ],
            [
                'nama'       => 'Es Teh Manis',
                'harga'      => 5000,
                'deskripsi'  => 'Minuman teh manis dingin segar.',
            ],
            [
                'nama'       => 'Kopi Hitam',
                'harga'      => 8000,
                'deskripsi'  => 'Kopi hitam panas khas resto.',
            ],
        ]);
    }
}
