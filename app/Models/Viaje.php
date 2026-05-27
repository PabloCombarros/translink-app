<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Viaje extends Model
{
    protected $fillable = [
        'conductor_id',
        'vehiculo_id',
        'fecha',
        'salida',
        'destino',
        'km_inicio',
        'km_fin',
        'hora_salida',
        'hora_llegada',
        'observaciones',
        'kg_carga',
    ];

    // ── Relaciones ──────────────────────────────
    public function conductor()
    {
        return $this->belongsTo(User::class, 'conductor_id');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    public function incidencias()
    {
        return $this->hasMany(Incidencia::class);
    }

    // ── Helpers ─────────────────────────────────
    public function kmRecorridos(): int
    {
        return $this->km_fin - $this->km_inicio;
    }
}
