import { FolderOpen, X, Heart, Briefcase, User, Activity } from 'lucide-react'
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

  const personalFields: Array<{ label: string; value: string }> = [
    { label: 'Nombre completo', value: patient.nombre },
    { label: 'Cédula / Identificación', value: patient.cedula },
    { label: 'Sexo', value: sexoLabel(patient.sexo) },
    { label: 'Fecha de nacimiento', value: patient.fechaNacimiento || '—' },
    { label: 'Grupo Sanguíneo', value: patient.grupoSanguineo || '—' },
    { label: 'Lateralidad', value: patient.lateralidad || '—' },
    { label: 'Estado Civil', value: patient.estadoCivil || '—' },
    { label: 'Escolaridad', value: patient.escolaridad || '—' },
    { label: 'Ubicación', value: [patient.canton, patient.provincia].filter(Boolean).join(', ') || '—' },
  ]

  const laboralFields: Array<{ label: string; value: string }> = [
    { label: 'Empresa / Razón Social', value: patient.empresa },
    { label: 'Cargo / Puesto CIUO', value: patient.puestoTrabajoCiuo || patient.cargo || '—' },
    { label: 'Área / Departamento', value: patient.areaDepartamento || '—' },
    { label: 'RUC Empresa', value: patient.rucEmpresa || '—' },
    { label: 'CIIU', value: patient.ciiu || '—' },
    { label: 'Establecimiento', value: patient.establecimiento || '—' },
    { label: 'Fecha de Ingreso', value: patient.fechaIngreso || '—' },
    { label: 'N° Historia Clínica', value: patient.numHistoriaClinica || '—' },
  ]

  const antecedentesFields: Array<{ label: string; value: string }> = [
    { label: 'Alergias Conocidas', value: patient.alergias || 'Ninguna conocida' },
    { label: 'Patológicos / Quirúrgicos', value: patient.antecedentesPatologicos || 'Ninguno' },
    { label: 'Antecedentes Familiares', value: patient.antecedentesFamiliares || 'Sin antecedentes patológicos familiares' },
    { label: 'Medicación Habitual', value: patient.medicacionHabitual || 'Ninguna' },
    { label: 'Consumo de Tabaco', value: patient.consumoTabaco || 'No consume' },
    { label: 'Consumo de Alcohol', value: patient.consumoAlcohol || 'No consume' },
    { label: 'Actividad Física', value: patient.actividadFisica || 'No especificada' },
  ]

  if (patient.sexo === 'F') {
    antecedentesFields.push(
      { label: 'FUM (Menstruación)', value: patient.fum || '—' },
      { label: 'Fórmula Obstétrica', value: patient.formulaObstetrica || '—' },
      { label: 'Método Anticonceptivo', value: patient.metodoAnticonceptivo || '—' },
    )
  }

  const emergenciaFields: Array<{ label: string; value: string }> = [
    { label: 'Transfusiones Sangre', value: `Autoriza: ${patient.autorizaTransfusiones || 'SI'}` },
    { label: 'Contacto Emergencia', value: patient.contactoEmergenciaNombre || '—' },
    { label: 'Teléfono Emergencia', value: patient.contactoEmergenciaTelefono || '—' },
    { label: 'Parentesco', value: patient.contactoEmergenciaParentesco || '—' },
  ]

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--profile"
        style={{ maxWidth: '820px', width: '94%' }}
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
              <p className="page__eyebrow">Perfil integral del paciente</p>
              <h2 id="profile-modal-title">{patient.nombre}</h2>
              <p className="page__subtitle">
                Cédula {patient.cedula} · {patient.empresa} ({patient.cargo})
              </p>
            </div>
          </div>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="modal__body profile-modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '72vh', overflowY: 'auto' }}>
          <div className="profile-modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => onOpenHistory(patient)}
            >
              <FolderOpen size={16} />
              Historial clínico por carpetas
            </button>
          </div>

          {/* Sección 1: Datos Personales */}
          <div className="profile-card">
            <div className="profile-card__head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', margin: 0, color: 'var(--primary)' }}>
                <User size={16} /> 1. Filiación Personal &amp; Demografía
              </h3>
            </div>
            <dl className="profile-grid">
              {personalFields.map((field) => (
                <div key={field.label} className="profile-grid__item">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sección 2: Datos Laborales */}
          <div className="profile-card">
            <div className="profile-card__head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', margin: 0, color: 'var(--primary)' }}>
                <Briefcase size={16} /> 2. Información Laboral &amp; Empresa
              </h3>
            </div>
            <dl className="profile-grid">
              {laboralFields.map((field) => (
                <div key={field.label} className="profile-grid__item">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sección 3: Antecedentes & Hábitos */}
          <div className="profile-card">
            <div className="profile-card__head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', margin: 0, color: 'var(--primary)' }}>
                <Activity size={16} /> 3. Antecedentes Clínicos, Alergias &amp; Hábitos
              </h3>
            </div>
            <dl className="profile-grid">
              {antecedentesFields.map((field) => (
                <div key={field.label} className="profile-grid__item">
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sección 4: Emergencias y Vulnerabilidad */}
          <div className="profile-card">
            <div className="profile-card__head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', margin: 0, color: 'var(--primary)' }}>
                <Heart size={16} /> 4. Emergencias &amp; Contacto
              </h3>
            </div>
            <dl className="profile-grid">
              {emergenciaFields.map((field) => (
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
