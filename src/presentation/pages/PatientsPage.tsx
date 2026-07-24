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
    <section className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">
            <Users size={16} /> Módulo
          </p>
          <h1>Pacientes</h1>
          <p className="page__subtitle">
            Lista de trabajadores registrados para exámenes ocupacionales.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openCreate}>
          <Plus size={18} />
          Nuevo paciente
        </button>
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
    </section>
  )
}
