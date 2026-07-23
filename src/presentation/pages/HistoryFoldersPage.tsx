import { Navigate } from 'react-router-dom'

/** Compatibilidad: las carpetas ahora se muestran en modal desde Pacientes */
export function HistoryFoldersPage() {
  return <Navigate to="/app/pacientes" replace />
}
