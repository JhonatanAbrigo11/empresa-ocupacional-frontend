import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users } from 'lucide-react'
import type { Patient, PatientInput } from '@/domain/patient/Patient'
import { usePatients } from '@/presentation/hooks/usePatients'
import { PatientTable } from '@/presentation/components/patients/PatientTable'
import { PatientModal } from '@/presentation/components/patients/PatientModal'
import { PatientProfileModal } from '@/presentation/components/patients/PatientProfileModal'

export function PatientsPage() {
  const navigate = useNavigate()
  const { patients, loading, error, create, update, remove } = usePatients()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Patient | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selected, setSelected] = useState<Patient | null>(null)

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (patient: Patient) => {
    setEditing(patient)
    setModalOpen(true)
  }

  const openProfile = (patient: Patient) => {
    setSelected(patient)
    setProfileOpen(true)
  }

  const openHistory = (patient: Patient) => {
    navigate(`/app/pacientes/${patient.id}/historial`)
  }

  const handleSubmit = async (data: PatientInput) => {
    if (editing) {
      await update(editing.id, data)
    } else {
      await create(data)
    }
  }

  const handleDelete = async (patient: Patient) => {
    const confirmed = window.confirm(
      `¿Eliminar a ${patient.nombre}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return
    await remove(patient.id)
  }

  return (
    <div className="page-container">
      {/* Page Card Header matching reference image */}
      <div className="page-card-header">
        <div className="header-left">
          <div className="header-icon-box">
            <Users size={24} />
          </div>
          <div>
            <h1 className="header-title">Pacientes</h1>
            <p className="header-subtitle">
              Lista de trabajadores registrados para exámenes ocupacionales.
            </p>
          </div>
        </div>

        <div className="header-actions-wrap">
          <button type="button" className="btn-primary-blue" onClick={openCreate}>
            <Plus size={18} strokeWidth={2.5} />
            <span>Nuevo paciente</span>
          </button>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <div className="app-loading app-loading--inline">
          <div className="spinner" />
          <p>Cargando pacientes…</p>
        </div>
      ) : (
        <PatientTable
          patients={patients}
          onViewProfile={openProfile}
          onViewHistory={openHistory}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <PatientModal
        open={modalOpen}
        patient={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <PatientProfileModal
        open={profileOpen}
        patient={selected}
        onClose={() => {
          setProfileOpen(false)
          setSelected(null)
        }}
        onOpenHistory={openHistory}
      />
    </div>
  )
}
