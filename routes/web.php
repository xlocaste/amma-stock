<?php

use App\Http\Controllers\GudangController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/gudang')->name('gudang.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/', [GudangController::class, 'index'])->name('index');
        Route::get('/create', [GudangController::class, 'create'])->name('create');
        Route::get('/{gudang}', [GudangController::class, 'edit'])->name('edit');
        Route::put('/{gudang}', [GudangController::class, 'update'])->name('update');
        Route::delete('/{gudang}', [GudangController::class, 'destroy'])->name('destroy');
        Route::post('/', [GudangController::class, 'store'])->name('store');
    });
});

Route::prefix('/menu')->name('menu.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/', [MenuController::class, 'index'])->name('index');
        Route::get('/create', [MenuController::class, 'create'])->name('create');
        Route::get('/{menu}', [MenuController::class, 'edit'])->name('edit');
        Route::put('/{menu}', [MenuController::class, 'update'])->name('update');
        Route::delete('/{menu}', [MenuController::class, 'destroy'])->name('destroy');
        Route::post('/', [MenuController::class, 'store'])->name('store');
    });
});

require __DIR__.'/auth.php';
