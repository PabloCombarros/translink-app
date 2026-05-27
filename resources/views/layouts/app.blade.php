<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Translink App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="bg-gray-100 flex">

    <aside class="w-64 bg-gray-800 h-screen text-white p-5" style="position:relative;">
        <h2 class="text-2xl font-bold mb-10">Translink App</h2>
        <ul>
            <li class="mb-4"><a href="{{ url('/') }}" class="hover:text-green-400">Inicio</a></li>
            <li class="mb-4"><a href="{{ route('viajes.index') }}" class="hover:text-green-400">Viajes</a></li>
            <li class="mb-4"><a href="{{ route('incidencias.index') }}" class="hover:text-green-400">Incidencias</a></li>
            <li class="mb-4"><a href="{{ route('repostajes.index') }}" class="hover:text-green-400">Repostajes</a></li>
            @if(auth()->user()->isAdmin())
                <li class="mb-4"><a href="{{ route('vehiculos.index') }}" class="hover:text-green-400">Vehículos</a></li>
            @endif
        </ul>

        <div class="sidebar-usuario">
            <p class="sidebar-usuario-nombre">{{ auth()->user()->name }}</p>
            <p class="sidebar-usuario-rol">
                {{ auth()->user()->isAdmin() ? 'Administrador' : 'Conductor' }}
            </p>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="sidebar-logout">Cerrar sesión</button>
            </form>
        </div>
    </aside>

    <main class="flex-1 p-10">
        @yield('content')
    </main>

</body>
</html>
