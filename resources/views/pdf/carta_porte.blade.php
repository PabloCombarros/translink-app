<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #1a1a2e;
            background: #fff;
        }

        /* ── Cabecera oficial ── */
        .header {
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .header-empresa h1 {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .header-empresa p {
            font-size: 10px;
            opacity: 0.75;
            margin-top: 3px;
        }
        .header-doc {
            text-align: right;
        }
        .header-doc .doc-titulo {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .header-doc .doc-num {
            font-size: 11px;
            opacity: 0.8;
            margin-top: 4px;
        }
        .header-doc .doc-fecha {
            font-size: 10px;
            opacity: 0.65;
            margin-top: 2px;
        }

        /* ── Banda de estado ── */
        .banda-valido {
            background: #059669;
            color: white;
            text-align: center;
            padding: 6px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        /* ── Cuerpo ── */
        .cuerpo {
            padding: 24px 30px;
        }

        /* ── Secciones ── */
        .seccion {
            margin-bottom: 18px;
        }

        .seccion-titulo {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #64748b;
            border-bottom: 2px solid #1e293b;
            padding-bottom: 4px;
            margin-bottom: 10px;
        }

        /* ── Grid de datos ── */
        .datos-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
        .datos-fila {
            display: table-row;
        }
        .datos-celda {
            display: table-cell;
            padding: 6px 10px;
            vertical-align: top;
            width: 50%;
        }
        .datos-celda:first-child {
            border-right: 1px solid #e2e8f0;
        }
        .dato-label {
            font-size: 9px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 2px;
        }
        .dato-valor {
            font-size: 13px;
            font-weight: 600;
            color: #0f172a;
        }
        .dato-valor-grande {
            font-size: 16px;
            font-weight: 700;
            color: #1e40af;
        }

        /* ── Ruta visual ── */
        .ruta-visual {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px 20px;
            display: table;
            width: 100%;
        }
        .ruta-lado {
            display: table-cell;
            width: 40%;
            vertical-align: middle;
        }
        .ruta-centro {
            display: table-cell;
            width: 20%;
            text-align: center;
            vertical-align: middle;
        }
        .ruta-ciudad {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
        }
        .ruta-hora {
            font-size: 10px;
            color: #64748b;
            margin-top: 4px;
        }
        .ruta-flecha {
            font-size: 22px;
            color: #94a3b8;
        }
        .ruta-km {
            font-size: 11px;
            color: #2563eb;
            font-weight: 600;
        }

        /* ── Carga destacada ── */
        .carga-box {
            background: #eff6ff;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 14px 20px;
            text-align: center;
        }
        .carga-label {
            font-size: 10px;
            color: #2563eb;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 4px;
        }
        .carga-valor {
            font-size: 28px;
            font-weight: 700;
            color: #1e40af;
        }
        .carga-unidad {
            font-size: 14px;
            font-weight: 400;
            color: #3b82f6;
        }
        .carga-nd {
            font-size: 14px;
            color: #94a3b8;
        }

        /* ── Grid 3 columnas para datos vehículo/conductor ── */
        .grid-3 {
            display: table;
            width: 100%;
        }
        .grid-3-col {
            display: table-cell;
            width: 33.33%;
            padding: 8px 10px;
            border-right: 1px solid #e2e8f0;
            vertical-align: top;
        }
        .grid-3-col:last-child {
            border-right: none;
        }

        /* ── Observaciones ── */
        .obs-box {
            background: #fefce8;
            border: 1px solid #fde68a;
            border-radius: 6px;
            padding: 10px 14px;
            font-size: 11px;
            color: #713f12;
            min-height: 40px;
        }

        /* ── Firmas ── */
        .firmas {
            display: table;
            width: 100%;
            margin-top: 10px;
        }
        .firma-col {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            padding: 0 10px;
            vertical-align: bottom;
        }
        .firma-linea {
            border-top: 1px solid #334155;
            margin-top: 50px;
            padding-top: 6px;
        }
        .firma-label {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        /* ── Pie ── */
        .pie {
            background: #f8fafc;
            border-top: 2px solid #1e293b;
            padding: 10px 30px;
            display: table;
            width: 100%;
        }
        .pie-izq {
            display: table-cell;
            font-size: 8px;
            color: #94a3b8;
            vertical-align: middle;
        }
        .pie-der {
            display: table-cell;
            text-align: right;
            font-size: 8px;
            color: #94a3b8;
            vertical-align: middle;
        }

        /* ── Separador ── */
        .separador {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 4px 0 16px 0;
        }

        /* Layout columnas para vehículo + conductor */
        .dos-columnas {
            display: table;
            width: 100%;
        }
        .columna {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 15px;
        }
        .columna:last-child {
            padding-right: 0;
            padding-left: 15px;
            border-left: 1px solid #e2e8f0;
        }
    </style>
</head>
<body>

<!-- CABECERA -->
<div class="header">
    <div class="header-empresa">
        <h1>&#128661; TRANSLINK</h1>
        <p>Sistema de Gestión de Flotas</p>
    </div>
    <div class="header-doc">
        <div class="doc-titulo">Carta de Porte</div>
        <div class="doc-num">N.º CP-{{ str_pad($viaje->id, 6, '0', STR_PAD_LEFT) }}</div>
        <div class="doc-fecha">Emitida: {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</div>
    </div>
</div>

<div class="banda-valido">&#10003;&nbsp; Documento válido para inspección de transporte de mercancías por carretera</div>

<div class="cuerpo">

    <!-- RUTA -->
    <div class="seccion">
        <div class="seccion-titulo">&#128205; Ruta del Transporte</div>
        <div class="ruta-visual">
            <div class="ruta-lado">
                <div class="dato-label">Origen</div>
                <div class="ruta-ciudad">{{ $viaje->salida }}</div>
                @if($viaje->hora_salida)
                    <div class="ruta-hora">Salida: {{ \Carbon\Carbon::parse($viaje->hora_salida)->format('H:i') }} h</div>
                @endif
            </div>
            <div class="ruta-centro">
                <div class="ruta-flecha">&#8594;</div>
                <div class="ruta-km">{{ number_format($viaje->km_fin - $viaje->km_inicio) }} km</div>
            </div>
            <div class="ruta-lado" style="text-align:right;">
                <div class="dato-label">Destino</div>
                <div class="ruta-ciudad">{{ $viaje->destino }}</div>
                @if($viaje->hora_llegada)
                    <div class="ruta-hora">Llegada: {{ \Carbon\Carbon::parse($viaje->hora_llegada)->format('H:i') }} h</div>
                @endif
            </div>
        </div>
    </div>

    <!-- FECHA + CARGA en paralelo -->
    <div class="dos-columnas" style="margin-bottom:18px;">
        <div class="columna">
            <div class="seccion-titulo">&#128197; Datos del Viaje</div>
            <div style="display:table; width:100%;">
                <div style="display:table-row;">
                    <div class="datos-celda" style="padding-left:0;">
                        <div class="dato-label">Fecha</div>
                        <div class="dato-valor">{{ \Carbon\Carbon::parse($viaje->fecha)->format('d/m/Y') }}</div>
                    </div>
                    <div class="datos-celda">
                        <div class="dato-label">KM inicio</div>
                        <div class="dato-valor">{{ number_format($viaje->km_inicio) }} km</div>
                    </div>
                </div>
                <div style="display:table-row;">
                    <div class="datos-celda" style="padding-left:0;">
                        <div class="dato-label">Día semana</div>
                        <div class="dato-valor">{{ \Carbon\Carbon::parse($viaje->fecha)->locale('es')->isoFormat('dddd') }}</div>
                    </div>
                    <div class="datos-celda">
                        <div class="dato-label">KM fin</div>
                        <div class="dato-valor">{{ number_format($viaje->km_fin) }} km</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columna">
            <div class="seccion-titulo">&#9749; Carga Transportada</div>
            <div class="carga-box">
                @if($viaje->kg_carga)
                    <div class="carga-label">Peso total de la carga</div>
                    <div class="carga-valor">
                        {{ number_format($viaje->kg_carga, 0) }}
                        <span class="carga-unidad">kg</span>
                    </div>
                    @if($viaje->kg_carga >= 1000)
                        <div style="font-size:10px; color:#2563eb; margin-top:4px;">
                            ({{ number_format($viaje->kg_carga / 1000, 2) }} toneladas)
                        </div>
                    @endif
                @else
                    <div class="carga-nd">Sin carga / No declarada</div>
                @endif
            </div>
        </div>
    </div>

    <!-- CONDUCTOR + VEHÍCULO -->
    <div class="dos-columnas" style="margin-bottom:18px;">
        <div class="columna">
            <div class="seccion-titulo">&#128100; Datos del Conductor</div>
            <div class="datos-celda" style="padding-left:0; display:block; margin-bottom:6px;">
                <div class="dato-label">Nombre completo</div>
                <div class="dato-valor">{{ $viaje->conductor->name }}</div>
            </div>
            <div style="display:table; width:100%;">
                <div style="display:table-row;">
                    <div class="datos-celda" style="padding-left:0;">
                        <div class="dato-label">N.º Licencia</div>
                        <div class="dato-valor">{{ $viaje->conductor->licencia_num ?? 'No registrada' }}</div>
                    </div>
                    <div class="datos-celda">
                        <div class="dato-label">Teléfono</div>
                        <div class="dato-valor">{{ $viaje->conductor->telefono ?? '—' }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columna">
            <div class="seccion-titulo">&#128664; Datos del Vehículo</div>
            <div class="datos-celda" style="padding-left:0; display:block; margin-bottom:6px;">
                <div class="dato-label">Matrícula</div>
                <div class="dato-valor-grande">{{ $viaje->vehiculo->matricula }}</div>
            </div>
            <div style="display:table; width:100%;">
                <div style="display:table-row;">
                    <div class="datos-celda" style="padding-left:0;">
                        <div class="dato-label">Marca / Modelo</div>
                        <div class="dato-valor">{{ $viaje->vehiculo->marca }} {{ $viaje->vehiculo->modelo }}</div>
                    </div>
                    <div class="datos-celda">
                        <div class="dato-label">Año</div>
                        <div class="dato-valor">{{ $viaje->vehiculo->anio ?? '—' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- OBSERVACIONES -->
    <div class="seccion">
        <div class="seccion-titulo">&#128221; Observaciones</div>
        <div class="obs-box">
            {{ $viaje->observaciones ?: 'Sin observaciones.' }}
        </div>
    </div>

    <!-- FIRMAS -->
    <div class="seccion">
        <div class="seccion-titulo">&#9998; Firmas</div>
        <div class="firmas">
            <div class="firma-col">
                <div class="firma-linea">
                    <div class="firma-label">Firma del Conductor</div>
                    <div style="font-size:10px; color:#94a3b8; margin-top:2px;">{{ $viaje->conductor->name }}</div>
                </div>
            </div>
            <div class="firma-col">
                <div class="firma-linea">
                    <div class="firma-label">Sello / Firma Empresa</div>
                    <div style="font-size:10px; color:#94a3b8; margin-top:2px;">TransLink</div>
                </div>
            </div>
            <div class="firma-col">
                <div class="firma-linea">
                    <div class="firma-label">Firma del Destinatario</div>
                    <div style="font-size:10px; color:#94a3b8; margin-top:2px;">En destino</div>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- PIE -->
<div class="pie">
    <div class="pie-izq">
        TransLink — Sistema de Gestión de Flotas &nbsp;|&nbsp; Documento N.º CP-{{ str_pad($viaje->id, 6, '0', STR_PAD_LEFT) }}
    </div>
    <div class="pie-der">
        Generado el {{ \Carbon\Carbon::now()->format('d/m/Y \a \l\a\s H:i') }} &nbsp;|&nbsp; Página 1 de 1
    </div>
</div>

</body>
</html>
