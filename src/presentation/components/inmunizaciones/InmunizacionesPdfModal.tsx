import { useState } from 'react'
import { Download, Printer, X, Syringe } from 'lucide-react'
import type {
  InmunizacionVacuna,
  InmunizacionesDocument,
} from '@/domain/inmunizaciones/types'

interface Props {
  doc: InmunizacionesDocument
  onClose: () => void
}

function dash(value: string) {
  return value.trim() || '—'
}

function formatFecha(value: string) {
  if (!value) return '— / — / —'
  const [y, m, d] = value.split('-')
  if (!y || !m || !d) return value
  return `${y} / ${m} / ${d}`
}

function PdfVacunasTable({ vacunas }: { vacunas: InmunizacionVacuna[] }) {
  return (
    <table className="pdf-table inm-pdf-table">
      <thead>
        <tr>
          <th>Vacunas</th>
          <th>Dosis</th>
          <th>Fecha (aaaa / mm / dd)</th>
          <th>Lote</th>
          <th>Esquema completo</th>
          <th>Responsable</th>
          <th>Establecimiento</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {vacunas.map((vacuna) =>
          vacuna.dosis.map((dosis, index) => (
            <tr key={`${vacuna.id}-${index}`}>
              {index === 0 && (
                <td rowSpan={vacuna.dosis.length}>
                  {dash(vacuna.nombre || '________________')}
                </td>
              )}
              <td>{dosis.etiqueta}</td>
              <td>{formatFecha(dosis.fecha)}</td>
              <td>{dash(dosis.lote)}</td>
              <td className="inm-pdf-check">{dosis.esquemaCompleto ? 'X' : ''}</td>
              <td>{dash(dosis.responsable)}</td>
              <td>{dash(dosis.establecimiento)}</td>
              <td>{dash(dosis.observaciones)}</td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  )
}

export function InmunizacionesPdfModal({ doc, onClose }: Props) {
  const [downloading, setDownloading] = useState(false)
  const a = doc.seccionA

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
            <Syringe size={20} className="text-primary" />
            <div>
              <h2>Vista previa — Registro de Inmunizaciones</h2>
              <span>
                {a.primerApellido} {a.primerNombre || 'Paciente sin nombre'}
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
            <button type="button" className="btn btn--icon" onClick={onClose} title="Cerrar">
              <X size={18} />
            </button>
          </div>
        </header>

        <main className="pdf-modal-body">
          <div className="pdf-printable-area">
            <article className="pdf-page-sheet inm-pdf-sheet">
              <header className="pdf-cert-banner">
                <h2>REGISTRO DE INMUNIZACIONES</h2>
              </header>

              <section className="pdf-sec">
                <div className="pdf-sec-title">
                  A. DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO
                </div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>Institución / Empresa</th>
                      <th>RUC</th>
                      <th>CIIU</th>
                      <th>Establecimiento de Salud</th>
                      <th>Nº HC</th>
                      <th>Nº Archivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dash(a.institucionEmpresa)}</td>
                      <td>{dash(a.ruc)}</td>
                      <td>{dash(a.ciiu)}</td>
                      <td>{dash(a.establecimientoSalud)}</td>
                      <td>{dash(a.numeroHistoriaClinica)}</td>
                      <td>{dash(a.numeroArchivo)}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="pdf-table" style={{ marginTop: '-1px' }}>
                  <thead>
                    <tr>
                      <th>Primer Apellido</th>
                      <th>Segundo Apellido</th>
                      <th>Primer Nombre</th>
                      <th>Segundo Nombre</th>
                      <th>Sexo</th>
                      <th>Cargo / Ocupación</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dash(a.primerApellido)}</td>
                      <td>{dash(a.segundoApellido)}</td>
                      <td>{dash(a.primerNombre)}</td>
                      <td>{dash(a.segundoNombre)}</td>
                      <td>{dash(a.sexo)}</td>
                      <td>{dash(a.cargoOcupacion)}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="pdf-sec">
                <div className="pdf-sec-title">B. INMUNIZACIONES</div>
                <PdfVacunasTable vacunas={doc.vacunasBase} />
              </section>

              <section className="pdf-sec">
                <div className="pdf-sec-title">
                  INMUNIZACIONES DE ACUERDO AL TIPO DE EMPRESA Y RIESGO
                </div>
                <PdfVacunasTable vacunas={doc.vacunasRiesgo} />
                <p className="inm-pdf-note">
                  La vacuna contra la Fiebre Amarilla es obligatoria para quien viva o se
                  desplace en la Región Amazónica, su aplicación es hasta los 59 años de
                  edad.
                </p>
              </section>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
