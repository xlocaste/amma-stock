<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GudangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('gudang')->insert([
            [
                'nama' => 'Beras Premium',
                'kuantitas' => 100,
            ],
            [
                'nama' => 'Gula Pasir',
                'kuantitas' => 50,
            ],
            [
                'nama' => 'Minyak Goreng',
                'kuantitas' => 200,
            ],
            [
                'nama' => 'Tepung Terigu',
                'kuantitas' => 75,
            ],
        ]);
    }
}
