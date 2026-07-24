import { useEffect, useState } from 'react'
import {
  Syringe,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import type { InmunizacionesDocument } from '@/domain/inmunizaciones/types'
import { createInitialInmunizacionesDocument } from '@/presentation/components/inmunizaciones/defaults'
import { InmunizacionesForm } from '@/presentation/components/inmunizaciones/InmunizacionesForm'
import { InmunizacionesPdfModal } from '@/presentation/components/inmunizaciones/InmunizacionesPdfModal'

const LOCAL_STORAGE_KEY = 'inmunizaciones_draft_v1'

export function InmunizacionesPage() {
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<InmunizacionesDocument>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as InmunizacionesDocument
      } catch {
        // ignore
      }
    }
    return createInitialInmunizacionesDocument()
  })

  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'info'
  } | null>(null)

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3500)
    return () => clearTimeout(timer)
  }, [notification])

  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(doc))
    setNotification({
      message: 'Registro de inmunizaciones guardado localmente.',
      type: 'success',
    })
  }

  const handleReset = () => {
    if (
      !window.confirm(
        '¿Restablecer el registro de inmunizaciones? Se perderán los cambios no guardados.',
      )
    ) {
      return
    }
    setDoc(createInitialInmunizacionesDocument())
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setNotification({
      message: 'Formulario restablecido.',
      type: 'info',
    })
  }

  const a = doc.seccionA

  return (
    <div className="page page--document">
      <div className="doc-page-header">
        <div className="doc-page-header__main">
          <div className="doc-page-header__badge">
            <Syringe size={18} />
            <span>Documentos clínicos</span>
          </div>
          <h1>Registro de Inmunizaciones</h1>
          <p className="page__subtitle">
            Datos del establecimiento/usuario, vacunas base e inmunizaciones por tipo de
            empresa y riesgo.
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
            <span>Imprimir</span>
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSaveDraft}>
            <Save size={16} />
            <span>Guardar</span>
          </button>
        </div>
      </div>

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

      {showPdfModal && (
        <InmunizacionesPdfModal doc={doc} onClose={() => setShowPdfModal(false)} />
      )}
    </div>
  )
}
