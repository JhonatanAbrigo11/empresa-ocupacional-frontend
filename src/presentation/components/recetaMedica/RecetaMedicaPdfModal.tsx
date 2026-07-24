import { useState } from 'react'
import { Download, Printer, X, Pill } from 'lucide-react'
import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'
import logoDocument from '@/assets/documents/logoDocument.png'
import preventyLogo from '@/assets/documents/preventyLogo.png'

interface Props {
  doc: RecetaMedicaDocument
  onClose: () => void
}

function blank(value: string, fallback = '____________________') {
  const trimmed = value.trim()
  return trimmed || fallback
}

function RecetaPanel({
  doc,
  mode,
}: {
  doc: RecetaMedicaDocument
  mode: 'receta' | 'indicaciones'
}) {
  const isReceta = mode === 'receta'

  return (
    <div className={`receta-panel ${isReceta ? 'receta-panel--left' : 'receta-panel--right'}`}>
      <header className="receta-panel__header">
        <img src={logoDocument} alt="Logo" className="receta-panel__logo" />
        <div className="receta-panel__brand">
          <img src={preventyLogo} alt="CC. Preventy" className="receta-panel__marca" />
          <p className="receta-panel__center-name">Centro de Especialidades Médicas</p>
        </div>
      </header>

      <p className="receta-panel__num">
        No. <span>{blank(doc.numero, '000000')}</span>
      </p>

      <h2 className="receta-panel__title">
        {isReceta ? 'RECETA MÉDICA' : 'INDICACIONES'}
      </h2>

      <p className="receta-panel__fecha">
        Dayuma, {blank(doc.fechaDia, '_____')} de {blank(doc.fechaMes, '_______________')} de{' '}
        {blank(doc.fechaAnio, '________')}
      </p>

      <div className="receta-panel__fields">
        <p>
          <strong>Nombres y Apellidos:</strong> {blank(doc.nombresApellidos)}
        </p>
        <p className="receta-panel__row">
          <span>
            <strong>Edad:</strong> {blank(doc.edad, '____')}
          </span>
          <span>
            <strong>CI:</strong> {blank(doc.ci, '____________')}
          </span>
          <span>
            <strong>HC:</strong> {blank(doc.hc, '____________')}
          </span>
        </p>
        <p className="receta-panel__row">
          <span className="receta-panel__grow">
            <strong>Diagnóstico:</strong> {blank(doc.diagnostico)}
          </span>
          <span>
            <strong>CIE 10:</strong> {blank(doc.cie10, '________')}
          </span>
        </p>
        <p>
          <strong>Ant. Alérgicos:</strong> {blank(doc.antAlergicos)}
        </p>
      </div>

      <div className="receta-panel__body">
        <strong>{isReceta ? 'Rp:' : 'INDICACIONES:'}</strong>
        <pre className="receta-panel__content">
          {(isReceta ? doc.rp : doc.indicaciones).trim() || ' '}
        </pre>
      </div>

      <div className="receta-panel__firma">
        <p className="receta-panel__firma-label">Firma Medico</p>
        <p>{blank(doc.nombreMedico, '________________')}</p>
        <p>Cel: {blank(doc.celularMedico, '________________')}</p>
        <p>REG N. {blank(doc.regMedico, '________________')}</p>
      </div>

      <footer className="receta-panel__footer">
        <p>Dirección: Barrio bella vista al lado del colegio Dayuma</p>
        <p>Celular: 0962525818 / 0962911734</p>
        <p>info@ccpreventy.uno / ccastro@ccpreventy.uno</p>
        <p>www.ccpreventy.com</p>
        <p>
          <strong>Dayuma – Orellana – Ecuador</strong>
        </p>
      </footer>
    </div>
  )
}

export function RecetaMedicaPdfModal({ doc, onClose }: Props) {
  const [downloading, setDownloading] = useState(false)

  const handlePrint = () => window.print()

  const handleDownloadPdf = () => {
    setDownloading(true)
    setTimeout(() => {
      window.print()
      setDownloading(false)
    }, 300)
  }

  return (
    <div className="pdf-modal-overlay" role="dialog" aria-modal="true">
      <div className="pdf-modal-container pdf-modal-container--wide">
        <header className="pdf-modal-header no-print">
          <div className="pdf-modal-header__info">
            <Pill size={20} className="text-primary" />
            <div>
              <h2>Vista previa — Receta Médica</h2>
              <span>
                {doc.nombresApellidos.trim() || 'Paciente sin nombre'} · validez 8 días
              </span>
            </div>
          </div>
          <div className="pdf-modal-header__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleDownloadPdf}
              disabled={downloading}
            >
              <Download size={16} />
              <span>Descargar PDF</span>
            </button>
            <button type="button" className="btn btn--ghost" onClick={handlePrint}>
              <Printer size={16} />
              <span>Imprimir</span>
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={onClose}
              title="Cerrar vista previa"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <main className="pdf-modal-body">
          <div className="pdf-printable-area">
            <article className="pdf-page-sheet receta-sheet">
              <div className="receta-sheet__cols">
                <RecetaPanel doc={doc} mode="receta" />
                <RecetaPanel doc={doc} mode="indicaciones" />
              </div>
              <p className="receta-sheet__validity">
                ESTA RECETA MÉDICA TIENE UNA VALIDEZ PARA LA ENTREGA DE MEDICAMENTOS DE 8 DÍAS
              </p>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
