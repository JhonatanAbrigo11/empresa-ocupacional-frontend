import { useEffect, useState } from 'react'
import {
  Microscope,
  Save,
  RotateCcw,
  Printer,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import type { CertificadoCoproparasitarioDocument } from '@/domain/certificadoCoproparasitario/types'
import { createInitialCertificadoCoproparasitario } from '@/presentation/components/certificadoCoproparasitario/defaults'
import { CertificadoCoproparasitarioForm } from '@/presentation/components/certificadoCoproparasitario/CertificadoCoproparasitarioForm'
import { CertificadoCoproparasitarioPdfModal } from '@/presentation/components/certificadoCoproparasitario/CertificadoCoproparasitarioPdfModal'

const LOCAL_STORAGE_KEY = 'cert_coproparasitario_draft_v1'

export function CertificadoCoproparasitarioPage() {
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [doc, setDoc] = useState<CertificadoCoproparasitarioDocument>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as CertificadoCoproparasitarioDocument
      } catch {
        // ignore corrupt draft
      }
    }
    return createInitialCertificadoCoproparasitario()
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
      message: 'Certificado guardado localmente.',
      type: 'success',
    })
  }

  const handleReset = () => {
    if (
      window.confirm(
        '¿Restablecer el certificado? Se perderán los cambios no guardados.',
      )
    ) {
      setDoc(createInitialCertificadoCoproparasitario())
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setNotification({
        message: 'Formulario restablecido.',
        type: 'info',
      })
    }
  }

  return (
    <div className="page page--document">
      <div className="doc-page-header">
        <div className="doc-page-header__main">
          <div className="doc-page-header__badge">
            <Microscope size={18} />
            <span>Documentos clínicos</span>
          </div>
          <h1>Certificado Coproparasitario</h1>
          <p className="page__subtitle">
            Ingrese los datos, seleccione la aptitud y use Imprimir para ver el
            certificado con membrete.
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

      <CertificadoCoproparasitarioForm value={doc} onChange={setDoc} />

      {showPdfModal && (
        <CertificadoCoproparasitarioPdfModal
          doc={doc}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  )
}
