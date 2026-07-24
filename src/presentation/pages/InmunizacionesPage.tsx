import { useState, useEffect } from 'react'
import {
  Syringe,
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
import type { InmunizacionesDocument } from '@/domain/inmunizaciones/types'
import { createInitialInmunizacionesDocument } from '@/presentation/components/inmunizaciones/defaults'
import { mapPatientToInmunizaciones } from '@/domain/patient/patientDocumentMappers'
import { mockInmunizacionesList, type DocumentListItem } from '@/domain/patient/mockDocumentLists'
import { SelectPatientModal } from '@/presentation/components/documents/SelectPatientModal'
import { InmunizacionesForm } from '@/presentation/components/inmunizaciones/InmunizacionesForm'
import { InmunizacionesPdfModal } from '@/presentation/components/inmunizaciones/InmunizacionesPdfModal'
import type { Patient } from '@/domain/patient/Patient'

const STORAGE_LIST_KEY = 'inmunizaciones_recent_list_v1'
const LOCAL_STORAGE_KEY = 'inmunizaciones_draft_v1'

function getInitialList(): DocumentListItem<InmunizacionesDocument>[] {
  const saved = localStorage.getItem(STORAGE_LIST_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallback
    }
  }
  return mockInmunizacionesList
}

export function InmunizacionesPage() {
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [docList, setDocList] = useState<DocumentListItem<InmunizacionesDocument>[]>(getInitialList)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<InmunizacionesDocument>(createInitialInmunizacionesDocument)
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
    const populated = mapPatientToInmunizaciones(patient)
    setDoc(populated)
    setViewMode('editor')
    setNotification({
      message: `Registro de inmunizaciones precargado con los datos de ${patient.primerNombre} ${patient.primerApellido}.`,
      type: 'success',
    })
  }

  const handleEditDocument = (item: DocumentListItem<InmunizacionesDocument>) => {
    setDoc(item.document)
    setViewMode('editor')
  }

  const handlePrintItem = (item: DocumentListItem<InmunizacionesDocument>) => {
    setDoc(item.document)
    setShowPdfModal(true)
  }

  const handleDeleteItem = (id: string, codigo: string) => {
    if (window.confirm(`¿Está seguro de eliminar el registro de inmunización ${codigo}?`)) {
      setDocList((prev) => prev.filter((item) => item.id !== id))
      setNotification({ message: `Registro ${codigo} eliminado.`, type: 'info' })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))

    const a = doc.seccionA
    const fullName = `${a.primerApellido} ${a.segundoApellido || ''} ${a.primerNombre} ${a.segundoNombre || ''}`.trim() || 'Usuario Registrado'
    const code = a.numeroHistoriaClinica ? `INM-${a.numeroHistoriaClinica.replace('HC-', '')}` : `INM-${Date.now().toString().slice(-4)}`
    const existingIdx = docList.findIndex((item) => item.codigo === code || item.id === code)

    const newItem: DocumentListItem<InmunizacionesDocument> = {
      id: code,
      codigo: code,
      pacienteNombre: fullName,
      pacienteCedula: a.numeroHistoriaClinica || '1700000000',
      empresa: a.institucionEmpresa || 'Empresa Registrada',
      cargo: a.cargoOcupacion || 'Puesto de Trabajo',
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Actualizado',
      aptitudBadge: 'ESQUEMA REGISTRADO',
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
      message: `Registro de inmunizaciones "${code}" guardado con éxito.`,
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Restablecer el registro de inmunizaciones? Se perderán los cambios no guardados.')) {
      setDoc(createInitialInmunizacionesDocument())
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

  const a = doc.seccionA

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
        title="Buscar Paciente para Registro de Inmunizaciones"
        subtitle="Seleccione el trabajador para precargar su empresa, puesto de trabajo y datos filiatorios en el carnet de inmunizaciones."
      />

      {/* PDF Modal */}
      {showPdfModal && (
        <InmunizacionesPdfModal doc={doc} onClose={() => setShowPdfModal(false)} />
      )}

      {/* MODE 1: RECENT DOCUMENTS LIST */}
      {viewMode === 'list' ? (
        <div className="page-container">
          {/* Page Card Header matching reference image */}
          <div className="page-card-header">
            <div className="header-left">
              <div className="header-icon-box">
                <Syringe size={24} />
              </div>
              <div>
                <h1 className="header-title">Registro de Inmunizaciones</h1>
                <p className="header-subtitle">
                  Historial de Carnets de Inmunizaciones por trabajador y control de esquemas de vacunación.
                </p>
              </div>
            </div>

            <div className="header-actions-wrap">
              <div className="table-search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Buscar vacuna/carnet..."
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
                <span>Crear Nuevo Registro</span>
              </button>
            </div>
          </div>

          {/* Page Card Body */}
          <div className="page-card-body">
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>CÓDIGO / CARNET</th>
                    <th>TRABAJADOR</th>
                    <th>EMPRESA / PUESTO</th>
                    <th>ÚLTIMA ACTUALIZACIÓN</th>
                    <th>ESTADO ESQUEMA</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No se encontraron carnets de inmunizaciones.
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
                            <span className="status-dot" /> {item.aptitudBadge || 'AL DÍA'}
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
              <span>Volver a la Lista de Inmunizaciones</span>
            </button>
          </div>

          <div className="doc-page-header">
            <div className="doc-page-header__main">
              <div className="doc-page-header__badge">
                <Syringe size={18} />
                <span>Edición de Documento Clínico</span>
              </div>
              <h1>Registro de Inmunizaciones</h1>
              <p className="page__subtitle">
                Datos del establecimiento/usuario, vacunas base e inmunizaciones por tipo de empresa y riesgo.
              </p>
            </div>

            <div className="doc-page-header__actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>
                <RotateCcw size={16} />
                <span>Restablecer</span>
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setShowPdfModal(true)}
              >
                <Printer size={16} />
                <span>Imprimir PDF</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleSaveDraft}>
                <Save size={16} />
                <span>Guardar</span>
              </button>
            </div>
          </div>

          <div className="doc-summary-strip">
            <div className="summary-item">
              <span className="summary-label">Usuario:</span>
              <strong>
                {a.primerApellido} {a.primerNombre || '—'}
              </strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">Empresa:</span>
              <strong>{a.institucionEmpresa || '—'}</strong>
            </div>
            <div className="summary-item">
              <span className="summary-label">Nº HC:</span>
              <strong>{a.numeroHistoriaClinica || '—'}</strong>
            </div>
          </div>

          <div className="doc-active-container">
            <InmunizacionesForm value={doc} onChange={setDoc} />
          </div>
        </div>
      )}
    </div>
  )
}
