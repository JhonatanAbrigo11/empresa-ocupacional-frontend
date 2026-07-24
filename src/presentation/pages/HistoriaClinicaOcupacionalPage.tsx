import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  FileText,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  ClipboardCheck,
  UserCheck,
} from 'lucide-react'
import type { HistoriaClinicaOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/types'
import { createInitialDocument } from '@/presentation/components/historiaClinicaOcupacional/defaults'
import { mapPatientToHistoriaClinica } from '@/domain/historiaClinicaOcupacional/patientMapper'
import { usePatients } from '@/presentation/hooks/usePatients'
import { Hoja1Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja1Form'
import { Hoja2Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja2Form'
import { Hoja3Form } from '@/presentation/components/historiaClinicaOcupacional/Hoja3Form'
import { HistoriaClinicaPdfModal } from '@/presentation/components/historiaClinicaOcupacional/HistoriaClinicaPdfModal'

const LOCAL_STORAGE_KEY = 'hco_document_draft_v1'

export function HistoriaClinicaOcupacionalPage() {
  const [searchParams] = useSearchParams()
  const patientIdParam = searchParams.get('patientId')

  const { patients } = usePatients()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'hoja1' | 'hoja2' | 'hoja3'>('hoja1')
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<HistoriaClinicaOcupacionalDocument>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as HistoriaClinicaOcupacionalDocument
      } catch {
        // Fallback
      }
    }
    return createInitialDocument()
  })

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  useEffect(() => {
    if (!patientIdParam || patients.length === 0) return
    const found = patients.find((p) => p.id === patientIdParam)
    if (found) {
      setSelectedPatientId(patientIdParam)
      const populated = mapPatientToHistoriaClinica(found)
      setDoc(populated)
    }
  }, [patientIdParam, patients])

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId)
    if (!patientId) return
    const found = patients.find((p) => p.id === patientId)
    if (found) {
      const populated = mapPatientToHistoriaClinica(found)
      setDoc(populated)
      setNotification({
        message: `Datos autocompletados desde el registro de ${found.nombre || found.primerApellido}.`,
        type: 'success',
      })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))
    setNotification({
      message: 'Documento "Historia Clínica Ocupacional" guardado localmente con éxito.',
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restablecer el formulario a sus valores por defecto? Se perderán los cambios no guardados.')) {
      const initial = createInitialDocument()
      setDoc(initial)
      setSelectedPatientId('')
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({
        message: 'Formulario restablecido correctamente.',
        type: 'info',
      })
    }
  }

  const handlePrint = () => {
    setShowPdfModal(true)
  }

  return (
    <div className="page page--document">
      {/* Top Page Header */}
      <div className="doc-page-header">
        <div className="doc-page-header__main">
          <div className="doc-page-header__badge">
            <FileText size={18} />
            <span>Digitalización de Documentos Ocupacionales</span>
          </div>
          <h1>Historia Clínica Ocupacional</h1>
          <p className="page__subtitle">
            Formulario Oficial de Evaluación Médica Ocupacional digitalizado (3 Hojas completas con controles CRUD funcionales).
          </p>
        </div>

        <div className="doc-page-header__actions">
          <button type="button" className="btn btn--ghost" onClick={handleReset} title="Restablecer plantilla">
            <RotateCcw size={16} />
            <span>Restablecer</span>
          </button>
          <button type="button" className="btn btn--ghost" onClick={handlePrint} title="Imprimir / Exportar a PDF">
            <Printer size={16} />
            <span>Imprimir</span>
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSaveDraft}>
            <Save size={16} />
            <span>Guardar Documento</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`doc-toast doc-toast--${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Patient Auto-Populate Selector */}
      <div className="doc-patient-selector-bar">
        <UserCheck size={20} className="text-primary" />
        <div className="selector-info">
          <strong>Cargar Datos de Paciente Registrado:</strong>
          <span>Selecciona un paciente para autocompletar la filiación, empresa y puesto en el formulario:</span>
        </div>
        <select
          className="selector-dropdown"
          value={selectedPatientId}
          onChange={(e) => handleSelectPatient(e.target.value)}
        >
          <option value="">-- Seleccionar Paciente Registrado --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre || `${p.primerApellido} ${p.primerNombre}`} (C.I. {p.cedula}) - {p.empresa}
            </option>
          ))}
        </select>
      </div>

      {/* Patient & Document Summary Strip */}
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

      {showPdfModal && (
        <HistoriaClinicaPdfModal
          doc={doc}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  )
}
