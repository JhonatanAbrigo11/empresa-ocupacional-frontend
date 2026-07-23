import { FolderOpen, Pencil, X } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'

function sexoLabel(sexo: Patient['sexo']): string {
  if (sexo === 'M') return 'Masculino'
  if (sexo === 'F') return 'Femenino'
  return 'Otro'
}

interface PatientProfileModalProps {
  open: boolean
  patient: Patient | null
  onClose: () => void
  onOpenHistory: (patient: Patient) => void
}

export function PatientProfileModal({
  open,
  patient,
  onClose,
  onOpenHistory,
}: PatientProfileModalProps) {
  if (!open || !patient) return null

  const fields: Array<{ label: string; value: string }> = [
    { label: 'Nombre completo', value: patient.nombre },
    { label: 'Cédula', value: patient.cedula },
    { label: 'Empresa', value: patient.empresa },
    { label: 'Cargo', value: patient.cargo || '—' },
    { label: 'Teléfono', value: patient.telefono || '—' },
    { label: 'Correo electrónico', value: patient.email || '—' },
    { label: 'Fecha de nacimiento', value: patient.fechaNacimiento || '—' },
    { label: 'Sexo', value: sexoLabel(patient.sexo) },
    { label: 'Fecha de ingreso', value: patient.fechaIngreso || '—' },
  ]

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--profile"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header profile-modal__header">
          <div className="profile-hero">
            <span className="profile-avatar" aria-hidden="true">
              {patient.nombre.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="page__eyebrow">Perfil del paciente</p>
              <h2 id="profile-modal-title">{patient.nombre}</h2>
              <p className="page__subtitle">
                Cédula {patient.cedula} · {patient.empresa}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="modal__body profile-modal__body">
          <div className="profile-modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onOpenHistory(patient)}
            >
              <FolderOpen size={16} />
              Historial clínico
            </button>
          </div>

          <div className="profile-card">
            <div className="profile-card__head">
              <h3>Datos personales</h3>
              <span className="profile-card__hint">
                <Pencil size={14} /> Información registrada
              </span>
            </div>
            <dl className="profile-grid">
              {fields.map((field) => (
                <div key={field.label} className="profile-grid__item">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
