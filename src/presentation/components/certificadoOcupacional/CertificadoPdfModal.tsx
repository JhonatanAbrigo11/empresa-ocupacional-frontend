import { useRef, useState } from 'react'
import { Download, Printer, X, FileCheck } from 'lucide-react'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'

interface CertificadoPdfModalProps {
  doc: CertificadoOcupacionalDocument
  onClose: () => void
}

export function CertificadoPdfModal({ doc, onClose }: CertificadoPdfModalProps) {
  const printRef = useRef<HTMLDivElement>(null)
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

  const a = doc.seccionA
  const b = doc.seccionB
  const c = doc.seccionC
  const d = doc.seccionD
  const e = doc.seccionE
  const f = doc.seccionF

  return (
    <div className="pdf-modal-overlay" role="dialog" aria-modal="true">
      <div className="pdf-modal-container">
        {/* Top Control Header */}
        <header className="pdf-modal-header">
          <div className="pdf-modal-header__info">
            <FileCheck size={20} className="text-primary" />
            <div>
              <h2>Vista Previa del Certificado PDF</h2>
              <span>Certificado - Evaluación Médica Ocupacional · {a.primerApellido} {a.primerNombre}</span>
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

            <button
              type="button"
              className="btn btn--ghost"
              onClick={handlePrint}
            >
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

        {/* Printable Area with A4 Certificate Sheet */}
        <main className="pdf-modal-body">
          <div ref={printRef} className="pdf-printable-area">
            <article className="pdf-page-sheet cert-pdf-sheet">
              {/* Header Title Banner */}
              <header className="pdf-cert-banner">
                <h2>CERTIFICADO - EVALUACIÓN MÉDICA OCUPACIONAL</h2>
              </header>

              {/* SECCIÓN A */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">A. DATOS DEL ESTABLECIMIENTO - DATOS DEL USUARIO</div>
                <table className="pdf-table cert-table">
                  <thead>
                    <tr>
                      <th>INSTITUCIÓN DEL SISTEMA</th>
                      <th>RUC</th>
                      <th>CIIU</th>
                      <th>ESTABLECIMIENTO / CENTRO DE TRABAJO</th>
                      <th>NÚMERO DE FORMULARIO</th>
                      <th>NÚMERO DE ARCHIVO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{a.institucionSistema || '—'}</td>
                      <td>{a.ruc || '—'}</td>
                      <td>{a.ciiu || '—'}</td>
                      <td>{a.establecimiento || '—'}</td>
                      <td>{a.numFormulario || '—'}</td>
                      <td>{a.numArchivo || '—'}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="pdf-table cert-table" style={{ marginTop: '-1px' }}>
                  <thead>
                    <tr>
                      <th>PRIMER APELLIDO</th>
                      <th>SEGUNDO APELLIDO</th>
                      <th>PRIMER NOMBRE</th>
                      <th>SEGUNDO NOMBRE</th>
                      <th>SEXO</th>
                      <th>PUESTO DE TRABAJO (CIUO)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{a.primerApellido || '—'}</td>
                      <td>{a.segundoApellido || '—'}</td>
                      <td>{a.primerNombre || '—'}</td>
                      <td>{a.segundoNombre || '—'}</td>
                      <td>{a.sexo || '—'}</td>
                      <td>{a.puestoTrabajoCiuo || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN B */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">B. DATOS GENERALES</div>
                <div className="cert-b-grid">
                  <div className="cert-fecha-box">
                    <strong>FECHA DE EMISIÓN:</strong>
                    <div className="cert-date-cells">
                      <span className="date-cell">{b.fechaEmisionAño || '2026'} <small>aaaa</small></span>
                      <span className="date-cell">{b.fechaEmisionMes || '01'} <small>mm</small></span>
                      <span className="date-cell">{b.fechaEmisionDia || '01'} <small>dd</small></span>
                    </div>
                  </div>

                  <div className="cert-eval-box">
                    <strong>EVALUACIÓN:</strong>
                    <div className="cert-eval-options">
                      {(['INGRESO', 'PERIÓDICO', 'REINTEGRO', 'RETIRO'] as const).map((tipo) => (
                        <div key={tipo} className="eval-opt-item">
                          <span>{tipo}</span>
                          <span className="eval-opt-checkbox">
                            {b.tipoEvaluacion === tipo ? 'X' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECCIÓN C */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">C. APTITUD MÉDICA PARA EL TRABAJO</div>
                <p className="cert-subtitle-text">
                  Después de la valoración médica ocupacional se certifica que la persona en mención, es calificada como:
                </p>

                <div className="cert-aptitud-grid">
                  {(
                    [
                      { id: 'APTO', label: 'APTO' },
                      { id: 'APTO EN OBSERVACIÓN', label: 'APTO EN OBSERVACIÓN' },
                      { id: 'APTO CON LIMITACIONES', label: 'APTO CON LIMITACIONES' },
                      { id: 'NO APTO', label: 'NO APTO' },
                    ] as const
                  ).map((item) => (
                    <div key={item.id} className={`cert-apt-item ${c.aptitud === item.id ? 'cert-apt-item--selected' : ''}`}>
                      <span className="cert-apt-label">{item.label}</span>
                      <span className="cert-apt-box">
                        {c.aptitud === item.id ? 'X' : ''}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pdf-box-content" style={{ minHeight: '80px', marginTop: '6px' }}>
                  <strong>DETALLE DE OBSERVACIONES:</strong><br />
                  {c.detalleObservaciones || 'Sin observaciones.'}
                </div>
              </section>

              {/* SECCIÓN D */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">D. RECOMENDACIONES/OBSERVACIONES</div>
                <div className="pdf-box-content">
                  <strong>Descripción:</strong> {d.descripcionRecomendaciones || 'ESTILO DE VIDA SALUDABLE. USO DE EPP'}<br />
                  <strong>Observación:</strong> {d.observacionGeneral || 'Sin observaciones adicionales.'}
                </div>

                <div className="cert-legal-box">
                  <p>
                    Con este documento certifico que el trabajador se ha sometido a la evaluación médica requerida para (el ingreso /la ejecución/ el reingreso y retiro) al puesto laboral y se le ha informado sobre los riesgos relacionados con el trabajo emitiendo recomendaciones relacionadas con su estado de salud.
                  </p>
                  <span className="legal-footer-note">
                    La presente certificación se expide con base en el formulario de Evaluación Ocupacional, el cual tiene carácter de confidencial.
                  </span>
                </div>
              </section>

              {/* SECCIONES E Y F */}
              <section className="cert-signatures-grid">
                <div className="pdf-sig-box">
                  <div className="pdf-sig-title">E. DATOS DEL PROFESIONAL</div>
                  <div className="pdf-sig-line">
                    <div className="pdf-sig-stamp">{e.firmaSello || 'Firma & Sello Médico'}</div>
                  </div>
                  <table className="pdf-table cert-sig-table">
                    <tbody>
                      <tr>
                        <td><strong>NOMBRE Y APELLIDO:</strong><br />{e.nombreApellidoProf}</td>
                        <td><strong>CÓDIGO MÉDICO:</strong><br />{e.codigoMedico}</td>
                        <td><strong>FIRMA Y SELLO:</strong><br />{e.firmaSello ? 'VERIFICADO' : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pdf-sig-box">
                  <div className="pdf-sig-title">F. FIRMA DEL USUARIO (TRABAJADOR)</div>
                  <div className="pdf-sig-line">
                    <div className="pdf-sig-stamp">{f.firmaUsuario || 'Firma del Trabajador'}</div>
                  </div>
                  <div className="pdf-sig-footer">
                    <strong>{a.primerNombre} {a.primerApellido}</strong>
                    <span>C.I. {f.cedulaUsuario}</span>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
