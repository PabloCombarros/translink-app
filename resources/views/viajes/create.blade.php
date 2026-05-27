@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="{{ asset('css/app.css') }}">

<div class="pagina-form" style="max-width:480px;">

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

        <div class="form-pro-header form-pro-header--azul" style="padding:20px 24px 0;">
            <div class="form-pro-header-inner" style="padding-bottom:14px;">
                <div class="form-pro-icono-box" style="width:36px;height:36px;font-size:16px;">🚛</div>
                <div>
                    <h2 class="form-pro-titulo" style="font-size:15px;">Nuevo viaje</h2>
                    <p class="form-pro-subtitulo">Registra los datos del trayecto</p>
                </div>
            </div>
        </div>

        <form action="{{ route('viajes.store') }}" method="POST" class="form-pro-body" style="gap:12px;padding:18px 24px 22px;">
            @csrf

            {{-- Vehículo --}}
            <div class="campo-grupo">
                <label>Vehículo</label>
                <select name="vehiculo_id" required>
                    <option value="">Selecciona un vehículo</option>
                    @foreach($vehiculos as $vehiculo)
                        <option value="{{ $vehiculo->id }}" {{ old('vehiculo_id') == $vehiculo->id ? 'selected' : '' }}>
                            {{ $vehiculo->matricula }} — {{ $vehiculo->marca }} {{ $vehiculo->modelo }}
                        </option>
                    @endforeach
                </select>
                @error('vehiculo_id') <span class="error-campo">{{ $message }}</span> @enderror
            </div>

            {{-- Ruta --}}
            <div class="grid-2-columnas">
                <div class="campo-grupo">
                    <label>Salida</label>
                    <input type="text" name="salida" value="{{ old('salida') }}" placeholder="Origen" required>
                    @error('salida') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
                <div class="campo-grupo">
                    <label>Destino</label>
                    <input type="text" name="destino" value="{{ old('destino') }}" placeholder="Destino" required>
                    @error('destino') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
            </div>

            {{-- KM + Fecha en la misma fila --}}
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.75rem;">
                <div class="campo-grupo">
                    <label>KM inicio</label>
                    <input type="number" name="km_inicio" value="{{ old('km_inicio') }}" min="0" placeholder="125000" required>
                    @error('km_inicio') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
                <div class="campo-grupo">
                    <label>KM fin</label>
                    <input type="number" name="km_fin" value="{{ old('km_fin') }}" min="0" placeholder="125450" required>
                    @error('km_fin') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
                <div class="campo-grupo">
                    <label>Fecha</label>
                    <input type="date" name="fecha" value="{{ old('fecha', date('Y-m-d')) }}" max="{{ date('Y-m-d') }}" required>
                    @error('fecha') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
            </div>

            {{-- Horas --}}
            <div class="grid-2-columnas">
                <div class="campo-grupo">
                    <label>Hora salida <span class="label-opcional">(opc.)</span></label>
                    <input type="time" name="hora_salida" value="{{ old('hora_salida') }}">
                </div>
                <div class="campo-grupo">
                    <label>Hora llegada <span class="label-opcional">(opc.)</span></label>
                    <input type="time" name="hora_llegada" value="{{ old('hora_llegada') }}">
                </div>
            </div>

            {{-- Carga y observaciones --}}
            <div class="campo-grupo">
                <label>Kg de carga <span class="label-opcional">(opc.)</span></label>
                <input type="number" step="0.01" name="kg_carga" value="{{ old('kg_carga') }}" min="0" placeholder="1500">
                @error('kg_carga') <span class="error-campo">{{ $message }}</span> @enderror
            </div>

            <div class="campo-grupo">
                <label>Observaciones <span class="label-opcional">(opc.)</span></label>
                <textarea name="observaciones" rows="2" placeholder="Notas...">{{ old('observaciones') }}</textarea>
            </div>

            <div style="display:flex;flex-direction:column;gap:6px;padding-top:2px;">
                <button type="submit" class="boton-submit-pro boton-submit-pro--azul">Guardar viaje</button>
                <a href="{{ route('viajes.index') }}" class="boton-cancelar">Cancelar</a>
            </div>

        </form>
    </div>
</div>
@endsection
