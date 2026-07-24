import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  FileCheck,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
  UserCheck,
} from 'lucide-react'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'
import { createInitialCertificadoDocument } from '@/presentation/components/certificadoOcupacional/defaults'
import { mapPatientToCertificado } from '@/domain/historiaClinicaOcupacional/patientMapper'
import { usePatients } from '@/presentation/hooks/usePatients'
import { CertificadoForm } from '@/presentation/components/certificadoOcupacional/CertificadoForm'
import { CertificadoPdfModal } from '@/presentation/components/certificadoOcupacional/CertificadoPdfModal'

const LOCAL_STORAGE_KEY = 'cert_ocupacional_draft_v1'

export function CertificadoOcupacionalPage() {
  const [searchParams] = useSearchParams()
  const patientIdParam = searchParams.get('patientId')

  const { patients } = usePatients()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<CertificadoOcupacionalDocument>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as CertificadoOcupacionalDocument
      } catch {
        // Fallback
      }
    }
    return createInitialCertificadoDocument()
  })

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  useEffect(() => {
    if (!patientIdParam || patients.length === 0) return
    const found = patients.find((p) => p.id === patientIdParam)
    if (found) {
      setSelectedPatientId(patientIdParam)
      const populated = mapPatientToCertificado(found)
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
      const populated = mapPatientToCertificado(found)
      setDoc(populated)
      setNotification({
        message: `Datos de Certificado autocompletados desde el registro de ${found.nombre || found.primerApellido}.`,
        type: 'success',
      })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))
    setNotification({
      message: 'Documento "Certificado - Evaluación Médica Ocupacional" guardado localmente con éxito.',
      type: 'success',
    })
  }

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restablecer el certificado a sus valores por defecto? Se perderán los cambios no guardados.')) {
      const initial = createInitialCertificadoDocument()
      setDoc(initial)
      setSelectedPatientId('')
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({
        message: 'Certificado restablecido correctamente.',
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
            <FileCheck size={18} />
            <span>Digitalización de Documentos Ocupacionales</span>
          </div>
          <h1>Certificado - Evaluación Médica Ocupacional</h1>
          <p className="page__subtitle">
            Certificado Oficial Ocupacional con controles CRUD y generación/vista previa en formato PDF original.
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
          <span>Selecciona un paciente para autocompletar los datos del certificado automáticamente:</span>
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

      {/* PDF Preview Modal */}
      {showPdfModal && (
        <CertificadoPdfModal
          doc={doc}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  )
}
