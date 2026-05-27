@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

<h1 class="titulo-principal">Resumen Diario de Operaciones</h1>

<div class="contenedor-tarjetas">
    <a href="{{ route('viajes.create') }}" class="enlace-tarjeta">
        <div class="tarjeta tarjeta-verde">
            <h3>Viajes Hoy</h3>
            <p class="valor-numerico">{{ $viajesHoyCount }}</p>
        </div>
    </a>

    <a href="{{ route('incidencias.create') }}" class="enlace-tarjeta">
        <div class="tarjeta tarjeta-roja">
            <h3>Incidencias</h3>
            <p class="valor-numerico">{{ $incidencias }}</p>
        </div>
    </a>

    <a href="{{ route('repostajes.create') }}" class="enlace-tarjeta">
        <div class="tarjeta tarjeta-amarilla">
            <h3>Gasto Repostajes</h3>
            <p class="valor-numerico">{{ number_format($gastoRepostajes, 2) }} €</p>
        </div>
    </a>

    <a href="{{ route('viajes.index') }}" class="enlace-tarjeta">
        <div class="tarjeta tarjeta-azul">
            <h3>Kilómetros Totales</h3>
            <p class="valor-numerico">{{ number_format($kmTotales) }} km</p>
        </div>
    </a>
</div>
@endsection
