import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/presentation/hooks/useAuth'
import { ProtectedRoute } from '@/presentation/components/auth/ProtectedRoute'
import { AppLayout } from '@/presentation/components/layout/AppLayout'
import { LoginPage } from '@/presentation/pages/LoginPage'
import { DashboardPage } from '@/presentation/pages/DashboardPage'
import { PatientsPage } from '@/presentation/pages/PatientsPage'
import { PatientProfilePage } from '@/presentation/pages/PatientProfilePage'
import { HistoryFoldersPage } from '@/presentation/pages/HistoryFoldersPage'
import { ClinicalHistoryPage } from '@/presentation/pages/ClinicalHistoryPage'
import { UsersPage } from '@/presentation/pages/UsersPage'
import { HistoriaClinicaOcupacionalPage } from '@/presentation/pages/HistoriaClinicaOcupacionalPage'
import { CertificadoOcupacionalPage } from '@/presentation/pages/CertificadoOcupacionalPage'
import { CertificadoCoproparasitarioPage } from '@/presentation/pages/CertificadoCoproparasitarioPage'
import { DocumentoHistorialClinicoPage } from '@/presentation/pages/DocumentoHistorialClinicoPage'
import { RecetaMedicaPage } from '@/presentation/pages/RecetaMedicaPage'
import { InmunizacionesPage } from '@/presentation/pages/InmunizacionesPage'
import '@/presentation/styles/app.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route
                path="gestion-consultas"
                element={<Navigate to="/app/pacientes" replace />}
              />
              <Route
                path="gestion-pacientes"
                element={<Navigate to="/app/pacientes" replace />}
              />
              <Route path="pacientes" element={<PatientsPage />} />
              <Route path="pacientes/:id" element={<PatientProfilePage />} />
              <Route path="pacientes/:id/historial" element={<HistoryFoldersPage />} />
              <Route
                path="pacientes/:id/historial/:folderId"
                element={<ClinicalHistoryPage />}
              />
              <Route
                path="documentos/historial-clinico"
                element={<DocumentoHistorialClinicoPage />}
              />
              <Route
                path="documentos/historia-clinica"
                element={<Navigate to="/app/documentos/historial-clinico" replace />}
              />
              <Route
                path="documentos/examen-fisico"
                element={<Navigate to="/app/documentos/historial-clinico" replace />}
              />
              <Route
                path="documentos/imagenes"
                element={<Navigate to="/app/documentos/historial-clinico" replace />}
              />
              <Route
                path="documentos/historia-clinica-ocupacional"
                element={<HistoriaClinicaOcupacionalPage />}
              />
              <Route
                path="documentos/certificado-medico-ocupacional"
                element={<CertificadoOcupacionalPage />}
              />
              <Route
                path="documentos/certificado-coproparasitario"
                element={<CertificadoCoproparasitarioPage />}
              />
              <Route
                path="documentos/receta-medica"
                element={<RecetaMedicaPage />}
              />
              <Route
                path="documentos/inmunizaciones"
                element={<InmunizacionesPage />}
              />
              <Route path="configuracion/usuarios" element={<UsersPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
