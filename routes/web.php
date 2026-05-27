<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\RepostajeController;
use App\Http\Controllers\ViajeController;
use App\Http\Controllers\IncidenciaController;

// Rutas protegidas por login
Route::middleware(['auth'])->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // ── Viajes ──────────────────────────────────────
    Route::get('/viajes',        [ViajeController::class, 'index'])->name('viajes.index');   // Lista
    Route::get('/viajes/nuevo',  [ViajeController::class, 'create'])->name('viajes.create'); // Formulario
    Route::post('/viajes',       [ViajeController::class, 'store'])->name('viajes.store');
    Route::get('/viajes/pdf',    [ViajeController::class, 'exportarPdf'])->name('viajes.pdf');
    Route::get('/viajes/{viaje}/carta', [ViajeController::class, 'cartaDePorte'])->name('viajes.carta');

    // ── Repostajes ───────────────────────────────────
    Route::get('/repostajes',        [RepostajeController::class, 'index'])->name('repostajes.index');   // Lista
    Route::get('/repostajes/nuevo',  [RepostajeController::class, 'create'])->name('repostajes.create'); // Formulario
    Route::post('/repostajes',       [RepostajeController::class, 'store'])->name('repostajes.store');
    Route::get('/repostajes/pdf',    [RepostajeController::class, 'exportarPdf'])->name('repostajes.pdf');

    // ── Incidencias ──────────────────────────────────
    Route::get('/incidencias',        [IncidenciaController::class, 'index'])->name('incidencias.index');   // Lista
    Route::get('/incidencias/nueva',  [IncidenciaController::class, 'create'])->name('incidencias.create'); // Formulario
    Route::post('/incidencias',       [IncidenciaController::class, 'store'])->name('incidencias.store');
    Route::get('/incidencias/pdf',    [IncidenciaController::class, 'exportarPdf'])->name('incidencias.pdf');
    Route::patch('/incidencias/{incidencia}/resolver', [IncidenciaController::class, 'resolver'])->name('incidencias.resolver');

    // ── Perfil ───────────────────────────────────────
    Route::get('/profile',    [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',  [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas solo para administrador
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/vehiculos',                   [VehiculoController::class, 'index'])->name('vehiculos.index');
    Route::get('/vehiculos/nuevo',             [VehiculoController::class, 'create'])->name('vehiculos.create');
    Route::post('/vehiculos',                  [VehiculoController::class, 'store'])->name('vehiculos.store');
    Route::get('/vehiculos/{vehiculo}/editar', [VehiculoController::class, 'edit'])->name('vehiculos.edit');
    Route::patch('/vehiculos/{vehiculo}',      [VehiculoController::class, 'update'])->name('vehiculos.update');
    Route::delete('/vehiculos/{vehiculo}',     [VehiculoController::class, 'destroy'])->name('vehiculos.destroy');
});

require __DIR__.'/auth.php';
