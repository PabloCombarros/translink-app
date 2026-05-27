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
    s.addText(titulo,{x:0.4,y:0.08,w:'92%',h:0.75,fontSize:21,bold:true,color:BLANCO});
    s.addShape(pptx.ShapeType.rect,{x:0,y:6.85,w:'100%',h:0.15,fill:{color:AZUL_C},line:{color:AZUL_C}});
    return s;
}
function bul(s,items,x,y,w,h,sz,col){
    sz=sz||15; col=col||DARK;
    s.addText(items.map(t=>({text:t,options:{bullet:{type:'bullet'}}})),{x,y,w,h,fontSize:sz,color:col,lineSpacingMultiple:1.4});
}
function box(s,txt,x,y,w,h,bg,fg,sz){
    fg=fg||BLANCO; sz=sz||14;
    s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,fill:{color:bg},line:{color:bg},rectRadius:0.08});
    s.addText(txt,{x,y,w,h,fontSize:sz,bold:true,color:fg,align:'center',valign:'middle'});
}

// S1 PORTADA
{
    const s=pptx.addSlide();
    s.background={color:AZUL};
    s.addShape(pptx.ShapeType.rect,{x:0,y:3.5,w:'100%',h:0.08,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('Translink',{x:0.5,y:1.2,w:'90%',h:1.1,fontSize:52,bold:true,color:BLANCO,align:'center'});
    s.addText('Aplicacion web de gestion de flotas de transporte',{x:0.5,y:2.4,w:'90%',h:0.65,fontSize:20,color:'cbd5e1',align:'center'});
    s.addText('Pablo Combarros  |  ILERNA  |  DAW  |  2S 2025-26',{x:0.5,y:3.8,w:'90%',h:0.5,fontSize:15,color:'94a3b8',align:'center'});
}

// S2 INDICE
{
    const s=base('Indice');
    const items=[['01','Motivacion y contexto',AZUL_C],['02','Objetivos',TEAL],['03','Metodologia y tecnologias',VERDE],
                 ['04','Arquitectura y diseno',PURP],['05','Demostracion de la app',AMBAR],['06','Pruebas automatizadas',TEAL],['07','Conclusiones y vias futuras',ROJO]];
    items.forEach(function([n,t,c],i){
        var col=i<4?0:1, row=i<4?i:i-4;
        var x=col===0?0.4:5.3, y=1.05+row*1.3;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:4.5,h:1.0,fill:{color:GRIS_L},line:{color:c,pt:2},rectRadius:0.08});
        s.addText(n,{x:x+0.1,y:y,w:0.6,h:1.0,fontSize:22,bold:true,color:c,align:'center',valign:'middle'});
        s.addText(t,{x:x+0.8,y:y,w:3.6,h:1.0,fontSize:15,color:DARK,valign:'middle'});
    });
}

// S3 MOTIVACION
{
    const s=base('01  Motivacion y contexto');
    box(s,'58.340\nempresas\nhabilitadas\n(OTLE, 2024)',0.4,1.0,2.8,2.2,AZUL_C,BLANCO,15);
    box(s,'+85%\npymes con\ngestion manual',3.5,1.0,2.8,2.2,TEAL,BLANCO,15);
    s.addText('Problemas:',{x:6.6,y:1.0,w:3.5,h:0.4,fontSize:14,bold:true,color:AZUL});
    bul(s,['Errores en km y consumo','Datos en Excel, papel, correos','Sin control de acceso por rol','Herramientas comerciales: caras'],6.6,1.45,3.4,2.5,13);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:3.4,w:'92%',h:0.7,fill:{color:AZUL_L},line:{color:AZUL_C,pt:1},rectRadius:0.06});
    s.addText('Solucion: app web accesible, sin licencia ni hardware adicional',{x:0.4,y:3.4,w:'92%',h:0.7,fontSize:14,bold:true,color:AZUL_C,align:'center',valign:'middle'});
}

