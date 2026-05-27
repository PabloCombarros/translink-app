@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

@if(session('success'))
    <div class="alerta-exito">{{ session('success') }}</div>
@endif

<div class="contenedor-historial">
    <div class="cabecera-historial">
        <div>
            <h2 class="titulo-seccion">Historial de Repostajes</h2>
            <p style="font-size:0.8rem;color:#94a3b8;margin-top:2px;">
                {{ $repostajes->total() }} {{ $repostajes->total() === 1 ? 'repostaje registrado' : 'repostajes registrados' }}
            </p>
        </div>
        <a href="{{ route('repostajes.pdf') }}" class="btn-exportar btn-exportar-verde">&#8595; Exportar PDF</a>
    </div>

    <div class="tabla-wrapper acento-verde">
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Fecha</th>
                    @if(auth()->user()->isAdmin())
                        <th>Conductor</th>
                    @endif
                    <th>Vehículo</th>
                    <th>Litros</th>
                    <th>€/Litro</th>
                    <th class="col-centro">Total</th>
                    <th>Gasolinera</th>
                </tr>
            </thead>
            <tbody>
                @forelse($repostajes as $repostaje)
                <tr>
                    <td>
                        <span style="font-weight:500;color:#1e293b;">
                            {{ \Carbon\Carbon::parse($repostaje->fecha)->format('d/m/Y') }}
                        </span>
                    </td>
                    @if(auth()->user()->isAdmin())
                        <td class="texto-bold">{{ $repostaje->conductor->name ?? '—' }}</td>
                    @endif
                    <td>
                        <span class="badge badge-activo">{{ $repostaje->vehiculo->matricula ?? 'S/V' }}</span>
                        <span class="texto-muted" style="font-size:12px;margin-left:4px;">{{ $repostaje->vehiculo->marca ?? '' }}</span>
                    </td>
                    <td class="texto-bold">{{ number_format($repostaje->litros, 2) }} L</td>
                    <td class="texto-muted">
                        {{ $repostaje->precio_litro > 0 ? number_format($repostaje->precio_litro, 3) . ' €' : '—' }}
                    </td>
                    <td style="text-align:center;font-weight:700;color:#059669;font-size:0.9rem;">
                        {{ number_format($repostaje->precio_total, 2) }} €
                    </td>
                    <td class="texto-muted">{{ $repostaje->gasolinera ?? '—' }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="{{ auth()->user()->isAdmin() ? 7 : 6 }}">
                        <div class="empty-state">
                            <span class="empty-state-icono">⛽</span>
                            <p class="empty-state-texto">No hay repostajes registrados todavía.</p>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="paginacion">
        {{ $repostajes->links() }}
    </div>
</div>
@endsection
