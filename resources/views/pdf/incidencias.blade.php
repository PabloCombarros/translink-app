<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #1f2937; background: #fff; }

        .cabecera {
            background: #991b1b;
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
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            border-radius: 4px;
            font-size: 10px;
            color: #991b1b;
        }
        .resumen strong { font-size: 13px; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 0 20px 0;
            font-size: 10px;
        }
        thead tr { background: #991b1b; color: white; }
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

        .estado-resuelta  { background:#d1fae5; color:#065f46; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }
        .estado-pendiente { background:#fee2e2; color:#991b1b; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }

        .tipo-averia    { background:#fee2e2; color:#991b1b; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }
        .tipo-accidente { background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }
        .tipo-retraso   { background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }
        .tipo-otro      { background:#f3f4f6; color:#374151; padding:2px 8px; border-radius:20px; font-size:9px; font-weight:600; }

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
    <h1>&#9888; TransLink — Historial de Incidencias</h1>
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
    <span>Total de registros: {{ $incidencias->count() }}</span>
</div>

<div class="resumen">
    Total incidencias: <strong>{{ $incidencias->count() }}</strong>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    Pendientes: <strong>{{ $incidencias->where('resuelta', false)->count() }}</strong>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    Resueltas: <strong>{{ $incidencias->where('resuelta', true)->count() }}</strong>
</div>

<table>
    <thead>
        <tr>
            <th>Fecha</th>
            @if(!$conductor)
            <th>Conductor</th>
            @endif
            <th>Matrícula</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody>
        @forelse($incidencias as $incidencia)
        <tr>
            <td>{{ \Carbon\Carbon::parse($incidencia->fecha)->format('d/m/Y') }}</td>
            @if(!$conductor)
            <td><strong>{{ $incidencia->conductor->name ?? '—' }}</strong></td>
            @endif
            <td><strong>{{ $incidencia->vehiculo->matricula ?? '—' }}</strong></td>
            <td>
                <span class="tipo-{{ $incidencia->tipo }}">{{ ucfirst($incidencia->tipo) }}</span>
            </td>
            <td style="color:#4b5563; max-width:200px;">
                {{ \Illuminate\Support\Str::limit($incidencia->descripcion, 70) }}
            </td>
            <td>
                @if($incidencia->resuelta)
                    <span class="estado-resuelta">Resuelta</span>
                @else
                    <span class="estado-pendiente">Pendiente</span>
                @endif
            </td>
        </tr>
        @empty
        <tr>
            <td colspan="6" style="text-align:center; color:#9ca3af; padding:20px;">
                No hay incidencias registradas.
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
