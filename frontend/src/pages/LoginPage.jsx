import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/welcome')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Nav bar */}
      <header className={styles.nav}>
        <span className={styles.navLogo}>
          <svg viewBox="0 0 100 14" aria-label="PlayStation" width="120" height="17" fill="currentColor">
            <path d="M9.5 0 C6 0 4.3 1.8 4.3 4.2 v8.2 h2.9 V4.5 c0-1.3 0.7-2 2.2-2 1.5 0 2.3 0.8 2.3 2.2 v2.6 H9.4 v2.4 h2.3 v2.7 h2.9 V4.2 C14.6 1.8 13 0 9.5 0 Z"/>
            <text x="0" y="12" fontSize="13" fontWeight="700" letterSpacing="0.5" fontFamily="Arial, sans-serif">PlayStation</text>
          </svg>
        </span>
      </header>

      {/* Hero band */}
      <main className={styles.hero}>
        <div className={styles.card}>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.subtitle}>Accede con tu cuenta de PlayStation</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">Usuario</label>
              <input
                id="username"
                className="input-field"
                type="text"
                autoComplete="username"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="input-field"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button
              className="btn-primary"
              type="submit"
              disabled={loading || !username || !password}
            >
              {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer band */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2026 PlayStation. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
