import type {
  ActividadExtraLaboralItem,
  AntecedenteLaboralItem,
  DiagnosticoCieItem,
  ExamenResultadoItem,
  Hoja3Data,
} from '@/domain/historiaClinicaOcupacional/types'
import { Plus, Trash2 } from 'lucide-react'

interface Hoja3FormProps {
  value: Hoja3Data
  onChange: (value: Hoja3Data) => void
}

export function Hoja3Form({ value, onChange }: Hoja3FormProps) {
  // --- Section H handlers ---
  const updateAntecedenteLaboral = (id: string, fields: Partial<AntecedenteLaboralItem>) => {
    const updated = value.seccionH.antecedentesLaborales.map((item) =>
      item.id === id ? { ...item, ...fields } : item,
    )
    onChange({
      ...value,
      seccionH: { ...value.seccionH, antecedentesLaborales: updated },
    })
  }

  const addAntecedenteLaboral = () => {
    const newItem: AntecedenteLaboralItem = {
      id: `ant_${Date.now()}`,
      centroTrabajo: '',
      actividades: '',
      tipoTrabajo: 'ANTERIOR',
      tiempoTrabajo: '',
      incidente: false,
      accidente: false,
      enfermedadProfesional: false,
      calificadoIess: 'NO',
      fechaCalificacion: '',
      especificarIess: '',
      observaciones: '',
    }
    onChange({
      ...value,
      seccionH: {
        ...value.seccionH,
        antecedentesLaborales: [...value.seccionH.antecedentesLaborales, newItem],
      },
    })
  }

  const removeAntecedenteLaboral = (id: string) => {
    onChange({
      ...value,
      seccionH: {
        ...value.seccionH,
        antecedentesLaborales: value.seccionH.antecedentesLaborales.filter((i) => i.id !== id),
      },
    })
  }

  // --- Section I handlers ---
  const updateActividadExtra = (id: string, fields: Partial<ActividadExtraLaboralItem>) => {
    const updated = value.seccionI.actividadesExtraLaborales.map((item) =>
      item.id === id ? { ...item, ...fields } : item,
    )
    onChange({
      ...value,
      seccionI: { ...value.seccionI, actividadesExtraLaborales: updated },
    })
  }

  const addActividadExtra = () => {
    const newItem: ActividadExtraLaboralItem = {
      id: `ext_${Date.now()}`,
      tipoActividad: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
    }
    onChange({
      ...value,
      seccionI: {
        ...value.seccionI,
        actividadesExtraLaborales: [...value.seccionI.actividadesExtraLaborales, newItem],
      },
    })
  }

  const removeActividadExtra = (id: string) => {
    onChange({
      ...value,
      seccionI: {
        ...value.seccionI,
        actividadesExtraLaborales: value.seccionI.actividadesExtraLaborales.filter((i) => i.id !== id),
      },
    })
  }

  // --- Section J handlers ---
  const updateExamenResultado = (id: string, fields: Partial<ExamenResultadoItem>) => {
    const updated = value.seccionJ.examenesResultados.map((item) =>
      item.id === id ? { ...item, ...fields } : item,
    )
    onChange({
      ...value,
      seccionJ: { ...value.seccionJ, examenesResultados: updated },
    })
  }

  const addExamenResultado = () => {
    const newItem: ExamenResultadoItem = {
      id: `ex_${Date.now()}`,
      nombreExamen: '',
      fecha: new Date().toISOString().split('T')[0],
      resultados: '',
    }
    onChange({
      ...value,
      seccionJ: {
        ...value.seccionJ,
        examenesResultados: [...value.seccionJ.examenesResultados, newItem],
      },
    })
  }

  const removeExamenResultado = (id: string) => {
    onChange({
      ...value,
      seccionJ: {
        ...value.seccionJ,
        examenesResultados: value.seccionJ.examenesResultados.filter((i) => i.id !== id),
      },
    })
  }

  // --- Section K handlers ---
  const updateDiagnostico = (id: string, fields: Partial<DiagnosticoCieItem>) => {
    const updated = value.seccionK.diagnosticos.map((item) =>
      item.id === id ? { ...item, ...fields } : item,
    )
    onChange({
      ...value,
      seccionK: { ...value.seccionK, diagnosticos: updated },
    })
  }

  const addDiagnostico = () => {
    const newItem: DiagnosticoCieItem = {
      id: `diag_${Date.now()}`,
      cie10: '',
      descripcion: '',
      tipo: 'PRE',
    }
    onChange({
      ...value,
      seccionK: {
        ...value.seccionK,
        diagnosticos: [...value.seccionK.diagnosticos, newItem],
      },
    })
  }

  const removeDiagnostico = (id: string) => {
    onChange({
      ...value,
      seccionK: {
        ...value.seccionK,
        diagnosticos: value.seccionK.diagnosticos.filter((i) => i.id !== id),
      },
    })
  }

  const h = value.seccionH
  const i = value.seccionI
  const j = value.seccionJ
  const k = value.seccionK
  const l = value.seccionL
  const m = value.seccionM
  const n = value.seccionN
  const o = value.seccionO
  const p = value.seccionP

  return (
    <div className="doc-sheet">
      <div className="doc-banner doc-banner--blue">
        <h2>HISTORIA CLÍNICA OCUPACIONAL - HOJA 3 DE 3</h2>
      </div>

      {/* SECCIÓN H */}
      <fieldset className="doc-section">
        <div className="flex-header">
          <legend className="doc-section__title">
            H. ACTIVIDAD LABORAL / INCIDENTES / ACCIDENTES / ENFERMEDADES OCUPACIONALES
          </legend>
          <button type="button" className="btn btn--ghost btn--sm" onClick={addAntecedenteLaboral}>
            <Plus size={14} /> Agregar Empleo
          </button>
        </div>

        <div className="table-wrap" style={{ marginTop: '0.5rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>CENTRO DE TRABAJO</th>
                <th>ACTIVIDADES QUE DESEMPEÑABA</th>
                <th>TRABAJO</th>
                <th>TIEMPO TRABAJO</th>
                <th>INCIDENTE / ACCIDENTE / ENF</th>
                <th>CALIFICADO POR IESS</th>
                <th>OBSERVACIONES</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {h.antecedentesLaborales.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="Empresa..."
                      value={item.centroTrabajo}
                      onChange={(e) => updateAntecedenteLaboral(item.id, { centroTrabajo: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Puesto / Funciones"
                      value={item.actividades}
                      onChange={(e) => updateAntecedenteLaboral(item.id, { actividades: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={item.tipoTrabajo}
                      onChange={(e) =>
                        updateAntecedenteLaboral(item.id, {
                          tipoTrabajo: e.target.value as AntecedenteLaboralItem['tipoTrabajo'],
                        })
                      }
                    >
                      <option value="ANTERIOR">ANTERIOR</option>
                      <option value="ACTUAL">ACTUAL</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Ej. 2 años"
                      value={item.tiempoTrabajo}
                      onChange={(e) => updateAntecedenteLaboral(item.id, { tiempoTrabajo: e.target.value })}
                    />
                  </td>
                  <td>
                    <div className="checkbox-stack text-xs">
                      <label>
                        <input
                          type="checkbox"
                          checked={item.incidente}
                          onChange={(e) => updateAntecedenteLaboral(item.id, { incidente: e.target.checked })}
                        />
                        Incidente
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.accidente}
                          onChange={(e) => updateAntecedenteLaboral(item.id, { accidente: e.target.checked })}
                        />
                        Accidente
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.enfermedadProfesional}
                          onChange={(e) => updateAntecedenteLaboral(item.id, { enfermedadProfesional: e.target.checked })}
                        />
                        Enfermedad Prof.
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="inline-fields-stack text-xs">
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name={`iess_${item.id}`}
                            checked={item.calificadoIess === 'SI'}
                            onChange={() => updateAntecedenteLaboral(item.id, { calificadoIess: 'SI' })}
                          />
                          SI
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`iess_${item.id}`}
                            checked={item.calificadoIess === 'NO'}
                            onChange={() => updateAntecedenteLaboral(item.id, { calificadoIess: 'NO' })}
                          />
                          NO
                        </label>
                      </div>
                      {item.calificadoIess === 'SI' && (
                        <>
                          <input
                            type="date"
                            value={item.fechaCalificacion}
                            onChange={(e) => updateAntecedenteLaboral(item.id, { fechaCalificacion: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Especificar..."
                            value={item.especificarIess}
                            onChange={(e) => updateAntecedenteLaboral(item.id, { especificarIess: e.target.value })}
                          />
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.observaciones}
                      onChange={(e) => updateAntecedenteLaboral(item.id, { observaciones: e.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--icon btn--danger"
                      onClick={() => removeAntecedenteLaboral(item.id)}
                      title="Eliminar fila"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>

      {/* SECCIÓN I */}
      <fieldset className="doc-section">
        <div className="flex-header">
          <legend className="doc-section__title">I. ACTIVIDADES EXTRA LABORALES</legend>
          <button type="button" className="btn btn--ghost btn--sm" onClick={addActividadExtra}>
            <Plus size={14} /> Agregar Actividad
          </button>
        </div>

        <div className="table-wrap" style={{ marginTop: '0.5rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>TIPO DE ACTIVIDAD</th>
                <th>DESCRIPCIÓN</th>
                <th>FECHA (aaaa/mm/dd)</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {i.actividadesExtraLaborales.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="Deporte, manualidades, etc."
                      value={item.tipoActividad}
                      onChange={(e) => updateActividadExtra(item.id, { tipoActividad: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Frecuencia / Detalle"
                      value={item.descripcion}
                      onChange={(e) => updateActividadExtra(item.id, { descripcion: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={item.fecha}
                      onChange={(e) => updateActividadExtra(item.id, { fecha: e.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--icon btn--danger"
                      onClick={() => removeActividadExtra(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>

      {/* SECCIÓN J */}
      <fieldset className="doc-section">
        <div className="flex-header">
          <legend className="doc-section__title">
            J. RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS DE ACUERDO AL RIESGO Y PUESTO DE TRABAJO (IMAGEN, LABORATORIO Y OTROS)
          </legend>
          <button type="button" className="btn btn--ghost btn--sm" onClick={addExamenResultado}>
            <Plus size={14} /> Agregar Examen
          </button>
        </div>

        <div className="table-wrap" style={{ marginTop: '0.5rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>NOMBRE DEL EXAMEN</th>
                <th>FECHA (aaaa/mm/dd)</th>
                <th>RESULTADOS</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {j.examenesResultados.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="Ej. Biometría hemática"
                      value={item.nombreExamen}
                      onChange={(e) => updateExamenResultado(item.id, { nombreExamen: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={item.fecha}
                      onChange={(e) => updateExamenResultado(item.id, { fecha: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Resultados / Hallazgos"
                      value={item.resultados}
                      onChange={(e) => updateExamenResultado(item.id, { resultados: e.target.value })}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--icon btn--danger"
                      onClick={() => removeExamenResultado(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>OBSERVACIONES DE EXÁMENES</span>
          <textarea
            rows={2}
            value={j.observaciones}
            onChange={(e) =>
              onChange({
                ...value,
                seccionJ: { ...j, observaciones: e.target.value },
              })
            }
          />
        </div>
      </fieldset>

      {/* SECCIÓN K */}
      <fieldset className="doc-section">
        <div className="flex-header">
          <legend className="doc-section__title">K. DIAGNÓSTICO (PRE: PRESUNTIVO / DEF: DEFINITIVO)</legend>
          <button type="button" className="btn btn--ghost btn--sm" onClick={addDiagnostico}>
            <Plus size={14} /> Agregar Diagnóstico
          </button>
        </div>

        <div className="table-wrap" style={{ marginTop: '0.5rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>CÓDIGO CIE-10</th>
                <th>DESCRIPCIÓN</th>
                <th>TIPO (PRE / DEF)</th>
                <th style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {k.diagnosticos.map((item, index) => (
                <tr key={item.id}>
                  <td><strong>{index + 1}</strong></td>
                  <td>
                    <input
                      type="text"
                      placeholder="CIE-10"
                      style={{ textTransform: 'uppercase' }}
                      value={item.cie10}
                      onChange={(e) => updateDiagnostico(item.id, { cie10: e.target.value.toUpperCase() })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Descripción del diagnóstico"
                      value={item.descripcion}
                      onChange={(e) => updateDiagnostico(item.id, { descripcion: e.target.value })}
                    />
                  </td>
                  <td>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={`diag_tipo_${item.id}`}
                          checked={item.tipo === 'PRE'}
                          onChange={() => updateDiagnostico(item.id, { tipo: 'PRE' })}
                        />
                        PRE
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name={`diag_tipo_${item.id}`}
                          checked={item.tipo === 'DEF'}
                          onChange={() => updateDiagnostico(item.id, { tipo: 'DEF' })}
                        />
                        DEF
                      </label>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--icon btn--danger"
                      onClick={() => removeDiagnostico(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>

      {/* SECCIÓN L */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">L. APTITUD MÉDICA PARA EL TRABAJO</legend>
        <div className="radio-group radio-group--aptitud">
          {(
            [
              { id: 'APTO', label: 'APTO', badgeClass: 'aptitud-pill--ok' },
              { id: 'APTO EN OBSERVACIÓN', label: 'APTO EN OBSERVACIÓN', badgeClass: 'aptitud-pill--obs' },
              { id: 'APTO CON LIMITACIONES', label: 'APTO CON LIMITACIONES', badgeClass: 'aptitud-pill--lim' },
              { id: 'NO APTO', label: 'NO APTO', badgeClass: 'aptitud-pill--no' },
            ] as const
          ).map((item) => (
            <label
              key={item.id}
              className={`aptitud-tile ${l.aptitud === item.id ? 'aptitud-tile--active' : ''}`}
            >
              <input
                type="radio"
                name="aptitudMedica"
                checked={l.aptitud === item.id}
                onChange={() =>
                  onChange({
                    ...value,
                    seccionL: { ...l, aptitud: item.id },
                  })
                }
              />
              <span className={`aptitud-badge ${item.badgeClass}`}>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="field field--full" style={{ marginTop: '0.85rem' }}>
          <span>OBSERVACIONES DE APTITUD</span>
          <textarea
            rows={2}
            value={l.observaciones}
            onChange={(e) =>
              onChange({
                ...value,
                seccionL: { ...l, observaciones: e.target.value },
              })
            }
          />
        </div>
      </fieldset>

      {/* SECCIÓN M */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">M. RECOMENDACIONES Y/O TRATAMIENTO</legend>
        <div className="field field--full">
          <span>Descripción de Recomendaciones Médicas / Tratamiento Ocupacional</span>
          <textarea
            rows={3}
            value={m.descripcion}
            onChange={(e) =>
              onChange({
                ...value,
                seccionM: { descripcion: e.target.value },
              })
            }
          />
        </div>
      </fieldset>

      {/* SECCIÓN N */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">N. RETIRO (evaluación)</legend>
        <div className="doc-grid doc-grid--2">
          <div className="inline-options">
            <span>SE REALIZA LA EVALUACIÓN:</span>
            <label className="radio-label">
              <input
                type="radio"
                name="retiroEval"
                checked={n.realizaEvaluacion === 'SI'}
                onChange={() =>
                  onChange({
                    ...value,
                    seccionN: { ...n, realizaEvaluacion: 'SI' },
                  })
                }
              />
              SI
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="retiroEval"
                checked={n.realizaEvaluacion === 'NO'}
                onChange={() =>
                  onChange({
                    ...value,
                    seccionN: { ...n, realizaEvaluacion: 'NO' },
                  })
                }
              />
              NO
            </label>
          </div>

          <div className="inline-options">
            <span>LA CONDICIÓN DE SALUD ESTÁ RELACIONADA CON EL TRABAJO:</span>
            <label className="radio-label">
              <input
                type="radio"
                name="retiroSalud"
                checked={n.condicionRelacionadaTrabajo === 'SI'}
                onChange={() =>
                  onChange({
                    ...value,
                    seccionN: { ...n, condicionRelacionadaTrabajo: 'SI' },
                  })
                }
              />
              SI
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="retiroSalud"
                checked={n.condicionRelacionadaTrabajo === 'NO'}
                onChange={() =>
                  onChange({
                    ...value,
                    seccionN: { ...n, condicionRelacionadaTrabajo: 'NO' },
                  })
                }
              />
              NO
            </label>
          </div>
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>Observación de Retiro</span>
          <textarea
            rows={2}
            value={n.observacion}
            onChange={(e) =>
              onChange({
                ...value,
                seccionN: { ...n, observacion: e.target.value },
              })
            }
          />
        </div>
      </fieldset>

      {/* SECCIONES O & P - FIRMAS */}
      <div className="doc-grid doc-grid--2" style={{ marginTop: '1.25rem' }}>
        <fieldset className="doc-section">
          <legend className="doc-section__title">O. DATOS DEL PROFESIONAL</legend>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>NOMBRES Y APELLIDOS DEL PROFESIONAL</span>
            <input
              type="text"
              value={o.nombresApellidosProf}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionO: { ...o, nombresApellidosProf: e.target.value },
                })
              }
            />
          </div>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>CÓDIGO MÉDICO</span>
            <input
              type="text"
              value={o.codigoMedico}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionO: { ...o, codigoMedico: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <span>FIRMA Y SELLO</span>
            <textarea
              rows={2}
              value={o.firmaSello}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionO: { ...o, firmaSello: e.target.value },
                })
              }
            />
          </div>
        </fieldset>

        <fieldset className="doc-section">
          <legend className="doc-section__title">P. FIRMA DEL TRABAJADOR</legend>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>NOMBRES Y APELLIDOS DEL TRABAJADOR</span>
            <input
              type="text"
              value={p.nombresApellidosTrab}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionP: { ...p, nombresApellidosTrab: e.target.value },
                })
              }
            />
          </div>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>CÉDULA DE IDENTIDAD</span>
            <input
              type="text"
              value={p.cedula}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionP: { ...p, cedula: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <span>FIRMA</span>
            <textarea
              rows={2}
              value={p.firma}
              onChange={(e) =>
                onChange({
                  ...value,
                  seccionP: { ...p, firma: e.target.value },
                })
              }
            />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
