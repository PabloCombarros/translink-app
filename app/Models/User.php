<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'licencia_num',
        'telefono',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ── Helpers de rol ──────────────────────────
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isConductor(): bool
    {
        return $this->role === 'conductor';
    }

    // ── Relaciones ──────────────────────────────
    public function viajes()
    {
        return $this->hasMany(Viaje::class, 'conductor_id');
    }

    public function repostajes()
    {
        return $this->hasMany(Repostaje::class, 'conductor_id');
    }

    public function incidencias()
    {
        return $this->hasMany(Incidencia::class, 'conductor_id');
    }
}
