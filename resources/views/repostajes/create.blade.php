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
                <div class="form-pro-icono-box">⛽</div>
                <div>
                    <h2 class="form-pro-titulo">Nuevo repostaje</h2>
                    <p class="form-pro-subtitulo">Registra el combustible repostado</p>
                </div>
            </div>
        </div>

        <form action="{{ route('repostajes.store') }}" method="POST" class="form-pro-body">
            @csrf

            <div class="form-seccion">
                <span class="form-seccion-titulo">Vehículo</span>
                <div class="campo-grupo">
                    <label>Vehículo asignado</label>
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
            </div>

            <hr class="form-pro-divider">

            <div class="form-seccion">
                <span class="form-seccion-titulo">Combustible</span>
                <div class="grid-2-columnas">
                    <div class="campo-grupo">
                        <label>Litros repostados</label>
                        <input type="number" step="0.01" name="litros" id="litros"
                               value="{{ old('litros') }}" placeholder="80.50" required>
                        @error('litros') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                    <div class="campo-grupo">
                        <label>Total pagado (€)</label>
                        <input type="number" step="0.01" name="precio_total" id="precio_total"
                               value="{{ old('precio_total') }}" placeholder="120.75" required>
                        @error('precio_total') <span class="error-campo">{{ $message }}</span> @enderror
                    </div>
                </div>
                <div class="campo-grupo">
                    <label>Precio por litro <span class="label-opcional">(calculado automáticamente)</span></label>
                    <input type="text" id="precio_litro_display" class="input-readonly" readonly
                           placeholder="Se calcula al introducir litros y total">
                </div>
            </div>

            <hr class="form-pro-divider">

            <div class="form-seccion">
                <span class="form-seccion-titulo">Lugar y fecha</span>
                <div class="campo-grupo">
                    <label>Gasolinera <span class="label-opcional">(opcional)</span></label>
                    <input type="text" name="gasolinera" value="{{ old('gasolinera') }}"
                           placeholder="Ej: Repsol Calle Mayor">
                </div>
                <div class="campo-grupo">
                    <label>Fecha</label>
                    <input type="date" name="fecha" value="{{ old('fecha', date('Y-m-d')) }}"
                           max="{{ date('Y-m-d') }}" required>
                    @error('fecha') <span class="error-campo">{{ $message }}</span> @enderror
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; padding-top:4px;">
                <button type="submit" class="boton-submit-pro boton-submit-pro--azul">Guardar repostaje</button>
                <a href="{{ route('repostajes.index') }}" class="boton-cancelar">Cancelar</a>
            </div>

        </form>
    </div>
</div>

<script>
    function calcularPrecioLitro() {
        const litros = parseFloat(document.getElementById('litros').value);
        const total  = parseFloat(document.getElementById('precio_total').value);
        const campo  = document.getElementById('precio_litro_display');
        if (litros > 0 && total > 0) {
            campo.value = (total / litros).toFixed(3) + ' €/L';
        } else {
            campo.value = '';
        }
    }
    document.getElementById('litros').addEventListener('input', calcularPrecioLitro);
    document.getElementById('precio_total').addEventListener('input', calcularPrecioLitro);
</script>
@endsection
