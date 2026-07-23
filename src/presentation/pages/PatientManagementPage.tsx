import { useState } from 'react'
import { ClipboardList, Plus } from 'lucide-react'
import { CreateConsultationModal } from '@/presentation/components/consultations/CreateConsultationModal'

export function PatientManagementPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">
            <ClipboardList size={16} /> Módulo
          </p>
          <h1>Gestión de Consultas</h1>
          <p className="page__subtitle">
            Crea y administra las consultas clínicas de los pacientes.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} />
          Crear nueva consulta
        </button>
      </div>

      <div className="empty-state">
        <p>Crea una nueva consulta para comenzar</p>
        <span>
          Selecciona un paciente, define la fecha y se abrirá su historial clínico.
        </span>
      </div>

      <CreateConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
