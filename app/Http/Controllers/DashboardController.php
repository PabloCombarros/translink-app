<?php

namespace App\Http\Controllers;

use App\Models\Viaje;
use App\Models\Repostaje;
use App\Models\Incidencia;

class DashboardController extends Controller
{
    public function index()
{
    $hoy = date('Y-m-d');
    $esAdmin = auth()->user()->isAdmin();
    $conductorId = auth()->id();

    if ($esAdmin) {
        $viajesHoy = Viaje::where('fecha', $hoy)->get();
        $kmTotales = Viaje::all()->sum(fn($v) => $v->km_fin - $v->km_inicio);
        $incidencias = Incidencia::count();
        $gastoRepostajes = Repostaje::sum('precio_total');
    } else {
        $viajesHoy = Viaje::where('fecha', $hoy)
                        ->where('conductor_id', $conductorId)
                        ->get();
        $kmTotales = Viaje::where('conductor_id', $conductorId)
                        ->get()
                        ->sum(fn($v) => $v->km_fin - $v->km_inicio);
        $incidencias = Incidencia::where('conductor_id', $conductorId)->count();
        $gastoRepostajes = Repostaje::where('conductor_id', $conductorId)->sum('precio_total');
    }

    $viajesHoyCount = $viajesHoy->count();
    $kmHoy = $viajesHoy->sum(fn($v) => $v->km_fin - $v->km_inicio);

    return view('inicio', compact(
        'viajesHoyCount',
        'kmHoy',
        'kmTotales',
        'incidencias',
        'gastoRepostajes'
    ));
}
}