// S4 SOLUCION
{
    const s=base('01  La solucion: Translink');
    s.addText('App web de gestion de flotas para pymes del sector del transporte por carretera',{x:0.4,y:1.0,w:'92%',h:0.55,fontSize:16,color:MED,italic:true,align:'center'});
    var mods=[['Vehiculos','Alta, edicion y baja logica',AZUL_C,AZUL_L],
              ['Viajes','Registro con validacion km',VERDE,VERDE_L],
              ['Repostajes','Precio/litro automatico',AMBAR,AMBAR_L],
              ['Incidencias','Registro y resolucion',ROJO,ROJO_L]];
    mods.forEach(function([tit,desc,c,cl],i){
        var x=0.4+i*2.55;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.7,w:2.3,h:3.0,fill:{color:cl},line:{color:c,pt:2},rectRadius:0.1});
        s.addShape(pptx.ShapeType.rect,{x:x,y:1.7,w:2.3,h:0.45,fill:{color:c},line:{color:c}});
        s.addText(tit,{x:x,y:1.7,w:2.3,h:0.45,fontSize:14,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(desc,{x:x+0.1,y:2.25,w:2.1,h:2.0,fontSize:13,color:DARK,align:'center',valign:'middle'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:4.9,w:'92%',h:0.6,fill:{color:AZUL},line:{color:AZUL},rectRadius:0.06});
    s.addText('2 roles: Administrador  |  Conductor',{x:0.4,y:4.9,w:'92%',h:0.6,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
}

// S5 OBJETIVOS
{
    const s=base('02  Objetivos del proyecto');
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:1.0,w:'92%',h:0.65,fill:{color:AZUL_L},line:{color:AZUL_C,pt:1},rectRadius:0.06});
    s.addText('Objetivo general: Aplicacion web con dos perfiles que cubra el ciclo operativo completo con generacion de PDF.',{x:0.4,y:1.0,w:'92%',h:0.65,fontSize:13,color:AZUL,align:'center',valign:'middle'});
    s.addText('Objetivos especificos:',{x:0.4,y:1.8,w:'92%',h:0.38,fontSize:14,bold:true,color:AZUL});
    var objs=[['RF3','Gestion de vehiculos con baja logica (activo=false)',AZUL_C,AZUL_L],
              ['RF4','Viajes con validacion km inicio menor que km fin',VERDE,VERDE_L],
              ['RF5','Repostajes con calculo automatico de precio por litro',AMBAR,AMBAR_L],
              ['RF6-7','Incidencias: registro y resolucion por rol',ROJO,ROJO_L],
              ['RF8-11','Exportacion PDF: admin vacia tabla, conductor conserva BD',PURP,PURP_L]];
    objs.forEach(function([ref,txt,c,cl],i){
        var y=2.28+i*0.84;
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:0.75,h:0.66,fill:{color:c},line:{color:c},rectRadius:0.05});
        s.addText(ref,{x:0.4,y:y,w:0.75,h:0.66,fontSize:11,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addShape(pptx.ShapeType.roundRect,{x:1.25,y:y+0.04,w:8.8,h:0.56,fill:{color:cl},line:{color:cl},rectRadius:0.04});
        s.addText(txt,{x:1.35,y:y+0.04,w:8.7,h:0.56,fontSize:14,color:DARK,valign:'middle'});
    });
}

// S6 METODOLOGIA
{
    const s=base('03  Metodologia: Desarrollo Incremental');
    s.addText('Sommerville (2016) - cada modulo se disena, implementa y prueba de forma independiente',{x:0.4,y:1.0,w:'92%',h:0.4,fontSize:13,color:GRIS_T,italic:true});
    var fases=[['1','Analisis\nDiseno BD','20/03',AZUL_C],['2','Auth\ny roles','28/03',TEAL],['3','Modulo\nvehiculos','01/04',VERDE],
               ['4','Viajes y\nrepostajes','04/04',AMBAR],['5','Incidencias\ndashboard','11/04',ROJO],['6','Tests y\ndocs','15/04',PURP]];
    fases.forEach(function([n,t,f,c],i){
        var x=0.4+i*1.7;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.55,w:1.5,h:1.7,fill:{color:c},line:{color:c},rectRadius:0.08});
        s.addText('Sprint '+n,{x:x,y:1.6,w:1.5,h:0.38,fontSize:11,bold:true,color:BLANCO,align:'center'});
        s.addText(t,{x:x,y:2.0,w:1.5,h:0.7,fontSize:12,color:BLANCO,align:'center',valign:'middle'});
        s.addText(f,{x:x,y:3.3,w:1.5,h:0.3,fontSize:11,color:MED,align:'center'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:3.75,w:'92%',h:0.5,fill:{color:GRIS_L},line:{color:'e2e8f0'},rectRadius:0.06});
    s.addText('Total: 120 horas  |  20/03/2026 - 20/04/2026',{x:0.4,y:3.75,w:'92%',h:0.5,fontSize:13,color:GRIS_T,align:'center',valign:'middle'});
    bul(s,['Modulos independientes: cada uno se prueba antes de continuar al siguiente','Fechas de migraciones verifican el desarrollo incremental real del proyecto'],0.4,4.4,'92%',1.4,13);
}

// S7 TECNOLOGIAS
{
    const s=base('03  Tecnologias utilizadas');
    var techs=[{l:'Backend',items:['PHP 8.2','Laravel 12','Eloquent ORM','Laravel Breeze'],c:AZUL_C,cl:AZUL_L,x:0.4},
               {l:'Frontend',items:['Blade Templates','Tailwind CSS','Alpine.js','Vite'],c:VERDE,cl:VERDE_L,x:2.95},
               {l:'Base de datos',items:['MySQL (XAMPP)','SQLite (tests)','Migraciones','Seeders'],c:PURP,cl:PURP_L,x:5.5},
               {l:'Testing',items:['PHPUnit 11.5','25 tests','Composer','Git'],c:ROJO,cl:ROJO_L,x:8.05}];
    techs.forEach(function({l,items,c,cl,x}){
        s.addShape(pptx.ShapeType.rect,{x:x,y:1.0,w:2.2,h:0.5,fill:{color:c},line:{color:c}});
        s.addText(l,{x:x,y:1.0,w:2.2,h:0.5,fontSize:13,bold:true,color:BLANCO,align:'center',valign:'middle'});
        items.forEach(function(it,i){
            s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.6+i*1.1,w:2.2,h:0.9,fill:{color:cl},line:{color:c,pt:1},rectRadius:0.06});
            s.addText(it,{x:x,y:1.6+i*1.1,w:2.2,h:0.9,fontSize:13,color:DARK,align:'center',valign:'middle'});
        });
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:6.1,w:'92%',h:0.55,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1},rectRadius:0.05});
    s.addText('PDF: barryvdh/laravel-dompdf 3.1  ->  convierte vistas Blade en documentos PDF',{x:0.4,y:6.1,w:'92%',h:0.55,fontSize:13,bold:true,color:'92400e',align:'center',valign:'middle'});
}

