const NODE_PATH = 'C:/Users/pablo/AppData/Roaming/npm/node_modules';
const PptxGenJS = require(NODE_PATH + '/pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

const AZUL='1e3a5f',AZUL_C='2563eb',AZUL_L='dbeafe',BLANCO='FFFFFF',GRIS_L='f1f5f9',GRIS_T='64748b';
const VERDE='16a34a',VERDE_L='dcfce7',ROJO='dc2626',ROJO_L='fee2e2';
const AMBAR='d97706',AMBAR_L='fef3c7',PURP='7c3aed',PURP_L='ede9fe';
const TEAL='0f766e',TEAL_L='ccfbf1',DARK='1e293b',MED='475569';

function base(titulo){
    const s=pptx.addSlide();
    s.background={color:BLANCO};
    s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:'100%',h:0.9,fill:{color:AZUL},line:{color:AZUL}});
    s.addText(titulo,{x:0.4,y:0.1,w:'88%',h:0.72,fontSize:20,bold:true,color:BLANCO});
    s.addShape(pptx.ShapeType.rect,{x:0,y:6.85,w:'100%',h:0.15,fill:{color:AZUL_C},line:{color:AZUL_C}});
    return s;
}
function bul(s,items,x,y,w,h,sz,col){
    sz=sz||15; col=col||DARK;
    s.addText(items.map(function(t){return {text:t,options:{bullet:{type:'bullet'}}};}),{x:x,y:y,w:w,h:h,fontSize:sz,color:col,lineSpacingMultiple:1.35});
}
function box(s,txt,x,y,w,h,bg,fg,sz){
    fg=fg||BLANCO; sz=sz||14;
    s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:w,h:h,fill:{color:bg},line:{color:bg},rectRadius:0.08});
    s.addText(txt,{x:x,y:y,w:w,h:h,fontSize:sz,bold:true,color:fg,align:'center',valign:'middle'});
}
function imgBox(s,txt,x,y,w,h){
    s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:w,h:h,fill:{color:GRIS_L},line:{color:'cbd5e1',pt:1.5},rectRadius:0.08});
    s.addText(txt,{x:x,y:y,w:w,h:h,fontSize:14,color:GRIS_T,align:'center',valign:'middle'});
}

// ── S01 PORTADA ───────────────────────────────────────────────────────────
{
    const s=pptx.addSlide();
    s.background={color:AZUL};
    s.addShape(pptx.ShapeType.rect,{x:0,y:3.55,w:'100%',h:0.08,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('Translink',{x:0.5,y:1.1,w:'90%',h:1.1,fontSize:54,bold:true,color:BLANCO,align:'center'});
    s.addText('Aplicacion web de gestion de flotas de transporte',{x:0.5,y:2.3,w:'90%',h:0.65,fontSize:20,color:'cbd5e1',align:'center'});
    s.addText('Trabajo de Fin de Grado  |  DAW',{x:0.5,y:3.05,w:'90%',h:0.42,fontSize:15,color:'94a3b8',align:'center'});
    s.addText('Pablo Combarros  |  ILERNA  |  2S 2025-26',{x:0.5,y:3.8,w:'90%',h:0.5,fontSize:15,color:'94a3b8',align:'center'});
}

// ── S02 INDICE ────────────────────────────────────────────────────────────
{
    const s=base('Indice');
    const items=[['01','Motivacion y contexto',AZUL_C],['02','Objetivos del proyecto',TEAL],
                 ['03','Metodologia y planificacion',VERDE],['04','Tecnologias utilizadas',PURP],
                 ['05','Arquitectura y diseno',AMBAR],['06','Demostracion de la aplicacion',ROJO],
                 ['07','Pruebas automatizadas',TEAL],['08','Conclusiones y vias futuras',AZUL_C]];
    items.forEach(function(item,i){
        var n=item[0],t=item[1],c=item[2];
        var col=i<4?0:1, row=i<4?i:i-4;
        var x=col===0?0.4:5.3, y=1.05+row*1.42;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:4.5,h:1.18,fill:{color:GRIS_L},line:{color:c,pt:2},rectRadius:0.08});
        s.addText(n,{x:x+0.1,y:y,w:0.6,h:1.18,fontSize:22,bold:true,color:c,align:'center',valign:'middle'});
        s.addText(t,{x:x+0.85,y:y,w:3.55,h:1.18,fontSize:15,color:DARK,valign:'middle'});
    });
}

