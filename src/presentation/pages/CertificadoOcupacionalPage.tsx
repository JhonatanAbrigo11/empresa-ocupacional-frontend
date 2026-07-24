import { useState, useEffect } from 'react'
import {
  FileCheck,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Trash2,
  ArrowLeft,
  Search,
} from 'lucide-react'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'
import { createInitialCertificadoDocument } from '@/presentation/components/certificadoOcupacional/defaults'
import { mapPatientToCertificado } from '@/domain/patient/patientDocumentMappers'
import { mockCertificadoOcupacionalList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import { CertificadoForm } from '@/presentation/components/certificadoOcupacional/CertificadoForm'
import { CertificadoPdfModal } from '@/presentation/components/certificadoOcupacional/CertificadoPdfModal'
import type { Patient } from '@/domain/patient/Patient'

const STORAGE_LIST_KEY = 'cert_ocupacional_recent_list_v1'
const LOCAL_STORAGE_KEY = 'cert_ocupacional_draft_v1'

function getInitialList(): DocumentListItem<CertificadoOcupacionalDocument>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockCertificadoOcupacionalList
}

export function CertificadoOcupacionalPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState<DocumentListItem<CertificadoOcupacionalDocument>[]>(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<CertificadoOcupacionalDocument>(createInitialCertificadoDocument)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  // Sync list to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(docList))
  }, [docList])

  // Toast timer
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleSelectPatient = (patient: Patient) => {
    const populated = mapPatientToCertificado(patient)
    setDoc(populated)
    setViewMode('editor')
    setNotification({
      message: `Certificado precargado con los datos de ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  const handleEditDocument = (item: DocumentListItem<CertificadoOcupacionalDocument>) => {
    setDoc(item.document)
    setViewMode('editor')
  }

  const handlePrintItem = (item: DocumentListItem<CertificadoOcupacionalDocument>) => {
    setDoc(item.document)
    setShowPdfModal(true)
  }

  const handleDeleteItem = (id: string, codigo: string) => {
    if (window.confirm(`¿Está seguro de eliminar el certificado ${codigo}?`)) {
      setDocList((prev) => prev.filter((item) => item.id !== id))
      setNotification({ message: `Certificado ${codigo} eliminado.`, type: 'info' })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))

    const patientName = `${doc.seccionA.primerApellido} ${doc.seccionA.segundoApellido} ${doc.seccionA.primerNombre} ${doc.seccionA.segundoNombre}`.trim() || 'Trabajador Registrado'
    const code = doc.seccionA.numFormulario || `CERT-${Date.now().toString().slice(-4)}`
    const fecha = `${doc.seccionB.fechaEmisionAño}-${doc.seccionB.fechaEmisionMes}-${doc.seccionB.fechaEmisionDia}`

    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)
    const newItem: DocumentListItem<CertificadoOcupacionalDocument> = {
      id: code,
      codigo: code,
      pacienteNombre: patientName,
      pacienteCedula: doc.seccionF.cedulaUsuario || '1700000000',
      empresa: doc.seccionA.establecimiento || 'Empresa Registrada',
      cargo: doc.seccionA.puestoTrabajoCiuo || 'Puesto de Trabajo',
      fecha: fecha.includes('undefined') ? new Date().toISOString().slice(0, 10) : fecha,
      estado: 'Emitido',
      aptitudBadge: doc.seccionC.aptitud || 'APTO',
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
      message: `Certificado Médico Ocupacional "${code}" guardado con éxito.`,
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restablecer el certificado a sus valores por defecto? Se perderán los cambios no guardados.')) {
      setDoc(createInitialCertificadoDocument())
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({ message: 'Certificado restablecido correctamente.', type: 'info' })
    }
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
        title="Buscar Paciente para Certificado Ocupacional"
        subtitle="Seleccione el trabajador para autocompletar la información de la empresa, puesto y certificado."
      />

      {/* PDF Modal */}
      {showPdfModal && (
        <CertificadoPdfModal
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
                <FileCheck size={24} />
              </div>
              <div>
                <h1 className="header-title">Certificado Ocupacional</h1>
                <p className="header-subtitle">
                  Certificados Médicos Ocupacionales emitidos con dictamen de aptitud oficial MSP / IESS.
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <div className="table-search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar certificado..."
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
                <span>Crear Nuevo Certificado</span>
              </button>
            </div>
          </div>

          {/* Page Card Body */}
          <div className="page-card-body">
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>FORMULARIO Nº</th>
                    <th>TRABAJADOR</th>
                    <th>EMPRESA</th>
                    <th>FECHA EMISIÓN</th>
                    <th>APTITUD OCUPACIONAL</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron certificados ocupacionales.
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
              <span>Volver a la Lista de Certificados</span>
            </button>
          </div>

          {/* Top Page Header */}
          <div className="doc-page-header">
            <div className="doc-page-header__main">
              <div className="doc-page-header__badge">
                <FileCheck size={18} />
                <span>Edición de Certificado Ocupacional</span>
              </div>
              <h1>Certificado - Evaluación Médica Ocupacional</h1>
              <p className="page__subtitle">
                Certificado Oficial Ocupacional con datos precargados del paciente y generación/vista previa en PDF.
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
                <span>Guardar Certificado</span>
              </button>
            </div>
          </div>

          {/* Patient & Certificate Summary Strip */}
          <div className="doc-summary-strip">
            <div className="summary-item">
              <span className="summary-label">Trabajador:</span>
              <strong>
                {doc.seccionA.primerApellido} {doc.seccionA.segundoApellido} {doc.seccionA.primerNombre}
              </strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">Formulario:</span>
              <strong>{doc.seccionA.numFormulario || 'CERT-2026-0104'}</strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">Evaluación:</span>
              <span className="status-pill status-pill--ok">
                {doc.seccionB.tipoEvaluacion || 'PERIÓDICO'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Aptitud:</span>
              <span className="status-pill status-pill--ok">
                {doc.seccionC.aptitud || 'APTO'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Emisión:</span>
              <span>{doc.seccionB.fechaEmisionAño}/{doc.seccionB.fechaEmisionMes}/{doc.seccionB.fechaEmisionDia}</span>
            </div>
          </div>

          {/* Interactive Form Component */}
          <div className="doc-active-container">
            <CertificadoForm
              value={doc}
              onChange={setDoc}
            />
          </div>
        </div>
      )}
    </div>
  )
}