// S8 MVC
{
    const s=base('04  Arquitectura MVC - Laravel 12');
    var capas=[['MODELO','User, Vehiculo, Viaje\nRepostaje, Incidencia',AZUL_C,AZUL_L,1.0],
               ['VISTA','Blade + Tailwind CSS\nAlpine.js + Vite',VERDE,VERDE_L,2.7],
               ['CONTROLADOR','DashboardController\nVehiculoController + 3 mas',ROJO,ROJO_L,4.4]];
    capas.forEach(function([l,d,c,cl,y]){
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:3.0,h:1.4,fill:{color:cl},line:{color:c,pt:2},rectRadius:0.08});
        s.addShape(pptx.ShapeType.rect,{x:0.4,y:y,w:3.0,h:0.44,fill:{color:c},line:{color:c}});
        s.addText(l,{x:0.4,y:y,w:3.0,h:0.44,fontSize:14,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(d,{x:0.5,y:y+0.5,w:2.8,h:0.8,fontSize:12,color:DARK,align:'center'});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:4.0,y:1.0,w:2.8,h:1.7,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1.5},rectRadius:0.08});
    s.addText('Middleware',{x:4.0,y:1.05,w:2.8,h:0.4,fontSize:13,bold:true,color:'92400e',align:'center'});
    bul(s,['auth -> usuario autenticado','admin -> solo administrador'],4.1,1.5,2.6,0.9,12,'92400e');
    s.addShape(pptx.ShapeType.roundRect,{x:4.0,y:2.9,w:2.8,h:1.7,fill:{color:PURP_L},line:{color:PURP,pt:1.5},rectRadius:0.08});
    s.addText('Rutas - web.php',{x:4.0,y:2.95,w:2.8,h:0.4,fontSize:13,bold:true,color:PURP,align:'center'});
    bul(s,['GET/POST/PATCH/DELETE','Agrupadas por middleware'],4.1,3.4,2.6,0.9,12,PURP);
    s.addShape(pptx.ShapeType.roundRect,{x:7.3,y:1.0,w:2.8,h:4.2,fill:{color:TEAL_L},line:{color:TEAL,pt:1.5},rectRadius:0.08});
    s.addText('MySQL\n5 tablas',{x:7.3,y:1.1,w:2.8,h:0.8,fontSize:14,bold:true,color:TEAL,align:'center'});
    bul(s,['users','vehiculos','viajes','repostajes','incidencias'],7.45,2.0,2.5,2.8,13,TEAL);
}

