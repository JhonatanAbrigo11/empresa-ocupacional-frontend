import { useState, useMemo } from 'react'
import { Search, UserCheck, X, Building2, Briefcase, FileText } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'
import { usePatients } from '@/presentation/hooks/usePatients'

interface SelectPatientModalProps {
  open: boolean
  onClose: () => void
  onSelectPatient: (patient: Patient) => void
  title?: string
  subtitle?: string
}

export function SelectPatientModal({
  open,
  onClose,
  onSelectPatient,
  title = 'Seleccionar Paciente para Nuevo Documento',
  subtitle = 'Busque y seleccione el trabajador para precargar sus datos en el nuevo formulario.',
}: SelectPatientModalProps) {
  const { patients, loading } = usePatients()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients
    const term = searchTerm.toLowerCase().trim()
    return patients.filter((p) => {
      const fullName = `${p.primerNombre} ${p.segundoNombre} ${p.primerApellido} ${p.segundoApellido} ${p.nombre}`.toLowerCase()
      const cedula = (p.cedula || '').toLowerCase()
      const empresa = (p.empresa || '').toLowerCase()
      const cargo = (p.cargo || '').toLowerCase()
      return fullName.includes(term) || cedula.includes(term) || empresa.includes(term) || cargo.includes(term)
    })
  }, [patients, searchTerm])

  if (!open) return null

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--patient-select"
        style={{ maxWidth: '780px', width: '92%' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="select-patient-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <div className="doc-page-header__badge" style={{ marginBottom: '0.4rem' }}>
              <UserCheck size={16} />
              <span>Búsqueda de Trabajadores</span>
            </div>
            <h2 id="select-patient-title" style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h2>
            <p className="page__subtitle" style={{ margin: '0.2rem 0 0 0' }}>{subtitle}</p>
          </div>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
          {/* Search Box */}
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem 0.85rem' }}>
            <Search size={18} className="text-muted" />
            <input
              type="text"
              placeholder="Buscar por Nombre, Cédula (C.I.), Empresa o Cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }}
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                onClick={() => setSearchTerm('')}
                style={{ padding: '2px' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* List of Patients */}
          {loading ? (
            <div className="app-loading app-loading--inline" style={{ padding: '2rem' }}>
              <div className="spinner" />
              <p>Cargando pacientes registrados...</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="empty-state" style={{ padding: '2.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px' }}>
              <UserCheck size={36} style={{ color: 'var(--muted)', marginBottom: '0.5rem' }} />
              <p style={{ fontWeight: 600, color: 'var(--foreground)' }}>No se encontraron pacientes</p>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                {searchTerm ? `No hay coincidencia para "${searchTerm}"` : 'No hay pacientes registrados en el sistema.'}
              </span>
            </div>
          ) : (
            <div className="patient-select-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredPatients.map((p) => {
                const displayName = `${p.primerApellido} ${p.segundoApellido || ''} ${p.primerNombre} ${p.segundoNombre || ''}`.trim() || p.nombre
                return (
                  <div
                    key={p.id}
                    className="patient-select-card"
                    onClick={() => {
                      onSelectPatient(p)
                      onClose()
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      gap: '1rem',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
                      e.currentTarget.style.background = '#f0f9ff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.background = '#ffffff'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                          color: '#ffffff',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          flexShrink: 0,
                        }}
                      >
                        {(p.primerNombre?.[0] || p.nombre?.[0] || 'P').toUpperCase()}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>
                          {displayName}
                        </strong>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                          <span><strong>C.I:</strong> {p.cedula}</span>
                          {p.empresa && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Building2 size={12} /> {p.empresa}
                            </span>
                          )}
                          {p.cargo && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Briefcase size={12} /> {p.cargo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      style={{ flexShrink: 0, gap: '4px' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectPatient(p)
                        onClose()
                      }}
                    >
                      <FileText size={14} />
                      <span>Seleccionar</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
