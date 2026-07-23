import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'

export function DashboardPage() {
  return (
    <section className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Inicio</p>
          <h1>Bienvenido</h1>
          <p className="page__subtitle">
            Gestiona pacientes y sus historiales clínicos ocupacionales.
          </p>
        </div>
      </div>

      <Link to="/app/pacientes" className="quick-link">
        <Users size={22} />
        <div>
          <strong>Pacientes</strong>
          <span>Ver listado, registrar y editar trabajadores</span>
        </div>
      </Link>
    </section>
  )
}
