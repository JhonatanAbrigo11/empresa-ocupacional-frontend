import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Stethoscope,
  Menu,
  X,
  Settings,
  UserCog,
  ChevronDown,
  ClipboardList,
  Users,
  FileText,
  FileCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const configActive = location.pathname.startsWith('/app/configuracion')
  const [configExpanded, setConfigExpanded] = useState(configActive)

  const docsActive = location.pathname.startsWith('/app/documentos')
  const [docsExpanded, setDocsExpanded] = useState(docsActive || true)

  useEffect(() => {
    if (configActive) setConfigExpanded(true)
    if (docsActive) setDocsExpanded(true)
  }, [configActive, docsActive])

  const toggleDocs = () => {
    if (docsActive) {
      setDocsExpanded(true)
      return
    }
    setDocsExpanded((v) => !v)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const closeMobile = () => setMobileOpen(false)

  const toggleConfig = () => {
    if (configActive) {
      setConfigExpanded(true)
      return
    }
    setConfigExpanded((v) => !v)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
        <div className="sidebar__brand">
          <span className="sidebar__brand-icon">
            <Stethoscope size={22} strokeWidth={2} />
          </span>
          <div className="sidebar__label">
            <strong>MedOcupacional</strong>
            <span>Gestión clínica</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          <NavLink
            to="/app"
            end
            title="Inicio"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={closeMobile}
          >
            <LayoutDashboard size={18} className="sidebar__link-icon" />
            <span className="sidebar__label">Inicio</span>
          </NavLink>

          <NavLink
            to="/app/gestion-consultas"
            title="Gestión de Consultas"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={closeMobile}
          >
            <ClipboardList size={18} className="sidebar__link-icon" />
            <span className="sidebar__label">Gestión de Consultas</span>
          </NavLink>

          <NavLink
            to="/app/pacientes"
            title="Pacientes"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            onClick={closeMobile}
          >
            <Users size={18} className="sidebar__link-icon" />
            <span className="sidebar__label">Pacientes</span>
          </NavLink>

          <div
            className={`sidebar__group ${docsExpanded ? 'sidebar__group--open' : ''}`}
          >
            <button
              type="button"
              className={`sidebar__link sidebar__group-toggle ${docsActive ? 'sidebar__link--parent-active' : ''}`}
              title="Documentos"
              aria-expanded={docsExpanded}
              onClick={toggleDocs}
            >
              <FileText size={18} className="sidebar__link-icon" />
              <span className="sidebar__label">Documentos</span>
              <ChevronDown size={16} className="sidebar__chevron sidebar__label" />
            </button>

            {docsExpanded && (
              <div className="sidebar__submenu">
                <NavLink
                  to="/app/documentos/historia-clinica-ocupacional"
                  title="Historia Clínica Ocupacional"
                  className={({ isActive }) =>
                    `sidebar__link sidebar__sublink ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={closeMobile}
                >
                  <FileCheck size={18} className="sidebar__link-icon" />
                  <span className="sidebar__label">Historia Clínica Ocupacional</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/certificado-medico-ocupacional"
                  title="Certificado - Evaluación Médica Ocupacional"
                  className={({ isActive }) =>
                    `sidebar__link sidebar__sublink ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={closeMobile}
                >
                  <FileCheck size={18} className="sidebar__link-icon" />
                  <span className="sidebar__label">Certificado Ocupacional</span>
                </NavLink>
              </div>
            )}
          </div>

          <div
            className={`sidebar__group ${configExpanded ? 'sidebar__group--open' : ''}`}
          >
            <button
              type="button"
              className={`sidebar__link sidebar__group-toggle ${configActive ? 'sidebar__link--parent-active' : ''}`}
              title="Configuración"
              aria-expanded={configExpanded}
              onClick={toggleConfig}
            >
              <Settings size={18} className="sidebar__link-icon" />
              <span className="sidebar__label">Configuración</span>
              <ChevronDown size={16} className="sidebar__chevron sidebar__label" />
            </button>

            {configExpanded && (
              <div className="sidebar__submenu">
                <NavLink
                  to="/app/configuracion/usuarios"
                  title="Usuarios"
                  className={({ isActive }) =>
                    `sidebar__link sidebar__sublink ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={closeMobile}
                >
                  <UserCog size={18} className="sidebar__link-icon" />
                  <span className="sidebar__label">Usuarios</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <span className="sidebar__avatar" title={user?.nombre}>
              {user?.nombre.charAt(0) ?? 'U'}
            </span>
            <div className="sidebar__label sidebar__user-info">
              <strong>{user?.nombre}</strong>
              <span>{user?.email}</span>
            </div>
            <button
              type="button"
              className="btn btn--icon sidebar__logout"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span className="sidebar__label sidebar__logout-text">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="app-main">
        <header className="topbar">
          <button
            type="button"
            className="btn btn--icon topbar__menu"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="topbar__title">Panel de medicina ocupacional</p>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
