<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;
use App\Models\Vehiculo;
use Barryvdh\DomPDF\Facade\Pdf;

class IncidenciaController extends Controller
{
    public function create()
    {
        $vehiculos = Vehiculo::activos()->get();
        return view('incidencias.create', compact('vehiculos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehiculo_id' => 'required|exists:vehiculos,id',
            'tipo'        => 'required|in:averia,accidente,retraso,otro',
            'descripcion' => 'required|string|max:1000',
        ]);

        Incidencia::create([
            'conductor_id' => auth()->id(),
            'vehiculo_id'  => $request->vehiculo_id,
            'viaje_id'     => null,
            'fecha'        => date('Y-m-d'),
            'tipo'         => $request->tipo,
            'descripcion'  => $request->descripcion,
            'resuelta'     => false,
        ]);

        return redirect()->route('incidencias.index')->with('success', 'Incidencia registrada correctamente');
    }

    public function index()
    {
        if (auth()->user()->isAdmin()) {
            $incidencias = Incidencia::with('vehiculo', 'conductor')
                                    ->orderBy('fecha', 'desc')
                                    ->paginate(15);
        } else {
            $incidencias = Incidencia::with('vehiculo', 'conductor')
                                    ->where('conductor_id', auth()->id())
                                    ->orderBy('fecha', 'desc')
                                    ->paginate(15);
        }

        return view('incidencias.index', compact('incidencias'));
    }

    public function resolver(Incidencia $incidencia)
    {
        // Solo admin o el propio conductor pueden resolver
        if (!auth()->user()->isAdmin() && $incidencia->conductor_id !== auth()->id()) {
            abort(403);
        }

        $incidencia->update(['resuelta' => true]);

        return back()->with('success', 'Incidencia marcada como resuelta.');
    }

    public function exportarPdf()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Recoge todas las incidencias antes de borrar
            $incidencias = Incidencia::with('vehiculo', 'conductor')->orderBy('fecha', 'desc')->get();
            $conductor   = null;

            $pdf = Pdf::loadView('pdf.incidencias', compact('incidencias', 'conductor'))
                      ->setPaper('a4', 'landscape');

            // Vaciar la tabla tras generar el PDF
            Incidencia::query()->delete();

            return $pdf->download('incidencias_' . date('Y-m-d') . '.pdf');
        }

        // Conductor: solo las suyas, sin borrar nada
        $incidencias = Incidencia::with('vehiculo', 'conductor')
                                ->where('conductor_id', $user->id)
                                ->orderBy('fecha', 'desc')
                                ->get();
        $conductor   = $user->name;

        $pdf = Pdf::loadView('pdf.incidencias', compact('incidencias', 'conductor'))
                  ->setPaper('a4', 'landscape');

        return $pdf->download('incidencias_' . date('Y-m-d') . '.pdf');
    }
}
