import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'
import type { HistoryFolder } from '@/domain/historyFolder/HistoryFolder'
import type { ClinicalHistoryInput } from '@/domain/clinicalHistory/ClinicalHistory'
import type { PhysicalExamInput } from '@/domain/physicalExam/PhysicalExam'
import type { ImagingRecordInput } from '@/domain/imaging/ImagingRecord'
import { container } from '@/infrastructure/di/container'
import { ClinicalHistoryForm } from '@/presentation/components/clinicalHistory/ClinicalHistoryForm'
import { PhysicalExamForm } from '@/presentation/components/clinicalHistory/PhysicalExamForm'
import { ImagingForm } from '@/presentation/components/clinicalHistory/ImagingForm'
import { historyFromPatient, toHistoryInput } from '@/presentation/components/clinicalHistory/historyDefaults'
import { mergePhysicalExam } from '@/presentation/components/clinicalHistory/physicalExamDefaults'
import { createEmptyImagingRecord } from '@/presentation/components/clinicalHistory/imagingDefaults'

type TabId = 'historia' | 'fisico' | 'imagenes'

function formatFecha(fecha: string): string {
  const [y, m, d] = fecha.split('-')
  if (!y || !m || !d) return fecha
  return `${d}/${m}/${y}`
}

export function ClinicalHistoryPage() {
  const { id, folderId } = useParams<{ id: string; folderId: string }>()
  const [tab, setTab] = useState<TabId>('historia')
  const [patient, setPatient] = useState<Patient | null>(null)
  const [folder, setFolder] = useState<HistoryFolder | null>(null)
  const [form, setForm] = useState<ClinicalHistoryInput | null>(null)
  const [physicalForm, setPhysicalForm] = useState<PhysicalExamInput | null>(null)
  const [imagingForm, setImagingForm] = useState<ImagingRecordInput | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!id || !folderId) return

    void (async () => {
      const found = await container.getPatientById.execute(id)
      const foundFolder = await container.getHistoryFolderById.execute(folderId)
      setPatient(found)
      setFolder(foundFolder)

      if (!found || !foundFolder || foundFolder.patientId !== found.id) {
        setLoading(false)
        return
      }

      const existing = await container.getClinicalHistory.execute(folderId)
      if (existing) {
        setForm(toHistoryInput(existing))
      } else {
        setForm(historyFromPatient(folderId, found, foundFolder.fecha))
      }

      const physical = await container.getPhysicalExam.execute(folderId)
      setPhysicalForm(
        mergePhysicalExam(
          folderId,
          found.id,
          physical
            ? {
                folderId: physical.folderId,
                patientId: physical.patientId,
                examenFisico: physical.examenFisico,
                laboratorio: physical.laboratorio,
              }
            : null,
        ),
      )

      const imaging = await container.getImagingRecord.execute(folderId)
      setImagingForm(
        imaging
          ? {
              folderId: imaging.folderId,
              patientId: imaging.patientId,
              estudiosImagenes: imaging.estudiosImagenes,
              otros: imaging.otros,
              diagnosticos: imaging.diagnosticos,
              cie10: imaging.cie10,
              tratamientoIngreso: imaging.tratamientoIngreso,
              tratamientoEgreso: imaging.tratamientoEgreso,
              especialidad: imaging.especialidad,
            }
          : createEmptyImagingRecord(folderId, found.id),
      )

      setLoading(false)
    })()
  }, [id, folderId])

  const handleHistorySubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setMessage(null)
    try {
      await container.saveClinicalHistory.execute(form)
      setMessage('Historial clínico guardado correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  const handlePhysicalSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!physicalForm) return
    setSaving(true)
    setMessage(null)
    try {
      await container.savePhysicalExam.execute(physicalForm)
      setMessage('Examen físico guardado correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleImagingSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!imagingForm) return
    setSaving(true)
    setMessage(null)
    try {
      await container.saveImagingRecord.execute(imagingForm)
      setMessage('Estudios de imágenes guardados correctamente.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="app-loading app-loading--inline">
        <div className="spinner" />
        <p>Cargando historial…</p>
      </div>
    )
  }

  if (!patient || !folder || !form || !physicalForm || !imagingForm) {
    return (
      <section className="page">
        <p className="form-error">Carpeta de historial no encontrada.</p>
        <Link to="/app/pacientes" className="btn btn--ghost">
          <ArrowLeft size={16} /> Volver a pacientes
        </Link>
      </section>
    )
  }

  return (
    <section className="page page--hc">
      <div className="hc-toolbar">
        <Link to="/app/pacientes" className="back-link">
          <ArrowLeft size={16} /> Volver a pacientes
        </Link>
        <div className="hc-toolbar__meta">
          <strong>{folder.titulo}</strong>
          <span>{formatFecha(folder.fecha)} · {patient.nombre}</span>
        </div>
        {tab === 'historia' && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setForm(historyFromPatient(folder.id, patient, folder.fecha))
              setMessage(null)
            }}
          >
            Recargar datos del paciente
          </button>
        )}
      </div>

      <div className="hc-tabs" role="tablist" aria-label="Secciones del historial">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'historia'}
          className={`hc-tabs__btn ${tab === 'historia' ? 'hc-tabs__btn--active' : ''}`}
          onClick={() => {
            setTab('historia')
            setMessage(null)
          }}
        >
          <span className="hc-tabs__index">01</span>
          Historia clínica
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'fisico'}
          className={`hc-tabs__btn ${tab === 'fisico' ? 'hc-tabs__btn--active' : ''}`}
          onClick={() => {
            setTab('fisico')
            setMessage(null)
          }}
        >
          <span className="hc-tabs__index">02</span>
          Físico
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'imagenes'}
          className={`hc-tabs__btn ${tab === 'imagenes' ? 'hc-tabs__btn--active' : ''}`}
          onClick={() => {
            setTab('imagenes')
            setMessage(null)
          }}
        >
          <span className="hc-tabs__index">03</span>
          Imágenes
        </button>
      </div>

      <div className="hc-panel">
        {tab === 'historia' && (
          <ClinicalHistoryForm
            value={form}
            saving={saving}
            message={message}
            onChange={setForm}
            onSubmit={handleHistorySubmit}
          />
        )}
        {tab === 'fisico' && (
          <PhysicalExamForm
            value={physicalForm}
            saving={saving}
            message={message}
            onChange={setPhysicalForm}
            onSubmit={handlePhysicalSubmit}
          />
        )}
        {tab === 'imagenes' && (
          <ImagingForm
            value={imagingForm}
            saving={saving}
            message={message}
            onChange={setImagingForm}
            onSubmit={handleImagingSubmit}
          />
        )}
      </div>
    </section>
  )
}
