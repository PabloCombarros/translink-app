<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    protected $fillable = [
        'matricula',
        'marca',
        'modelo',
        'anio',
        'km_actuales',
        'activo',
    ];

    protected function casts(): array
    {
        return [
            'activo' => 'boolean',
        ];
    }

    // ── Relaciones ──────────────────────────────
    public function viajes()
    {
        return $this->hasMany(Viaje::class);
    }

    public function repostajes()
    {
        return $this->hasMany(Repostaje::class);
    }

    public function incidencias()
    {
        return $this->hasMany(Incidencia::class);
    }

    // ── Helpers ─────────────────────────────────

    // KMs totales recorridos (calculado desde los viajes)
    public function kmRecorridos(): int
    {
        return $this->viajes->sum(fn($v) => $v->km_fin - $v->km_inicio);
    }

    // Gasto total en combustible
    public function gastoTotalCombustible(): float
    {
        return $this->repostajes->sum('precio_total');
    }

    // Scope para obtener solo vehículos activos
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }
}