// S9 DISENO BD
{
    const s=base('04  Diseno de base de datos - Modelo ER');
    s.addText('5 tablas relacionadas mediante claves foraneas',{x:0.4,y:1.0,w:'92%',h:0.4,fontSize:15,color:MED,align:'center'});
    var tbls=[{n:'users',x:0.4,y:2.0,c:AZUL_C,cl:AZUL_L,f:'id, name, email\nrole, licencia_num'},
              {n:'vehiculos',x:3.8,y:1.1,c:TEAL,cl:TEAL_L,f:'id, matricula\nmarca, activo'},
              {n:'viajes',x:7.2,y:2.0,c:PURP,cl:PURP_L,f:'id, conductor_id\nvehiculo_id, km'},
              {n:'repostajes',x:3.8,y:3.8,c:AMBAR,cl:AMBAR_L,f:'id, conductor_id\nvehiculo_id, litros'},
              {n:'incidencias',x:7.2,y:4.1,c:ROJO,cl:ROJO_L,f:'id, conductor_id\nvehiculo_id, tipo'}];
    tbls.forEach(function({n,x,y,c,cl,f}){
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:2.2,h:1.4,fill:{color:cl},line:{color:c,pt:2},rectRadius:0.08});
        s.addShape(pptx.ShapeType.rect,{x:x,y:y,w:2.2,h:0.38,fill:{color:c},line:{color:c}});
        s.addText(n,{x:x,y:y,w:2.2,h:0.38,fontSize:12,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addText(f,{x:x+0.1,y:y+0.42,w:2.0,h:0.85,fontSize:10,color:DARK});
    });
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.65,w:'92%',h:0.45,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1},rectRadius:0.05});
    s.addText('Baja logica: activo=false en vehiculos - el registro no se elimina fisicamente',{x:0.4,y:5.65,w:'92%',h:0.45,fontSize:12,color:'92400e',align:'center',valign:'middle'});
}

// S10 ROLES
{
    const s=base('04  Sistema de roles y control de acceso');
    s.addShape(pptx.ShapeType.rect,{x:0.4,y:1.0,w:4.5,h:0.55,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('ADMINISTRADOR',{x:0.4,y:1.0,w:4.5,h:0.55,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
    bul(s,['Acceso total a todos los modulos','Gestion de vehiculos (alta, edicion, baja)','Ve registros de TODOS los conductores','Exporta PDF y vacia las tablas','Resuelve cualquier incidencia'],0.4,1.65,4.5,3.5,14);
    s.addShape(pptx.ShapeType.rect,{x:5.4,y:1.0,w:4.6,h:0.55,fill:{color:VERDE},line:{color:VERDE}});
    s.addText('CONDUCTOR',{x:5.4,y:1.0,w:4.6,h:0.55,fontSize:16,bold:true,color:BLANCO,align:'center',valign:'middle'});
    bul(s,['Sin acceso a vehiculos -> HTTP 403','Solo ve SUS propios registros','Exporta PDF (BD intacta)','Resuelve solo sus incidencias'],5.4,1.65,4.5,3.0,14);
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.4,w:'92%',h:0.6,fill:{color:AMBAR_L},line:{color:AMBAR,pt:1},rectRadius:0.06});
    s.addText('Control: AdminMiddleware.php intercepta rutas /vehiculos antes del controlador',{x:0.4,y:5.4,w:'92%',h:0.6,fontSize:13,bold:true,color:'92400e',align:'center',valign:'middle'});
}

// S11 DEMO DASHBOARD
{
    const s=base('05  Demostracion - Dashboard');
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:1.0,w:5.1,h:4.1,fill:{color:GRIS_L},line:{color:'e2e8f0',pt:1},rectRadius:0.06});
    s.addText('[ Captura: Dashboard Administrador ]',{x:0.4,y:1.0,w:5.1,h:4.1,fontSize:14,color:GRIS_T,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:5.8,y:1.0,w:4.3,h:4.1,fill:{color:GRIS_L},line:{color:'e2e8f0',pt:1},rectRadius:0.06});
    s.addText('[ Captura: Dashboard Conductor ]',{x:5.8,y:1.0,w:4.3,h:4.1,fontSize:14,color:GRIS_T,align:'center',valign:'middle'});
    s.addText('Admin: estadisticas globales  |  Conductor: solo sus propios datos del dia',{x:0.4,y:5.3,w:'92%',h:0.4,fontSize:13,color:MED,align:'center'});
}

