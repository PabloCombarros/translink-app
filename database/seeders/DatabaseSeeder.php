<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehiculo;
use App\Models\Viaje;
use App\Models\Repostaje;
use App\Models\Incidencia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin ────────────────────────────────
        $admin = User::create([
            'name'     => 'Administrador',
            'email'    => 'admin@translink.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // ── Conductores ──────────────────────────
        $conductor1 = User::create([
            'name'         => 'Carlos Pérez',
            'email'        => 'carlos@translink.com',
            'password'     => Hash::make('password'),
            'role'         => 'conductor',
            'licencia_num' => 'C-12345678',
            'telefono'     => '612345678',
        ]);

        $conductor2 = User::create([
            'name'         => 'María García',
            'email'        => 'maria@translink.com',
            'password'     => Hash::make('password'),
            'role'         => 'conductor',
            'licencia_num' => 'C-87654321',
            'telefono'     => '698765432',
        ]);

        // ── Vehículos ────────────────────────────
        $camion1 = Vehiculo::create([
            'matricula'   => '1234-ABC',
            'marca'       => 'Mercedes',
            'modelo'      => 'Actros 1845',
            'anio'        => 2021,
            'km_actuales' => 145000,
            'activo'      => true,
        ]);

        $camion2 = Vehiculo::create([
            'matricula'   => '5678-DEF',
            'marca'       => 'Volvo',
            'modelo'      => 'FH 500',
            'anio'        => 2020,
            'km_actuales' => 210000,
            'activo'      => true,
        ]);

        $camion3 = Vehiculo::create([
            'matricula'   => '9012-GHI',
            'marca'       => 'Scania',
            'modelo'      => 'R 450',
            'anio'        => 2019,
            'km_actuales' => 320000,
            'activo'      => false, // En taller
        ]);

        // ── Viajes ───────────────────────────────
        $viajes = [
            ['conductor' => $conductor1, 'vehiculo' => $camion1, 'dias' => 0,  'salida' => 'Málaga',    'destino' => 'Madrid',    'km_i' => 145000, 'km_f' => 145550],
            ['conductor' => $conductor1, 'vehiculo' => $camion1, 'dias' => 1,  'salida' => 'Madrid',    'destino' => 'Barcelona', 'km_i' => 145550, 'km_f' => 146160],
            ['conductor' => $conductor1, 'vehiculo' => $camion1, 'dias' => 3,  'salida' => 'Barcelona', 'destino' => 'Valencia',  'km_i' => 146160, 'km_f' => 146510],
            ['conductor' => $conductor2, 'vehiculo' => $camion2, 'dias' => 0,  'salida' => 'Sevilla',   'destino' => 'Madrid',    'km_i' => 210000, 'km_f' => 210530],
            ['conductor' => $conductor2, 'vehiculo' => $camion2, 'dias' => 2,  'salida' => 'Madrid',    'destino' => 'Bilbao',    'km_i' => 210530, 'km_f' => 210925],
            ['conductor' => $conductor1, 'vehiculo' => $camion1, 'dias' => 5,  'salida' => 'Valencia',  'destino' => 'Zaragoza',  'km_i' => 146510, 'km_f' => 146820],
            ['conductor' => $conductor2, 'vehiculo' => $camion2, 'dias' => 6,  'salida' => 'Bilbao',    'destino' => 'Pamplona',  'km_i' => 210925, 'km_f' => 211085],
            ['conductor' => $conductor1, 'vehiculo' => $camion1, 'dias' => 7,  'salida' => 'Zaragoza',  'destino' => 'Málaga',    'km_i' => 146820, 'km_f' => 147530],
        ];

        $viajesCreados = [];
        foreach ($viajes as $data) {
            $viajesCreados[] = Viaje::create([
                'conductor_id' => $data['conductor']->id,
                'vehiculo_id'  => $data['vehiculo']->id,
                'fecha'        => now()->subDays($data['dias'])->format('Y-m-d'),
                'salida'       => $data['salida'],
                'destino'      => $data['destino'],
                'km_inicio'    => $data['km_i'],
                'km_fin'       => $data['km_f'],
                'hora_salida'  => '07:00',
                'hora_llegada' => '15:30',
            ]);
        }

        // ── Repostajes ───────────────────────────
        Repostaje::create([
            'conductor_id' => $conductor1->id,
            'vehiculo_id'  => $camion1->id,
            'fecha'        => now()->subDays(1)->format('Y-m-d'),
            'litros'       => 350.00,
            'precio_litro' => 1.489,
            'precio_total' => 521.15,
            'gasolinera'   => 'Repsol - A-4 km 32',
        ]);

        Repostaje::create([
            'conductor_id' => $conductor2->id,
            'vehiculo_id'  => $camion2->id,
            'fecha'        => now()->subDays(2)->format('Y-m-d'),
            'litros'       => 420.00,
            'precio_litro' => 1.502,
            'precio_total' => 630.84,
            'gasolinera'   => 'Cepsa - A-1 km 180',
        ]);

        Repostaje::create([
            'conductor_id' => $conductor1->id,
            'vehiculo_id'  => $camion1->id,
            'fecha'        => now()->subDays(5)->format('Y-m-d'),
            'litros'       => 280.00,
            'precio_litro' => 1.475,
            'precio_total' => 413.00,
            'gasolinera'   => 'BP - Valencia Norte',
        ]);

        // ── Incidencias ──────────────────────────
        Incidencia::create([
            'viaje_id'     => $viajesCreados[1]->id,
            'conductor_id' => $conductor1->id,
            'vehiculo_id'  => $camion1->id,
            'fecha'        => now()->subDays(6)->format('Y-m-d'),
            'tipo'         => 'retraso',
            'descripcion'  => 'Retención en la AP-7 por accidente de terceros. Retraso de 2 horas en la entrega.',
            'resuelta'     => true,
        ]);

        Incidencia::create([
            'viaje_id'     => $viajesCreados[3]->id,
            'conductor_id' => $conductor2->id,
            'vehiculo_id'  => $camion2->id,
            'fecha'        => now()->subDays(2)->format('Y-m-d'),
            'tipo'         => 'averia',
            'descripcion'  => 'Avería en el sistema de frenos. Vehículo inmovilizado hasta revisión del taller.',
            'resuelta'     => false,
        ]);
    }
}
