import { Eye, Pencil, Trash2, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'

interface PatientTableProps {
  patients: Patient[]
  onViewProfile: (patient: Patient) => void
  onViewHistory: (patient: Patient) => void
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
}

function getEstadoBadge(index: number) {
  if (index % 5 === 3) {
    return (
      <span className="status-dot-badge status-dot-badge--pending">
        <span className="status-dot" /> Pendiente
      </span>
    )
  }
  if (index % 5 === 4) {
    return (
      <span className="status-dot-badge status-dot-badge--inactive">
        <span className="status-dot" /> Inactivo
      </span>
    )
  }
  return (
    <span className="status-dot-badge status-dot-badge--active">
      <span className="status-dot" /> Activo
    </span>
  )
}

const avatarColors = [
  { bg: '#dbeafe', text: '#2563eb' },
  { bg: '#e0e7ff', text: '#4f46e5' },
  { bg: '#d1fae5', text: '#059669' },
  { bg: '#fef3c7', text: '#d97706' },
  { bg: '#fce7f3', text: '#db2777' },
  { bg: '#fed7aa', text: '#ea580c' },
]

export function PatientTable({
  patients,
  onViewProfile,
  onViewHistory,
  onEdit,
  onDelete,
}: PatientTableProps) {
  if (patients.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay pacientes registrados.</p>
        <span>Usa el botón “+ Nuevo paciente” para comenzar.</span>
      </div>
    )
  }

  return (
    <div className="page-card-body">
      <div className="table-wrap">
        <table className="norm-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>CÉDULA</th>
              <th>EMPRESA</th>
              <th>CARGO</th>
              <th>TELÉFONO</th>
              <th>ESTADO</th>
              <th style={{ textAlign: 'center' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, idx) => (
              <tr key={patient.id}>
                <td className="col-name">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: avatarColors[idx % avatarColors.length].bg,
                        color: avatarColors[idx % avatarColors.length].text,
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        flexShrink: 0,
                      }}
                    >
                      {(patient.nombre?.charAt(0) || 'P').toUpperCase()}
                    </div>
                    <strong>{patient.nombre}</strong>
                  </div>
                </td>
                <td style={{ color: '#475569', fontWeight: 500 }}>{patient.cedula}</td>
                <td style={{ color: '#334155' }}>{patient.empresa}</td>
                <td style={{ color: '#475569' }}>{patient.cargo || '—'}</td>
                <td style={{ color: '#475569', fontWeight: 500 }}>{patient.telefono || '—'}</td>
                <td>{getEstadoBadge(idx)}</td>
                <td>
                  <div className="norm-action-group" style={{ justifyContent: 'center' }}>
                    <button
                      type="button"
                      className="norm-action-btn"
                      title="Ver perfil"
                      onClick={() => onViewProfile(patient)}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      className="norm-action-btn"
                      title="Editar paciente"
                      onClick={() => onEdit(patient)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      className="norm-action-btn norm-action-btn--danger"
                      title="Eliminar paciente"
                      onClick={() => onDelete(patient)}
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      type="button"
                      className="norm-action-btn"
                      title="Historial clínico"
                      onClick={() => onViewHistory(patient)}
                    >
                      <FolderOpen size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-pagination-footer">
        <span className="pagination-info">
          Mostrando 1 a {patients.length} de {patients.length} resultados
        </span>
        <div className="pagination-controls">
          <button type="button" className="page-btn" disabled>
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="page-num page-num--active">
            1
          </button>
          <button type="button" className="page-btn" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
