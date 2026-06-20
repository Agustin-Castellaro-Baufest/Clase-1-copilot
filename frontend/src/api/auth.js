const BASE_URL = '/api'

/**
 * POST /auth/login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{access_token: string, refresh_token: string, token_type: string, expires_in: number}>}
 */
export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail ?? 'Credenciales inválidas')
  }

  return response.json()
}

/**
 * POST /auth/refresh
 * @param {string} refreshToken
 * @returns {Promise<{access_token: string, token_type: string, expires_in: number}>}
 */
export async function refreshToken(refreshToken) {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail ?? 'Token de refresco inválido o expirado')
  }

  return response.json()
}
