@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

@if(session('success'))
    <div class="alerta-exito">{{ session('success') }}</div>
@endif

<div class="contenedor-historial">
    <div class="cabecera-historial">
        <div>
            <h2 class="titulo-seccion">Historial de Viajes</h2>
            <p style="font-size:0.8rem;color:#94a3b8;margin-top:2px;">
                {{ $viajes->total() }} {{ $viajes->total() === 1 ? 'viaje registrado' : 'viajes registrados' }}
            </p>
        </div>
        <a href="{{ route('viajes.pdf') }}" class="btn-exportar btn-exportar-azul">&#8595; Exportar PDF</a>
    </div>

    <div class="tabla-wrapper acento-azul">
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Fecha</th>
                    @if(auth()->user()->isAdmin())
                        <th>Conductor</th>
                    @endif
                    <th>Matrícula</th>
                    <th>Ruta</th>
                    <th>KM inicio / fin</th>
                    <th>Carga (kg)</th>
                    <th class="col-centro">Total KM</th>
                    <th class="col-centro">Carta</th>
                </tr>
            </thead>
            <tbody>
                @forelse($viajes as $viaje)
                <tr>
                    <td>
                        <span style="font-weight:500;color:#1e293b;">
                            {{ \Carbon\Carbon::parse($viaje->fecha)->format('d/m/Y') }}
                        </span>
                    </td>
                    @if(auth()->user()->isAdmin())
                        <td class="texto-bold">{{ $viaje->conductor->name ?? '—' }}</td>
                    @endif
                    <td>
                        <span class="badge badge-activo">{{ $viaje->vehiculo->matricula ?? 'S/V' }}</span>
                    </td>
                    <td>
                        <span class="ruta-salida">{{ $viaje->salida ?? '---' }}</span>
                        <span class="ruta-destino">&#8594; {{ $viaje->destino ?? '---' }}</span>
                    </td>
                    <td class="texto-pequeño">
                        {{ number_format($viaje->km_inicio) }} — {{ number_format($viaje->km_fin) }}
                    </td>
                    <td class="texto-muted">
                        {{ $viaje->kg_carga ? number_format($viaje->kg_carga, 0) . ' kg' : '—' }}
                    </td>
                    <td class="total-kms">
                        {{ number_format($viaje->km_fin - $viaje->km_inicio) }} km
                    </td>
                    <td class="td-centro">
                        <a href="{{ route('viajes.carta', $viaje) }}" class="btn-carta" title="Descargar carta de porte">
                            &#128196; Carta
                        </a>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="{{ auth()->user()->isAdmin() ? 8 : 7 }}">
                        <div class="empty-state">
                            <span class="empty-state-icono">🚛</span>
                            <p class="empty-state-texto">No hay viajes registrados todavía.</p>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="paginacion">
        {{ $viajes->links() }}
    </div>
</div>
@endsection
