import { Navigate, useParams } from 'react-router-dom'

/** Compatibilidad: el perfil ahora se muestra en modal desde Pacientes */
export function PatientProfilePage() {
  const { id } = useParams<{ id: string }>()
  if (!id) return <Navigate to="/app/pacientes" replace />
  return <Navigate to="/app/pacientes" replace />
}
