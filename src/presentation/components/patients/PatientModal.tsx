import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Patient, PatientInput, Sexo } from '@/domain/patient/Patient'

const emptyForm: PatientInput = {
  nombre: '',
  cedula: '',
  empresa: '',
  cargo: '',
  telefono: '',
  email: '',
  fechaNacimiento: '',
  sexo: 'M',
  fechaIngreso: '',
}

interface PatientModalProps {
  open: boolean
  patient: Patient | null
  onClose: () => void
  onSubmit: (data: PatientInput) => Promise<void>
}

export function PatientModal({ open, patient, onClose, onSubmit }: PatientModalProps) {
  const [form, setForm] = useState<PatientInput>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    if (patient) {
      setForm({
        nombre: patient.nombre,
        cedula: patient.cedula,
        empresa: patient.empresa,
        cargo: patient.cargo,
        telefono: patient.telefono,
        email: patient.email,
        fechaNacimiento: patient.fechaNacimiento,
        sexo: patient.sexo,
        fechaIngreso: patient.fechaIngreso,
      })
    } else {
      setForm(emptyForm)
    }
  }, [open, patient])

  if (!open) return null

  const setField = <K extends keyof PatientInput>(key: K, value: PatientInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="patient-modal-title">
            {patient ? 'Editar paciente' : 'Nuevo paciente'}
          </h2>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Nombre completo *</span>
              <input
                required
                value={form.nombre}
                onChange={(e) => setField('nombre', e.target.value)}
                placeholder="Ej. Ana María Rodríguez"
              />
            </label>

            <label className="field">
              <span>Cédula *</span>
              <input
                required
                value={form.cedula}
                onChange={(e) => setField('cedula', e.target.value)}
                placeholder="Ej. 1712345678"
              />
            </label>

            <label className="field">
              <span>Empresa *</span>
              <input
                required
                value={form.empresa}
                onChange={(e) => setField('empresa', e.target.value)}
                placeholder="Nombre de la empresa"
              />
            </label>

            <label className="field">
              <span>Cargo</span>
              <input
                value={form.cargo}
                onChange={(e) => setField('cargo', e.target.value)}
                placeholder="Puesto de trabajo"
              />
            </label>

            <label className="field">
              <span>Teléfono</span>
              <input
                value={form.telefono}
                onChange={(e) => setField('telefono', e.target.value)}
                placeholder="0991234567"
              />
            </label>

            <label className="field">
              <span>Correo electrónico</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="correo@empresa.com"
              />
            </label>

            <label className="field">
              <span>Fecha de nacimiento</span>
              <input
                type="date"
                value={form.fechaNacimiento}
                onChange={(e) => setField('fechaNacimiento', e.target.value)}
              />
            </label>

            <label className="field">
              <span>Sexo</span>
              <select
                value={form.sexo}
                onChange={(e) => setField('sexo', e.target.value as Sexo)}
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </label>

            <label className="field field--full">
              <span>Fecha de ingreso a la empresa</span>
              <input
                type="date"
                value={form.fechaIngreso}
                onChange={(e) => setField('fechaIngreso', e.target.value)}
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Guardando…' : patient ? 'Guardar cambios' : 'Registrar paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
