import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/presentation/hooks/useAuth'

export function LoginPage() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@medocupacional.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/app/pacientes" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login(email, password)
      navigate('/app/pacientes')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-split-page">
      {/* Animated Blurred Ambient Background Orbs */}
      <div className="login-bg-orb orb-1" aria-hidden="true" />
      <div className="login-bg-orb orb-2" aria-hidden="true" />
      <div className="login-bg-orb orb-3" aria-hidden="true" />

      <div className="login-split-card">
        {/* Left Side: Blue Brand & Wave Graphic */}
        <div className="login-left-side">
          <div className="left-content">
            <span className="left-welcome-eyebrow">Bienvenido a</span>
            
            {/* White Circle Logo Badge */}
            <div className="left-logo-badge">
              <img src="/Logo.jpeg" alt="MedOcupacional Logo" />
            </div>

            <h2 className="left-brand-title">MedOcupacional</h2>
            <p className="left-brand-desc">
              Plataforma integral de Salud Ocupacional, evaluación médica de trabajadores, emisión de historias clínicas y certificados de aptitud laboral.
            </p>
          </div>

          <div className="left-footer">
            <span>MEDOCUPACIONAL</span>
            <span className="divider">|</span>
            <span>SALUD &amp; PREVENCIÓN</span>
          </div>

          {/* Organic Wave SVG Divider */}
          <div className="wave-divider" aria-hidden="true">
            <svg viewBox="0 0 100 500" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C30 80 80 120 40 220C-10 320 60 420 0 500H100V0H0Z" fill="#ffffff"/>
            </svg>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="login-right-side">
          <div className="form-header">
            <h1>Iniciar Sesión</h1>
            <p>Ingresa tus credenciales de acceso institucional</p>
          </div>

          <form className="login-form-body" onSubmit={handleSubmit}>
            <label className="custom-login-field">
              <span>Correo electrónico</span>
              <div className="input-icon-wrapper">
                <Mail size={18} className="field-left-icon" />
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@medocupacional.com"
                />
              </div>
            </label>

            <label className="custom-login-field">
              <span>Contraseña</span>
              <div className="input-icon-wrapper">
                <Lock size={18} className="field-left-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="login-options">
              <label className="checkbox-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordar credenciales</span>
              </label>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="submit"
              className="split-login-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Ingresando…' : 'Iniciar Sesión'}
            </button>

            {/* Quick Demo Access Box */}
            <div className="demo-credentials-box">
              <div className="demo-title">
                <ShieldCheck size={16} />
                <span>Credenciales de Prueba Demo</span>
              </div>
              <div className="demo-keys">
                <span><strong>Usuario:</strong> admin@medocupacional.com</span>
                <span><strong>Clave:</strong> admin123</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
