# JWT Authentication API

FastAPI application that implements JWT-based authentication with **access tokens** (300 s) and **refresh tokens** (24 h). Passwords are hashed with **bcrypt** via `passlib`. Dependencies are managed with **Poetry**.

---

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py        # FastAPI application and route handlers
│   ├── auth.py        # Password hashing and JWT utilities
│   ├── models.py      # Pydantic request/response schemas
│   └── config.py      # Application settings (pydantic-settings)
├── pyproject.toml     # Poetry project file
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/auth/login` | Authenticate and obtain access + refresh tokens |
| `POST` | `/auth/refresh` | Exchange a refresh token for a new access token |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Swagger UI (interactive documentation) |
| `GET` | `/redoc` | ReDoc documentation |

### POST `/auth/login`

**Request body (JSON)**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### POST `/auth/refresh`

**Request body (JSON)**

```json
{
  "refresh_token": "<refresh_jwt>"
}
```

**Response**

```json
{
  "access_token": "<new_jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

---

## Running with Docker (recommended)

> **Prerequisites:** Docker and Docker Compose installed.

```bash
# From the backend/ directory
docker compose up --build
```

The API will be available at `http://localhost:8000`.

To stop:

```bash
docker compose down
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | `change-this-secret-key-in-production` | Secret used to sign JWTs — **change in production** |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_SECONDS` | `300` | Access token lifetime in seconds |
| `REFRESH_TOKEN_EXPIRE_SECONDS` | `86400` | Refresh token lifetime in seconds |

Override any variable in `docker-compose.yml` or pass it with `-e`:

```bash
SECRET_KEY=super-secret docker compose up --build
```

---

## Running locally with Poetry

> **Prerequisites:** Python 3.11+ and [Poetry](https://python-poetry.org/docs/#installation).

```bash
# From the backend/ directory

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload --port 8000
```

---

## Quick test with curl

```bash
# 1. Login
curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python -m json.tool

# 2. Refresh (replace <refresh_token> with the value from the previous response)
curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"<refresh_token>"}' | python -m json.tool
```

---

## Technical notes

- **passlib 1.7.x** is not compatible with **bcrypt 4.x or higher**. The `bcrypt` dependency is pinned to `>=3.2,<4.0` in `pyproject.toml` to prevent breakage.
- The `package-mode = false` flag in `pyproject.toml` marks this project as an application rather than a distributable package.
- Tokens carry a `token_type` claim (`"access"` / `"refresh"`) so that access tokens cannot be submitted to the refresh endpoint and vice versa.