// S12 DEMO MODULOS
{
    const s=base('05  Demostracion - Modulos principales');
    var mods=[['Vehiculos',AZUL_C,AZUL_L],['Viajes',VERDE,VERDE_L],['Repostajes',AMBAR,AMBAR_L],['Incidencias',ROJO,ROJO_L]];
    mods.forEach(function([nom,c,cl],i){
        var x=0.4+i*2.55;
        s.addShape(pptx.ShapeType.rect,{x:x,y:1.0,w:2.3,h:0.45,fill:{color:c},line:{color:c}});
        s.addText(nom,{x:x,y:1.0,w:2.3,h:0.45,fontSize:13,bold:true,color:BLANCO,align:'center',valign:'middle'});
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:1.5,w:2.3,h:4.1,fill:{color:cl},line:{color:c,pt:1},rectRadius:0.06});
        s.addText('Captura aqui',{x:x,y:1.5,w:2.3,h:4.1,fontSize:13,color:GRIS_T,align:'center',valign:'middle'});
    });
}

// S13 DEMO PDF
{
    const s=base('05  Demostracion - Exportacion PDF');
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:1.0,w:5.0,h:4.0,fill:{color:GRIS_L},line:{color:'e2e8f0',pt:1},rectRadius:0.06});
    s.addText('[ PDF exportado\n viajes o incidencias ]',{x:0.4,y:1.0,w:5.0,h:4.0,fontSize:15,color:GRIS_T,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:5.7,y:1.0,w:4.4,h:4.0,fill:{color:GRIS_L},line:{color:'e2e8f0',pt:1},rectRadius:0.06});
    s.addText('[ Carta de porte PDF ]',{x:5.7,y:1.0,w:4.4,h:4.0,fontSize:15,color:GRIS_T,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:5.2,w:4.7,h:0.6,fill:{color:ROJO_L},line:{color:ROJO,pt:1},rectRadius:0.06});
    s.addText('Admin: exporta TODO + vacia la tabla',{x:0.4,y:5.2,w:4.7,h:0.6,fontSize:13,bold:true,color:ROJO,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:5.5,y:5.2,w:4.6,h:0.6,fill:{color:VERDE_L},line:{color:VERDE,pt:1},rectRadius:0.06});
    s.addText('Conductor: sus datos + BD intacta',{x:5.5,y:5.2,w:4.6,h:0.6,fontSize:13,bold:true,color:VERDE,align:'center',valign:'middle'});
}

// S14 PRUEBAS
{
    const s=base('06  Pruebas automatizadas - PHPUnit');
    s.addText('25',{x:0.4,y:1.0,w:2.8,h:2.2,fontSize:100,bold:true,color:VERDE,align:'center'});
    s.addText('tests pasando\n100%',{x:0.4,y:3.2,w:2.8,h:0.8,fontSize:17,bold:true,color:VERDE,align:'center'});
    s.addShape(pptx.ShapeType.rect,{x:3.5,y:1.0,w:0.05,h:3.2,fill:{color:'e2e8f0'},line:{color:'e2e8f0'}});
    bul(s,['AuthenticationTest: login, logout, contrasena incorrecta','RegistrationTest: formulario y registro de nuevo usuario','ExampleTest: ruta / redirige a login (HTTP 302)','Tests de integracion HTTP: rutas, sesiones, respuestas'],3.7,1.1,6.4,2.5,14);
    s.addShape(pptx.ShapeType.roundRect,{x:3.7,y:3.8,w:6.4,h:0.5,fill:{color:TEAL_L},line:{color:TEAL,pt:1},rectRadius:0.05});
    s.addText('SQLite en memoria -> tests rapidos sin afectar BD de desarrollo',{x:3.7,y:3.8,w:6.4,h:0.5,fontSize:12,color:TEAL,align:'center',valign:'middle'});
    s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:4.5,w:'92%',h:1.5,fill:{color:'0f172a'},line:{color:'1e293b',pt:1},rectRadius:0.06});
    s.addText('[ Captura: php artisan test - 25 tests en verde ]',{x:0.4,y:4.5,w:'92%',h:1.5,fontSize:14,color:'64748b',align:'center',valign:'middle'});
}

