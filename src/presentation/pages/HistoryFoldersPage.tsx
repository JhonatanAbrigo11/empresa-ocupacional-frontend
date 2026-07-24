import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  FileText,
  FileCheck,
  Plus,
  Trash2,
  Eye,
  Printer,
  ShieldCheck,
  Building2,
  Briefcase,
  IdCard,
} from 'lucide-react'
import type { Patient } from '@/domain/patient/Patient'
import type { PatientDocumentRecord, DocumentType } from '@/domain/patientDocument/PatientDocument'
import { container } from '@/infrastructure/di/container'
import { documentHistoryRepo } from '@/infrastructure/persistence/LocalStorageDocumentHistoryRepository'
import { mapPatientToHistoriaClinica, mapPatientToCertificado } from '@/domain/historiaClinicaOcupacional/patientMapper'
import { HistoriaClinicaPdfModal } from '@/presentation/components/historiaClinicaOcupacional/HistoriaClinicaPdfModal'
import { CertificadoPdfModal } from '@/presentation/components/certificadoOcupacional/CertificadoPdfModal'
import type { HistoriaClinicaOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/types'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'

export function HistoryFoldersPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [patient, setPatient] = useState<Patient | null>(null)
  const [records, setRecords] = useState<PatientDocumentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'historia' | 'certificado' | 'todos'>('historia')
  const [createMenuOpen, setCreateMenuOpen] = useState(false)

  // PDF Preview State
  const [previewHcDoc, setPreviewHcDoc] = useState<HistoriaClinicaOcupacionalDocument | null>(null)
  const [previewCertDoc, setPreviewCertDoc] = useState<CertificadoOcupacionalDocument | null>(null)

  useEffect(() => {
    if (!id) return
    void (async () => {
      setLoading(true)
      const foundPatient = await container.getPatientById.execute(id)
      setPatient(foundPatient)

      if (foundPatient) {
        const docs = await documentHistoryRepo.getByPatientId(foundPatient.id)
        setRecords(docs)
      }
      setLoading(false)
    })()
  }, [id])

  if (loading) {
    return (
      <div className="app-loading app-loading--inline">
        <div className="spinner" />
        <p>Cargando historial de documentos…</p>
      </div>
    )
  }

  if (!patient) {
    return (
      <section className="page">
        <p className="form-error">Paciente no encontrado.</p>
        <Link to="/app/pacientes" className="btn btn--ghost">
          <ArrowLeft size={16} /> Volver a lista de pacientes
        </Link>
      </section>
    )
  }

  const historiaRecords = records.filter((r) => r.tipoDocumento === 'HISTORIA_CLINICA')
  const certificadoRecords = records.filter((r) => r.tipoDocumento === 'CERTIFICADO_MEDICO')

  const displayedRecords =
    activeTab === 'historia'
      ? historiaRecords
      : activeTab === 'certificado'
        ? certificadoRecords
        : records

  const handleOpenDocument = (record: PatientDocumentRecord) => {
    if (record.tipoDocumento === 'HISTORIA_CLINICA') {
      navigate(`/app/documentos/historia-clinica-ocupacional?patientId=${patient.id}&recordId=${record.id}`)
    } else {
      navigate(`/app/documentos/certificado-medico-ocupacional?patientId=${patient.id}&recordId=${record.id}`)
    }
  }

  const handlePreviewPdf = (record: PatientDocumentRecord) => {
    if (record.tipoDocumento === 'HISTORIA_CLINICA') {
      const hcDoc = mapPatientToHistoriaClinica(patient)
      if (record.tipoEvaluacion) hcDoc.hoja1.seccionB.tipoEvaluacion = record.tipoEvaluacion
      if (record.aptitud) hcDoc.hoja3.seccionL.aptitud = record.aptitud
      setPreviewHcDoc(hcDoc)
    } else {
      const certDoc = mapPatientToCertificado(patient)
      if (record.tipoEvaluacion) certDoc.seccionB.tipoEvaluacion = record.tipoEvaluacion
      if (record.aptitud) certDoc.seccionC.aptitud = record.aptitud
      setPreviewCertDoc(certDoc)
    }
  }

  const handleDeleteRecord = async (record: PatientDocumentRecord) => {
    if (window.confirm(`¿Eliminar el registro "${record.titulo}" del ${record.fechaGuardado}?`)) {
      await documentHistoryRepo.deleteRecord(record.id)
      setRecords((prev) => prev.filter((r) => r.id !== record.id))
    }
  }

  const handleCreateNewDocument = (tipo: DocumentType) => {
    setCreateMenuOpen(false)
    if (tipo === 'HISTORIA_CLINICA') {
      navigate(`/app/documentos/historia-clinica-ocupacional?patientId=${patient.id}&new=true`)
    } else {
      navigate(`/app/documentos/certificado-medico-ocupacional?patientId=${patient.id}&new=true`)
    }
  }

  return (
    <div className="page page--history-folders">
      {/* Back Link */}
      <Link to="/app/pacientes" className="back-link">
        <ArrowLeft size={16} /> Volver a Lista de Pacientes
      </Link>

      {/* Patient Profile Summary Card */}
      <div className="history-patient-card">
        <div className="patient-avatar">
          {patient.nombre ? patient.nombre.charAt(0).toUpperCase() : 'P'}
        </div>

        <div className="patient-main-info">
          <div className="patient-name-row">
            <h1>{patient.nombre || `${patient.primerApellido} ${patient.primerNombre}`}</h1>
            <span className="patient-badge-hc">
              {patient.numHistoriaClinica || `HC-${patient.cedula}`}
            </span>
          </div>

          <div className="patient-chips-grid">
            <div className="chip-item">
              <IdCard size={14} />
              <span>Cédula: <strong>{patient.cedula}</strong></span>
            </div>
            <div className="chip-item">
              <Building2 size={14} />
              <span>Empresa: <strong>{patient.empresa || patient.establecimiento}</strong></span>
            </div>
            <div className="chip-item">
              <Briefcase size={14} />
              <span>Cargo: <strong>{patient.cargo || patient.puestoTrabajoCiuo || '—'}</strong></span>
            </div>
          </div>
        </div>

        {/* Create New Document Action */}
        <div className="history-create-dropdown">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setCreateMenuOpen((v) => !v)}
          >
            <Plus size={16} />
            <span>Nuevo Documento</span>
          </button>

          {createMenuOpen && (
            <div className="create-dropdown-menu">
              <button
                type="button"
                className="dropdown-menu-item"
                onClick={() => handleCreateNewDocument('HISTORIA_CLINICA')}
              >
                <FileText size={16} className="text-primary" />
                <div>
                  <strong>Historia Clínica Ocupacional</strong>
                  <span>Formulario Oficial de 3 Hojas</span>
                </div>
              </button>
              <button
                type="button"
                className="dropdown-menu-item"
                onClick={() => handleCreateNewDocument('CERTIFICADO_MEDICO')}
              >
                <FileCheck size={16} className="text-teal" />
                <div>
                  <strong>Certificado Ocupacional</strong>
                  <span>Certificado de Evaluación Médica</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Document Section Tabs */}
      <div className="history-tabs-bar" role="tablist" aria-label="Historial de Documentos">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'historia'}
          className={`history-tab-btn ${activeTab === 'historia' ? 'history-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('historia')}
        >
          <FileText size={18} />
          <span>Historia Clínica Ocupacional</span>
          <span className="tab-count-badge">{historiaRecords.length}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'certificado'}
          className={`history-tab-btn ${activeTab === 'certificado' ? 'history-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('certificado')}
        >
          <FileCheck size={18} />
          <span>Certificado Médico Ocupacional</span>
          <span className="tab-count-badge">{certificadoRecords.length}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'todos'}
          className={`history-tab-btn ${activeTab === 'todos' ? 'history-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('todos')}
        >
          <Calendar size={18} />
          <span>Todos los Registros</span>
          <span className="tab-count-badge">{records.length}</span>
        </button>
      </div>

      {/* Documents Grid / Cards View */}
      {displayedRecords.length === 0 ? (
        <div className="empty-state history-empty-state">
          <FileText size={36} className="text-muted" />
          <p>No se encontraron registros en esta sección.</p>
          <span>Utiliza el botón &quot;Nuevo Documento&quot; para registrar uno nuevo.</span>
        </div>
      ) : (
        <div className="history-cards-grid">
          {displayedRecords.map((record) => (
            <div key={record.id} className="history-doc-card">
              {/* Card Top Header */}
              <div className="card-top">
                <div className="card-doc-type">
                  {record.tipoDocumento === 'HISTORIA_CLINICA' ? (
                    <FileText size={20} className="icon-hc" />
                  ) : (
                    <FileCheck size={20} className="icon-cert" />
                  )}
                  <div>
                    <h3>{record.titulo}</h3>
                    <span className="card-subtext">No. Formulario: {record.numFormulario}</span>
                  </div>
                </div>

                <span className="status-pill status-pill--ok">
                  {record.tipoEvaluacion || 'PERIÓDICO'}
                </span>
              </div>

              {/* Saved Date Display Card */}
              <div className="card-saved-date">
                <Calendar size={14} />
                <span>Fecha de Guardado: <strong>{record.fechaGuardado}</strong></span>
              </div>

              {/* Aptitud & Medico Meta */}
              <div className="card-meta-list">
                <div className="meta-row">
                  <ShieldCheck size={14} className="text-muted" />
                  <span>Aptitud: <strong>{record.aptitud || 'APTO'}</strong></span>
                </div>
                {record.medicoNombre && (
                  <div className="meta-row">
                    <span className="text-muted">Médico:</span>
                    <span>{record.medicoNombre}</span>
                  </div>
                )}
                {record.observaciones && (
                  <p className="card-obs-snippet">&quot;{record.observaciones}&quot;</p>
                )}
              </div>

              {/* Card Actions */}
              <div className="card-actions-row">
                <button
                  type="button"
                  className="btn btn--primary btn--sm flex-1"
                  onClick={() => handleOpenDocument(record)}
                >
                  <Eye size={14} />
                  <span>Ver / Editar</span>
                </button>

                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => handlePreviewPdf(record)}
                  title="Ver Vista Previa PDF"
                >
                  <Printer size={14} />
                  <span>PDF</span>
                </button>

                <button
                  type="button"
                  className="btn btn--icon btn--danger btn--sm"
                  onClick={() => handleDeleteRecord(record)}
                  title="Eliminar Registro"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PDF Modal Previews */}
      {previewHcDoc && (
        <HistoriaClinicaPdfModal
          doc={previewHcDoc}
          onClose={() => setPreviewHcDoc(null)}
        />
      )}

      {previewCertDoc && (
        <CertificadoPdfModal
          doc={previewCertDoc}
          onClose={() => setPreviewCertDoc(null)}
        />
      )}
    </div>
  )
}
