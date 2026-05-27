<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Translink — Iniciar sesión</title>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Translink — Iniciar sesión</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>

<div class="page">

    <!-- IZQUIERDA -->
    <div class="left">
        <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M1 3h15v13H1z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M16 8h4l3 3v5h-7V8z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
                <circle cx="5.5" cy="18.5" r="2.5" stroke="white" stroke-width="1.8"/>
                <circle cx="18.5" cy="18.5" r="2.5" stroke="white" stroke-width="1.8"/>
            </svg>
        </div>
        <p class="app-name">Translink</p>
        <p class="app-sub">Sistema de gestión<br>de flota de transporte</p>
    </div>

    <!-- DERECHA -->
    <div class="right">
        <p class="welcome">Bienvenido</p>
        <p class="welcome-sub">Accede con tus credenciales</p>

        @if($errors->any())
            <div class="error-msg">
                Credenciales incorrectas. Inténtalo de nuevo.
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="field">
                <label>CORREO ELECTRÓNICO</label>
                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#6b7280" stroke-width="1.5"/>
                    <path d="M2 7l10 7 10-7" stroke="#6b7280" stroke-width="1.5"/>
                </svg>
                <input type="email" name="email" placeholder="conductor@translink.com"
                    value="{{ old('email') }}" required autofocus>
            </div>

            <div class="field">
                <label>CONTRASEÑA</label>
                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#6b7280" stroke-width="1.5"/>
                    <path d="M8 11V7a4 4 0 018 0v4" stroke="#6b7280" stroke-width="1.5"/>
                </svg>
                <input type="password" name="password" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn">Acceder al sistema →</button>
        </form>

        <div class="bottom-row">
            <span class="version">v1.0.0 · ILERNA DAW</span>
            <div class="status-pill">
                <div class="status-dot"></div>
                <span class="status-txt">Sistema operativo</span>
            </div>
        </div>
    </div>

</div>

</body>
</html>
