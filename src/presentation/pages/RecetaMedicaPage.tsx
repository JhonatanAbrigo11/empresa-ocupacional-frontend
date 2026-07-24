import { useState, useEffect } from 'react'
import {
  Pill,
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
import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'
import { createInitialRecetaMedica } from '@/presentation/components/recetaMedica/defaults'
import { mapPatientToRecetaMedica } from '@/domain/patient/patientDocumentMappers'
import { mockRecetaMedicaList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import { RecetaMedicaForm } from '@/presentation/components/recetaMedica/RecetaMedicaForm'
import { RecetaMedicaPdfModal } from '@/presentation/components/recetaMedica/RecetaMedicaPdfModal'
import type { Patient } from '@/domain/patient/Patient'

const STORAGE_LIST_KEY = 'receta_medica_recent_list_v1'
const LOCAL_STORAGE_KEY = 'receta_medica_draft_v1'

function getInitialList(): DocumentListItem<RecetaMedicaDocument>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockRecetaMedicaList
}

export function RecetaMedicaPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState<DocumentListItem<RecetaMedicaDocument>[]>(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<RecetaMedicaDocument>(createInitialRecetaMedica)
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
    const populated = mapPatientToRecetaMedica(patient)
    setDoc(populated)
    setViewMode('editor')
    setNotification({
      message: `Receta Médica precargada con los datos del paciente ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  const handleEditDocument = (item: DocumentListItem<RecetaMedicaDocument>) => {
    setDoc(item.document)
    setViewMode('editor')
  }

  const handlePrintItem = (item: DocumentListItem<RecetaMedicaDocument>) => {
    setDoc(item.document)
    setShowPdfModal(true)
  }

  const handleDeleteItem = (id: string, codigo: string) => {
    if (window.confirm(`¿Está seguro de eliminar la receta médica ${codigo}?`)) {
      setDocList((prev) => prev.filter((item) => item.id !== id))
      setNotification({ message: `Receta ${codigo} eliminada.`, type: 'info' })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))

    const code = doc.numero || `REC-${doc.ci || Date.now().toString().slice(-4)}`
    const fecha = `${doc.fechaAnio}-${doc.fechaMes}-${doc.fechaDia}`
    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)

    const newItem: DocumentListItem<RecetaMedicaDocument> = {
      id: code,
      codigo: code,
      pacienteNombre: doc.nombresApellidos || 'Paciente Registrado',
      pacienteCedula: doc.ci || '1700000000',
      empresa: doc.diagnostico || 'Diagnóstico Prescrito',
      cargo: 'Prescripción Médica',
      fecha: fecha.includes('undefined') ? new Date().toISOString().slice(0, 10) : fecha,
      estado: 'Impresa',
      aptitudBadge: 'PRESCRITA',
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
      message: `Receta médica "${code}" guardada con éxito.`,
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Restablecer la receta médica? Se perderán los cambios no guardados.')) {
      setDoc(createInitialRecetaMedica())
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({ message: 'Receta restablecida.', type: 'info' })
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
        title="Buscar Paciente para Nueva Receta Médica"
        subtitle="Seleccione el paciente para precargar automáticamente sus datos filiatorios, cédula y número de historia médica."
      />

      {/* PDF Modal */}
      {showPdfModal && (
        <RecetaMedicaPdfModal doc={doc} onClose={() => setShowPdfModal(false)} />
      )}

      {/* MODE 1: RECENT DOCUMENTS LIST */}
      {viewMode === 'list' ? (
        <div className="page-container">
          {/* Page Card Header matching reference image */}
          <div className="page-card-header">
            <div className="header-left">
              <div className="header-icon-box">
                <Pill size={24} />
              </div>
              <div>
                <h1 className="header-title">Receta Médica</h1>
                <p className="header-subtitle">
                  Historial de Recetas Médicas emitidas con prescripción (RP) e indicaciones terapéuticas.
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <div className="table-search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar receta..."
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
                <span>Crear Nueva Receta</span>
              </button>
            </div>
          </div>

          {/* Page Card Body */}
          <div className="page-card-body">
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>NÚMERO RECETA</th>
                    <th>PACIENTE</th>
                    <th>DIAGNÓSTICO / DETALLE</th>
                    <th>FECHA EMISIÓN</th>
                    <th>ESTADO</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron recetas médicas.
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
                        </td>
                        <td style={{ color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.fecha}</td>
                        <td>
                          <span className="status-dot-badge status-dot-badge--active">
                            <span className="status-dot" /> {item.aptitudBadge || 'PRESCRITA'}
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
              <span>Volver a la Lista de Recetas Médicas</span>
            </button>
          </div>

          <div className="page-card-header">
            <div className="header-left">
              <div className="header-icon-box">
                <Pill size={24} />
              </div>
              <div>
                <h1 className="header-title">Edición: Receta Médica</h1>
                <p className="header-subtitle">
                  Complete los datos del paciente, prescripción (RP) e indicaciones.
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <button type="button" className="btn-toolbar-pill" onClick={handleReset}>
                <RotateCcw size={15} />
                <span>Restablecer</span>
              </button>
              <button
                type="button"
                className="btn-toolbar-pill"
                onClick={() => setShowPdfModal(true)}
              >
                <Printer size={15} />
                <span>Imprimir PDF</span>
              </button>
              <button type="button" className="btn-primary-blue" onClick={handleSaveDraft}>
                <Save size={16} />
                <span>Guardar Documento</span>
              </button>
            </div>
          </div>

          <RecetaMedicaForm value={doc} onChange={setDoc} />
        </div>
      )}
    </div>
  )
}
