import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './WelcomePage.module.css'

const MS_CERTIFICATIONS_2026 = [
  {
    title: 'Azure AI Apps and Agents Developer Associate',
    category: 'AI & Azure',
    description:
      'Nueva certificación enfocada en el desarrollo de aplicaciones y agentes de IA en Azure. Reemplaza a Azure AI Engineer Associate.',
    badge: '🤖',
  },
  {
    title: 'Machine Learning Operations Engineer Associate',
    category: 'Data & AI',
    description:
      'Valida competencias en operaciones de Machine Learning (MLOps). Reemplaza a Azure Data Scientist Associate.',
    badge: '⚙️',
  },
  {
    title: 'Azure Databricks Data Engineer Associate',
    category: 'Data & AI',
    description:
      'Nueva certificación para ingenieros de datos que trabajan con Azure Databricks. Incorporación sin retiro previo.',
    badge: '🔥',
  },
  {
    title: 'SQL AI Developer Associate',
    category: 'Data & AI',
    description:
      'Certifica habilidades en desarrollo con SQL e inteligencia artificial. Nueva incorporación al catálogo 2026.',
    badge: '🗄️',
  },
  {
    title: 'Agentic AI Business Solutions Architect',
    category: 'Business Applications',
    description:
      'Certificación avanzada para arquitectos de soluciones empresariales basadas en IA agéntica.',
    badge: '🏗️',
  },
  {
    title: 'Azure AI Cloud Developer Associate',
    category: 'Digital & App Innovation',
    description:
      'Nueva certificación para desarrolladores de aplicaciones en la nube con IA. Reemplaza a Azure Developer Associate.',
    badge: '☁️',
  },
  {
    title: 'Cloud and AI Security Engineer Associate',
    category: 'Seguridad',
    description:
      'Cubre seguridad en entornos cloud e IA. Reemplaza a Azure Security Engineer Associate.',
    badge: '🔒',
  },
  {
    title: 'GitHub Certified: Agentic AI Developer',
    category: 'Developer Tools',
    description:
      'Primera certificación de GitHub para desarrolladores de agentes de IA. Nueva incorporación sin retiro previo.',
    badge: '🐙',
  },
  {
    title: 'Dynamics 365 Sales AI Consultant Associate',
    category: 'Business Applications',
    description:
      'Certifica consultoría en ventas con IA usando Dynamics 365. Reemplaza a Dynamics 365 Customer Experience Analyst Associate.',
    badge: '📊',
  },
  {
    title: 'Intelligent Applications Builder Associate',
    category: 'Business Applications',
    description:
      'Valida la construcción de aplicaciones inteligentes con Power Platform. Reemplaza a Power Platform Functional Consultant Associate.',
    badge: '💡',
  },
]

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

      {/* Microsoft Certifications 2026 section */}
      <section className={styles.certsSection}>
        <div className={styles.certsInner}>
          <p className={styles.certsEyebrow}>Novedades 2026</p>
          <h2 className={styles.certsTitle}>Nuevas Certificaciones Microsoft</h2>
          <p className={styles.certsSubtitle}>
            Las últimas certificaciones anunciadas por Microsoft para el año 2026, con foco en
            Inteligencia Artificial y soluciones en la nube.
          </p>
          <div className={styles.certsGrid}>
            {MS_CERTIFICATIONS_2026.map((cert) => (
              <div key={cert.title} className={styles.certCard}>
                <span className={styles.certBadge}>{cert.badge}</span>
                <span className={styles.certCategory}>{cert.category}</span>
                <h3 className={styles.certName}>{cert.title}</h3>
                <p className={styles.certDesc}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue footer band */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2026 PlayStation. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
