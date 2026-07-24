import { useEffect, useState, type FormEvent } from 'react'
import {
  FolderOpen,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import type { ClinicalHistoryInput } from '@/domain/clinicalHistory/ClinicalHistory'
import type { PhysicalExamInput } from '@/domain/physicalExam/PhysicalExam'
import type { ImagingRecordInput } from '@/domain/imaging/ImagingRecord'
import { ClinicalHistoryForm } from '@/presentation/components/clinicalHistory/ClinicalHistoryForm'
import { PhysicalExamForm } from '@/presentation/components/clinicalHistory/PhysicalExamForm'
import { ImagingForm } from '@/presentation/components/clinicalHistory/ImagingForm'
import { createEmptyHistory } from '@/presentation/components/clinicalHistory/historyDefaults'
import { createEmptyPhysicalExam } from '@/presentation/components/clinicalHistory/physicalExamDefaults'
import { createEmptyImagingRecord } from '@/presentation/components/clinicalHistory/imagingDefaults'

type TabId = 'historia' | 'fisico' | 'imagenes'

const STORAGE = {
  historia: 'doc_historial_clinico_historia_v1',
  fisico: 'doc_historial_clinico_fisico_v1',
  imagenes: 'doc_historial_clinico_imagenes_v1',
} as const

const DRAFT_FOLDER = 'doc-historial-clinico'
const DRAFT_PATIENT = 'doc-standalone'

function loadJson<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key)
  if (!saved) return fallback
  try {
    return JSON.parse(saved) as T
  } catch {
    return fallback
  }
}

export function DocumentoHistorialClinicoPage() {
  const [tab, setTab] = useState<TabId>('historia')
  const [historia, setHistoria] = useState<ClinicalHistoryInput>(() =>
    loadJson(STORAGE.historia, createEmptyHistory(DRAFT_FOLDER, DRAFT_PATIENT)),
  )
  const [fisico, setFisico] = useState<PhysicalExamInput>(() =>
    loadJson(STORAGE.fisico, createEmptyPhysicalExam(DRAFT_FOLDER, DRAFT_PATIENT)),
  )
  const [imagenes, setImagenes] = useState<ImagingRecordInput>(() =>
    loadJson(STORAGE.imagenes, createEmptyImagingRecord(DRAFT_FOLDER, DRAFT_PATIENT)),
  )
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'info'
  } | null>(null)

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleHistoriaSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      localStorage.setItem(STORAGE.historia, JSON.stringify(historia))
      setMessage('Historia clínica guardada localmente.')
      setNotification({ message: 'Historia clínica guardada.', type: 'success' })
    } finally {
      setSaving(false)
    }
  }

  const handleFisicoSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      localStorage.setItem(STORAGE.fisico, JSON.stringify(fisico))
      setMessage('Examen físico guardado localmente.')
      setNotification({ message: 'Examen físico guardado.', type: 'success' })
    } finally {
      setSaving(false)
    }
  }

  const handleImagenesSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      localStorage.setItem(STORAGE.imagenes, JSON.stringify(imagenes))
      setMessage('Estudios de imágenes guardados localmente.')
      setNotification({ message: 'Imágenes guardadas.', type: 'success' })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (
      !window.confirm(
        '¿Restablecer todo el historial clínico? Se perderán los cambios no guardados de las tres secciones.',
      )
    ) {
      return
    }
    setHistoria(createEmptyHistory(DRAFT_FOLDER, DRAFT_PATIENT))
    setFisico(createEmptyPhysicalExam(DRAFT_FOLDER, DRAFT_PATIENT))
    setImagenes(createEmptyImagingRecord(DRAFT_FOLDER, DRAFT_PATIENT))
    localStorage.removeItem(STORAGE.historia)
    localStorage.removeItem(STORAGE.fisico)
    localStorage.removeItem(STORAGE.imagenes)
    setMessage(null)
    setNotification({ message: 'Historial clínico restablecido.', type: 'info' })
  }

  return (
    <div className="page page--document page--hc">
      <div className="doc-page-header">
        <div className="doc-page-header__main">
          <div className="doc-page-header__badge">
            <FolderOpen size={18} />
            <span>Documentos clínicos</span>
          </div>
          <h1>Historial Clínico</h1>
          <p className="page__subtitle">
            Historia clínica, examen físico e imágenes en un solo documento.
          </p>
        </div>
        <div className="doc-page-header__actions">
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            <RotateCcw size={16} />
            <span>Restablecer</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className={`doc-toast doc-toast--${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="hc-tabs" role="tablist" aria-label="Secciones del historial clínico">
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
            value={historia}
            saving={saving}
            message={message}
            onChange={setHistoria}
            onSubmit={handleHistoriaSubmit}
          />
        )}
        {tab === 'fisico' && (
          <PhysicalExamForm
            value={fisico}
            saving={saving}
            message={message}
            onChange={setFisico}
            onSubmit={handleFisicoSubmit}
          />
        )}
        {tab === 'imagenes' && (
          <ImagingForm
            value={imagenes}
            saving={saving}
            message={message}
            onChange={setImagenes}
            onSubmit={handleImagenesSubmit}
          />
        )}
      </div>
    </div>
  )
}
