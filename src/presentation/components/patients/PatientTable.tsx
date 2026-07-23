import { Pencil, Trash2, FolderOpen, UserRound } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'

interface PatientTableProps {
  patients: Patient[]
  onViewProfile: (patient: Patient) => void
  onViewHistory: (patient: Patient) => void
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
}

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
        <span>Usa el botón “Nuevo paciente” para comenzar.</span>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Empresa</th>
            <th>Cargo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>
                <strong>{patient.nombre}</strong>
              </td>
              <td>{patient.cedula}</td>
              <td>{patient.empresa}</td>
              <td>{patient.cargo || '—'}</td>
              <td>{patient.telefono || '—'}</td>
              <td>
                <div className="row-actions">
                  <button
                    type="button"
                    className="btn btn--icon btn--accent"
                    title="Ver perfil"
                    onClick={() => onViewProfile(patient)}
                  >
                    <UserRound size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--icon"
                    title="Editar"
                    onClick={() => onEdit(patient)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--icon btn--danger"
                    title="Eliminar"
                    onClick={() => onDelete(patient)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--icon"
                    title="Historial clínico"
                    onClick={() => onViewHistory(patient)}
                  >
                    <FolderOpen size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
