import { useState, useEffect } from 'react'
import {
  FileText,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  ClipboardCheck,
  Plus,
  Eye,
  Trash2,
  ArrowLeft,
  Search,
} from 'lucide-react'
import type { HistoriaClinicaOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/types'
import { createInitialDocument } from '@/presentation/components/historiaClinicaOcupacional/defaults'
import { mapPatientToHistoriaClinica } from '@/domain/patient/patientDocumentMappers'
import { mockHistoriaClinicaList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import { Hoja1Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja1Form'
import { Hoja2Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja2Form'
import { Hoja3Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja3Form'
import { HistoriaClinicaPdfModal } from '@/presentation/components/historiaClinicaOcupacional/HistoriaClinicaPdfModal'
import type { Patient } from '@/domain/patient/Patient'

const STORAGE_LIST_KEY = 'hco_recent_documents_v1'
const LOCAL_STORAGE_KEY = 'hco_document_draft_v1'

function getInitialList(): DocumentListItem<HistoriaClinicaOcupacionalDocument>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockHistoriaClinicaList
}

export function HistoriaClinicaOcupacionalPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState<DocumentListItem<HistoriaClinicaOcupacionalDocument>[]>(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const [activeTab, setActiveTab] = useState<'hoja1' | 'hoja2' | 'hoja3'>('hoja1')
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<HistoriaClinicaOcupacionalDocument>(createInitialDocument)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  // Save list to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(docList))
  }, [docList])

  // Toast timer
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  // Handle selecting a patient from modal to create a new document
  const handleSelectPatient = (patient: Patient) => {
    const populated = mapPatientToHistoriaClinica(patient)
    setDoc(populated)
    setViewMode('editor')
    setActiveTab('hoja1')
    setNotification({
      message: `Formulario precargado con datos del trabajador ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  // Edit existing document from list
  const handleEditDocument = (item: DocumentListItem<HistoriaClinicaOcupacionalDocument>) => {
    setDoc(item.document)
    setViewMode('editor')
    setActiveTab('hoja1')
  }

  // Print existing document from list
  const handlePrintItem = (item: DocumentListItem<HistoriaClinicaOcupacionalDocument>) => {
    setDoc(item.document)
    setShowPdfModal(true)
  }

  // Delete document from list
  const handleDeleteItem = (id: string, codigo: string) => {
    if (window.confirm(`¿Está seguro de eliminar el documento ${codigo}?`)) {
      setDocList((prev) => prev.filter((item) => item.id !== id))
      setNotification({ message: `Documento ${codigo} eliminado.`, type: 'info' })
    }
  }

  // Save draft / document in editor mode
  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))

    // Update or prepend into list
    const patientName = `${doc.hoja1.seccionA.primerApellido} ${doc.hoja1.seccionA.segundoApellido} ${doc.hoja1.seccionA.primerNombre} ${doc.hoja1.seccionA.segundoNombre}`.trim() || 'Trabajador Registrado'
    const code = doc.hoja1.seccionA.numHistoriaClinica || `HCO-${Date.now().toString().slice(-4)}`

    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)
    const newItem: DocumentListItem<HistoriaClinicaOcupacionalDocument> = {
      id: code,
      codigo: code,
      pacienteNombre: patientName,
      pacienteCedula: doc.hoja3.seccionP.cedula || '1700000000',
      empresa: doc.hoja1.seccionA.establecimiento || 'Empresa Registrada',
      cargo: doc.hoja1.seccionB.puestoTrabajoCiuo || 'Puesto de Trabajo',
      fecha: doc.hoja1.seccionB.fechaAtencion || new Date().toISOString().slice(0, 10),
      estado: 'Completado',
      aptitudBadge: doc.hoja3.seccionL.aptitud || 'APTO',
      document: doc,
    }

    if (existingIdx >= 0) {
      const copy = [...docList]
      copy[existingIdx] = newItem
      setDocList(copy)
    } else {
      setDocList([newItem, ...docList])
    }

    setNotification({
      message: `Historia Clínica Ocupacional "${code}" guardada con éxito en el sistema.`,
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restablecer el formulario a sus valores por defecto? Se perderán los cambios no guardados.')) {
      setDoc(createInitialDocument())
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({ message: 'Formulario restablecido correctamente.', type: 'info' })
    }
  }

  // Filter list
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
    <div className="page page--document">
      {/* Toast notifications */}
      {notification && (
        <div className={`doc-toast doc-toast--${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Select Patient Modal */}
      <SelectPatientModal
        open={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelectPatient={handleSelectPatient}
        title="Buscar Paciente para Nueva Historia Clínica"
        subtitle="Seleccione el paciente para precargar automáticamente la filiación, antecedentes y puesto de trabajo."
      />

      {/* PDF Modal */}
      {showPdfModal && (
        <HistoriaClinicaPdfModal
          doc={doc}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {/* MODE 1: RECENT DOCUMENTS LIST */}
      {viewMode === 'list' ? (
        <div className="page-container">
          {/* Page Card Header matching reference image */}
          <div className="page-card-header">
            <div className="header-left">
              <div className="header-icon-box">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="header-title">Historia Clínica Ocupacional</h1>
                <p className="header-subtitle">
                  Listado de evaluaciones clínicas ocupacionales (3 Hojas con riesgos y dictamen).
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <div className="table-search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar documento..."
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
                <span>Crear Nuevo Documento</span>
              </button>
            </div>
          </div>

          {/* Page Card Body */}
          <div className="page-card-body">
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>PACIENTE / TRABAJADOR</th>
                    <th>EMPRESA</th>
                    <th>FECHA</th>
                    <th>ESTADO / DICTAMEN</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron historias clínicas ocupacionales.
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
                            <span className="status-dot" /> {item.aptitudBadge || 'APTO'}
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
                              className="norm-action-btn"
                              title="Imprimir PDF"
                              onClick={() => handlePrintItem(item)}
                            >
                              <Printer size={15} />
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
          {/* Top Return Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setViewMode('list')}
              style={{ gap: '0.5rem', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={16} />
              <span>Volver a la Lista de Historias Clínicas</span>
            </button>
          </div>

          {/* Top Page Header */}
          <div className="doc-page-header">
            <div className="doc-page-header__main">
              <div className="doc-page-header__badge">
                <FileText size={18} />
                <span>Edición de Documento Ocupacional</span>
              </div>
              <h1>Historia Clínica Ocupacional</h1>
              <p className="page__subtitle">
                Formulario Oficial de Evaluación Médica Ocupacional digitalizado (3 Hojas con datos precargados del paciente).
              </p>
            </div>

            <div className="doc-page-header__actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset} title="Restablecer plantilla">
                <RotateCcw size={16} />
                <span>Restablecer</span>
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setShowPdfModal(true)} title="Imprimir / Exportar a PDF">
                <Printer size={16} />
                <span>Imprimir PDF</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleSaveDraft}>
                <Save size={16} />
                <span>Guardar Documento</span>
              </button>
            </div>
          </div>

          {/* Summary Strip */}
          <div className="doc-summary-strip">
            <div className="summary-item">
              <span className="summary-label">Paciente:</span>
              <strong>
                {doc.hoja1.seccionA.primerApellido} {doc.hoja1.seccionA.segundoApellido} {doc.hoja1.seccionA.primerNombre}
              </strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">C.I. / Historia:</span>
              <strong>{doc.hoja1.seccionA.numHistoriaClinica || 'HC-2026-0042'}</strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">Evaluación:</span>
              <span className="status-pill status-pill--ok">
                {doc.hoja1.seccionB.tipoEvaluacion || 'PERIÓDICO'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Aptitud:</span>
              <span className="status-pill status-pill--ok">
                {doc.hoja3.seccionL.aptitud || 'APTO'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Fecha:</span>
              <span>{doc.hoja1.seccionB.fechaAtencion || doc.fechaCreacion}</span>
            </div>
          </div>

          {/* 3 Document Tabs */}
          <div className="doc-tabs-bar" role="tablist" aria-label="Hojas de Historia Clínica Ocupacional">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hoja1'}
              className={`doc-tab-btn ${activeTab === 'hoja1' ? 'doc-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('hoja1')}
            >
              <div className="doc-tab-btn__number">01</div>
              <div className="doc-tab-btn__content">
                <strong>Hoja 1: Evaluación Inicial &amp; Examen Físico</strong>
                <span>Secciones A, B, C, D, E, F</span>
              </div>
              <ClipboardCheck size={18} className="doc-tab-btn__icon" />
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hoja2'}
              className={`doc-tab-btn ${activeTab === 'hoja2' ? 'doc-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('hoja2')}
            >
              <div className="doc-tab-btn__number">02</div>
              <div className="doc-tab-btn__content">
                <strong>Hoja 2: Factores de Riesgo del Trabajo</strong>
                <span>Matriz de Riesgos (Sección G)</span>
              </div>
              <FileSpreadsheet size={18} className="doc-tab-btn__icon" />
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hoja3'}
              className={`doc-tab-btn ${activeTab === 'hoja3' ? 'doc-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('hoja3')}
            >
              <div className="doc-tab-btn__number">03</div>
              <div className="doc-tab-btn__content">
                <strong>Hoja 3: Exámenes, CIE-10 &amp; Dictamen</strong>
                <span>Secciones H, I, J, K, L, M, N, O, P</span>
              </div>
              <FileText size={18} className="doc-tab-btn__icon" />
            </button>
          </div>

          {/* Active Sheet Content Container */}
          <div className="doc-active-container">
            {activeTab === 'hoja1' && (
              <Hoja1Form
                value={doc.hoja1}
                onChange={(hoja1) => setDoc({ ...doc, hoja1 })}
              />
            )}
            {activeTab === 'hoja2' && (
              <Hoja2Form
                value={doc.hoja2}
                onChange={(hoja2) => setDoc({ ...doc, hoja2 })}
              />
            )}
            {activeTab === 'hoja3' && (
              <Hoja3Form
                value={doc.hoja3}
                onChange={(hoja3) => setDoc({ ...doc, hoja3 })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
