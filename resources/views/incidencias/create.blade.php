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
                <div class="form-pro-icono-box">⚠️</div>
                <div>
                    <h2 class="form-pro-titulo">Nueva incidencia</h2>
                    <p class="form-pro-subtitulo">Registra el problema ocurrido durante el servicio</p>
                </div>
            </div>
        </div>

        <form action="{{ route('incidencias.store') }}" method="POST" class="form-pro-body">
            @csrf

            <div class="form-seccion">
                <span class="form-seccion-titulo">Vehículo afectado</span>
                <div class="campo-grupo">
                    <label>Vehículo</label>
                    <select name="vehiculo_id" required>
                        <option value="">Selecciona un vehículo</option>
                        @foreach($vehiculos as $vehiculo)
                            <option value="{{ $vehiculo->id }}">
                                {{ $vehiculo->matricula }} — {{ $vehiculo->marca }} {{ $vehiculo->modelo }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <hr class="form-pro-divider">

            <div class="form-seccion">
                <span class="form-seccion-titulo">Tipo y descripción</span>
                <div class="campo-grupo">
                    <label>Tipo de incidencia</label>
                    <select name="tipo" required>
                        <option value="">Selecciona el tipo</option>
                        <option value="averia">Avería</option>
                        <option value="accidente">Accidente</option>
                        <option value="retraso">Retraso</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="campo-grupo">
                    <label>Descripción</label>
                    <textarea name="descripcion" rows="4" required
                        placeholder="Describe qué ocurrió, dónde y cuándo..."></textarea>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; padding-top:4px;">
                <button type="submit" class="boton-submit-pro boton-submit-pro--azul">Registrar incidencia</button>
                <a href="{{ route('incidencias.index') }}" class="boton-cancelar">Cancelar</a>
            </div>

        </form>
    </div>
</div>
@endsection