// ── S03 MOTIVACION ────────────────────────────────────────────────────────
{
    const s=base('01  Motivacion y contexto');
    box(s,'58.340\nempresas\nhabilitadas\n(OTLE, 2024)',0.4,1.0,2.8,2.3,AZUL_C,BLANCO,15);
    box(s,'+85%\npymes con\ngestion manual',3.5,1.0,2.8,2.3,TEAL,BLANCO,15);
    s.addText('Problemas de la gestion manual:',{x:6.6,y:1.0,w:3.5,h:0.4,fontSize:14,bold:true,color:AZUL});
    bul(s,['Errores en km y consumo de combustible','Datos en Excel, papel y correos','Sin control de acceso por roles','Herramientas comerciales: caras y complejas'],6.6,1.45,3.4,2.5,13);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:3.5,w:'92%',h:0.65,fill:{color:AZUL_L},line:{color:AZUL_C,pt:1},rectRadius:0.06});
    s.addText('Solucion: app web accesible, sin licencia mensual ni hardware adicional',{x:0.4,y:3.5,w:'92%',h:0.65,fontSize:14,bold:true,color:AZUL_C,align:'center',valign:'middle'});
    s.addText('Referencia: Ministerio de Transportes y Movilidad Sostenible - OTLE 2024',{x:0.4,y:6.35,w:'92%',h:0.3,fontSize:10,color:GRIS_T,italic:true});
}

