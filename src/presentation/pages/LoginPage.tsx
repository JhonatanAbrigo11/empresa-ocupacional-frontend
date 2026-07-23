import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/useAuth'
import marcaLogo from '@/assets/marca.png'

export function LoginPage() {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@medocupacional.com')
  const [password, setPassword] = useState('admin123')
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
      <div className="login-panel">
        <div className="login-brand">
          <img
            src={marcaLogo}
            alt="MedOcupacional"
            className="login-brand__logo"
          />
          <h1>MedOcupacional</h1>
          <p>Plataforma de gestión para medicina ocupacional</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>

          <label className="field">
            <span>Correo electrónico</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? 'Ingresando…' : 'Entrar'}
          </button>

          <p className="login-hint">
            Demo: <code>admin@medocupacional.com</code> / <code>admin123</code>
          </p>
        </form>
      </div>
    </div>
  )
}
