<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index()
    {
        $vehiculos = Vehiculo::all();
        return view('vehiculos.index', compact('vehiculos'));
    }

    public function create()
    {
        return view('vehiculos.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'matricula'   => 'required|string|unique:vehiculos,matricula',
            'marca'       => 'required|string|max:100',
            'modelo'      => 'required|string|max:100',
            'anio'        => 'nullable|integer|min:1990|max:2030',
            'km_actuales' => 'required|integer|min:0',
        ]);

        Vehiculo::create($request->all());

        return redirect()->route('vehiculos.index')
                         ->with('success', 'Vehículo añadido correctamente');
    }

    public function edit(Vehiculo $vehiculo)
    {
        return view('vehiculos.edit', compact('vehiculo'));
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        $request->validate([
            'matricula'   => 'required|string|unique:vehiculos,matricula,' . $vehiculo->id,
            'marca'       => 'required|string|max:100',
            'modelo'      => 'required|string|max:100',
            'anio'        => 'nullable|integer|min:1990|max:2030',
            'km_actuales' => 'required|integer|min:0',
        ]);

        $vehiculo->update($request->all());

        return redirect()->route('vehiculos.index')
                        ->with('success', 'Vehículo actualizado correctamente');
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->update(['activo' => false]);

        return redirect()->route('vehiculos.index')
                        ->with('success', 'Vehículo dado de baja correctamente');
    }
}