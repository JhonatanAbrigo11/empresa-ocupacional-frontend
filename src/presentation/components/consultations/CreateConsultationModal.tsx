import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, X } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'
import { container } from '@/infrastructure/di/container'

function formatFecha(fecha: string): string {
  if (!fecha) return 'Sin fecha'
  const [y, m, d] = fecha.split('-')
  if (!y || !m || !d) return fecha
  return `${d}/${m}/${y}`
}

interface CreateConsultationModalProps {
  open: boolean
  onClose: () => void
}

export function CreateConsultationModal({ open, onClose }: CreateConsultationModalProps) {
  const navigate = useNavigate()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [patientId, setPatientId] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10))
  const [titulo, setTitulo] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    setPatientId('')
    setFecha(new Date().toISOString().slice(0, 10))
    setTitulo('')
    setLoadingPatients(true)
    void container.getPatients.execute().then((list) => {
      setPatients(list)
      setLoadingPatients(false)
    })
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!patientId) {
      setError('Selecciona un paciente')
      return
    }

    setSaving(true)
    setError(null)
    try {
      const folder = await container.createHistoryFolder.execute({
        patientId,
        fecha,
        titulo: titulo.trim() || `Consulta ${formatFecha(fecha)}`,
      })
      onClose()
      navigate(`/app/pacientes/${patientId}/historial/${folder.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la consulta')
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-consultation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="create-consultation-title">Crear nueva consulta</h2>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field field--full">
              <span>Paciente *</span>
              <select
                required
                value={patientId}
                disabled={loadingPatients}
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="">
                  {loadingPatients ? 'Cargando pacientes…' : 'Selecciona un paciente'}
                </option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.nombre} — {patient.cedula}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Fecha de la consulta *</span>
              <input
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </label>

            <label className="field">
              <span>Nombre de la consulta (opcional)</span>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder={`Consulta ${formatFecha(fecha)}`}
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          {patients.length === 0 && !loadingPatients && (
            <p className="form-error">
              No hay pacientes registrados. Crea uno primero en el módulo Pacientes.
            </p>
          )}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={saving || loadingPatients || patients.length === 0}
            >
              <FolderPlus size={16} />
              {saving ? 'Creando…' : 'Crear consulta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
