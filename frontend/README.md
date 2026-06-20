# Frontend – JWT Authentication UI

Aplicación web construida con **React 18** y **Vite** que consume la API de autenticación JWT del backend. Sigue el design system PlayStation definido en `DESIGN.md`: canvas oscuro, tipografía PlayStation SST (con fallback a Helvetica Neue), botones pill en PlayStation Blue (`#0070d1`), cards con radio `8px` y footer en PlayStation Blue.

---

## Estructura del proyecto

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── auth.js              # Llamadas fetch al backend (/auth/login, /auth/refresh)
│   ├── components/
│   │   └── ProtectedRoute.jsx   # HOC que redirige a /login si no hay sesión
│   ├── context/
│   │   └── AuthContext.jsx      # Estado global de autenticación (sessionStorage)
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de inicio de sesión
│   │   ├── LoginPage.module.css
│   │   ├── WelcomePage.jsx      # Página de bienvenida (protegida)
│   │   └── WelcomePage.module.css
│   ├── styles/
│   │   ├── tokens.css           # CSS custom properties del design system
│   │   └── global.css           # Reset + clases utilitarias (btn-primary, input-field)
│   ├── App.jsx                  # Router principal
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Páginas

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/login` | Formulario de autenticación | Público |
| `/welcome` | Pantalla de bienvenida con info de sesión | Solo autenticados |
| `/*` | Redirige a `/login` | — |

### Flujo de autenticación

1. El usuario ingresa credenciales en `/login`.
2. El frontend llama `POST /api/auth/login` en el backend.
3. Si la respuesta es exitosa, el `access_token`, `refresh_token` y `username` se guardan en `sessionStorage`.
4. React Router redirige automáticamente a `/welcome`.
5. Al cerrar sesión (botón "Cerrar sesión"), se limpia `sessionStorage` y se vuelve a `/login`.
6. Intentar navegar a `/welcome` sin sesión activa redirige a `/login`.

> El token se almacena en **`sessionStorage`**: persiste mientras la pestaña esté abierta y se elimina automáticamente al cerrarla.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- Backend corriendo en `http://localhost:8000` (ver `../backend/README.md`)

---

## Instalación y ejecución

```bash
# Desde la carpeta frontend/
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

El servidor de desarrollo redirige las peticiones `/api/*` al backend en `http://localhost:8000` mediante el proxy de Vite (configurado en `vite.config.js`), por lo que no hay problemas de CORS en desarrollo.

### Generar build de producción

```bash
npm run build      # genera dist/
npm run preview    # sirve el build en http://localhost:4173
```

---

## Credenciales de prueba

| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `admin123` |

---

## Design system aplicado

El diseño sigue el sistema PlayStation definido en `DESIGN.md`:

| Elemento | Token |
|----------|-------|
| Fondo de páginas | `--color-canvas-dark` (`#000000`) |
| Cards | `--color-surface-dark-card` (`#181818`) |
| Botón primario | `--color-primary` (`#0070d1`), `--radius-full` (9999 px) |
| Inputs | `--radius-sm` (4 px), alto 48 px |
| Footer | `--color-primary` (`#0070d1`) |
| Tipografía | PlayStation SST (fallback: Helvetica Neue, Arial) |
| Titulares hero | `font-weight: 300` (display light, firma del sistema) |