// ── S04 SOLUCION ──────────────────────────────────────────────────────────
{
    const s=base('01  La solucion: Translink');
    s.addText('App web de gestion de flotas para pymes del sector del transporte por carretera',{x:0.4,y:1.0,w:'92%',h:0.55,fontSize:15,color:MED,italic:true,align:'center'});
    var mods=[['Vehiculos','Alta, edicion\ny baja logica',AZUL_C,AZUL_L],
              ['Viajes','Registro con\nvalidacion de km',VERDE,VERDE_L],
              ['Repostajes','Precio/litro\ncalculado auto.',AMBAR,AMBAR_L],
              ['Incidencias','Registro y\nresolucion',ROJO,ROJO_L]];
    mods.forEach(function(m,i){
        var x=0.4+i*2.55;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.7,w:2.3,h:3.2,fill:{color:m[3]},line:{color:m[2],pt:2},rectRadius:0.1});
        s.addShape(pptx.ShapeType.rect,{x:x,y:1.7,w:2.3,h:0.48,fill:{color:m[2]},line:{color:m[2]}});
        s.addText(m[0],{x:x,y:1.7,w:2.3,h:0.48,fontSize:14,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(m[1],{x:x+0.1,y:2.25,w:2.1,h:2.0,fontSize:13,color:DARK,align:'center',valign:'middle'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.1,w:'92%',h:0.6,fill:{color:AZUL},line:{color:AZUL},rectRadius:0.06});
    s.addText('2 roles diferenciados: Administrador  |  Conductor',{x:0.4,y:5.1,w:'92%',h:0.6,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
}

// ── S05 OBJETIVOS ─────────────────────────────────────────────────────────
{
    const s=base('02  Objetivos del proyecto');
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:1.0,w:'92%',h:0.65,fill:{color:AZUL_L},line:{color:AZUL_C,pt:1},rectRadius:0.06});
    s.addText('Objetivo general: desarrollar una app web de gestion de flotas con dos perfiles que cubra el ciclo operativo completo con generacion de documentacion PDF.',{x:0.4,y:1.0,w:'92%',h:0.65,fontSize:12,color:AZUL,align:'center',valign:'middle'});
    s.addText('Objetivos especificos:',{x:0.4,y:1.8,w:'92%',h:0.38,fontSize:14,bold:true,color:AZUL});
    var objs=[['RF3','Gestion de vehiculos con baja logica (activo=false)',AZUL_C,AZUL_L],
              ['RF4','Viajes con validacion automatica km inicio < km fin',VERDE,VERDE_L],
              ['RF5','Repostajes con calculo automatico de precio por litro',AMBAR,AMBAR_L],
              ['RF6-7','Incidencias: registro y resolucion diferenciada por rol',ROJO,ROJO_L],
              ['RF8-11','Exportacion PDF: admin vacia tabla, conductor conserva BD',PURP,PURP_L]];
    objs.forEach(function(o,i){
        var y=2.28+i*0.84;
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:0.75,h:0.66,fill:{color:o[2]},line:{color:o[2]},rectRadius:0.05});
        s.addText(o[0],{x:0.4,y:y,w:0.75,h:0.66,fontSize:11,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addShape(pptx.ShapeType.roundRect,{x:1.25,y:y+0.04,w:8.8,h:0.56,fill:{color:o[3]},line:{color:o[3]},rectRadius:0.04});
        s.addText(o[1],{x:1.35,y:y+0.04,w:8.7,h:0.56,fontSize:14,color:DARK,valign:'middle'});
    });
}

// ── S06 METODOLOGIA ───────────────────────────────────────────────────────
{
    const s=base('03  Metodologia: Desarrollo Incremental');
    s.addText('Sommerville (2016): cada modulo se disena, implementa y prueba de forma independiente',{x:0.4,y:1.0,w:'92%',h:0.4,fontSize:13,color:GRIS_T,italic:true});
    var fases=[['1','Analisis\nDiseno BD','20/03',AZUL_C],['2','Auth\ny roles','28/03',TEAL],
               ['3','Modulo\nvehiculos','01/04',VERDE],['4','Viajes y\nrepostajes','04/04',AMBAR],
               ['5','Incidencias\ndashboard','11/04',ROJO],['6','Tests y\ndocs','15/04',PURP]];
    fases.forEach(function(f,i){
        var x=0.4+i*1.7;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.55,w:1.5,h:1.7,fill:{color:f[3]},line:{color:f[3]},rectRadius:0.08});
        s.addText('Sprint '+f[0],{x:x,y:1.6,w:1.5,h:0.38,fontSize:11,bold:true,color:BLANCO,align:'center'});
        s.addText(f[1],{x:x,y:2.0,w:1.5,h:0.7,fontSize:12,color:BLANCO,align:'center',valign:'middle'});
        s.addText(f[2],{x:x,y:3.3,w:1.5,h:0.3,fontSize:11,color:MED,align:'center'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:3.75,w:'92%',h:0.48,fill:{color:GRIS_L},line:{color:'e2e8f0'},rectRadius:0.06});
    s.addText('Total: 120 horas  |  Inicio: 20/03/2026  |  Fin estimado: 20/04/2026',{x:0.4,y:3.75,w:'92%',h:0.48,fontSize:13,color:GRIS_T,align:'center',valign:'middle'});
    bul(s,['Modulos independientes: cada uno se prueba antes de continuar','Fechas de migraciones verifican el desarrollo incremental real'],0.4,4.35,'92%',1.3,13);
}

// ── S07 GANTT ─────────────────────────────────────────────────────────────
{
    const s=base('03  Planificacion - Diagrama de Gantt');
    imgBox(s,'[ Insertar imagen: gantt_translink.png ]',0.4,1.0,9.7,5.2);
    s.addText('Comparativa entre planificacion inicial y desarrollo real del proyecto',{x:0.4,y:6.35,w:'92%',h:0.3,fontSize:11,color:GRIS_T,italic:true,align:'center'});
}

// ── S08 TECNOLOGIAS ───────────────────────────────────────────────────────
{
    const s=base('04  Tecnologias utilizadas');
    var techs=[{l:'Backend',items:['PHP 8.2','Laravel 12','Eloquent ORM','Laravel Breeze'],c:AZUL_C,cl:AZUL_L,x:0.4},
               {l:'Frontend',items:['Blade Templates','Tailwind CSS','Alpine.js','Vite'],c:VERDE,cl:VERDE_L,x:2.95},
               {l:'Base de datos',items:['MySQL (XAMPP)','SQLite (tests)','Migraciones','Seeders'],c:PURP,cl:PURP_L,x:5.5},
               {l:'Testing',items:['PHPUnit 11.5','25 tests OK','Composer','Git'],c:ROJO,cl:ROJO_L,x:8.05}];
    techs.forEach(function(t){
        s.addShape(pptx.ShapeType.rect,{x:t.x,y:1.0,w:2.2,h:0.5,fill:{color:t.c},line:{color:t.c}});
        s.addText(t.l,{x:t.x,y:1.0,w:2.2,h:0.5,fontSize:13,bold:true,color:BLANCO,align:'center',valign:'middle'});
        t.items.forEach(function(it,i){
            s.addShape(pptx.ShapeType.roundRect,{x:t.x,y:1.6+i*1.1,w:2.2,h:0.9,fill:{color:t.cl},line:{color:t.c,pt:1},rectRadius:0.06});
            s.addText(it,{x:t.x,y:1.6+i*1.1,w:2.2,h:0.9,fontSize:13,color:DARK,align:'center',valign:'middle'});
        });
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:6.1,w:'92%',h:0.52,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1},rectRadius:0.05});
    s.addText('Generacion PDF: barryvdh/laravel-dompdf 3.1  ->  convierte vistas Blade en documentos PDF',{x:0.4,y:6.1,w:'92%',h:0.52,fontSize:13,bold:true,color:'92400e',align:'center',valign:'middle'});
}

// ── S09 MVC ───────────────────────────────────────────────────────────────
{
    const s=base('05  Arquitectura MVC - Laravel 12');
    var capas=[['MODELO','User, Vehiculo, Viaje\nRepostaje, Incidencia',AZUL_C,AZUL_L,1.0],
               ['VISTA','Blade + Tailwind\nAlpine.js + Vite',VERDE,VERDE_L,2.7],
               ['CONTROLADOR','DashboardController\nVehiculoController + 3 mas',ROJO,ROJO_L,4.4]];
    capas.forEach(function(c){
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:c[4],w:3.0,h:1.4,fill:{color:c[3]},line:{color:c[2],pt:2},rectRadius:0.08});
        s.addShape(pptx.ShapeType.rect,{x:0.4,y:c[4],w:3.0,h:0.44,fill:{color:c[2]},line:{color:c[2]}});
        s.addText(c[0],{x:0.4,y:c[4],w:3.0,h:0.44,fontSize:14,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(c[1],{x:0.5,y:c[4]+0.5,w:2.8,h:0.8,fontSize:12,color:DARK,align:'center'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:4.0,y:1.0,w:2.8,h:1.7,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1.5},rectRadius:0.08});
    s.addText('Middleware',{x:4.0,y:1.05,w:2.8,h:0.38,fontSize:13,bold:true,color:'92400e',align:'center'});
    bul(s,['auth -> usuario autenticado','admin -> solo administrador'],4.1,1.48,2.6,0.9,12,'92400e');
    s.addShape(pptx.ShapeType.roundRect,{x:4.0,y:2.9,w:2.8,h:1.7,fill:{color:PURP_L},line:{color:PURP,pt:1.5},rectRadius:0.08});
    s.addText('Rutas - web.php',{x:4.0,y:2.95,w:2.8,h:0.38,fontSize:13,bold:true,color:PURP,align:'center'});
    bul(s,['GET/POST/PATCH/DELETE','Agrupadas por middleware'],4.1,3.38,2.6,0.9,12,PURP);
    s.addShape(pptx.ShapeType.roundRect,{x:7.3,y:1.0,w:2.8,h:4.2,fill:{color:TEAL_L},line:{color:TEAL,pt:1.5},rectRadius:0.08});
    s.addText('MySQL\n5 tablas',{x:7.3,y:1.1,w:2.8,h:0.7,fontSize:14,bold:true,color:TEAL,align:'center'});
    bul(s,['users','vehiculos','viajes','repostajes','incidencias'],7.45,2.0,2.5,2.8,13,TEAL);
}

// ── S10 DISENO BD ─────────────────────────────────────────────────────────
{
    const s=base('05  Diseno de base de datos - Modelo Entidad Relacion');
    imgBox(s,'[ Insertar imagen: er_translink.png ]',0.4,1.0,9.7,5.0);
    s.addText('Baja logica: campo activo=false en vehiculos  |  5 tablas relacionadas mediante FK',{x:0.4,y:6.2,w:'92%',h:0.42,fontSize:12,color:'92400e',align:'center',bold:true});
}

// ── S11 DIAGRAMA CLASES ───────────────────────────────────────────────────
{
    const s=base('05  Diagrama de clases UML');
    imgBox(s,'[ Insertar imagen: clases_translink.png ]',0.4,1.0,9.7,5.0);
    s.addText('5 clases: User, Vehiculo, Viaje, Repostaje, Incidencia  |  relaciones 1:N',{x:0.4,y:6.2,w:'92%',h:0.42,fontSize:12,color:MED,align:'center'});
}

// ── S12 CASOS DE USO ──────────────────────────────────────────────────────
{
    const s=base('05  Diagrama de casos de uso');
    imgBox(s,'[ Insertar imagen: casos_uso_translink.png ]',0.4,1.0,9.7,4.7);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.9,w:4.7,h:0.6,fill:{color:AZUL_L},line:{color:AZUL_C,pt:1},rectRadius:0.06});
    s.addText('Administrador: CU01-CU14 (14 casos)',{x:0.4,y:5.9,w:4.7,h:0.6,fontSize:13,bold:true,color:AZUL,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:5.5,y:5.9,w:4.6,h:0.6,fill:{color:VERDE_L},line:{color:VERDE,pt:1},rectRadius:0.06});
    s.addText('Conductor: CU01-CU02 + CU06-CU20 (12 casos)',{x:5.5,y:5.9,w:4.6,h:0.6,fontSize:13,bold:true,color:VERDE,align:'center',valign:'middle'});
}

