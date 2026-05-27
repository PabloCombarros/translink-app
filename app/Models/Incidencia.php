<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model
{
    protected $fillable = [
        'viaje_id',
        'conductor_id',
        'vehiculo_id',
        'fecha',
        'tipo',
        'descripcion',
        'resuelta',
    ];

    protected function casts(): array
    {
        return [
            'resuelta' => 'boolean',
        ];
    }

    // ── Relaciones ──────────────────────────────
    public function viaje()
    {
        return $this->belongsTo(Viaje::class);
    }

    public function conductor()
    {
        return $this->belongsTo(User::class, 'conductor_id');
    }

    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class);
    }

    // ── Helpers ─────────────────────────────────
    public function tipoLabel(): string
    {
        return match($this->tipo) {
            'averia'    => 'Avería',
            'accidente' => 'Accidente',
            'retraso'   => 'Retraso',
            default     => 'Otro',
        };
    }
}
