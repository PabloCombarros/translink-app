<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #1f2937; background: #fff; }

        .cabecera {
            background: #065f46;
            color: white;
            padding: 20px 24px;
            margin-bottom: 20px;
        }
        .cabecera h1 { font-size: 20px; font-weight: 700; }
        .cabecera p  { font-size: 11px; opacity: 0.85; margin-top: 4px; }

        .meta {
            padding: 0 24px 14px 24px;
            font-size: 10px;
            color: #6b7280;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
        }

        .resumen {
            margin: 0 24px 18px 24px;
            padding: 10px 14px;
            background: #ecfdf5;
            border-left: 4px solid #10b981;
            border-radius: 4px;
            font-size: 10px;
            color: #065f46;
        }
        .resumen strong { font-size: 13px; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 0 20px 0;
            font-size: 10px;
        }
        thead tr { background: #065f46; color: white; }
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
        .precio { font-weight: 700; color: #065f46; }

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
    <h1>&#9981; TransLink — Historial de Repostajes</h1>
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
    <span>Total de registros: {{ $repostajes->count() }}</span>
</div>

<div class="resumen">
    Gasto total en combustible: <strong>{{ number_format($repostajes->sum('precio_total'), 2) }} €</strong>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    Litros totales: <strong>{{ number_format($repostajes->sum('litros'), 2) }} L</strong>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    Repostajes: <strong>{{ $repostajes->count() }}</strong>
</div>

<table>
    <thead>
        <tr>
            <th>Fecha</th>
            @if(!$conductor)
            <th>Conductor</th>
            @endif
            <th>Matrícula</th>
            <th>Litros</th>
            <th>€/Litro</th>
            <th>Total</th>
            <th>Gasolinera</th>
        </tr>
    </thead>
    <tbody>
        @forelse($repostajes as $repostaje)
        <tr>
            <td>{{ \Carbon\Carbon::parse($repostaje->fecha)->format('d/m/Y') }}</td>
            @if(!$conductor)
            <td><strong>{{ $repostaje->conductor->name ?? '—' }}</strong></td>
            @endif
            <td><strong>{{ $repostaje->vehiculo->matricula ?? '—' }}</strong></td>
            <td>{{ number_format($repostaje->litros, 2) }} L</td>
            <td>{{ $repostaje->precio_litro > 0 ? number_format($repostaje->precio_litro, 3).' €' : '—' }}</td>
            <td class="precio">{{ number_format($repostaje->precio_total, 2) }} €</td>
            <td style="color:#6b7280;">{{ $repostaje->gasolinera ?? '—' }}</td>
        </tr>
        @empty
        <tr>
            <td colspan="7" style="text-align:center; color:#9ca3af; padding:20px;">
                No hay repostajes registrados.
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
