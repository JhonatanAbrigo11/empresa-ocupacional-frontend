import { useEffect, useState } from 'react'
import {
  Pill,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'
import { createInitialRecetaMedica } from '@/presentation/components/recetaMedica/defaults'
import { RecetaMedicaForm } from '@/presentation/components/recetaMedica/RecetaMedicaForm'
import { RecetaMedicaPdfModal } from '@/presentation/components/recetaMedica/RecetaMedicaPdfModal'

const LOCAL_STORAGE_KEY = 'receta_medica_draft_v1'

export function RecetaMedicaPage() {
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<RecetaMedicaDocument>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as RecetaMedicaDocument
      } catch {
        // ignore
      }
    }
    return createInitialRecetaMedica()
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
      message: 'Receta médica guardada localmente.',
      type: 'success',
    })
  }

  const handleReset = () => {
    if (
      !window.confirm(
        '¿Restablecer la receta médica? Se perderán los cambios no guardados.',
      )
    ) {
      return
    }
    setDoc(createInitialRecetaMedica())
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setNotification({
      message: 'Receta restablecida.',
      type: 'info',
    })
  }

  return (
    <div className="page page--document">
      <div className="doc-page-header">
        <div className="doc-page-header__main">
          <div className="doc-page-header__badge">
            <Pill size={18} />
            <span>Documentos clínicos</span>
          </div>
          <h1>Receta Médica</h1>
          <p className="page__subtitle">
            Complete los datos del paciente, la prescripción y las indicaciones. Imprima el
            formato a dos columnas.
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

      <RecetaMedicaForm value={doc} onChange={setDoc} />

      {showPdfModal && (
        <RecetaMedicaPdfModal doc={doc} onClose={() => setShowPdfModal(false)} />
      )}
    </div>
  )
}