// ── S13 ROLES ─────────────────────────────────────────────────────────────
{
    const s=base('05  Sistema de roles y control de acceso');
    s.addShape(pptx.ShapeType.rect,{x:0.4,y:1.0,w:4.5,h:0.55,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('ADMINISTRADOR',{x:0.4,y:1.0,w:4.5,h:0.55,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
    bul(s,['Acceso total a todos los modulos','Gestion de vehiculos (alta, edicion, baja)','Ve registros de TODOS los conductores','Exporta PDF y vacia las tablas','Resuelve cualquier incidencia','Dashboard con estadisticas globales'],0.4,1.65,4.5,3.8,14);
    s.addShape(pptx.ShapeType.rect,{x:5.4,y:1.0,w:4.6,h:0.55,fill:{color:VERDE},line:{color:VERDE}});
    s.addText('CONDUCTOR',{x:5.4,y:1.0,w:4.6,h:0.55,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
    bul(s,['Sin acceso a vehiculos -> HTTP 403','Solo ve SUS propios registros','Exporta PDF sin eliminar datos','Resuelve solo sus propias incidencias','Dashboard con estadisticas personales'],5.4,1.65,4.5,3.8,14);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.65,w:'92%',h:0.55,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1},rectRadius:0.06});
    s.addText('Control implementado con AdminMiddleware.php -> intercepta rutas /vehiculos antes del controlador',{x:0.4,y:5.65,w:'92%',h:0.55,fontSize:12,bold:true,color:'92400e',align:'center',valign:'middle'});
}

// ── S14 DEMO DASHBOARD ────────────────────────────────────────────────────
{
    const s=base('06  Demostracion - Dashboard');
    imgBox(s,'[ Captura: Dashboard Administrador ]',0.4,1.0,5.1,4.2);
    imgBox(s,'[ Captura: Dashboard Conductor ]',5.8,1.0,4.3,4.2);
    s.addText('Admin: estadisticas globales de la flota  |  Conductor: solo sus propios datos del dia',{x:0.4,y:5.4,w:'92%',h:0.38,fontSize:13,color:MED,align:'center'});
}

// ── S15 DEMO MODULOS ──────────────────────────────────────────────────────
{
    const s=base('06  Demostracion - Modulos principales');
    var mods=[['Vehiculos',AZUL_C,AZUL_L],['Viajes',VERDE,VERDE_L],['Repostajes',AMBAR,AMBAR_L],['Incidencias',ROJO,ROJO_L]];
    mods.forEach(function(m,i){
        var x=0.4+i*2.55;
        s.addShape(pptx.ShapeType.rect,{x:x,y:1.0,w:2.3,h:0.45,fill:{color:m[1]},line:{color:m[1]}});
        s.addText(m[0],{x:x,y:1.0,w:2.3,h:0.45,fontSize:13,bold:true,color:BLANCO,align:'center',valign:'middle'});
        imgBox(s,'Captura',x,1.5,2.3,4.1);
    });
}

// ── S16 DEMO FUNCIONALIDADES CLAVE ────────────────────────────────────────
{
    const s=base('06  Demostracion - Funcionalidades clave');
    var items=[['Baja logica de vehiculos','activo=false -> registro conservado en BD',AZUL_C,AZUL_L],
               ['Validacion de kilometraje','km_fin > km_inicio -> error si no se cumple',VERDE,VERDE_L],
               ['Calculo automatico','precio_litro = precio_total / litros (3 decimales)',AMBAR,AMBAR_L],
               ['Control de acceso','/vehiculos sin rol admin -> HTTP 403 Forbidden',ROJO,ROJO_L]];
    items.forEach(function(it,i){
        var y=1.05+i*1.35;
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:4.8,h:1.1,fill:{color:it[3]},line:{color:it[2],pt:1.5},rectRadius:0.08});
        s.addText(it[0],{x:0.55,y:y+0.06,w:4.5,h:0.42,fontSize:14,bold:true,color:it[2]});
        s.addText(it[1],{x:0.55,y:y+0.55,w:4.5,h:0.42,fontSize:12,color:MED});
        imgBox(s,'Captura',5.5,y,4.6,1.1);
    });
}

// ── S17 DEMO PDF ──────────────────────────────────────────────────────────
{
    const s=base('06  Demostracion - Exportacion PDF');
    imgBox(s,'[ Captura: PDF exportado ]',0.4,1.0,5.0,4.0);
    imgBox(s,'[ Captura: Carta de porte ]',5.7,1.0,4.4,4.0);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.2,w:4.7,h:0.6,fill:{color:ROJO_L},line:{color:ROJO,pt:1},rectRadius:0.06});
    s.addText('Admin: exporta TODO + vacia la tabla',{x:0.4,y:5.2,w:4.7,h:0.6,fontSize:13,bold:true,color:ROJO,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:5.5,y:5.2,w:4.6,h:0.6,fill:{color:VERDE_L},line:{color:VERDE,pt:1},rectRadius:0.06});
    s.addText('Conductor: sus datos + BD completamente intacta',{x:5.5,y:5.2,w:4.6,h:0.6,fontSize:13,bold:true,color:VERDE,align:'center',valign:'middle'});
}

