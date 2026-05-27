@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

<div class="cabecera-historial">
    <h2 class="titulo-seccion">Historial de Incidencias</h2>
    <a href="{{ route('incidencias.pdf') }}" class="btn-exportar btn-exportar-rojo">
        &#8595; Exportar PDF
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
                    <th>Fecha</th>
                    @if(auth()->user()->isAdmin())
                        <th>Conductor</th>
                    @endif
                    <th>Vehículo</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th class="col-centro">Estado</th>
                    <th class="col-centro">Acción</th>
                </tr>
            </thead>
            <tbody>
                @forelse($incidencias as $incidencia)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($incidencia->fecha)->format('d/m/Y') }}</td>
                    @if(auth()->user()->isAdmin())
                        <td class="texto-bold">{{ $incidencia->conductor->name ?? '—' }}</td>
                    @endif
                    <td class="texto-bold">{{ $incidencia->vehiculo->matricula ?? '—' }}</td>
                    <td>
                        <span class="badge badge-{{ $incidencia->tipo }}">
                            {{ ucfirst($incidencia->tipo) }}
                        </span>
                    </td>
                    <td class="td-descripcion">
                        {{ Str::limit($incidencia->descripcion, 60) }}
                    </td>
                    <td class="td-centro">
                        @if($incidencia->resuelta)
                            <span class="badge badge-resuelta">Resuelta</span>
                        @else
                            <span class="badge badge-pendiente">Pendiente</span>
                        @endif
                    </td>
                    <td class="td-centro">
                        @if(!$incidencia->resuelta)
                            <form action="{{ route('incidencias.resolver', $incidencia) }}" method="POST" class="form-inline">
                                @csrf
                                @method('PATCH')
                                <button type="submit" class="accion-resolver"
                                    onclick="return confirm('¿Marcar esta incidencia como resuelta?')">
                                    ✓ Resolver
                                </button>
                            </form>
                        @else
                            <span class="accion-resuelta">—</span>
                        @endif
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="{{ auth()->user()->isAdmin() ? 7 : 6 }}">
                        <div class="empty-state">
                            <span class="empty-state-icono">⚠️</span>
                            <p class="empty-state-texto">No hay incidencias registradas.</p>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="paginacion">
        {{ $incidencias->links() }}
    </div>
</div>
@endsection
