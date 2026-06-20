import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './WelcomePage.module.css'

export default function WelcomePage() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      {/* Primary nav — dark canvas */}
      <header className={styles.nav}>
        <span className={styles.navLogo}>PlayStation</span>
        <nav className={styles.navActions}>
          <span className={styles.navUser}>{session?.username}</span>
          <button className={styles.btnLogout} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Hero band — dark canvas */}
      <section className={styles.heroBand}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Bienvenido/a</p>
          <h1 className={styles.heroTitle}>{session?.username}</h1>
          <p className={styles.heroBody}>
            Tu sesión está activa. El token expira en{' '}
            <strong>{session?.expiresIn ?? 300} segundos</strong>.
          </p>
        </div>
      </section>

      {/* Light band — token info card */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h2 className={styles.cardHeading}>Información de sesión</h2>
          <dl className={styles.tokenList}>
            <div className={styles.tokenRow}>
              <dt>Access Token</dt>
              <dd className={styles.tokenValue}>{session?.accessToken}</dd>
            </div>
            <div className={styles.tokenRow}>
              <dt>Tipo</dt>
              <dd>bearer</dd>
            </div>
            <div className={styles.tokenRow}>
              <dt>Expiración</dt>
              <dd>{session?.expiresIn ?? 300} s</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Blue footer band */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2026 PlayStation. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
