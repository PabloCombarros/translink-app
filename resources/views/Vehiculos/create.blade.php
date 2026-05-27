@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

<div class="pagina-form">

    @if ($errors->any())
        <div class="alerta-error" style="margin-bottom:1rem;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="form-pro">

        <div class="form-pro-header form-pro-header--azul">
            <div class="form-pro-header-inner">
                <div class="form-pro-icono-box">🚚</div>
                <div>
                    <h2 class="form-pro-titulo">Añadir vehículo</h2>
                    <p class="form-pro-subtitulo">Registra un nuevo vehículo en la flota</p>
                </div>
            </div>
        </div>

        <form action="{{ route('vehiculos.store') }}" method="POST" class="form-pro-body">
            @csrf

            <div class="form-seccion">
                <span class="form-seccion-titulo">Identificación</span>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>Matrícula</label>
                        <input type="text" name="matricula" placeholder="Ej: 1234-ABC" required value="{{ old('matricula') }}">
                        @error('matricula') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Año</label>
                        <input type="number" name="anio" placeholder="2021" value="{{ old('anio') }}">
                    </div>
                </div>
            </div>

            <hr class="form-pro-divider">

            <div class="form-seccion">
                <span class="form-seccion-titulo">Datos del vehículo</span>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>Marca</label>
                        <input type="text" name="marca" placeholder="Mercedes" required value="{{ old('marca') }}">
                        @error('marca') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Modelo</label>
                        <input type="text" name="modelo" placeholder="Actros 1845" required value="{{ old('modelo') }}">
                        @error('modelo') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                </div>
                <div class="campo-grupo">
                    <label>KM actuales</label>
                    <input type="number" name="km_actuales" placeholder="145000" required value="{{ old('km_actuales') }}">
                    @error('km_actuales') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; padding-top:4px;">
                <button type="submit" class="boton-submit-pro boton-submit-pro--azul">Guardar vehículo</button>
                <a href="{{ route('vehiculos.index') }}" class="boton-cancelar">Cancelar</a>
            </div>

        </form>
    </div>
</div>
@endsection
