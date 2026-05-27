const { createCanvas } = require(
    process.env.NODE_PATH
        ? process.env.NODE_PATH + '/canvas'
        : 'C:/Users/pablo/AppData/Roaming/npm/node_modules/canvas'
);
const fs = require('fs');

const W = 1400, H = 820;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ── Fondo ──────────────────────────────────────────────────────────────────
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, W, H);

// ── Borde del sistema ──────────────────────────────────────────────────────
ctx.strokeStyle = '#94a3b8';
ctx.lineWidth = 2;
ctx.setLineDash([]);
ctx.strokeRect(180, 30, 1040, 750);
ctx.fillStyle = '#1e293b';
ctx.font = 'bold 14px Arial';
ctx.fillText('«sistema» Translink', 195, 55);

// ── Título ─────────────────────────────────────────────────────────────────
ctx.fillStyle = '#1e3a5f';
ctx.font = 'bold 22px Arial';
ctx.textAlign = 'center';
ctx.fillText('Diagrama de Casos de Uso — Translink', W / 2, 22);

// ── Helper: Actor (monigote) ───────────────────────────────────────────────
function actor(x, y, label, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;
    // Cabeza
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.stroke();
    // Cuerpo
    ctx.beginPath(); ctx.moveTo(x, y + 18); ctx.lineTo(x, y + 58); ctx.stroke();
    // Brazos
    ctx.beginPath(); ctx.moveTo(x - 22, y + 35); ctx.lineTo(x + 22, y + 35); ctx.stroke();
    // Piernas
    ctx.beginPath(); ctx.moveTo(x, y + 58); ctx.lineTo(x - 18, y + 82); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + 58); ctx.lineTo(x + 18, y + 82); ctx.stroke();
    // Label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 100);
}

// ── Helper: Elipse de caso de uso ──────────────────────────────────────────
function cu(x, y, id, label, bg, border) {
    const rw = 110, rh = 36;
    ctx.save();
    ctx.translate(x, y);
    // Sombra suave
    ctx.shadowColor = 'rgba(0,0,0,0.12)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    // Relleno
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Borde
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, rw, rh, 0, 0, Math.PI * 2);
    ctx.stroke();
    // ID
    ctx.fillStyle = border;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(id, 0, -11);
    // Label
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px Arial';
    ctx.fillText(label, 0, 7);
    ctx.restore();
}

// ── Helper: Línea de conexión ──────────────────────────────────────────────
function linea(x1, y1, x2, y2, color) {
    ctx.strokeStyle = color || '#64748b';
    ctx.lineWidth = 1.3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// ── Posiciones ─────────────────────────────────────────────────────────────
// Actores
const adminX = 108, conductorX = 1292, actorY = 390;

// CU compartidos (azul, centro-arriba)
const cuCompartidos = [
    { id: 'CU01', label: 'Iniciar sesión',  x: 700, y: 110 },
    { id: 'CU02', label: 'Cerrar sesión',   x: 700, y: 185 },
];

// CU Admin (amarillo, izquierda-centro)
const cuAdmin = [
    { id: 'CU03', label: 'Registrar vehículo',      x: 330, y: 270 },
    { id: 'CU04', label: 'Editar vehículo',          x: 330, y: 355 },
    { id: 'CU05', label: 'Dar de baja vehículo',     x: 330, y: 440 },
    { id: 'CU13', label: 'Resolver cualquier inc.',  x: 330, y: 525 },
    { id: 'CU14', label: 'Ver dashboard global',     x: 330, y: 610 },
    { id: 'CU09', label: 'Exportar viajes PDF',      x: 560, y: 270 },
    { id: 'CU10', label: 'Exportar repos. PDF',      x: 560, y: 355 },
    { id: 'CU11', label: 'Exportar incid. PDF',      x: 560, y: 440 },
    { id: 'CU12', label: 'Carta de porte (todos)',   x: 560, y: 525 },
];

// CU Conductor (verde, derecha-centro)
const cuConductor = [
    { id: 'CU06', label: 'Registrar viaje',          x: 840, y: 270 },
    { id: 'CU07', label: 'Registrar repostaje',      x: 840, y: 355 },
    { id: 'CU08', label: 'Registrar incidencia',     x: 840, y: 440 },
    { id: 'CU15', label: 'Resolver inc. propia',     x: 840, y: 525 },
    { id: 'CU20', label: 'Ver dashboard propio',     x: 840, y: 610 },
    { id: 'CU16', label: 'Exportar viajes propios',  x: 1070, y: 270 },
    { id: 'CU17', label: 'Exportar repos. propios',  x: 1070, y: 355 },
    { id: 'CU18', label: 'Exportar incid. propias',  x: 1070, y: 440 },
    { id: 'CU19', label: 'Carta de porte propia',    x: 1070, y: 525 },
];

// ── Dibujar líneas primero (detrás de las elipses) ─────────────────────────

// Admin -> CU compartidos
cuCompartidos.forEach(cu => linea(adminX + 30, actorY + 10, cu.x - 110, cu.y, '#3b82f6'));

// Conductor -> CU compartidos
cuCompartidos.forEach(cu => linea(conductorX - 30, actorY + 10, cu.x + 110, cu.y, '#3b82f6'));

// Admin -> CU admin
cuAdmin.forEach(c => linea(adminX + 30, actorY + 20, c.x - 110, c.y, '#d97706'));

// Conductor -> CU conductor
cuConductor.forEach(c => linea(conductorX - 30, actorY + 20, c.x + 110, c.y, '#16a34a'));

// ── Dibujar elipses ────────────────────────────────────────────────────────

// Compartidos (azul)
cuCompartidos.forEach(c => cu(c.x, c.y, c.id, c.label, '#eff6ff', '#2563eb'));

// Admin (amarillo/amber)
cuAdmin.forEach(c => cu(c.x, c.y, c.id, c.label, '#fffbeb', '#d97706'));

// Conductor (verde)
cuConductor.forEach(c => cu(c.x, c.y, c.id, c.label, '#f0fdf4', '#16a34a'));

// ── Actores (encima de las líneas) ────────────────────────────────────────
actor(adminX, actorY, 'Admin', '#1e3a5f');
actor(conductorX, actorY, 'Conductor', '#0f766e');

// ── Leyenda ────────────────────────────────────────────────────────────────
const leyendaX = 1220, leyendaY = 50;
[
    { color: '#eff6ff', border: '#2563eb', label: 'Casos compartidos' },
    { color: '#fffbeb', border: '#d97706', label: 'Solo Administrador' },
    { color: '#f0fdf4', border: '#16a34a', label: 'Solo Conductor' },
].forEach(function(item, i) {
    const y = leyendaY + i * 28;
    ctx.fillStyle = item.color;
    ctx.strokeStyle = item.border;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(leyendaX + 14, y + 9, 14, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, leyendaX + 32, y + 14);
});

// ── Guardar ────────────────────────────────────────────────────────────────
const buf = canvas.toBuffer('image/png');
fs.writeFileSync('casos_uso_translink.png', buf);
fs.writeFileSync('C:/Users/pablo/Desktop/casos_uso_translink.png', buf);
console.log('Imagen guardada correctamente');
