const NODE_PATH = 'C:/Users/pablo/AppData/Roaming/npm/node_modules';
const PptxGenJS = require(NODE_PATH + '/pptxgenjs');

const pptx = new PptxGenJS();

// ── Tema global ──────────────────────────────────────────────
pptx.layout = 'LAYOUT_WIDE'; // 16:9
const AZUL       = '1e3a5f';
const AZUL_CLARO = '2563eb';
const BLANCO     = 'FFFFFF';
const GRIS       = 'f1f5f9';
const GRIS_TEXT  = '64748b';
const VERDE      = '16a34a';
const ROJO       = 'dc2626';
const AMARILLO   = 'd97706';

// ── Helper: slide con fondo oscuro (portada / cierre) ────────
function slideOscura(title, subtitle, nota) {
    const s = pptx.addSlide();
    s.background = { color: AZUL };
    if (title) s.addText(title, {
        x: 0.5, y: 2.2, w: '90%', h: 1.2,
        fontSize: 36, bold: true, color: BLANCO, align: 'center'
    });
    if (subtitle) s.addText(subtitle, {
        x: 0.5, y: 3.6, w: '90%', h: 0.7,
        fontSize: 20, color: 'cbd5e1', align: 'center'
    });
    if (nota) s.addText(nota, {
        x: 0.5, y: 4.5, w: '90%', h: 0.5,
        fontSize: 14, color: '94a3b8', align: 'center'
    });
    return s;
}

// ── Helper: slide estándar con cabecera azul ─────────────────
function slideBase(titulo) {
    const s = pptx.addSlide();
    s.background = { color: BLANCO };
    // Banda superior
    s.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.9,
        fill: { color: AZUL }, line: { color: AZUL }
    });
    s.addText(titulo, {
        x: 0.4, y: 0.05, w: '92%', h: 0.8,
        fontSize: 22, bold: true, color: BLANCO
    });
    // Línea decorativa inferior
    s.addShape(pptx.ShapeType.rect, {
        x: 0, y: 6.8, w: '100%', h: 0.1,
        fill: { color: AZUL_CLARO }, line: { color: AZUL_CLARO }
    });
    return s;
}

// ── Helper: añadir bullets ───────────────────────────────────
function addBullets(s, items, x, y, w, h, opts = {}) {
    const lines = items.map(t => ({ text: t, options: { bullet: { type: 'bullet' } } }));
    s.addText(lines, {
        x, y, w, h,
        fontSize: opts.fontSize || 17,
        color: opts.color || '1e293b',
        lineSpacingMultiple: 1.4,
        ...opts
    });
}

