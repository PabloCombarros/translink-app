<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repostaje extends Model
{
    protected $fillable = [
        'conductor_id',
        'vehiculo_id',
        'fecha',
        'litros',
        'precio_litro',
        'precio_total',
        'gasolinera',
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
}