// ── S18 PRUEBAS ───────────────────────────────────────────────────────────
{
    const s=base('07  Pruebas automatizadas - PHPUnit 11.5');
    s.addText('25',{x:0.4,y:0.95,w:2.8,h:2.2,fontSize:100,bold:true,color:VERDE,align:'center'});
    s.addText('tests pasando\n100%  OK',{x:0.4,y:3.15,w:2.8,h:0.8,fontSize:17,bold:true,color:VERDE,align:'center'});
    s.addShape(pptx.ShapeType.rect,{x:3.5,y:1.0,w:0.05,h:3.2,fill:{color:'e2e8f0'},line:{color:'e2e8f0'}});
    bul(s,['AuthenticationTest: login, logout, contrasena incorrecta (4 tests)','RegistrationTest: pantalla registro y nuevo usuario (2 tests)','ExampleTest: ruta / redirige a login HTTP 302 (1 test)','Suite Unit y Suite Feature con SQLite en memoria'],3.7,1.05,6.4,2.6,14);
    s.addShape(pptx.ShapeType.roundRect,{x:3.7,y:3.8,w:6.4,h:0.5,fill:{color:TEAL_L},line:{color:TEAL,pt:1},rectRadius:0.05});
    s.addText('SQLite en memoria -> rapido, sin afectar BD de desarrollo',{x:3.7,y:3.8,w:6.4,h:0.5,fontSize:12,color:TEAL,align:'center',valign:'middle'});
    imgBox(s,'[ Captura: php artisan test - 25 tests en verde ]',0.4,4.45,'92%',1.5);
}