// ── Helper: caja coloreada ───────────────────────────────────
function caja(s, texto, x, y, w, h, bg, textColor) {
    s.addShape(pptx.ShapeType.roundRect, {
        x, y, w, h,
        fill: { color: bg },
        line: { color: bg },
        rectRadius: 0.1
    });
    s.addText(texto, {
        x, y, w, h,
        fontSize: 14, bold: true,
        color: textColor || BLANCO,
        align: 'center', valign: 'middle'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 1 — PORTADA
// ════════════════════════════════════════════════════════════
{
    const s = pptx.addSlide();
    s.background = { color: AZUL };

    // Rectángulo decorativo
    s.addShape(pptx.ShapeType.rect, {
        x: 0, y: 3.8, w: '100%', h: 0.06,
        fill: { color: AZUL_CLARO }, line: { color: AZUL_CLARO }
    });

    s.addText('🚛', { x: 4.5, y: 0.5, w: 1, h: 1, fontSize: 48, align: 'center' });

    s.addText('Translink', {
        x: 0.5, y: 1.5, w: '90%', h: 0.9,
        fontSize: 44, bold: true, color: BLANCO, align: 'center'
    });
    s.addText('Aplicación web de gestión de flotas de transporte', {
        x: 0.5, y: 2.5, w: '90%', h: 0.7,
        fontSize: 20, color: 'cbd5e1', align: 'center'
    });
    s.addText('Pablo Combarros  ·  ILERNA  ·  DAW  ·  2S 2025-26', {
        x: 0.5, y: 4.0, w: '90%', h: 0.5,
        fontSize: 15, color: '94a3b8', align: 'center'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 2 — ÍNDICE
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('Índice');
    const items = [
        ['01', 'Motivación y contexto',      AZUL_CLARO],
        ['02', 'Objetivos',                  '0891b2'],
        ['03', 'Tecnologías y metodología',  VERDE],
        ['04', 'Arquitectura y diseño',      '7c3aed'],
        ['05', 'Demostración de la app',     AMARILLO],
        ['06', 'Pruebas automatizadas',      '0f766e'],
        ['07', 'Conclusiones y vías futuras',ROJO],
    ];
    items.forEach(([num, txt, color], i) => {
        const col = i < 4 ? 0 : 1;
        const row = i < 4 ? i : i - 4;
        const x = col === 0 ? 0.4 : 5.3;
        const y = 1.1 + row * 1.1;
        s.addShape(pptx.ShapeType.roundRect, {
            x, y, w: 4.5, h: 0.85,
            fill: { color: color + '22' },
            line: { color: color, pt: 1.5 },
            rectRadius: 0.08
        });
        s.addText(num, { x: x + 0.1, y, w: 0.5, h: 0.85, fontSize: 20, bold: true, color, align: 'center', valign: 'middle' });
        s.addText(txt, { x: x + 0.65, y, w: 3.8, h: 0.85, fontSize: 15, color: '1e293b', valign: 'middle' });
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 3 — MOTIVACIÓN
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('01 · Motivación y contexto');
    // Stat box izquierda
    caja(s, '+58.000\nempresas\nhabilitadas\nen España', 0.4, 1.1, 3, 2, AZUL_CLARO);
    s.addText('(OTLE / MITMS, 2024)', { x: 0.4, y: 3.1, w: 3, h: 0.4, fontSize: 11, color: GRIS_TEXT, align: 'center' });

    caja(s, '+85%\nson pymes con\ngestión manual', 3.7, 1.1, 3, 2, '0891b2');

    // Problemas
    s.addText('Problemas de la gestión manual:', { x: 7.2, y: 1.1, w: 2.8, h: 0.4, fontSize: 14, bold: true, color: AZUL });
    addBullets(s, [
        'Errores en km y consumo',
        'Datos dispersos (Excel, papel)',
        'Sin control de acceso por rol',
        'Herramientas comerciales: caras y complejas',
    ], 7.2, 1.55, 2.8, 2.8, { fontSize: 13 });
}

// ════════════════════════════════════════════════════════════
// SLIDE 4 — SOLUCIÓN: TRANSLINK
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('01 · La solución: Translink');
    s.addText('Translink es una aplicación web de gestión de flotas diseñada específicamente\npara las necesidades operativas de las pymes del sector del transporte.', {
        x: 0.4, y: 1.0, w: '92%', h: 1.0,
        fontSize: 16, color: '334155', italic: true, align: 'center'
    });

    const modulos = [
        ['🚛', 'Vehículos',   'Alta, edición y baja lógica',         AZUL_CLARO],
        ['🗺️', 'Viajes',      'Registro con validación de km',       VERDE],
        ['⛽', 'Repostajes',  'Precio/litro calculado automático',    AMARILLO],
        ['⚠️', 'Incidencias', 'Registro, resolución y exportación',  ROJO],
    ];

    modulos.forEach(([ico, titulo, desc, color], i) => {
        const x = 0.4 + i * 2.55;
        s.addShape(pptx.ShapeType.roundRect, {
            x, y: 2.2, w: 2.3, h: 2.8,
            fill: { color: color + '18' },
            line: { color, pt: 1.5 },
            rectRadius: 0.1
        });
        s.addText(ico, { x, y: 2.3, w: 2.3, h: 0.6, fontSize: 28, align: 'center' });
        s.addText(titulo, { x, y: 3.0, w: 2.3, h: 0.4, fontSize: 14, bold: true, color, align: 'center' });
        s.addText(desc, { x: x + 0.1, y: 3.45, w: 2.1, h: 0.8, fontSize: 12, color: '475569', align: 'center' });
    });

    s.addText('2 roles: Administrador  ·  Conductor', {
        x: 0.4, y: 5.3, w: '92%', h: 0.5,
        fontSize: 16, bold: true, color: AZUL, align: 'center'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 5 — OBJETIVOS
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('02 · Objetivos del proyecto');
    s.addText('Objetivo general', { x: 0.4, y: 1.0, w: '92%', h: 0.4, fontSize: 16, bold: true, color: AZUL });
    s.addText('Desarrollar una aplicación web de gestión de transporte con dos perfiles de usuario que cubra\nel ciclo operativo completo: vehículos, viajes, repostajes, incidencias y generación de PDF.', {
        x: 0.4, y: 1.4, w: '92%', h: 0.8,
        fontSize: 14, color: '334155', italic: true
    });

    s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 2.3, w: '92%', h: 0.02, fill: { color: 'e2e8f0' }, line: { color: 'e2e8f0' } });

    s.addText('Objetivos específicos', { x: 0.4, y: 2.4, w: '92%', h: 0.4, fontSize: 16, bold: true, color: AZUL });

    const objs = [
        ['RF3', 'Gestión de vehículos con baja lógica',                   AZUL_CLARO],
        ['RF4', 'Viajes con validación automática de kilometraje',         VERDE],
        ['RF5', 'Repostajes con cálculo automático de precio por litro',   AMARILLO],
        ['RF6-7', 'Incidencias: registro y resolución diferenciada por rol', ROJO],
        ['RF8-11', 'Exportación PDF con lógica distinta para cada rol',    '7c3aed'],
    ];

    objs.forEach(([ref, txt, color], i) => {
        const y = 2.95 + i * 0.62;
        s.addShape(pptx.ShapeType.roundRect, { x: 0.4, y, w: 0.7, h: 0.48, fill: { color }, line: { color }, rectRadius: 0.05 });
        s.addText(ref, { x: 0.4, y, w: 0.7, h: 0.48, fontSize: 11, bold: true, color: BLANCO, align: 'center', valign: 'middle' });
        s.addText(txt, { x: 1.25, y: y + 0.04, w: 8.5, h: 0.4, fontSize: 14, color: '1e293b' });
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 6 — METODOLOGÍA
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('03 · Metodología: Desarrollo Incremental');

    s.addText('Sommerville (2016) — Ingeniería del Software', {
        x: 0.4, y: 1.0, w: '92%', h: 0.4,
        fontSize: 13, color: GRIS_TEXT, italic: true
    });

    const fases = [
        ['1', 'Análisis\ny diseño BD',    '20/03', AZUL_CLARO],
        ['2', 'Auth\ny roles',            '28/03', '0891b2'],
        ['3', 'Módulo\nvehículos',        '01/04', VERDE],
        ['4', 'Módulos\nviajes/repos.',   '04/04', AMARILLO],
        ['5', 'Incidencias\ny dashboard', '11/04', ROJO],
        ['6', 'Tests y\ndocumentación',   '15/04', '7c3aed'],
    ];

    fases.forEach(([n, txt, fecha, color], i) => {
        const x = 0.4 + i * 1.7;
        // Flecha entre sprints
        if (i > 0) {
            s.addShape(pptx.ShapeType.rect, { x: x - 0.2, y: 2.35, w: 0.2, h: 0.15, fill: { color: 'cbd5e1' }, line: { color: 'cbd5e1' } });
        }
        s.addShape(pptx.ShapeType.roundRect, { x, y: 1.7, w: 1.5, h: 1.0, fill: { color }, line: { color }, rectRadius: 0.08 });
        s.addText(`Sprint ${n}`, { x, y: 1.75, w: 1.5, h: 0.3, fontSize: 11, bold: true, color: BLANCO, align: 'center' });
        s.addText(txt, { x, y: 2.1, w: 1.5, h: 0.55, fontSize: 12, color: BLANCO, align: 'center', valign: 'middle' });
        s.addText(fecha, { x, y: 2.75, w: 1.5, h: 0.3, fontSize: 11, color: '475569', align: 'center' });
    });

    s.addText('Total: 120 horas estimadas  ·  Inicio: 20/03/2026  ·  Fin: 20/04/2026', {
        x: 0.4, y: 3.3, w: '92%', h: 0.4,
        fontSize: 13, color: GRIS_TEXT, align: 'center'
    });

    addBullets(s, [
        'Cada módulo es independiente → se puede probar antes de continuar',
        'Único desarrollador → sin necesidad de coordinación de equipos',
        'Las fechas de las migraciones verifican el desarrollo incremental real',
    ], 0.4, 3.9, '92%', 1.8, { fontSize: 14 });
}

// ════════════════════════════════════════════════════════════
// SLIDE 7 — TECNOLOGÍAS
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('03 · Tecnologías utilizadas');

    const techs = [
        { label: 'Backend',       items: ['PHP 8.2', 'Laravel 12', 'Eloquent ORM', 'Laravel Breeze'], color: AZUL_CLARO, x: 0.4 },
        { label: 'Frontend',      items: ['Blade Templates', 'Tailwind CSS', 'Alpine.js', 'Vite'], color: VERDE, x: 3.0 },
        { label: 'Base de datos', items: ['MySQL (XAMPP)', 'SQLite (tests)', 'Migraciones', 'Seeders'], color: '7c3aed', x: 5.6 },
        { label: 'Testing/Tools', items: ['PHPUnit 11.5', '25 tests auto.', 'Composer', 'Git'], color: ROJO, x: 8.2 },
    ];

    techs.forEach(({ label, items, color, x }) => {
        s.addShape(pptx.ShapeType.rect, { x, y: 1.0, w: 2.2, h: 0.45, fill: { color }, line: { color } });
        s.addText(label, { x, y: 1.0, w: 2.2, h: 0.45, fontSize: 13, bold: true, color: BLANCO, align: 'center', valign: 'middle' });
        items.forEach((item, i) => {
            s.addShape(pptx.ShapeType.roundRect, {
                x, y: 1.55 + i * 0.85, w: 2.2, h: 0.72,
                fill: { color: color + '18' }, line: { color: color + '44', pt: 1 }, rectRadius: 0.06
            });
            s.addText(item, { x, y: 1.55 + i * 0.85, w: 2.2, h: 0.72, fontSize: 13, color: '1e293b', align: 'center', valign: 'middle' });
        });
    });

    s.addText('Herramienta de generación PDF: barryvdh/laravel-dompdf 3.1', {
        x: 0.4, y: 5.15, w: '92%', h: 0.4,
        fontSize: 13, bold: true, color: AZUL, align: 'center'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 8 — ARQUITECTURA MVC
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('04 · Arquitectura MVC — Laravel 12');

    const capas = [
        { label: 'MODELO',       desc: 'User, Vehiculo, Viaje,\nRepostaje, Incidencia', color: AZUL_CLARO, y: 1.1 },
        { label: 'VISTA',        desc: 'Blade Templates\nTailwind CSS + Alpine.js',    color: VERDE,      y: 2.5 },
        { label: 'CONTROLADOR',  desc: 'DashboardController\nVehiculoController + 3 más', color: ROJO,   y: 3.9 },
    ];

    capas.forEach(({ label, desc, color, y }) => {
        s.addShape(pptx.ShapeType.roundRect, { x: 0.4, y, w: 2.8, h: 1.1, fill: { color }, line: { color }, rectRadius: 0.08 });
        s.addText(label, { x: 0.4, y, w: 2.8, h: 0.42, fontSize: 16, bold: true, color: BLANCO, align: 'center', valign: 'middle' });
        s.addText(desc, { x: 0.4, y: y + 0.45, w: 2.8, h: 0.6, fontSize: 12, color: BLANCO, align: 'center' });
    });

    // Flecha entre capas
    [2.25, 3.65].forEach(y => {
        s.addShape(pptx.ShapeType.rect, { x: 1.5, y, w: 0.6, h: 0.2, fill: { color: 'cbd5e1' }, line: { color: 'cbd5e1' } });
    });

    // Middleware box
    s.addShape(pptx.ShapeType.roundRect, { x: 3.7, y: 1.1, w: 3.0, h: 1.8, fill: { color: AMARILLO + '22' }, line: { color: AMARILLO, pt: 1.5 }, rectRadius: 0.08 });
    s.addText('Middleware', { x: 3.7, y: 1.1, w: 3.0, h: 0.45, fontSize: 14, bold: true, color: AMARILLO, align: 'center', valign: 'middle' });
    addBullets(s, ['auth → usuario autenticado', 'admin → solo administrador'], 3.85, 1.6, 2.7, 0.8, { fontSize: 13 });

    // Rutas box
    s.addShape(pptx.ShapeType.roundRect, { x: 3.7, y: 3.1, w: 3.0, h: 1.5, fill: { color: '7c3aed22' }, line: { color: '7c3aed', pt: 1.5 }, rectRadius: 0.08 });
    s.addText('Rutas — web.php', { x: 3.7, y: 3.1, w: 3.0, h: 0.45, fontSize: 14, bold: true, color: '7c3aed', align: 'center', valign: 'middle' });
    addBullets(s, ['GET/POST/PATCH/DELETE', 'Agrupadas por middleware'], 3.85, 3.6, 2.7, 0.8, { fontSize: 13 });

    // BD box
    s.addShape(pptx.ShapeType.roundRect, { x: 7.2, y: 1.1, w: 2.8, h: 4.0, fill: { color: '0f766e22' }, line: { color: '0f766e', pt: 1.5 }, rectRadius: 0.08 });
    s.addText('Base de datos\nMySQL', { x: 7.2, y: 1.1, w: 2.8, h: 0.8, fontSize: 14, bold: true, color: '0f766e', align: 'center', valign: 'middle' });
    addBullets(s, ['users', 'vehiculos', 'viajes', 'repostajes', 'incidencias'], 7.35, 2.0, 2.5, 2.8, { fontSize: 13, color: '0f766e' });
}

// ════════════════════════════════════════════════════════════
// SLIDE 9 — DISEÑO BD / ER
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('04 · Diseño de base de datos — Modelo ER');
    s.addText('5 tablas relacionadas mediante claves foráneas (FK)', {
        x: 0.4, y: 1.0, w: '92%', h: 0.45,
        fontSize: 16, color: '334155', align: 'center'
    });

    // Simular diagrama ER con cajas y líneas
    const tablas = [
        { name: 'users',       x: 0.5,  y: 2.2, color: AZUL_CLARO, fields: 'id, name, email\nrole, licencia_num' },
        { name: 'vehiculos',   x: 3.9,  y: 1.1, color: '0f766e',   fields: 'id, matricula, marca\nmodelo, activo' },
        { name: 'viajes',      x: 7.3,  y: 2.2, color: '7c3aed',   fields: 'id, conductor_id\nvehiculo_id, fecha, km' },
        { name: 'repostajes',  x: 3.9,  y: 3.9, color: AMARILLO,   fields: 'id, conductor_id\nvehiculo_id, litros' },
        { name: 'incidencias', x: 7.3,  y: 4.2, color: ROJO,       fields: 'id, conductor_id\nvehiculo_id, tipo' },
    ];

    tablas.forEach(({ name, x, y, color, fields }) => {
        s.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.2, h: 1.3, fill: { color: color + '25' }, line: { color, pt: 2 }, rectRadius: 0.08 });
        s.addText(name, { x, y: y + 0.02, w: 2.2, h: 0.38, fontSize: 13, bold: true, color, align: 'center' });
        s.addText(fields, { x: x + 0.1, y: y + 0.42, w: 2.0, h: 0.8, fontSize: 10.5, color: '475569' });
    });

    // Relaciones (líneas)
    const rels = [
        [1.6, 3.2, 4.0, 2.4],   // users → vehiculos area
        [2.7, 2.8, 7.3, 2.8],   // users → viajes
        [2.7, 3.0, 3.9, 4.2],   // users → repostajes
        [5.0, 2.5, 7.3, 2.8],   // vehiculos → viajes
        [5.0, 2.4, 5.0, 3.9],   // vehiculos → repostajes
        [5.0, 2.5, 7.3, 4.5],   // vehiculos → incidencias
    ];
    rels.forEach(([x1, y1, x2, y2]) => {
        s.addShape(pptx.ShapeType.line, {
            x: Math.min(x1, x2), y: Math.min(y1, y2),
            w: Math.abs(x2 - x1) + 0.01, h: Math.abs(y2 - y1) + 0.01,
            line: { color: 'cbd5e1', pt: 1.5, dashType: 'dash' }
        });
    });

    s.addText('Baja lógica: campo activo=false en vehiculos — el registro no se elimina', {
        x: 0.4, y: 5.55, w: '92%', h: 0.35,
        fontSize: 12, color: GRIS_TEXT, italic: true, align: 'center'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 10 — ROLES
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('04 · Sistema de roles y control de acceso');

    // Admin column
    s.addShape(pptx.ShapeType.roundRect, { x: 0.4, y: 1.0, w: 4.5, h: 0.6, fill: { color: AZUL_CLARO }, line: { color: AZUL_CLARO }, rectRadius: 0.06 });
    s.addText('👤  ADMINISTRADOR', { x: 0.4, y: 1.0, w: 4.5, h: 0.6, fontSize: 16, bold: true, color: BLANCO, align: 'center', valign: 'middle' });

    addBullets(s, [
        'Acceso total a todos los módulos',
        'Gestión de vehículos (alta, edición, baja lógica)',
        'Ve registros de TODOS los conductores',
        'Exporta PDF y vacía las tablas',
        'Resuelve cualquier incidencia',
        'Dashboard con estadísticas globales',
    ], 0.4, 1.7, 4.5, 3.8, { fontSize: 14, color: '1e293b' });

    // Conductor column
    s.addShape(pptx.ShapeType.roundRect, { x: 5.4, y: 1.0, w: 4.5, h: 0.6, fill: { color: VERDE }, line: { color: VERDE }, rectRadius: 0.06 });
    s.addText('👤  CONDUCTOR', { x: 5.4, y: 1.0, w: 4.5, h: 0.6, fontSize: 16, bold: true, color: BLANCO, align: 'center', valign: 'middle' });

    addBullets(s, [
        'Sin acceso a gestión de vehículos → HTTP 403',
        'Solo ve SUS propios registros',
        'Exporta PDF solo de sus datos (BD intacta)',
        'Resuelve únicamente sus propias incidencias',
        'Dashboard con estadísticas personales',
    ], 5.4, 1.7, 4.5, 3.4, { fontSize: 14, color: '1e293b' });

    // Middleware note
    s.addShape(pptx.ShapeType.roundRect, { x: 0.4, y: 5.4, w: '92%', h: 0.55, fill: { color: AMARILLO + '22' }, line: { color: AMARILLO, pt: 1 }, rectRadius: 0.06 });
    s.addText('Control implementado mediante AdminMiddleware.php  →  rutas /vehiculos protegidas', {
        x: 0.4, y: 5.4, w: '92%', h: 0.55,
        fontSize: 13, bold: true, color: AMARILLO.replace('d97706', '92400e') || '92400e', align: 'center', valign: 'middle'
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 11 — DEMO DASHBOARD
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('05 · Demostración — Dashboard');
    s.addText('[Captura del dashboard del administrador]', {
        x: 0.4, y: 1.0, w: 5.2, h: 3.5,
        fontSize: 16, color: 'cbd5e1', align: 'center', valign: 'middle',
        fill: { color: 'f8fafc' }, line: { color: 'e2e8f0', pt: 1 }
    });
    s.addText('[Captura del dashboard del conductor]', {
        x: 5.8, y: 1.0, w: 4.2, h: 3.5,
        fontSize: 14, color: 'cbd5e1', align: 'center', valign: 'middle',
        fill: { color: 'f8fafc' }, line: { color: 'e2e8f0', pt: 1 }
    });

    addBullets(s, [
        'Admin: estadísticas globales de toda la flota',
        'Conductor: solo sus propios datos del día',
    ], 0.4, 4.7, '92%', 0.9, { fontSize: 14 });
}

// ════════════════════════════════════════════════════════════
// SLIDE 12 — DEMO MÓDULOS
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('05 · Demostración — Módulos principales');

    const boxes = [
        { label: '🚛 Vehículos', desc: 'Alta, edición\ny baja lógica', color: AZUL_CLARO },
        { label: '🗺️ Viajes',    desc: 'Validación km\ncarta de porte', color: VERDE },
        { label: '⛽ Repostajes', desc: 'Precio/litro\nautomático',     color: AMARILLO },
        { label: '⚠️ Incidencias', desc: 'Registro y\nresolución', color: ROJO },
    ];

    boxes.forEach(({ label, desc, color }, i) => {
        const x = 0.4 + i * 2.55;
        s.addShape(pptx.ShapeType.roundRect, { x, y: 1.0, w: 2.3, h: 4.2, fill: { color: 'f8fafc' }, line: { color, pt: 2 }, rectRadius: 0.08 });
        s.addText(label, { x, y: 1.05, w: 2.3, h: 0.5, fontSize: 14, bold: true, color, align: 'center' });
        s.addText('[Captura]', { x: x + 0.1, y: 1.6, w: 2.1, h: 2.4, fontSize: 13, color: 'cbd5e1', align: 'center', valign: 'middle' });
        s.addText(desc, { x, y: 4.1, w: 2.3, h: 0.8, fontSize: 12, color: '475569', align: 'center', valign: 'middle' });
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 13 — DEMO PDF
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('05 · Demostración — Exportación PDF');

    s.addText('[Captura PDF exportado — viajes o incidencias]', {
        x: 0.4, y: 1.0, w: 5.0, h: 3.8,
        fontSize: 14, color: 'cbd5e1', align: 'center', valign: 'middle',
        fill: { color: 'f8fafc' }, line: { color: 'e2e8f0', pt: 1 }
    });
    s.addText('[Captura carta de porte]', {
        x: 5.7, y: 1.0, w: 4.3, h: 3.8,
        fontSize: 14, color: 'cbd5e1', align: 'center', valign: 'middle',
        fill: { color: 'f8fafc' }, line: { color: 'e2e8f0', pt: 1 }
    });

    s.addShape(pptx.ShapeType.roundRect, { x: 0.4, y: 5.0, w: 4.7, h: 0.65, fill: { color: ROJO + '18' }, line: { color: ROJO, pt: 1 }, rectRadius: 0.06 });
    s.addText('Admin: exporta TODO + vacía la tabla', { x: 0.4, y: 5.0, w: 4.7, h: 0.65, fontSize: 13, bold: true, color: ROJO, align: 'center', valign: 'middle' });

    s.addShape(pptx.ShapeType.roundRect, { x: 5.5, y: 5.0, w: 4.5, h: 0.65, fill: { color: VERDE + '18' }, line: { color: VERDE, pt: 1 }, rectRadius: 0.06 });
    s.addText('Conductor: exporta sus datos + BD intacta', { x: 5.5, y: 5.0, w: 4.5, h: 0.65, fontSize: 13, bold: true, color: VERDE, align: 'center', valign: 'middle' });
}

// ════════════════════════════════════════════════════════════
// SLIDE 14 — PRUEBAS
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('06 · Pruebas automatizadas — PHPUnit');

    // Número grande
    s.addText('25', { x: 0.4, y: 1.0, w: 2.5, h: 2.0, fontSize: 96, bold: true, color: VERDE, align: 'center' });
    s.addText('tests pasando\n100%  ✓', { x: 0.4, y: 3.0, w: 2.5, h: 0.8, fontSize: 16, color: VERDE, align: 'center' });

    s.addShape(pptx.ShapeType.rect, { x: 3.2, y: 1.0, w: 0.05, h: 3.0, fill: { color: 'e2e8f0' }, line: { color: 'e2e8f0' } });

    addBullets(s, [
        'AuthenticationTest  →  login, logout, contraseña incorrecta',
        'RegistrationTest  →  formulario y registro nuevo usuario',
        'ExampleTest  →  ruta raíz redirige a login (HTTP 302)',
        'Tests de integración HTTP: rutas, respuestas, sesiones',
    ], 3.5, 1.1, 6.5, 2.5, { fontSize: 14 });

    s.addText('SQLite en memoria para tests → sin afectar BD de desarrollo', {
        x: 3.5, y: 3.7, w: 6.5, h: 0.4,
        fontSize: 13, color: GRIS_TEXT, italic: true
    });

    s.addText('[Captura php artisan test — 25 tests en verde]', {
        x: 0.4, y: 4.3, w: '92%', h: 1.4,
        fontSize: 14, color: 'cbd5e1', align: 'center', valign: 'middle',
        fill: { color: '0f172a' }, line: { color: '1e293b', pt: 1 }
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 15 — CONCLUSIONES
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('07 · Conclusiones');

    const checks = [
        ['✅', 'Objetivo general cumplido', 'Aplicación funcional con todos los módulos operativos'],
        ['✅', 'Arquitectura limpia', 'MVC bien definido, código mantenible y escalable'],
        ['✅', 'Tests automatizados', '25/25 pasando — base sólida para futuras modificaciones'],
        ['✅', 'Roles diferenciados', 'Control de acceso mediante middleware propio'],
        ['✅', 'Generación PDF', 'Cartas de porte e informes con lógica por rol'],
    ];

    checks.forEach(([ico, titulo, desc], i) => {
        const y = 1.0 + i * 1.0;
        s.addText(ico, { x: 0.4, y, w: 0.6, h: 0.8, fontSize: 22, align: 'center', valign: 'middle' });
        s.addText(titulo, { x: 1.1, y, w: 3.8, h: 0.38, fontSize: 15, bold: true, color: '1e293b' });
        s.addText(desc, { x: 1.1, y: y + 0.38, w: 8.9, h: 0.38, fontSize: 13, color: GRIS_TEXT });
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 16 — VÍAS FUTURAS
// ════════════════════════════════════════════════════════════
{
    const s = slideBase('07 · Vías futuras');

    const futuras = [
        ['📱', 'App móvil nativa',          'React Native o Flutter para conductores en ruta'],
        ['🗺️', 'Geolocalización',           'Seguimiento en tiempo real de vehículos'],
        ['🔔', 'Mantenimiento preventivo',  'Alertas automáticas por km o tiempo'],
        ['🏢', 'Soporte multiempresa',       'Arquitectura multi-tenant para varias flotas'],
        ['☁️', 'Despliegue en la nube',     'Migración a servidor con acceso remoto'],
        ['🤖', 'Análisis de datos',         'IA para optimización de rutas y consumo'],
    ];

    futuras.forEach(([ico, titulo, desc], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? 0.4 : 5.2;
        const y = 1.0 + row * 1.55;
        s.addShape(pptx.ShapeType.roundRect, { x, y, w: 4.5, h: 1.3, fill: { color: AZUL + '12' }, line: { color: AZUL_CLARO + '66', pt: 1 }, rectRadius: 0.08 });
        s.addText(ico + '  ' + titulo, { x: x + 0.15, y: y + 0.08, w: 4.2, h: 0.45, fontSize: 14, bold: true, color: AZUL });
        s.addText(desc, { x: x + 0.15, y: y + 0.55, w: 4.2, h: 0.55, fontSize: 12, color: '475569' });
    });
}

// ════════════════════════════════════════════════════════════
// SLIDE 17 — CIERRE
// ════════════════════════════════════════════════════════════
{
    const s = pptx.addSlide();
    s.background = { color: AZUL };
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 3.0, w: '100%', h: 0.06, fill: { color: AZUL_CLARO }, line: { color: AZUL_CLARO } });
    s.addText('🚛', { x: 4.5, y: 0.5, w: 1, h: 1, fontSize: 48, align: 'center' });
    s.addText('¡Muchas gracias!', { x: 0.5, y: 1.6, w: '90%', h: 0.9, fontSize: 40, bold: true, color: BLANCO, align: 'center' });
    s.addText('¿Preguntas?', { x: 0.5, y: 2.6, w: '90%', h: 0.6, fontSize: 24, color: 'cbd5e1', align: 'center' });
    s.addText('Pablo Combarros  ·  Translink  ·  ILERNA DAW 2S 2025-26', { x: 0.5, y: 3.4, w: '90%', h: 0.5, fontSize: 14, color: '94a3b8', align: 'center' });
}

// ════════════════════════════════════════════════════════════
// GUARDAR
// ════════════════════════════════════════════════════════════
const outPath = 'C:/Users/pablo/Desktop/Translink_TFG_Presentacion.pptx';
pptx.writeFile({ fileName: outPath })
    .then(() => console.log('✅ PPT guardado en: ' + outPath))
    .catch(e => console.error('❌ Error:', e));
