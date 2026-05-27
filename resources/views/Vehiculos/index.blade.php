@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

<div class="cabecera-historial">
    <h2 class="titulo-seccion">Flota de Vehículos</h2>
    <a href="{{ route('vehiculos.create') }}" class="btn-anadir">
        + Añadir Vehículo
    </a>
</div>

@if(session('success'))
    <div class="alerta-exito">{{ session('success') }}</div>
@endif

<div class="contenedor-historial">
    <div class="tabla-wrapper">
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Matrícula</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>KM Actuales</th>
                    <th>Estado</th>
                    <th class="col-centro">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($vehiculos as $vehiculo)
                <tr>
                    <td class="texto-bold">{{ $vehiculo->matricula }}</td>
                    <td>{{ $vehiculo->marca }}</td>
                    <td>{{ $vehiculo->modelo }}</td>
                    <td>{{ $vehiculo->anio ?? '—' }}</td>
                    <td>{{ number_format($vehiculo->km_actuales) }} km</td>
                    <td>
                        @if($vehiculo->activo)
                            <span class="badge badge-activo">Activo</span>
                        @else
                            <span class="badge badge-baja">Baja</span>
                        @endif
                    </td>
                    <td class="td-centro">
                        <a href="{{ route('vehiculos.edit', $vehiculo) }}" class="accion-link">Editar</a>
                        <form action="{{ route('vehiculos.destroy', $vehiculo) }}" method="POST" class="form-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="accion-peligro"
                                onclick="return confirm('¿Dar de baja este vehículo?')">
                                Dar de baja
                            </button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="7" class="mensaje-vacio">No hay vehículos registrados.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