// ── S19 CONCLUSIONES ──────────────────────────────────────────────────────
{
    const s=base('08  Conclusiones');
    var items=[['Objetivo general cumplido','Aplicacion funcional con todos los modulos operativos y probados',VERDE,VERDE_L],
               ['Arquitectura MVC limpia','Codigo mantenible, separacion clara Modelo - Vista - Controlador',AZUL_C,AZUL_L],
               ['25 tests automatizados','PHPUnit 11.5 - base solida para futuras modificaciones sin regresos',TEAL,TEAL_L],
               ['Roles y seguridad','AdminMiddleware.php - HTTP 403 ante accesos no autorizados',PURP,PURP_L],
               ['Generacion PDF completa','Cartas de porte e informes con logica diferenciada por rol',AMBAR,AMBAR_L]];
    items.forEach(function(it,i){
        var y=1.0+i*1.1;
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:'92%',h:0.9,fill:{color:it[3]},line:{color:it[2],pt:1},rectRadius:0.06});
        s.addShape(pptx.ShapeType.roundRect,{x:0.45,y:y+0.12,w:0.62,h:0.62,fill:{color:it[2]},line:{color:it[2]},rectRadius:0.04});
        s.addText('OK',{x:0.45,y:y+0.12,w:0.62,h:0.62,fontSize:13,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(it[0],{x:1.2,y:y+0.06,w:3.8,h:0.38,fontSize:14,bold:true,color:it[2]});
        s.addText(it[1],{x:1.2,y:y+0.5,w:9.0,h:0.34,fontSize:12,color:MED});
    });
}

