import { useState, useEffect } from 'react'
import {
  Microscope,
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
import type { CertificadoCoproparasitarioDocument } from '@/domain/certificadoCoproparasitario/types'
import { createInitialCertificadoCoproparasitario } from '@/presentation/components/certificadoCoproparasitario/defaults'
import { mapPatientToCertificadoCoproparasitario } from '@/domain/patient/patientDocumentMappers'
import { mockCertificadoCoproparasitarioList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import { CertificadoCoproparasitarioForm } from '@/presentation/components/certificadoCoproparasitario/CertificadoCoproparasitarioForm'
import { CertificadoCoproparasitarioPdfModal } from '@/presentation/components/certificadoCoproparasitario/CertificadoCoproparasitarioPdfModal'
import type { Patient } from '@/domain/patient/Patient'

const STORAGE_LIST_KEY = 'cert_coproparasitario_recent_list_v1'
const LOCAL_STORAGE_KEY = 'cert_coproparasitario_draft_v1'

function getInitialList(): DocumentListItem<CertificadoCoproparasitarioDocument>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockCertificadoCoproparasitarioList
}

export function CertificadoCoproparasitarioPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState<DocumentListItem<CertificadoCoproparasitarioDocument>[]>(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<CertificadoCoproparasitarioDocument>(createInitialCertificadoCoproparasitario)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(docList))
  }, [docList])

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleSelectPatient = (patient: Patient) => {
    const populated = mapPatientToCertificadoCoproparasitario(patient)
    setDoc(populated)
    setViewMode('editor')
    setNotification({
      message: `Certificado Coproparasitario precargado con los datos de ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  const handleEditDocument = (item: DocumentListItem<CertificadoCoproparasitarioDocument>) => {
    setDoc(item.document)
    setViewMode('editor')
  }

  const handlePrintItem = (item: DocumentListItem<CertificadoCoproparasitarioDocument>) => {
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

    const code = `COP-${doc.cedula || Date.now().toString().slice(-4)}`
    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)

    let aptitudLabel = 'APTO'
    if (doc.aptitud === 'apto_recomendaciones') aptitudLabel = 'APTO CON RECOMENDACIONES'
    if (doc.aptitud === 'apto_restricciones') aptitudLabel = 'APTO CON RESTRICCIONES'
    if (doc.aptitud === 'no_apto') aptitudLabel = 'NO APTO'

    const newItem: DocumentListItem<CertificadoCoproparasitarioDocument> = {
      id: code,
      codigo: code,
      pacienteNombre: doc.nombrePaciente || 'Paciente Registrado',
      pacienteCedula: doc.cedula || '1700000000',
      empresa: doc.empresa || 'Empresa Registrada',
      cargo: doc.cargo || 'Puesto de Trabajo',
      fecha: doc.fechaReferencia || new Date().toISOString().slice(0, 10),
      estado: 'Completado',
      aptitudBadge: aptitudLabel,
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
      message: `Certificado Coproparasitario guardado localmente con éxito.`,
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Restablecer el certificado? Se perderán los cambios no guardados.')) {
      setDoc(createInitialCertificadoCoproparasitario())
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({ message: 'Formulario restablecido.', type: 'info' })
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
        title="Buscar Paciente para Certificado Coproparasitario"
        subtitle="Seleccione el trabajador para precargar sus datos en el certificado coproparasitario."
      />

      {/* PDF Modal */}
      {showPdfModal && (
        <CertificadoCoproparasitarioPdfModal
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
                <Microscope size={24} />
              </div>
              <div>
                <h1 className="header-title">Certificado Coproparasitario</h1>
                <p className="header-subtitle">
                  Certificados Coproparasitarios con aptitud para manipulación de alimentos y laboratorio.
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
                    <th>CÓDIGO</th>
                    <th>PACIENTE / TRABAJADOR</th>
                    <th>EMPRESA</th>
                    <th>FECHA EXAMEN</th>
                    <th>RESULTADO / APTITUD</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron certificados coproparasitarios.
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
          <div style={{ marginBottom: '1rem' }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setViewMode('list')}
              style={{ gap: '0.5rem', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={16} />
              <span>Volver a la Lista de Certificados Coproparasitarios</span>
            </button>
          </div>

          <div className="doc-page-header">
            <div className="doc-page-header__main">
              <div className="doc-page-header__badge">
                <Microscope size={18} />
                <span>Edición de Documento Clínico</span>
              </div>
              <h1>Certificado Coproparasitario</h1>
              <p className="page__subtitle">
                Ingrese los datos, seleccione la aptitud y use Imprimir para ver el certificado con membrete.
              </p>
            </div>

            <div className="doc-page-header__actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>
                <RotateCcw size={16} />
                <span>Restablecer</span>
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setShowPdfModal(true)}>
                <Printer size={16} />
                <span>Imprimir PDF</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleSaveDraft}>
                <Save size={16} />
                <span>Guardar</span>
              </button>
            </div>
          </div>

          <CertificadoCoproparasitarioForm value={doc} onChange={setDoc} />
        </div>
      )}
    </div>
  )
}
