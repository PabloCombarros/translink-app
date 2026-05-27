<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #1f2937; background: #fff; }

        .cabecera {
            background: #1e40af;
            color: white;
            padding: 20px 24px;
            margin-bottom: 20px;
        }
        .cabecera h1 { font-size: 20px; font-weight: 700; }
        .cabecera p  { font-size: 11px; opacity: 0.85; margin-top: 4px; }

        .meta {
            padding: 0 24px 14px 24px;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #6b7280;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 16px;
        }

        .resumen {
            margin: 0 24px 18px 24px;
            padding: 10px 14px;
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            border-radius: 4px;
            font-size: 10px;
            color: #1e40af;
        }
        .resumen strong { font-size: 13px; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 0 20px 0;
            font-size: 10px;
        }
        thead tr {
            background: #1e40af;
            color: white;
        }
        thead th {
            padding: 8px 10px;
            text-align: left;
            font-weight: 600;
            font-size: 10px;
        }
        tbody tr:nth-child(even) { background: #f8fafc; }
        tbody tr:nth-child(odd)  { background: #ffffff; }
        tbody td {
            padding: 7px 10px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: middle;
        }
        .badge {
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 9px;
            font-weight: 600;
        }
        .km-total { font-weight: 700; color: #1d4ed8; }

        .pie {
            margin-top: 20px;
            padding: 10px 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 9px;
            color: #9ca3af;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="cabecera">
    <h1>&#128661; TransLink — Historial de Viajes</h1>
    <p>
        @if($conductor)
            Conductor: {{ $conductor }}
        @else
            Todos los conductores
        @endif
    </p>
</div>

<div class="meta">
    <span>Generado el: {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</span>
    <span>Total de registros: {{ $viajes->count() }}</span>
</div>

<div class="resumen">
    KM totales recorridos: <strong>{{ number_format($viajes->sum(fn($v) => $v->km_fin - $v->km_inicio)) }} km</strong>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    Viajes registrados: <strong>{{ $viajes->count() }}</strong>
</div>

<table>
    <thead>
        <tr>
            <th>Fecha</th>
            @if(!$conductor)
            <th>Conductor</th>
            @endif
            <th>Matrícula</th>
            <th>Ruta</th>
            <th>KM inicio</th>
            <th>KM fin</th>
            <th>Total KM</th>
        </tr>
    </thead>
    <tbody>
        @forelse($viajes as $viaje)
        <tr>
            <td>{{ \Carbon\Carbon::parse($viaje->fecha)->format('d/m/Y') }}</td>
            @if(!$conductor)
            <td><strong>{{ $viaje->conductor->name ?? '—' }}</strong></td>
            @endif
            <td><strong>{{ $viaje->vehiculo->matricula ?? '—' }}</strong></td>
            <td>{{ $viaje->salida }} → {{ $viaje->destino }}</td>
            <td>{{ number_format($viaje->km_inicio) }}</td>
            <td>{{ number_format($viaje->km_fin) }}</td>
            <td class="km-total">{{ number_format($viaje->km_fin - $viaje->km_inicio) }} km</td>
        </tr>
        @empty
        <tr>
            <td colspan="7" style="text-align:center; color:#9ca3af; padding:20px;">
                No hay viajes registrados.
            </td>
        </tr>
        @endforelse
    </tbody>
</table>

<div class="pie">
    TransLink — Documento generado automáticamente el {{ \Carbon\Carbon::now()->format('d/m/Y \a \l\a\s H:i') }}
</div>

</body>
</html>
