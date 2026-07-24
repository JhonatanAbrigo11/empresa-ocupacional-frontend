import { useState } from 'react'
import { Download, Printer, X, Microscope } from 'lucide-react'
import type { CertificadoCoproparasitarioDocument } from '@/domain/certificadoCoproparasitario/types'
import logoDocument from '@/assets/documents/logoDocument.png'
import headerMarca from '@/assets/documents/headerMarca.png'

interface Props {
  doc: CertificadoCoproparasitarioDocument
  onClose: () => void
}

const APTITUD_LABELS = [
  { value: 'apto', label: 'Apto' },
  { value: 'apto_recomendaciones', label: 'Apto con recomendaciones' },
  { value: 'apto_restricciones', label: 'Apto con restricciones' },
  { value: 'no_apto', label: 'No Apto' },
] as const

function blank(value: string, fallback = '____________________') {
  const trimmed = value.trim()
  return trimmed || fallback
}

export function CertificadoCoproparasitarioPdfModal({ doc, onClose }: Props) {
  const [downloading, setDownloading] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = () => {
    setDownloading(true)
    setTimeout(() => {
      window.print()
      setDownloading(false)
    }, 300)
  }

  return (
    <div className="pdf-modal-overlay" role="dialog" aria-modal="true">
      <div className="pdf-modal-container">
        <header className="pdf-modal-header no-print">
          <div className="pdf-modal-header__info">
            <Microscope size={20} className="text-primary" />
            <div>
              <h2>Vista previa — Certificado Coproparasitario</h2>
              <span>
                {doc.nombrePaciente.trim() || 'Paciente sin nombre'} · listo para imprimir
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
            <article className="pdf-page-sheet letter-cert-sheet">
              <header className="letter-cert-header">
                <img
                  src={logoDocument}
                  alt="Logo CC. Preventy"
                  className="letter-cert-header__logo"
                />
                <div className="letter-cert-header__brand">
                  <img
                    src={headerMarca}
                    alt="Centro de Especialidades Médicas CC. Preventy"
                    className="letter-cert-header__marca"
                  />
                  <p className="letter-cert-header__slogan">
                    Medicina Ocupacional con la Mejor Calidad
                  </p>
                </div>
              </header>

              <hr className="letter-cert-rule" />

              <h1 className="letter-cert-title">CERTIFICADO COPROPARASITARIO</h1>

              <p className="letter-cert-date">{blank(doc.fechaReferencia)}</p>

              <p className="letter-cert-body">
                Certifico que el Señor{' '}
                <strong className="letter-cert-fill">{blank(doc.nombrePaciente)}</strong>, de{' '}
                <strong className="letter-cert-fill">{blank(doc.edad, '____')}</strong> años de
                edad, con número de cédula{' '}
                <strong className="letter-cert-fill">{blank(doc.cedula)}</strong> para el cargo de{' '}
                <strong className="letter-cert-fill">{blank(doc.cargo)}</strong> en la Empresa{' '}
                <strong className="letter-cert-fill">{blank(doc.empresa)}</strong> asiste a este
                centro de especialidades médicas a realizarse un{' '}
                <strong className="letter-cert-fill">{blank(doc.tipoExamen)}</strong>, al examen
                físico no presenta ninguna sintomatología respiratoria, como tos, fiebre y
                malestar general, las que demuestran que el trabajador se encuentra sin
                evidencia de enfermedad infectocontagiosa, hasta el momento de la emisión de
                este certificado.
              </p>

              <p className="letter-cert-vitals">
                <span>
                  <strong>P/A:</strong> {blank(doc.pa, '______')}
                </span>
                <span>
                  <strong>PUL:</strong> {blank(doc.pul, '______')}
                </span>
                <span>
                  <strong>TEMP:</strong> {blank(doc.temp, '______')}
                </span>
                <span>
                  <strong>SPO:</strong> {blank(doc.spo, '______')}
                </span>
                <span>
                  <strong>FR:</strong> {blank(doc.fr, '______')}
                </span>
                <span>
                  <strong>T:</strong> {blank(doc.talla, '______')}
                </span>
                <span>
                  <strong>P:</strong> {blank(doc.peso, '______')}
                </span>
                <span>
                  <strong>IMC:</strong> {blank(doc.imc, '______')}
                </span>
              </p>

              <p className="letter-cert-line">
                <strong>Diagnóstico:</strong> {blank(doc.diagnostico, '________________________________')}
              </p>

              <div className="letter-cert-aptitud">
                <p>
                  <strong>SE DECLARA QUE EL PACIENTE ESTÁ:</strong>
                </p>
                <ul>
                  {APTITUD_LABELS.map((opt) => (
                    <li key={opt.value}>
                      <span
                        className={`letter-cert-check ${doc.aptitud === opt.value ? 'is-checked' : ''}`}
                        aria-hidden
                      />
                      {opt.label}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="letter-cert-line">
                <strong>Recomendaciones:</strong>{' '}
                {blank(doc.recomendaciones, '________________________________')}
              </p>

              <p className="letter-cert-closing">Atentamente;</p>

              <div className="letter-cert-signature">
                <p>
                  <strong>Dr. {blank(doc.nombreMedico, '____________________')}</strong>
                </p>
                <p>MSP: {blank(doc.msp, '____________________')}</p>
              </div>

              <footer className="letter-cert-footer">
                <hr className="letter-cert-rule" />
                <p>Dirección: Barrio Bellavista Al lado Del Colegio Dayuma</p>
                <p>Teléfonos: 0962911734 / 0962525818</p>
                <p>E-mail: info@ccpreventy.uno / ccastro@ccpreventy.uno</p>
                <p className="letter-cert-footer__place">DAYUMA - ECUADOR</p>
              </footer>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
