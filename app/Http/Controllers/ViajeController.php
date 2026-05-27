<?php

namespace App\Http\Controllers;

use App\Models\Viaje;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ViajeController extends Controller
{
    // Lista de viajes (historial)
    public function index()
    {
        if (auth()->user()->isAdmin()) {
            $viajes = Viaje::with('vehiculo', 'conductor')
                        ->orderBy('fecha', 'desc')
                        ->paginate(15);
        } else {
            $viajes = Viaje::with('vehiculo', 'conductor')
                        ->where('conductor_id', auth()->id())
                        ->orderBy('fecha', 'desc')
                        ->paginate(15);
        }

        return view('viajes.index', compact('viajes'));
    }

    // Formulario nuevo viaje
    public function create()
    {
        $vehiculos = Vehiculo::activos()->get();
        return view('viajes.create', compact('vehiculos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehiculo_id'   => 'required|exists:vehiculos,id',
            'salida'        => 'required|string|max:255',
            'destino'       => 'required|string|max:255',
            'km_inicio'     => 'required|numeric|min:0',
            'km_fin'        => 'required|numeric|gt:km_inicio',
            'fecha'         => 'required|date|before_or_equal:today',
            'hora_salida'   => 'nullable|date_format:H:i',
            'hora_llegada'  => 'nullable|date_format:H:i',
            'observaciones' => 'nullable|string|max:1000',
            'kg_carga'      => 'nullable|numeric|min:0',
        ]);

        Viaje::create([
            'conductor_id'  => auth()->id(),
            'vehiculo_id'   => $request->vehiculo_id,
            'salida'        => $request->salida,
            'destino'       => $request->destino,
            'km_inicio'     => $request->km_inicio,
            'km_fin'        => $request->km_fin,
            'fecha'         => $request->fecha,
            'hora_salida'   => $request->hora_salida,
            'hora_llegada'  => $request->hora_llegada,
            'observaciones' => $request->observaciones,
            'kg_carga'      => $request->kg_carga,
        ]);

        return redirect()->route('viajes.index')->with('success', 'Viaje registrado correctamente');
    }

    public function exportarPdf()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Recoge todos los viajes antes de borrar
            $viajes    = Viaje::with('vehiculo', 'conductor')->orderBy('fecha', 'desc')->get();
            $conductor = null;

            $pdf = Pdf::loadView('pdf.viajes', compact('viajes', 'conductor'))
                      ->setPaper('a4', 'landscape');

            // Vaciar la tabla tras generar el PDF
            Viaje::query()->delete();

            return $pdf->download('viajes_' . date('Y-m-d') . '.pdf');
        }

        // Conductor: solo sus viajes, sin borrar nada
        $viajes    = Viaje::with('vehiculo', 'conductor')
                        ->where('conductor_id', $user->id)
                        ->orderBy('fecha', 'desc')
                        ->get();
        $conductor = $user->name;

        $pdf = Pdf::loadView('pdf.viajes', compact('viajes', 'conductor'))
                  ->setPaper('a4', 'landscape');

        return $pdf->download('viajes_' . date('Y-m-d') . '.pdf');
    }

    public function cartaDePorte(Viaje $viaje)
    {
        if (!auth()->user()->isAdmin() && $viaje->conductor_id !== auth()->id()) {
            abort(403);
        }

        $viaje->load('vehiculo', 'conductor');

        $pdf = Pdf::loadView('pdf.carta_porte', compact('viaje'))
                  ->setPaper('a4', 'portrait');

        $nombre = 'carta_porte_' . $viaje->id . '_' . $viaje->fecha . '.pdf';
        return $pdf->download($nombre);
    }
}