// S15 CONCLUSIONES
{
    const s=base('07  Conclusiones');
    var items=[['Objetivo general cumplido','Aplicacion funcional con todos los modulos operativos y probados',VERDE,VERDE_L],
               ['Arquitectura MVC limpia','Codigo mantenible, separacion clara Modelo-Vista-Controlador',AZUL_C,AZUL_L],
               ['Tests automatizados','25/25 pasando - base solida para futuras modificaciones',TEAL,TEAL_L],
               ['Roles y seguridad','Control de acceso middleware, HTTP 403 ante accesos no autorizados',PURP,PURP_L],
               ['Generacion PDF','Cartas de porte e informes con logica diferenciada por rol',AMBAR,AMBAR_L]];
    items.forEach(function([tit,desc,c,cl],i){
        var y=1.0+i*1.1;
        s.addShape(pptx.ShapeType.roundRect,{x:0.4,y:y,w:'92%',h:0.9,fill:{color:cl},line:{color:c,pt:1},rectRadius:0.06});
        s.addText('OK',{x:0.5,y:y,w:0.55,h:0.9,fontSize:16,bold:true,color:c,align:'center',valign:'middle'});
        s.addText(tit,{x:1.15,y:y+0.04,w:3.5,h:0.4,fontSize:14,bold:true,color:c});
        s.addText(desc,{x:1.15,y:y+0.48,w:9.0,h:0.35,fontSize:12,color:MED});
    });
}

// S16 VIAS FUTURAS
{
    const s=base('07  Vias futuras');
    var f=[['App movil nativa','React Native / Flutter para conductores en ruta'],
           ['Geolocalizacion','Seguimiento en tiempo real de la flota'],
           ['Mantenimiento preventivo','Alertas automaticas por km o tiempo transcurrido'],
           ['Soporte multiempresa','Arquitectura multi-tenant para varias flotas'],
           ['Despliegue en la nube','Migracion a servidor con acceso remoto real'],
           ['Analisis con IA','Optimizacion de rutas y consumo de combustible']];
    f.forEach(function([tit,desc],i){
        var col=i%2, row=Math.floor(i/2);
        var x=col===0?0.4:5.3, y=1.05+row*1.75;
        s.addShape(pptx.ShapeType.roundRect,{x:x,y:y,w:4.5,h:1.5,fill:{color:GRIS_L},line:{color:AZUL_C,pt:1.5},rectRadius:0.08});
        s.addText(tit,{x:x+0.15,y:y+0.1,w:4.2,h:0.45,fontSize:14,bold:true,color:AZUL});
        s.addText(desc,{x:x+0.15,y:y+0.65,w:4.2,h:0.6,fontSize:12,color:MED});
    });
}

// S17 CIERRE
{
    const s=pptx.addSlide();
    s.background={color:AZUL};
    s.addShape(pptx.ShapeType.rect,{x:0,y:3.2,w:'100%',h:0.08,fill:{color:AZUL_C},line:{color:AZUL_C}});
    s.addText('Muchas gracias!',{x:0.5,y:1.5,w:'90%',h:1.0,fontSize:48,bold:true,color:BLANCO,align:'center'});
    s.addText('Preguntas?',{x:0.5,y:2.65,w:'90%',h:0.6,fontSize:26,color:'cbd5e1',align:'center'});
    s.addText('Pablo Combarros  |  Translink  |  ILERNA DAW 2S 2025-26',{x:0.5,y:3.5,w:'90%',h:0.5,fontSize:14,color:'94a3b8',align:'center'});
}

pptx.writeFile({fileName:'C:/Users/pablo/Desktop/Translink_TFG_Presentacion.pptx'})
    .then(function(){console.log('PPT guardado en el Escritorio');})
    .catch(function(e){console.error('Error:',e);});
