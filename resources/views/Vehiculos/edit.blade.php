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
                <div class="form-pro-icono-box">✏️</div>
                <div>
                    <h2 class="form-pro-titulo">Editar vehículo</h2>
                    <p class="form-pro-subtitulo">{{ $vehiculo->matricula }} — {{ $vehiculo->marca }} {{ $vehiculo->modelo }}</p>
                </div>
            </div>
        </div>

        <form action="{{ route('vehiculos.update', $vehiculo) }}" method="POST" class="form-pro-body">
            @csrf
            @method('PATCH')

            <div class="form-seccion">
                <span class="form-seccion-titulo">Identificación</span>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>Matrícula</label>
                        <input type="text" name="matricula" required value="{{ old('matricula', $vehiculo->matricula) }}">
                        @error('matricula') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Año</label>
                        <input type="number" name="anio" value="{{ old('anio', $vehiculo->anio) }}">
                    </div>
                </div>
            </div>

            <hr class="form-pro-divider">

            <div class="form-seccion">
                <span class="form-seccion-titulo">Datos del vehículo</span>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>Marca</label>
                        <input type="text" name="marca" required value="{{ old('marca', $vehiculo->marca) }}">
                        @error('marca') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Modelo</label>
                        <input type="text" name="modelo" required value="{{ old('modelo', $vehiculo->modelo) }}">
                        @error('modelo') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                </div>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>KM actuales</label>
                        <input type="number" name="km_actuales" required value="{{ old('km_actuales', $vehiculo->km_actuales) }}">
                        @error('km_actuales') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Estado</label>
                        <select name="activo">
                            <option value="1" {{ $vehiculo->activo ? 'selected' : '' }}>Activo</option>
                            <option value="0" {{ !$vehiculo->activo ? 'selected' : '' }}>De baja</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; padding-top:4px;">
                <button type="submit" class="boton-submit-pro boton-submit-pro--azul">Guardar cambios</button>
                <a href="{{ route('vehiculos.index') }}" class="boton-cancelar">Cancelar</a>
            </div>

        </form>
    </div>
</div>
@endsection
