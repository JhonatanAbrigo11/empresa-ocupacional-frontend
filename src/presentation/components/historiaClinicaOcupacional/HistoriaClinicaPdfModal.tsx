import { useRef, useState } from 'react'
import { Download, Printer, X, FileText, Check, ShieldCheck } from 'lucide-react'
import type { HistoriaClinicaOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/types'
import { EXAMEN_FISICO_ESTRUCTURA } from './defaults'

interface HistoriaClinicaPdfModalProps {
  doc: HistoriaClinicaOcupacionalDocument
  onClose: () => void
}

export function HistoriaClinicaPdfModal({ doc, onClose }: HistoriaClinicaPdfModalProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPdf = () => {
    setDownloading(true)
    // Trigger browser print to PDF engine with native high fidelity
    setTimeout(() => {
      window.print()
      setDownloading(false)
    }, 300)
  }

  const a = doc.hoja1.seccionA
  const b = doc.hoja1.seccionB
  const c = doc.hoja1.seccionC
  const d = doc.hoja1.seccionD
  const e = doc.hoja1.seccionE
  const f = doc.hoja1.seccionF

  const h = doc.hoja3.seccionH
  const i = doc.hoja3.seccionI
  const j = doc.hoja3.seccionJ
  const k = doc.hoja3.seccionK
  const l = doc.hoja3.seccionL
  const m = doc.hoja3.seccionM
  const n = doc.hoja3.seccionN
  const o = doc.hoja3.seccionO
  const p = doc.hoja3.seccionP

  // Risk Categories for Sheet 2
  const categoriasRiesgo = [
    { key: 'FISICO', title: 'FÍSICO' },
    { key: 'LOCATIVO', title: 'DE SEGURIDAD / LOCATIVO / MECÁNICOS' },
    { key: 'ELECTRICO', title: 'ELÉCTRICO' },
    { key: 'OTROS', title: 'OTROS DE SEGURIDAD' },
    { key: 'QUIMICO', title: 'QUÍMICO' },
    { key: 'BIOLOGICO', title: 'BIOLÓGICO' },
    { key: 'ERGONOMICO', title: 'ERGONÓMICO' },
    { key: 'PSICOSOCIAL', title: 'PSICOSOCIAL' },
  ] as const

  return (
    <div className="pdf-modal-overlay" role="dialog" aria-modal="true">
      <div className="pdf-modal-container">
        {/* Top Control Header */}
        <header className="pdf-modal-header">
          <div className="pdf-modal-header__info">
            <FileText size={20} className="text-primary" />
            <div>
              <h2>Vista Previa del Documento PDF</h2>
              <span>Historia Clínica Ocupacional · {a.primerApellido} {a.primerNombre}</span>
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

        {/* Scrollable Document Container showing 3 A4 Printable Sheets */}
        <main className="pdf-modal-body">
          <div ref={printRef} className="pdf-printable-area">
            {/* HOJA 1 DE 3 */}
            <article className="pdf-page-sheet pdf-page-sheet--1">
              <header className="pdf-sheet-header">
                <h3>FORMULARIO DE EVALUACIÓN MÉDICA OCUPACIONAL</h3>
                <span className="pdf-page-tag">HOJA 1 DE 3</span>
              </header>

              {/* SECCIÓN A */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">A. DATOS DEL ESTABLECIMIENTO - DATOS DEL USUARIO</div>
                <table className="pdf-table pdf-table--tight">
                  <tbody>
                    <tr>
                      <td colSpan={2}><strong>INSTITUCIÓN DEL SISTEMA:</strong> {a.institucionSistema || '—'}</td>
                      <td><strong>RUC:</strong> {a.ruc || '—'}</td>
                      <td><strong>CIIU:</strong> {a.ciiu || '—'}</td>
                      <td colSpan={2}><strong>ESTABLECIMIENTO:</strong> {a.establecimiento || '—'}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}><strong>NÚMERO DE HISTORIA CLÍNICA:</strong> {a.numHistoriaClinica || '—'}</td>
                      <td colSpan={3}><strong>NÚMERO DE ARCHIVO:</strong> {a.numArchivo || '—'}</td>
                    </tr>
                    <tr>
                      <td><strong>1er APELLIDO:</strong> {a.primerApellido}</td>
                      <td><strong>2do APELLIDO:</strong> {a.segundoApellido}</td>
                      <td><strong>1er NOMBRE:</strong> {a.primerNombre}</td>
                      <td colSpan={3}><strong>2do NOMBRE:</strong> {a.segundoNombre}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <strong>ATENCIÓN PRIORITARIA:</strong><br />
                        {[
                          a.atencionPrioritaria.embarazada && 'Embarazada',
                          a.atencionPrioritaria.discapacidad && 'Discapacidad',
                          a.atencionPrioritaria.enfermedadCatastrofica && 'E. Catastrófica',
                          a.atencionPrioritaria.lactancia && 'Lactancia',
                          a.atencionPrioritaria.adultoMayor && 'Adulto Mayor',
                        ].filter(Boolean).join(', ') || 'Ninguna'}
                      </td>
                      <td><strong>SEXO:</strong> {a.sexo ? a.sexo.toUpperCase() : '—'}</td>
                      <td><strong>FECHA NAC.:</strong> {a.fechaNacimientoAño}/{a.fechaNacimientoMes}/{a.fechaNacimientoDia} ({a.edad} años)</td>
                      <td><strong>GRUPO SANG.:</strong> {a.grupoSanguineo || '—'}</td>
                      <td><strong>LATERALIDAD:</strong> {a.lateralidad || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN B */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">B. MOTIVO DE CONSULTA</div>
                <table className="pdf-table pdf-table--tight">
                  <tbody>
                    <tr>
                      <td colSpan={3}><strong>PUESTO DE TRABAJO CIUO:</strong> {b.puestoTrabajoCiuo || '—'}</td>
                      <td><strong>FECHA ATENCIÓN:</strong> {b.fechaAtencion || '—'}</td>
                      <td colSpan={2}><strong>F. INGRESO:</strong> {b.fechaIngresoTrabajo || '—'}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}><strong>F. REINTEGRO:</strong> {b.fechaReintegroTrabajo || '—'}</td>
                      <td colSpan={2}><strong>F. ÚLTIMO DÍA LABORAL:</strong> {b.fechaUltimoDiaLaboral || '—'}</td>
                      <td colSpan={2}>
                        <strong>EVALUACIÓN:</strong>{' '}
                        <span className="pdf-badge pdf-badge--primary">{b.tipoEvaluacion || '—'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={6}><strong>OBSERVACIÓN:</strong> {b.observacionMotivo || 'Sin observaciones.'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN C */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">C. ANTECEDENTES PERSONALES</div>
                <table className="pdf-table pdf-table--tight">
                  <tbody>
                    <tr>
                      <td colSpan={6}><strong>ANTECEDENTES CLÍNICOS Y QUIRÚRGICOS:</strong> {c.antecedentesClinicosQuirurgicos || 'No refiere.'}</td>
                    </tr>
                    <tr>
                      <td colSpan={6}><strong>ANTECEDENTES FAMILIARES:</strong> {c.antecedentesFamiliares || 'No refiere.'}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}><strong>TRANSFUSIONES AUTORIZA:</strong> {c.condicionEspecialUrgencia.requiereTransfusiones || '—'}</td>
                      <td colSpan={3}>
                        <strong>TRATAMIENTO HORMONAL:</strong> {c.condicionEspecialUrgencia.tratamientoHormonal || 'NO'}{' '}
                        {c.condicionEspecialUrgencia.tratamientoHormonalCual && `(${c.condicionEspecialUrgencia.tratamientoHormonalCual})`}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={6}>
                        <strong>GINECO OBSTÉTRICOS / REPRODUCTIVOS:</strong> FUM: {c.ginecoObstetricos.fum || 'N/A'} | Gestas: {c.ginecoObstetricos.gestas} | Partos: {c.ginecoObstetricos.partos} | Cesáreas: {c.ginecoObstetricos.cesareas} | Abortos: {c.ginecoObstetricos.abortos} | Planificación: {c.ginecoObstetricos.planificacionFamiliar || 'NO'}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}><strong>CONSUMO TABACO:</strong> {c.consumoSustancias.tabaco.noConsume ? 'No consume' : `${c.consumoSustancias.tabaco.tiempoConsumoMeses} meses`}</td>
                      <td colSpan={2}><strong>CONSUMO ALCOHOL:</strong> {c.consumoSustancias.alcohol.noConsume ? 'No consume' : `${c.consumoSustancias.alcohol.tiempoConsumoMeses} meses`}</td>
                      <td colSpan={2}><strong>ESTILO DE VIDA:</strong> {c.estiloDeVida.actividadFisicaCual || 'Sedentario'} ({c.estiloDeVida.actividadFisicaTiempo || '—'})</td>
                    </tr>
                    <tr>
                      <td colSpan={6}><strong>CONDICIÓN PREEXISTENTE / MEDICACIÓN:</strong> {c.condicionPreexistente.cual || 'Ninguna'} · Medicación: {c.condicionPreexistente.medicacionHabitual || 'Ninguna'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN D */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">D. ENFERMEDAD O PROBLEMA ACTUAL</div>
                <div className="pdf-box-content">{d.descripcionEnfermedadActual || 'Paciente asintomático.'}</div>
              </section>

              {/* SECCIÓN E */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">E. CONSTANTES VITALES Y ANTROPOMETRÍA</div>
                <table className="pdf-table pdf-table--center">
                  <thead>
                    <tr>
                      <th>TEMP (°C)</th>
                      <th>P. ARTERIAL</th>
                      <th>F. CARD (Lat/min)</th>
                      <th>F. RESP (fr/min)</th>
                      <th>SAT O2 (%)</th>
                      <th>PESO (Kg)</th>
                      <th>TALLA (cm)</th>
                      <th>IMC (kg/m²)</th>
                      <th>PER. ABD (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{e.temperatura || '—'}</td>
                      <td>{e.presionArterial || '—'}</td>
                      <td>{e.frecuenciaCardiaca || '—'}</td>
                      <td>{e.frecuenciaRespiratoria || '—'}</td>
                      <td>{e.saturacionOxigeno || '—'}</td>
                      <td>{e.peso || '—'}</td>
                      <td>{e.talla || '—'}</td>
                      <td><strong>{e.imc || '—'}</strong></td>
                      <td>{e.perimetroAbdominal || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN F */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">F. EXAMEN FÍSICO REGIONAL</div>
                <div className="pdf-regional-grid">
                  {EXAMEN_FISICO_ESTRUCTURA.map((group) => (
                    <div key={group.region} className="pdf-reg-box">
                      <strong>{group.region}</strong>
                      <div className="pdf-reg-items">
                        {group.items.map((item) => {
                          const isPat = f.regiones[item.id] ?? false
                          return (
                            <span key={item.id} className={isPat ? 'pdf-pat' : ''}>
                              [{isPat ? 'X' : '  '}] {item.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pdf-box-content" style={{ marginTop: '4px' }}>
                  <strong>OBSERVACIÓN EXAMEN FÍSICO:</strong> {f.observacionExamenFisico || 'Sin hallazgos patológicos relevantes.'}
                </div>
              </section>
            </article>

            {/* HOJA 2 DE 3 */}
            <article className="pdf-page-sheet pdf-page-sheet--2">
              <header className="pdf-sheet-header">
                <h3>G. FACTORES DE RIESGO DEL TRABAJO ACTUAL</h3>
                <span className="pdf-page-tag">HOJA 2 DE 3</span>
              </header>

              <table className="pdf-table pdf-risk-matrix">
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>PUESTO DE TRABAJO →</th>
                    {doc.hoja2.puestos.map((puesto, idx) => (
                      <th key={idx} style={{ textTransform: 'uppercase', fontSize: '8px' }}>
                        {idx + 1}. {puesto.split(':')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categoriasRiesgo.map((cat) => {
                    const riesgosCat = doc.hoja2.riesgos.filter((r) => r.categoria === cat.key)
                    if (riesgosCat.length === 0) return null
                    return (
                      <template key={cat.key}>
                        <tr className="pdf-cat-row">
                          <td colSpan={8}><strong>{cat.title}</strong></td>
                        </tr>
                        {riesgosCat.map((riesgo) => (
                          <tr key={riesgo.id}>
                            <td className="pdf-risk-label">
                              {riesgo.nombre} {riesgo.otrosDetalle ? `(${riesgo.otrosDetalle})` : ''}
                            </td>
                            {riesgo.puestos.map((checked, pIdx) => (
                              <td key={pIdx} className="pdf-risk-cell">
                                {checked ? <strong className="pdf-mark-x">X</strong> : '·'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </template>
                    )
                  })}
                  <tr className="pdf-cat-row">
                    <td colSpan={8}><strong>MEDIDAS PREVENTIVAS POR PUESTO DE TRABAJO</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Medidas Recomendadas</strong></td>
                    {doc.hoja2.medidasPreventivas.map((medida, idx) => (
                      <td key={idx} className="pdf-medida-text">
                        {medida || '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </article>

            {/* HOJA 3 DE 3 */}
            <article className="pdf-page-sheet pdf-page-sheet--3">
              <header className="pdf-sheet-header">
                <h3>HISTORIA CLÍNICA OCUPACIONAL - DICTAMEN &amp; APTITUD</h3>
                <span className="pdf-page-tag">HOJA 3 DE 3</span>
              </header>

              {/* SECCIÓN H */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">H. ACTIVIDAD LABORAL / INCIDENTES / ACCIDENTES / ENFERMEDADES OCUPACIONALES</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>CENTRO DE TRABAJO</th>
                      <th>ACTIVIDADES</th>
                      <th>TIPO</th>
                      <th>TIEMPO</th>
                      <th>INCIDENTE / ACCIDENTE / ENF</th>
                      <th>CALIFICADO IESS</th>
                      <th>OBSERVACIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {h.antecedentesLaborales.map((item) => (
                      <tr key={item.id}>
                        <td>{item.centroTrabajo || '—'}</td>
                        <td>{item.actividades || '—'}</td>
                        <td>{item.tipoTrabajo}</td>
                        <td>{item.tiempoTrabajo || '—'}</td>
                        <td>
                          {[item.incidente && 'Incidente', item.accidente && 'Accidente', item.enfermedadProfesional && 'Enfermedad Prof.'].filter(Boolean).join(', ') || 'Ninguno'}
                        </td>
                        <td>{item.calificadoIess} {item.fechaCalificacion && `(${item.fechaCalificacion})`}</td>
                        <td>{item.observaciones || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN I */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">I. ACTIVIDADES EXTRA LABORALES</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>TIPO DE ACTIVIDAD</th>
                      <th>DESCRIPCIÓN</th>
                      <th>FECHA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {i.actividadesExtraLaborales.map((item) => (
                      <tr key={item.id}>
                        <td>{item.tipoActividad || '—'}</td>
                        <td>{item.descripcion || '—'}</td>
                        <td>{item.fecha || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN J */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">J. RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>NOMBRE DEL EXAMEN</th>
                      <th>FECHA</th>
                      <th>RESULTADOS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {j.examenesResultados.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombreExamen || '—'}</td>
                        <td>{item.fecha || '—'}</td>
                        <td>{item.resultados || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {j.observaciones && <div className="pdf-box-content"><strong>OBSERVACIONES EXÁMENES:</strong> {j.observaciones}</div>}
              </section>

              {/* SECCIÓN K */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">K. DIAGNÓSTICO</div>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th style={{ width: '10%' }}>CIE-10</th>
                      <th style={{ width: '70%' }}>DESCRIPCIÓN</th>
                      <th style={{ width: '20%' }}>TIPO (PRE / DEF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {k.diagnosticos.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.cie10 || '—'}</strong></td>
                        <td>{item.descripcion || '—'}</td>
                        <td>{item.tipo === 'PRE' ? 'PRESUNTIVO' : 'DEFINITIVO'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* SECCIÓN L */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">L. APTITUD MÉDICA PARA EL TRABAJO</div>
                <div className="pdf-aptitud-box">
                  <div className="pdf-aptitud-stamp">
                    <ShieldCheck size={20} />
                    <span>CONCEPTO DE APTITUD OCUPACIONAL:</span>
                    <strong>{l.aptitud || 'APTO'}</strong>
                  </div>
                  <p><strong>OBSERVACIONES DE APTITUD:</strong> {l.observaciones || 'Sin observaciones.'}</p>
                </div>
              </section>

              {/* SECCIÓN M */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">M. RECOMENDACIONES Y/O TRATAMIENTO</div>
                <div className="pdf-box-content">{m.descripcion || 'Sin recomendaciones adicionales.'}</div>
              </section>

              {/* SECCIÓN N */}
              <section className="pdf-sec">
                <div className="pdf-sec-title">N. RETIRO (EVALUACIÓN)</div>
                <div className="pdf-box-content">
                  Evaluación de retiro realizada: <strong>{n.realizaEvaluacion || 'NO'}</strong> · Condición de salud relacionada con el trabajo: <strong>{n.condicionRelacionadaTrabajo || 'NO'}</strong><br />
                  Observación: {n.observacion || 'N/A'}
                </div>
              </section>

              {/* SECCIONES O Y P - FIRMAS */}
              <section className="pdf-signatures-grid">
                <div className="pdf-sig-box">
                  <div className="pdf-sig-title">O. DATOS DEL PROFESIONAL</div>
                  <div className="pdf-sig-line">
                    <div className="pdf-sig-stamp">{o.firmaSello || 'Firma & Sello Médico'}</div>
                  </div>
                  <strong>{o.nombresApellidosProf || 'Dr. Médico Ocupacional'}</strong>
                  <span>Código Médico: {o.codigoMedico || 'MSP-XXXX'}</span>
                </div>

                <div className="pdf-sig-box">
                  <div className="pdf-sig-title">P. FIRMA DEL TRABAJADOR</div>
                  <div className="pdf-sig-line">
                    <div className="pdf-sig-stamp">{p.firma || 'Firma Trabajador'}</div>
                  </div>
                  <strong>{p.nombresApellidosTrab || `${a.primerNombre} ${a.primerApellido}`}</strong>
                  <span>C.I. {p.cedula || '17XXXXXXXX'}</span>
                </div>
              </section>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}
