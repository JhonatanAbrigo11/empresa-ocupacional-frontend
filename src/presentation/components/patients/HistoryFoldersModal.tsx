import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Folder, FolderPlus, Trash2, X } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'
import type { HistoryFolder } from '@/domain/historyFolder/HistoryFolder'
import { container } from '@/infrastructure/di/container'

function formatFecha(fecha: string): string {
  if (!fecha) return 'Sin fecha'
  const [y, m, d] = fecha.split('-')
  if (!y || !m || !d) return fecha
  return `${d}/${m}/${y}`
}

interface HistoryFoldersModalProps {
  open: boolean
  patient: Patient | null
  onClose: () => void
}

export function HistoryFoldersModal({ open, patient, onClose }: HistoryFoldersModalProps) {
  const navigate = useNavigate()
  const [folders, setFolders] = useState<HistoryFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10))
  const [titulo, setTitulo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const load = async (patientId: string) => {
    const list = await container.getHistoryFolders.execute(patientId)
    setFolders(list)
  }

  useEffect(() => {
    if (!open || !patient) return
    setLoading(true)
    setError(null)
    setFecha(new Date().toISOString().slice(0, 10))
    setTitulo('')
    void load(patient.id).finally(() => setLoading(false))
  }, [open, patient])

  if (!open || !patient) return null

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError(null)
    try {
      const folder = await container.createHistoryFolder.execute({
        patientId: patient.id,
        fecha,
        titulo: titulo.trim() || `Historia clínica ${formatFecha(fecha)}`,
      })
      onClose()
      navigate(`/app/pacientes/${patient.id}/historial/${folder.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la carpeta')
      setCreating(false)
    }
  }

  const handleDelete = async (folder: HistoryFolder) => {
    const ok = window.confirm(
      `¿Eliminar la carpeta “${folder.titulo}” del ${formatFecha(folder.fecha)}? Se borrará su contenido.`,
    )
    if (!ok) return
    await container.deleteHistoryFolder.execute(folder.id)
    await load(patient.id)
  }

  const openFolder = (folder: HistoryFolder) => {
    onClose()
    navigate(`/app/pacientes/${patient.id}/historial/${folder.id}`)
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--folders"
        role="dialog"
        aria-modal="true"
        aria-labelledby="folders-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <p className="page__eyebrow">Historial clínico</p>
            <h2 id="folders-modal-title">{patient.nombre}</h2>
            <p className="page__subtitle">
              Carpetas por fecha · Cédula {patient.cedula}
            </p>
          </div>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="modal__body folders-modal__body">
          <form className="folder-create folder-create--modal" onSubmit={handleCreate}>
            <div className="folder-create__fields">
              <label className="field">
                <span>Fecha de la consulta</span>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </label>
              <label className="field">
                <span>Nombre de la carpeta (opcional)</span>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder={`Historia clínica ${formatFecha(fecha)}`}
                />
              </label>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn--primary" disabled={creating}>
              <FolderPlus size={18} />
              {creating ? 'Creando…' : 'Nueva carpeta'}
            </button>
          </form>

          {loading ? (
            <div className="app-loading app-loading--inline">
              <div className="spinner" />
              <p>Cargando carpetas…</p>
            </div>
          ) : folders.length === 0 ? (
            <div className="empty-state">
              <p>Aún no hay carpetas de historial.</p>
              <span>Crea una carpeta con la fecha de la consulta para comenzar.</span>
            </div>
          ) : (
            <div className="folder-grid">
              {folders.map((folder) => (
                <article key={folder.id} className="folder-card">
                  <button
                    type="button"
                    className="folder-card__main"
                    onClick={() => openFolder(folder)}
                  >
                    <span className="folder-card__icon">
                      <Folder size={28} />
                    </span>
                    <strong>{folder.titulo}</strong>
                    <span className="folder-card__date">{formatFecha(folder.fecha)}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--icon btn--danger folder-card__delete"
                    title="Eliminar carpeta"
                    onClick={() => handleDelete(folder)}
                  >
                    <Trash2 size={16} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
