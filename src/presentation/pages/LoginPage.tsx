import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/presentation/hooks/useAuth'
import marcaLogo from '@/assets/documents/logoDocument.png'

export function LoginPage() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@medocupacional.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="login-page">
      <img
        src={marcaLogo}
        alt=""
        aria-hidden
        className="login-page__watermark"
      />

      <div className="login-panel">
        <div className="login-panel__top">
          <img
            src={marcaLogo}
            alt="MedOcupacional"
            className="login-panel__logo"
          />
          <p className="login-panel__brand">MedOcupacional</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__intro">
            <h1>Bienvenido</h1>
            <p>Inicia sesión para continuar</p>
          </div>

          <label className="login-field">
            <span>Correo electrónico</span>
            <div className="login-field__control">
              <Mail size={18} className="login-field__icon" aria-hidden />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej. admin@medocupacional.com"
              />
            </div>
          </label>

          <label className="login-field">
            <span>Contraseña</span>
            <div className="login-field__control">
              <Lock size={18} className="login-field__icon" aria-hidden />
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
                className="login-field__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--primary btn--block login-form__submit"
            disabled={submitting}
          >
            {submitting ? 'Ingresando…' : 'Iniciar sesión'}
          </button>

          <p className="login-hint">
            Demo: <code>admin@medocupacional.com</code> / <code>admin123</code>
          </p>
        </form>
      </div>
    </div>
  )
}