// ── S20 VIAS FUTURAS ──────────────────────────────────────────────────────
{
    const s=base('08  Vias futuras');
    var f=[['App movil nativa','React Native o Flutter para conductores en ruta'],
           ['Geolocalizacion en tiempo real','Seguimiento GPS de vehiculos de la flota'],
           ['Mantenimiento preventivo','Alertas automaticas por km o tiempo transcurrido'],
           ['Soporte multiempresa','Arquitectura multi-tenant para varias flotas'],
           ['Despliegue en la nube','Migracion a servidor con acceso remoto real'],
           ['Analisis con IA','Optimizacion de rutas y consumo de combustible']];
    f.forEach(function(item,i){
        var col=i%2, row=Math.floor(i/2);
        var x=col===0?0.4:5.3, y=1.05+row*1.78;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:4.5,h:1.52,fill:{color:GRIS_L},line:{color:AZUL_C,pt:1.5},rectRadius:0.08});
        s.addText(item[0],{x:x+0.15,y:y+0.1,w:4.2,h:0.45,fontSize:14,bold:true,color:AZUL});
        s.addText(item[1],{x:x+0.15,y:y+0.65,w:4.2,h:0.6,fontSize:12,color:MED});
    });
}

// ── S21 BIBLIOGRAFIA ──────────────────────────────────────────────────────
{
    const s=base('Referencias bibliograficas');
    s.addText('Fuentes principales utilizadas en la memoria:',{x:0.4,y:1.0,w:'92%',h:0.4,fontSize:15,bold:true,color:AZUL});
    var refs=[
        'Ministerio de Transportes y Movilidad Sostenible. (2024). Observatorio del Transporte y la Logistica en Espana (OTLE). Gobierno de Espana. https://otle.transportes.gob.es/',
        'Sommerville, I. (2016). Ingenieria del software (10.a ed.). Pearson Educacion.',
        'Otwell, T. & comunidad Laravel. (2024). Laravel Documentation v12. https://laravel.com/docs/12.x',
        'Otwell, T. & comunidad Laravel. (2024). Laravel Breeze v2.4. https://github.com/laravel/breeze',
        'Van Drien, B. (2024). barryvdh/laravel-dompdf v3.1. https://github.com/barryvdh/laravel-dompdf',
        'PHPUnit. (2024). PHPUnit Documentation v11. https://phpunit.de/documentation.html'
    ];
    refs.forEach(function(r,i){
        var y=1.55+i*0.88;
        s.addShape(pptx.ShapeType.rect,{x:0.4,y:y+0.18,w:0.06,h:0.06,fill:{color:AZUL_C},line:{color:AZUL_C}});
        s.addText(r,{x:0.6,y:y,w:9.5,h:0.75,fontSize:11,color:DARK,lineSpacingMultiple:1.2});
    });
}

// ── S22 CIERRE ────────────────────────────────────────────────────────────
{
    const s=pptx.addSlide();
    s.background={color:AZUL};
    s.addShape(pptx.ShapeType.rect,{x:0,y:3.3,w:'100%',h:0.08,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('Muchas gracias!',{x:0.5,y:1.4,w:'90%',h:1.1,fontSize:50,bold:true,color:BLANCO,align:'center'});
    s.addText('Preguntas?',{x:0.5,y:2.6,w:'90%',h:0.65,fontSize:28,color:'cbd5e1',align:'center'});
    s.addText('Pablo Combarros  |  Translink  |  ILERNA DAW 2S 2025-26',{x:0.5,y:3.6,w:'90%',h:0.5,fontSize:15,color:'94a3b8',align:'center'});
}

pptx.writeFile({fileName:'C:/Users/pablo/Desktop/Translink_TFG_Presentacion.pptx'})
    .then(function(){console.log('PPT guardado: 22 diapositivas en el Escritorio');})
    .catch(function(e){console.error('Error:',e);});
