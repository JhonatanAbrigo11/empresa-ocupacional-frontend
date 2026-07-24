import { useEffect, useState, type FormEvent } from 'react'
import {
  FolderOpen,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Trash2,
  ArrowLeft,
  Search,
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
import { mapPatientToHistorialClinico } from '@/domain/patient/patientDocumentMappers'
import { mockHistorialClinicoList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import type { Patient } from '@/domain/patient/Patient'

type TabId = 'historia' | 'fisico' | 'imagenes'

const STORAGE_LIST_KEY = 'doc_historial_clinico_recent_list_v1'
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

function getInitialList(): DocumentListItem<{
  historia: ClinicalHistoryInput
  fisico: PhysicalExamInput
  imagenes: ImagingRecordInput
}>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockHistorialClinicoList
}

export function DocumentoHistorialClinicoPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

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
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(docList))
  }, [docList])

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleSelectPatient = (patient: Patient) => {
    const populated = mapPatientToHistorialClinico(patient)
    setHistoria(populated.historia)
    setFisico(populated.fisico)
    setImagenes(populated.imagenes)
    setViewMode('editor')
    setTab('historia')
    setNotification({
      message: `Historial Clínico precargado con los datos de ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  const handleEditDocument = (item: DocumentListItem<{ historia: ClinicalHistoryInput; fisico: PhysicalExamInput; imagenes: ImagingRecordInput }>) => {
    setHistoria(item.document.historia)
    setFisico(item.document.fisico)
    setImagenes(item.document.imagenes)
    setViewMode('editor')
    setTab('historia')
  }

  const handleDeleteItem = (id: string, codigo: string) => {
    if (window.confirm(`¿Está seguro de eliminar el registro de historial clínico ${codigo}?`)) {
      setDocList((prev) => prev.filter((item) => item.id !== id))
      setNotification({ message: `Registro ${codigo} eliminado.`, type: 'info' })
    }
  }

  const saveAllToDocList = (updatedHistoria: ClinicalHistoryInput) => {
    const code = updatedHistoria.numeroHc || `HC-${updatedHistoria.nroIdentificacion || Date.now().toString().slice(-4)}`
    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)

    const newItem: DocumentListItem<{ historia: ClinicalHistoryInput; fisico: PhysicalExamInput; imagenes: ImagingRecordInput }> = {
      id: code,
      codigo: code,
      pacienteNombre: updatedHistoria.nombresApellidos || 'Paciente Registrado',
      pacienteCedula: updatedHistoria.nroIdentificacion || '1700000000',
      empresa: updatedHistoria.convenio || 'Empresa Registrada',
      cargo: updatedHistoria.profesionOcupacion || 'Puesto de Trabajo',
      fecha: updatedHistoria.fecha || new Date().toISOString().slice(0, 10),
      estado: 'Registrado',
      aptitudBadge: 'HISTORIA ACTIVA',
      document: {
        historia: updatedHistoria,
        fisico,
        imagenes,
      },
    }

    if (existingIdx >= 0) {
      const copy = [...docList]
      copy[existingIdx] = newItem
      setDocList(copy)
    } else {
      setDocList([newItem, ...docList])
    }
  }

  const handleHistoriaSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      localStorage.setItem(STORAGE.historia, JSON.stringify(historia))
      saveAllToDocList(historia)
      setMessage('Historia clínica guardada localmente.')
      setNotification({ message: 'Historia clínica guardada con éxito en el sistema.', type: 'success' })
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
      saveAllToDocList(historia)
      setMessage('Examen físico guardado localmente.')
      setNotification({ message: 'Examen físico guardado con éxito.', type: 'success' })
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
      saveAllToDocList(historia)
      setMessage('Estudios de imágenes guardados localmente.')
      setNotification({ message: 'Imágenes guardadas con éxito.', type: 'success' })
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

  const filteredList = docList.filter((item) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      item.codigo.toLowerCase().includes(term) ||
      item.pacienteNombre.toLowerCase().includes(term) ||
      item.pacienteCedula.toLowerCase().includes(term) ||
      item.empresa.toLowerCase().includes(term)
    )
  })

  return (
    <div className="page page--document page--hc">
      {/* Notifications */}
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

      {/* Select Patient Modal */}
      <SelectPatientModal
        open={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelectPatient={handleSelectPatient}
        title="Buscar Paciente para Historial Clínico"
        subtitle="Seleccione el trabajador para precargar su filiación, documento de identidad y empresa en la historia clínica."
      />

      {/* MODE 1: RECENT DOCUMENTS LIST */}
      {viewMode === 'list' ? (
        <div className="page-container">
          {/* Page Card Header matching reference image */}
          <div className="page-card-header">
            <div className="header-left">
              <div className="header-icon-box">
                <FolderOpen size={24} />
              </div>
              <div>
                <h1 className="header-title">Historial Clínico</h1>
                <p className="header-subtitle">
                  Gestión de Historiales Clínicos integrados (Historia clínica, examen físico y estudios de imágenes).
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <div className="table-search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar historial..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-primary-blue"
                onClick={() => setShowSelectModal(true)}
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Crear Nuevo Historial</span>
              </button>
            </div>
          </div>

          {/* Page Card Body */}
          <div className="page-card-body">
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>NÚMERO H.C.</th>
                    <th>PACIENTE / TRABAJADOR</th>
                    <th>EMPRESA / OCUPACIÓN</th>
                    <th>FECHA CONSULTA</th>
                    <th>ESTADO</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron registros de historial clínico.
                      </td>
                    </tr>
                  ) : (
                    filteredList.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 700, color: '#1d6bf3' }}>{item.codigo}</td>
                        <td className="col-name">
                          <strong>{item.pacienteNombre}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', fontWeight: 500 }}>
                            C.I: {item.pacienteCedula}
                          </span>
                        </td>
                        <td style={{ color: '#334155' }}>
                          <strong>{item.empresa}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>{item.cargo}</span>
                        </td>
                        <td style={{ color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.fecha}</td>
                        <td>
                          <span className="status-dot-badge status-dot-badge--active">
                            <span className="status-dot" /> {item.aptitudBadge || 'REGISTRADO'}
                          </span>
                        </td>
                        <td>
                          <div className="norm-action-group" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="norm-action-btn"
                              title="Ver / Editar"
                              onClick={() => handleEditDocument(item)}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              className="norm-action-btn norm-action-btn--danger"
                              title="Eliminar"
                              onClick={() => handleDeleteItem(item.id, item.codigo)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="table-pagination-footer">
              <span className="pagination-info">
                Mostrando 1 a {filteredList.length} de {docList.length} resultados
              </span>
              <div className="pagination-controls">
                <button type="button" className="page-btn" disabled>
                  &lt;
                </button>
                <button type="button" className="page-num page-num--active">
                  1
                </button>
                <button type="button" className="page-btn" disabled>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: FORM EDITOR */
        <div className="doc-editor-container">
          <div style={{ marginBottom: '1rem' }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setViewMode('list')}
              style={{ gap: '0.5rem', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={16} />
              <span>Volver a la Lista de Historiales Clínicos</span>
            </button>
          </div>

          <div className="doc-page-header">
            <div className="doc-page-header__main">
              <div className="doc-page-header__badge">
                <FolderOpen size={18} />
                <span>Edición de Documento Clínico</span>
              </div>
              <h1>Historial Clínico</h1>
              <p className="page__subtitle">
                Historia clínica, examen físico e imágenes con datos precargados del paciente.
              </p>
            </div>
            <div className="doc-page-header__actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>
                <RotateCcw size={16} />
                <span>Restablecer</span>
              </button>
            </div>
          </div>

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
      )}
    </div>
  )
}
