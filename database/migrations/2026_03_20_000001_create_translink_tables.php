<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ─────────────────────────────────────────
        // TABLA: vehiculos
        // ─────────────────────────────────────────
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->string('matricula')->unique();
            $table->string('marca');
            $table->string('modelo');
            $table->year('anio')->nullable();                  // Año del vehículo
            $table->integer('km_actuales')->default(0);
            $table->boolean('activo')->default(true);          // Para dar de baja un vehículo sin borrarlo
            $table->timestamps();
        });

        // ─────────────────────────────────────────
        // TABLA: users  (añadir campos a la que ya existe)
        // NOTA: La tabla users ya la crea Laravel en 0001_01_01_000000
        // Aquí solo añadimos los campos extra que necesitamos
        // ─────────────────────────────────────────
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'conductor'])->default('conductor')->after('email');
            $table->string('licencia_num')->nullable()->after('role'); // Nº de carnet de conducir
            $table->string('telefono')->nullable()->after('licencia_num');
        });

        // ─────────────────────────────────────────
        // TABLA: viajes
        // ─────────────────────────────────────────
        Schema::create('viajes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conductor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vehiculo_id')->constrained('vehiculos')->onDelete('cascade');
            $table->date('fecha');
            $table->string('salida');                          // Lugar de salida
            $table->string('destino');                         // Lugar de destino
            $table->integer('km_inicio');
            $table->integer('km_fin');
            $table->time('hora_salida')->nullable();           // Para la hoja de ruta oficial
            $table->time('hora_llegada')->nullable();          // Para la hoja de ruta oficial
            $table->text('observaciones')->nullable();         // Notas del conductor
            $table->timestamps();
        });

        // ─────────────────────────────────────────
        // TABLA: repostajes
        // ─────────────────────────────────────────
        Schema::create('repostajes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conductor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vehiculo_id')->constrained('vehiculos')->onDelete('cascade');
            $table->date('fecha');
            $table->decimal('litros', 8, 2);                  // Litros repostados
            $table->decimal('precio_litro', 8, 3);            // Precio por litro (3 decimales como en gasolineras)
            $table->decimal('precio_total', 8, 2);            // Total pagado
            $table->string('gasolinera')->nullable();          // Nombre o localización de la gasolinera
            $table->timestamps();
        });

        // ─────────────────────────────────────────
        // TABLA: incidencias
        // ─────────────────────────────────────────
        Schema::create('incidencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('viaje_id')->nullable()->constrained('viajes')->onDelete('set null'); // nullable: puede haber incidencias sin viaje activo
            $table->foreignId('conductor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('vehiculo_id')->constrained('vehiculos')->onDelete('cascade');
            $table->date('fecha');
            $table->enum('tipo', ['averia', 'accidente', 'retraso', 'otro'])->default('otro');
            $table->text('descripcion');
            $table->boolean('resuelta')->default(false);       // Para marcar si ya se resolvió
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Orden inverso respetando las foreign keys
        Schema::dropIfExists('incidencias');
        Schema::dropIfExists('repostajes');
        Schema::dropIfExists('viajes');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'licencia_num', 'telefono']);
        });
        Schema::dropIfExists('vehiculos');
    }
};
