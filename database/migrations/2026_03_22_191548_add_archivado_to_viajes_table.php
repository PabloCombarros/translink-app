<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('viajes', function (Blueprint $table) {
            $table->boolean('archivado')->default(false)->after('observaciones');
            $table->timestamp('archivado_at')->nullable()->after('archivado');
        });
    }

    public function down(): void
    {
        Schema::table('viajes', function (Blueprint $table) {
            $table->dropColumn(['archivado', 'archivado_at']);
        });
    }
};