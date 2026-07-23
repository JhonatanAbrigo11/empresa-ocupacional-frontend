import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner" />
        <p>Cargando sesión…</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
