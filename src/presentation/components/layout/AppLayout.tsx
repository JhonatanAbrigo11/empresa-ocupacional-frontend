import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
  ChevronDown,
  Users,
  FileText,
  FileCheck,
  Microscope,
  FolderOpen,
  Pill,
  Syringe,
  X,
  Plus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'

export function AppLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const configActive = location.pathname.startsWith('/app/configuracion')
  const docsActive = location.pathname.startsWith('/app/documentos')
  const [configExpanded, setConfigExpanded] = useState<boolean>(configActive)
  const [docsExpanded, setDocsExpanded] = useState<boolean>(true)

  // Mobile Bottom Sheet state for Documents
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false)

  useEffect(() => {
    if (configActive) setConfigExpanded(true)
    if (docsActive) setDocsExpanded(true)
  }, [configActive, docsActive])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const toggleConfig = () => {
    setConfigExpanded((v) => !v)
  }

  const toggleDocs = () => {
    setDocsExpanded((v) => !v)
  }

  return (
    <div className="app-shell drive-theme">
      {/* Brand Style Guide Collapsible Blue Sidebar (Desktop/Laptop) */}
      <aside className="sidebar drive-sidebar">
        {/* Brand Header with Logo / Banner Images */}
        <div className="drive-sidebar__brand">
          <img
            src="/Logo.jpeg"
            alt="MedOcupacional Logo"
            className="drive-brand-logo"
            title="MedOcupacional"
          />
          <img
            src="/Banner.jpeg"
            alt="MedOcupacional Banner"
            className="drive-brand-banner"
            title="MedOcupacional"
          />
        </div>

        {/* Navigation Items */}
        <nav className="drive-sidebar__nav">
          <NavLink
            to="/app"
            end
            title="Inicio"
            className={({ isActive }) =>
              `drive-nav-item ${isActive ? 'drive-nav-item--active' : ''}`
            }
          >
            <LayoutDashboard size={20} className="drive-nav-icon" />
            <span className="drive-nav-text">Inicio</span>
          </NavLink>

          <NavLink
            to="/app/pacientes"
            title="Pacientes"
            className={({ isActive }) =>
              `drive-nav-item ${isActive ? 'drive-nav-item--active' : ''}`
            }
          >
            <Users size={20} className="drive-nav-icon" />
            <span className="drive-nav-text">Pacientes</span>
          </NavLink>

          {/* Group: Documentos */}
          <div className={`drive-nav-group ${docsExpanded ? 'drive-nav-group--open' : ''}`}>
            <button
              type="button"
              className={`drive-nav-item drive-group-toggle ${docsActive ? 'drive-nav-item--parent-active' : ''}`}
              title="Documentos"
              onClick={toggleDocs}
            >
              <FileText size={20} className="drive-nav-icon" />
              <span className="drive-nav-text">Documentos</span>
              <ChevronDown size={15} className="drive-chevron" />
            </button>

            {docsExpanded && (
              <div className="drive-submenu">
                <NavLink
                  to="/app/documentos/historial-clinico"
                  title="Historial Clínico"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <FolderOpen size={16} className="drive-subicon" />
                  <span className="drive-subtext">Historial Clínico</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/historia-clinica-ocupacional"
                  title="Historia Clínica Ocupacional"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <FileCheck size={16} className="drive-subicon" />
                  <span className="drive-subtext">Historia Ocupacional</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/certificado-medico-ocupacional"
                  title="Certificado Ocupacional"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <FileCheck size={16} className="drive-subicon" />
                  <span className="drive-subtext">Certificado Ocupacional</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/certificado-coproparasitario"
                  title="Certificado Coproparasitario"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <Microscope size={16} className="drive-subicon" />
                  <span className="drive-subtext">Certificado Coproparasitario</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/receta-medica"
                  title="Receta Médica"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <Pill size={16} className="drive-subicon" />
                  <span className="drive-subtext">Receta Médica</span>
                </NavLink>

                <NavLink
                  to="/app/documentos/inmunizaciones"
                  title="Inmunizaciones"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <Syringe size={16} className="drive-subicon" />
                  <span className="drive-subtext">Inmunizaciones</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Group: Configuración */}
          <div className={`drive-nav-group ${configExpanded ? 'drive-nav-group--open' : ''}`}>
            <button
              type="button"
              className={`drive-nav-item drive-group-toggle ${configActive ? 'drive-nav-item--parent-active' : ''}`}
              title="Configuración"
              onClick={toggleConfig}
            >
              <Settings size={20} className="drive-nav-icon" />
              <span className="drive-nav-text">Configuración</span>
              <ChevronDown size={15} className="drive-chevron" />
            </button>

            {configExpanded && (
              <div className="drive-submenu">
                <NavLink
                  to="/app/configuracion/usuarios"
                  title="Usuarios"
                  className={({ isActive }) =>
                    `drive-subitem ${isActive ? 'drive-subitem--active' : ''}`
                  }
                >
                  <UserCog size={16} className="drive-subicon" />
                  <span className="drive-subtext">Usuarios</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Clean Footer Logout Action */}
        <div className="drive-sidebar__footer">
          <button type="button" className="drive-logout-btn" title="Cerrar sesión" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="drive-logout-text">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main drive-main">
        {/* Content Outlet */}
        <main className="content drive-content">
          <Outlet />
        </main>
      </div>

      {/* ==========================================================================
          MOBILE BOTTOM NAVIGATOR BAR (MATCHING REFERENCE FAB FLOATING STYLE)
          ========================================================================== */}
      <nav className="mobile-bottom-navigator" aria-label="Navegación Móvil">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            `mobile-bottom-item ${isActive ? 'mobile-bottom-item--active' : ''}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Inicio</span>
          <span className="active-dot" />
        </NavLink>

        <NavLink
          to="/app/pacientes"
          className={({ isActive }) =>
            `mobile-bottom-item ${isActive ? 'mobile-bottom-item--active' : ''}`
          }
        >
          <Users size={20} />
          <span>Pacientes</span>
          <span className="active-dot" />
        </NavLink>

        {/* Central Prominent Floating FAB Button */}
        <div className="mobile-fab-wrapper">
          <button
            type="button"
            className={`mobile-fab-button ${docsActive ? 'mobile-fab-button--active' : ''}`}
            onClick={() => setMobileDocsOpen(true)}
            aria-label="Abrir Módulos de Documentos"
          >
            <Plus size={26} strokeWidth={2.8} />
          </button>
          <span className={`mobile-fab-label ${docsActive ? 'mobile-fab-label--active' : ''}`}>
            Documentos
          </span>
        </div>

        <NavLink
          to="/app/configuracion/usuarios"
          className={({ isActive }) =>
            `mobile-bottom-item ${isActive ? 'mobile-bottom-item--active' : ''}`
          }
        >
          <UserCog size={20} />
          <span>Usuarios</span>
          <span className="active-dot" />
        </NavLink>

        <button type="button" className="mobile-bottom-item" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Salir</span>
          <span className="active-dot" />
        </button>
      </nav>

      {/* Mobile Documents Quick Sheet Modal */}
      {mobileDocsOpen && (
        <div className="mobile-sheet-overlay" onClick={() => setMobileDocsOpen(false)}>
          <div className="mobile-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <div className="mobile-sheet-title">
                <FileText size={20} className="text-primary-blue" />
                <h3>Módulos de Documentos</h3>
              </div>
              <button
                type="button"
                className="mobile-sheet-close"
                onClick={() => setMobileDocsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-sheet-grid">
              <NavLink
                to="/app/documentos/historial-clinico"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <FolderOpen size={22} />
                <span>Historial Clínico</span>
              </NavLink>

              <NavLink
                to="/app/documentos/historia-clinica-ocupacional"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <FileCheck size={22} />
                <span>Historia Ocupacional</span>
              </NavLink>

              <NavLink
                to="/app/documentos/certificado-medico-ocupacional"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <FileCheck size={22} />
                <span>Certificado Ocupacional</span>
              </NavLink>

              <NavLink
                to="/app/documentos/certificado-coproparasitario"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <Microscope size={22} />
                <span>Certificado Coproparasitario</span>
              </NavLink>

              <NavLink
                to="/app/documentos/receta-medica"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <Pill size={22} />
                <span>Receta Médica</span>
              </NavLink>

              <NavLink
                to="/app/documentos/inmunizaciones"
                className="mobile-sheet-card"
                onClick={() => setMobileDocsOpen(false)}
              >
                <Syringe size={22} />
                <span>Inmunizaciones</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
