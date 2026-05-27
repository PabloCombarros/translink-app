<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repostaje;
use App\Models\Vehiculo;
use Barryvdh\DomPDF\Facade\Pdf;

class RepostajeController extends Controller
{
    public function index()
    {
        if (auth()->user()->isAdmin()) {
            $repostajes = Repostaje::with('vehiculo', 'conductor')
                                ->orderBy('fecha', 'desc')
                                ->paginate(15);
        } else {
            $repostajes = Repostaje::with('vehiculo', 'conductor')
                                ->where('conductor_id', auth()->id())
                                ->orderBy('fecha', 'desc')
                                ->paginate(15);
        }

        return view('repostajes.index', compact('repostajes'));
    }

    public function create()
    {
        $vehiculos = Vehiculo::activos()->get();
        return view('repostajes.create', compact('vehiculos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehiculo_id'  => 'required|exists:vehiculos,id',
            'litros'       => 'required|numeric|min:0.01',
            'precio_total' => 'required|numeric|min:0',
            'gasolinera'   => 'nullable|string|max:255',
            'fecha'        => 'required|date|before_or_equal:today',
        ]);

        $precioLitro = $request->litros > 0
            ? round($request->precio_total / $request->litros, 3)
            : 0;

        Repostaje::create([
            'conductor_id' => auth()->id(),
            'vehiculo_id'  => $request->vehiculo_id,
            'litros'       => $request->litros,
            'precio_litro' => $precioLitro,
            'precio_total' => $request->precio_total,
            'gasolinera'   => $request->gasolinera,
            'fecha'        => $request->fecha,
        ]);

        return redirect()->route('repostajes.index')->with('success', 'Repostaje registrado correctamente');
    }

    public function exportarPdf()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Recoge todos los repostajes antes de borrar
            $repostajes = Repostaje::with('vehiculo', 'conductor')->orderBy('fecha', 'desc')->get();
            $conductor  = null;

            $pdf = Pdf::loadView('pdf.repostajes', compact('repostajes', 'conductor'))
                      ->setPaper('a4', 'landscape');

            // Vaciar la tabla tras generar el PDF
            Repostaje::query()->delete();

            return $pdf->download('repostajes_' . date('Y-m-d') . '.pdf');
        }

        // Conductor: solo los suyos, sin borrar nada
        $repostajes = Repostaje::with('vehiculo', 'conductor')
                            ->where('conductor_id', $user->id)
                            ->orderBy('fecha', 'desc')
                            ->get();
        $conductor  = $user->name;

        $pdf = Pdf::loadView('pdf.repostajes', compact('repostajes', 'conductor'))
                  ->setPaper('a4', 'landscape');

        return $pdf->download('repostajes_' . date('Y-m-d') . '.pdf');
    }
}
