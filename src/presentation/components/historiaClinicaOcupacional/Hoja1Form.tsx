import type { Hoja1Data } from '@/domain/historiaClinicaOcupacional/types'
import { EXAMEN_FISICO_ESTRUCTURA } from './defaults'

interface Hoja1FormProps {
  value: Hoja1Data
  onChange: (value: Hoja1Data) => void
}

export function Hoja1Form({ value, onChange }: Hoja1FormProps) {
  const updateSeccionA = (fields: Partial<Hoja1Data['seccionA']>) => {
    onChange({
      ...value,
      seccionA: { ...value.seccionA, ...fields },
    })
  }

  const updateAtencionPrioritaria = (field: keyof Hoja1Data['seccionA']['atencionPrioritaria'], val: boolean) => {
    onChange({
      ...value,
      seccionA: {
        ...value.seccionA,
        atencionPrioritaria: {
          ...value.seccionA.atencionPrioritaria,
          [field]: val,
        },
      },
    })
  }

  const updateSeccionB = (fields: Partial<Hoja1Data['seccionB']>) => {
    onChange({
      ...value,
      seccionB: { ...value.seccionB, ...fields },
    })
  }

  const updateSeccionC = (fields: Partial<Hoja1Data['seccionC']>) => {
    onChange({
      ...value,
      seccionC: { ...value.seccionC, ...fields },
    })
  }

  const updateSeccionD = (fields: Partial<Hoja1Data['seccionD']>) => {
    onChange({
      ...value,
      seccionD: { ...value.seccionD, ...fields },
    })
  }

  const updateSeccionE = (fields: Partial<Hoja1Data['seccionE']>) => {
    const updated = { ...value.seccionE, ...fields }
    // Auto-calculate IMC if peso and talla exist
    const p = parseFloat(updated.peso)
    const t = parseFloat(updated.talla) / 100 // cm to meters
    if (!isNaN(p) && !isNaN(t) && t > 0) {
      updated.imc = (p / (t * t)).toFixed(2)
    }
    onChange({
      ...value,
      seccionE: updated,
    })
  }

  const updateSeccionF = (fields: Partial<Hoja1Data['seccionF']>) => {
    onChange({
      ...value,
      seccionF: { ...value.seccionF, ...fields },
    })
  }

  const toggleRegionItem = (itemId: string) => {
    const current = value.seccionF.regiones[itemId] ?? false
    onChange({
      ...value,
      seccionF: {
        ...value.seccionF,
        regiones: {
          ...value.seccionF.regiones,
          [itemId]: !current,
        },
      },
    })
  }

  const a = value.seccionA
  const b = value.seccionB
  const c = value.seccionC
  const d = value.seccionD
  const e = value.seccionE
  const f = value.seccionF

  return (
    <div className="doc-sheet">
      <div className="doc-banner doc-banner--purple">
        <h2>FORMULARIO DE EVALUACIÓN MÉDICA OCUPACIONAL - HOJA 1 DE 3</h2>
      </div>

      {/* SECCIÓN A */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">A. DATOS DEL ESTABLECIMIENTO - DATOS DEL USUARIO</legend>

        <div className="doc-grid doc-grid--6">
          <div className="field">
            <span>INSTITUCIÓN DEL SISTEMA</span>
            <input
              type="text"
              value={a.institucionSistema}
              onChange={(evt) => updateSeccionA({ institucionSistema: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>RUC</span>
            <input
              type="text"
              value={a.ruc}
              onChange={(evt) => updateSeccionA({ ruc: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>CIIU</span>
            <input
              type="text"
              value={a.ciiu}
              onChange={(evt) => updateSeccionA({ ciiu: evt.target.value })}
            />
          </div>
          <div className="field field--span-2">
            <span>ESTABLECIMIENTO / CENTRO DE TRABAJO</span>
            <input
              type="text"
              value={a.establecimiento}
              onChange={(evt) => updateSeccionA({ establecimiento: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>NÚMERO DE HISTORIA CLINICA</span>
            <input
              type="text"
              value={a.numHistoriaClinica}
              onChange={(evt) => updateSeccionA({ numHistoriaClinica: evt.target.value })}
            />
          </div>
        </div>

        <div className="doc-grid doc-grid--4" style={{ marginTop: '0.75rem' }}>
          <div className="field">
            <span>PRIMER APELLIDO</span>
            <input
              type="text"
              value={a.primerApellido}
              onChange={(evt) => updateSeccionA({ primerApellido: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>SEGUNDO APELLIDO</span>
            <input
              type="text"
              value={a.segundoApellido}
              onChange={(evt) => updateSeccionA({ segundoApellido: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>PRIMER NOMBRE</span>
            <input
              type="text"
              value={a.primerNombre}
              onChange={(evt) => updateSeccionA({ primerNombre: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>SEGUNDO NOMBRE</span>
            <input
              type="text"
              value={a.segundoNombre}
              onChange={(evt) => updateSeccionA({ segundoNombre: evt.target.value })}
            />
          </div>
        </div>

        <div className="doc-grid doc-grid--complex" style={{ marginTop: '0.85rem' }}>
          {/* Atención Prioritaria */}
          <div className="doc-box">
            <span className="doc-box__label">ATENCIÓN PRIORITARIA</span>
            <div className="checkbox-group flex-wrap">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={a.atencionPrioritaria.embarazada}
                  onChange={(e) => updateAtencionPrioritaria('embarazada', e.target.checked)}
                />
                Embarazada
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={a.atencionPrioritaria.discapacidad}
                  onChange={(e) => updateAtencionPrioritaria('discapacidad', e.target.checked)}
                />
                Persona con Discapacidad
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={a.atencionPrioritaria.enfermedadCatastrofica}
                  onChange={(e) => updateAtencionPrioritaria('enfermedadCatastrofica', e.target.checked)}
                />
                E. Catastrófica
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={a.atencionPrioritaria.lactancia}
                  onChange={(e) => updateAtencionPrioritaria('lactancia', e.target.checked)}
                />
                Lactancia
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={a.atencionPrioritaria.adultoMayor}
                  onChange={(e) => updateAtencionPrioritaria('adultoMayor', e.target.checked)}
                />
                Adulto Mayor
              </label>
            </div>
          </div>

          {/* Sexo */}
          <div className="doc-box">
            <span className="doc-box__label">SEXO</span>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="sexo"
                  checked={a.sexo === 'hombre'}
                  onChange={() => updateSeccionA({ sexo: 'hombre' })}
                />
                Hombre
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="sexo"
                  checked={a.sexo === 'mujer'}
                  onChange={() => updateSeccionA({ sexo: 'mujer' })}
                />
                Mujer
              </label>
            </div>
          </div>

          {/* Fecha Nacimiento */}
          <div className="doc-box">
            <span className="doc-box__label">FECHA DE NACIMIENTO</span>
            <div className="inline-fields">
              <input
                type="text"
                placeholder="Año"
                value={a.fechaNacimientoAño}
                onChange={(e) => updateSeccionA({ fechaNacimientoAño: e.target.value })}
              />
              <input
                type="text"
                placeholder="Mes"
                value={a.fechaNacimientoMes}
                onChange={(e) => updateSeccionA({ fechaNacimientoMes: e.target.value })}
              />
              <input
                type="text"
                placeholder="Día"
                value={a.fechaNacimientoDia}
                onChange={(e) => updateSeccionA({ fechaNacimientoDia: e.target.value })}
              />
              <input
                type="text"
                placeholder="Edad"
                style={{ width: '60px' }}
                value={a.edad}
                onChange={(e) => updateSeccionA({ edad: e.target.value })}
              />
            </div>
          </div>

          {/* Grupo Sanguíneo */}
          <div className="doc-box">
            <span className="doc-box__label">GRUPO SANGUÍNEO</span>
            <select
              value={a.grupoSanguineo}
              onChange={(e) => updateSeccionA({ grupoSanguineo: e.target.value })}
            >
              <option value="">Seleccionar</option>
              <option value="O+">O Rh(+)</option>
              <option value="O-">O Rh(-)</option>
              <option value="A+">A Rh(+)</option>
              <option value="A-">A Rh(-)</option>
              <option value="B+">B Rh(+)</option>
              <option value="B-">B Rh(-)</option>
              <option value="AB+">AB Rh(+)</option>
              <option value="AB-">AB Rh(-)</option>
            </select>
          </div>

          {/* Lateralidad */}
          <div className="doc-box">
            <span className="doc-box__label">LATERALIDAD</span>
            <select
              value={a.lateralidad}
              onChange={(e) => updateSeccionA({ lateralidad: e.target.value as Hoja1Data['seccionA']['lateralidad'] })}
            >
              <option value="">Seleccionar</option>
              <option value="diestr@">Diestr@</option>
              <option value="zurd@">Zurd@</option>
              <option value="ambidiestr@">Ambidiestr@</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* SECCIÓN B */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">B. MOTIVO DE CONSULTA</legend>
        <div className="doc-grid doc-grid--4">
          <div className="field field--span-2">
            <span>Puesto de Trabajo CIUO</span>
            <input
              type="text"
              value={b.puestoTrabajoCiuo}
              onChange={(e) => updateSeccionB({ puestoTrabajoCiuo: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Fecha de Atención (aaaa/mm/dd)</span>
            <input
              type="date"
              value={b.fechaAtencion}
              onChange={(e) => updateSeccionB({ fechaAtencion: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Fecha de Ingreso al trabajo</span>
            <input
              type="date"
              value={b.fechaIngresoTrabajo}
              onChange={(e) => updateSeccionB({ fechaIngresoTrabajo: e.target.value })}
            />
          </div>
        </div>

        <div className="doc-grid doc-grid--3" style={{ marginTop: '0.75rem' }}>
          <div className="field">
            <span>Fecha de Reintegro aaaa/mm/dd</span>
            <input
              type="date"
              value={b.fechaReintegroTrabajo}
              onChange={(e) => updateSeccionB({ fechaReintegroTrabajo: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Fecha del Último día laboral/salida</span>
            <input
              type="date"
              value={b.fechaUltimoDiaLaboral}
              onChange={(e) => updateSeccionB({ fechaUltimoDiaLaboral: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Tipo de Evaluacion Ocupacional</span>
            <div className="radio-group radio-group--tiles">
              {(['INGRESO', 'PERIÓDICO', 'REINTEGRO', 'RETIRO'] as const).map((tipo) => (
                <label key={tipo} className={`radio-tile ${b.tipoEvaluacion === tipo ? 'radio-tile--active' : ''}`}>
                  <input
                    type="radio"
                    name="tipoEvaluacion"
                    checked={b.tipoEvaluacion === tipo}
                    onChange={() => updateSeccionB({ tipoEvaluacion: tipo })}
                  />
                  {tipo}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>Observación</span>
          <textarea
            rows={2}
            value={b.observacionMotivo}
            onChange={(e) => updateSeccionB({ observacionMotivo: e.target.value })}
          />
        </div>
      </fieldset>

      {/* SECCIÓN C */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">C. ANTECEDENTES PERSONALES</legend>

        <div className="field field--full">
          <span>ANTECEDENTES CLÍNICOS Y QUIRÚRGICOS (Descripción)</span>
          <textarea
            rows={2}
            value={c.antecedentesClinicosQuirurgicos}
            onChange={(e) => updateSeccionC({ antecedentesClinicosQuirurgicos: e.target.value })}
          />
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>ANTECEDENTES FAMILIARES (Descripción)</span>
          <textarea
            rows={2}
            value={c.antecedentesFamiliares}
            onChange={(e) => updateSeccionC({ antecedentesFamiliares: e.target.value })}
          />
        </div>

        {/* Condición especial para urgencias */}
        <div className="doc-subcard" style={{ marginTop: '0.85rem' }}>
          <strong>Condición especial para las atenciones de urgencia, emergencia y tratamiento médico (referido por el paciente):</strong>
          <div className="doc-grid doc-grid--2" style={{ marginTop: '0.5rem' }}>
            <div className="inline-options">
              <span>En caso de requerir transfusiones autoriza:</span>
              <label className="radio-label">
                <input
                  type="radio"
                  name="transfusiones"
                  checked={c.condicionEspecialUrgencia.requiereTransfusiones === 'SI'}
                  onChange={() =>
                    updateSeccionC({
                      condicionEspecialUrgencia: { ...c.condicionEspecialUrgencia, requiereTransfusiones: 'SI' },
                    })
                  }
                />
                SI
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="transfusiones"
                  checked={c.condicionEspecialUrgencia.requiereTransfusiones === 'NO'}
                  onChange={() =>
                    updateSeccionC({
                      condicionEspecialUrgencia: { ...c.condicionEspecialUrgencia, requiereTransfusiones: 'NO' },
                    })
                  }
                />
                NO
              </label>
            </div>

            <div className="inline-options flex-wrap">
              <span>Se encuentra bajo algún tratamiento hormonal:</span>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hormonal"
                  checked={c.condicionEspecialUrgencia.tratamientoHormonal === 'SI'}
                  onChange={() =>
                    updateSeccionC({
                      condicionEspecialUrgencia: { ...c.condicionEspecialUrgencia, tratamientoHormonal: 'SI' },
                    })
                  }
                />
                SI
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hormonal"
                  checked={c.condicionEspecialUrgencia.tratamientoHormonal === 'NO'}
                  onChange={() =>
                    updateSeccionC({
                      condicionEspecialUrgencia: { ...c.condicionEspecialUrgencia, tratamientoHormonal: 'NO' },
                    })
                  }
                />
                NO
              </label>
              {c.condicionEspecialUrgencia.tratamientoHormonal === 'SI' && (
                <input
                  type="text"
                  placeholder="¿Cuál describir?"
                  value={c.condicionEspecialUrgencia.tratamientoHormonalCual}
                  onChange={(e) =>
                    updateSeccionC({
                      condicionEspecialUrgencia: {
                        ...c.condicionEspecialUrgencia,
                        tratamientoHormonalCual: e.target.value,
                      },
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Antecedentes Gineco Obstétricos */}
        <div className="doc-subcard" style={{ marginTop: '0.85rem' }}>
          <strong>ANTECEDENTES GINECO OBSTÉTRICOS</strong>
          <span className="text-muted text-sm block">
            Registrar resultado únicamente si interfiere con la actividad laboral y previa autorización del titular
          </span>
          <div className="doc-grid doc-grid--6" style={{ marginTop: '0.5rem' }}>
            <div className="field">
              <span>FECHA ÚLTIMA MENSTRUACIÓN</span>
              <input
                type="date"
                value={c.ginecoObstetricos.fum}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, fum: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>GESTAS</span>
              <input
                type="text"
                value={c.ginecoObstetricos.gestas}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, gestas: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>PARTOS</span>
              <input
                type="text"
                value={c.ginecoObstetricos.partos}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, partos: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>CESÁREAS</span>
              <input
                type="text"
                value={c.ginecoObstetricos.cesareas}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, cesareas: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>ABORTOS</span>
              <input
                type="text"
                value={c.ginecoObstetricos.abortos}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, abortos: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>MÉTODO DE PLANIFICACIÓN FAMILIAR</span>
              <div className="radio-group text-xs">
                {(['SI', 'NO', 'NO RESPONDE'] as const).map((opt) => (
                  <label key={opt} className="radio-label">
                    <input
                      type="radio"
                      name="planif_gin"
                      checked={c.ginecoObstetricos.planificacionFamiliar === opt}
                      onChange={() =>
                        updateSeccionC({
                          ginecoObstetricos: { ...c.ginecoObstetricos, planificacionFamiliar: opt },
                        })
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="doc-grid doc-grid--2" style={{ marginTop: '0.5rem' }}>
            <div className="field">
              <span>EXÁMENES REALIZADOS ¿CUÁL?</span>
              <input
                type="text"
                value={c.ginecoObstetricos.examenesRealizados}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, examenesRealizados: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>TIEMPO (años)</span>
              <input
                type="text"
                value={c.ginecoObstetricos.examenesTiempo}
                onChange={(e) =>
                  updateSeccionC({
                    ginecoObstetricos: { ...c.ginecoObstetricos, examenesTiempo: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Antecedentes Reproductivos Masculinos */}
        <div className="doc-subcard" style={{ marginTop: '0.85rem' }}>
          <strong>ANTECEDENTES REPRODUCTIVOS MASCULINOS</strong>
          <span className="text-muted text-sm block">
            Registrar resultado únicamente si interfiere con la actividad laboral y previa autorización del titular
          </span>
          <div className="doc-grid doc-grid--3" style={{ marginTop: '0.5rem' }}>
            <div className="field">
              <span>EXÁMENES REALIZADOS ¿CUÁL?</span>
              <input
                type="text"
                value={c.reproductivosMasculinos.examenesRealizados}
                onChange={(e) =>
                  updateSeccionC({
                    reproductivosMasculinos: { ...c.reproductivosMasculinos, examenesRealizados: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>TIEMPO (años)</span>
              <input
                type="text"
                value={c.reproductivosMasculinos.examenesTiempo}
                onChange={(e) =>
                  updateSeccionC({
                    reproductivosMasculinos: { ...c.reproductivosMasculinos, examenesTiempo: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>MÉTODO DE PLANIFICACIÓN FAMILIAR</span>
              <div className="radio-group text-xs">
                {(['SI', 'NO', 'NO RESPONDE'] as const).map((opt) => (
                  <label key={opt} className="radio-label">
                    <input
                      type="radio"
                      name="planif_masc"
                      checked={c.reproductivosMasculinos.planificacionFamiliar === opt}
                      onChange={() =>
                        updateSeccionC({
                          reproductivosMasculinos: { ...c.reproductivosMasculinos, planificacionFamiliar: opt },
                        })
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consumo de Sustancias */}
        <div className="doc-subcard" style={{ marginTop: '0.85rem' }}>
          <strong>CONSUMO DE SUSTANCIAS Y ESTILO DE VIDA</strong>
          <div className="table-wrap style-compact-table" style={{ marginTop: '0.5rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>SUSTANCIA</th>
                  <th>TIEMPO CONSUMO (meses)</th>
                  <th>EX CONSUMIDOR</th>
                  <th>TIEMPO ABSTINENCIA (meses)</th>
                  <th>NO CONSUME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>TABACO</strong></td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.tabaco.tiempoConsumoMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            tabaco: { ...c.consumoSustancias.tabaco, tiempoConsumoMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.tabaco.exConsumidor}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            tabaco: { ...c.consumoSustancias.tabaco, exConsumidor: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.tabaco.tiempoAbstinenciaMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            tabaco: { ...c.consumoSustancias.tabaco, tiempoAbstinenciaMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.tabaco.noConsume}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            tabaco: { ...c.consumoSustancias.tabaco, noConsume: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td><strong>ALCOHOL</strong></td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.alcohol.tiempoConsumoMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            alcohol: { ...c.consumoSustancias.alcohol, tiempoConsumoMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.alcohol.exConsumidor}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            alcohol: { ...c.consumoSustancias.alcohol, exConsumidor: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.alcohol.tiempoAbstinenciaMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            alcohol: { ...c.consumoSustancias.alcohol, tiempoAbstinenciaMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.alcohol.noConsume}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            alcohol: { ...c.consumoSustancias.alcohol, noConsume: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>OTRAS:</strong>
                    <input
                      type="text"
                      placeholder="¿Cuál?"
                      value={c.consumoSustancias.otras.cual}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            otras: { ...c.consumoSustancias.otras, cual: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.otras.tiempoConsumoMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            otras: { ...c.consumoSustancias.otras, tiempoConsumoMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.otras.exConsumidor}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            otras: { ...c.consumoSustancias.otras, exConsumidor: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={c.consumoSustancias.otras.tiempoAbstinenciaMeses}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            otras: { ...c.consumoSustancias.otras, tiempoAbstinenciaMeses: e.target.value },
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={c.consumoSustancias.otras.noConsume}
                      onChange={(e) =>
                        updateSeccionC({
                          consumoSustancias: {
                            ...c.consumoSustancias,
                            otras: { ...c.consumoSustancias.otras, noConsume: e.target.checked },
                          },
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="doc-grid doc-grid--3" style={{ marginTop: '0.75rem' }}>
            <div className="field">
              <span>ACTIVIDAD FÍSICA (¿Cuál?)</span>
              <input
                type="text"
                value={c.estiloDeVida.actividadFisicaCual}
                onChange={(e) =>
                  updateSeccionC({
                    estiloDeVida: { ...c.estiloDeVida, actividadFisicaCual: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>ACTIVIDAD FÍSICA (Tiempo)</span>
              <input
                type="text"
                value={c.estiloDeVida.actividadFisicaTiempo}
                onChange={(e) =>
                  updateSeccionC({
                    estiloDeVida: { ...c.estiloDeVida, actividadFisicaTiempo: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>CONDICIÓN PREEXISTENTE (¿Cuál?)</span>
              <input
                type="text"
                value={c.condicionPreexistente.cual}
                onChange={(e) =>
                  updateSeccionC({
                    condicionPreexistente: { ...c.condicionPreexistente, cual: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="doc-grid doc-grid--2" style={{ marginTop: '0.5rem' }}>
            <div className="field">
              <span>MEDICACIÓN HABITUAL</span>
              <input
                type="text"
                value={c.condicionPreexistente.medicacionHabitual}
                onChange={(e) =>
                  updateSeccionC({
                    condicionPreexistente: { ...c.condicionPreexistente, medicacionHabitual: e.target.value },
                  })
                }
              />
            </div>
            <div className="field">
              <span>Observación sustancias / Estilo vida</span>
              <input
                type="text"
                value={c.consumoSustancias.observacion}
                onChange={(e) =>
                  updateSeccionC({
                    consumoSustancias: { ...c.consumoSustancias, observacion: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </fieldset>

      {/* SECCIÓN D */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">D. ENFERMEDAD O PROBLEMA ACTUAL</legend>
        <div className="field field--full">
          <span>Descripción del problema actual</span>
          <textarea
            rows={3}
            value={d.descripcionEnfermedadActual}
            onChange={(e) => updateSeccionD({ descripcionEnfermedadActual: e.target.value })}
          />
        </div>
      </fieldset>

      {/* SECCIÓN E */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">E. CONSTANTES VITALES Y ANTROPOMETRÍA</legend>
        <div className="doc-grid doc-grid--9">
          <div className="field">
            <span>TEMP (°C)</span>
            <input
              type="text"
              value={e.temperatura}
              onChange={(evt) => updateSeccionE({ temperatura: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>P. ARTERIAL</span>
            <input
              type="text"
              placeholder="120/80"
              value={e.presionArterial}
              onChange={(evt) => updateSeccionE({ presionArterial: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>F. CARD.</span>
            <input
              type="text"
              value={e.frecuenciaCardiaca}
              onChange={(evt) => updateSeccionE({ frecuenciaCardiaca: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>F. RESP.</span>
            <input
              type="text"
              value={e.frecuenciaRespiratoria}
              onChange={(evt) => updateSeccionE({ frecuenciaRespiratoria: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>SAT O2 (%)</span>
            <input
              type="text"
              value={e.saturacionOxigeno}
              onChange={(evt) => updateSeccionE({ saturacionOxigeno: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>PESO (Kg)</span>
            <input
              type="text"
              value={e.peso}
              onChange={(evt) => updateSeccionE({ peso: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>TALLA (cm)</span>
            <input
              type="text"
              value={e.talla}
              onChange={(evt) => updateSeccionE({ talla: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>IMC (kg/m²)</span>
            <input
              type="text"
              readOnly
              className="field--readonly"
              value={e.imc}
            />
          </div>
          <div className="field">
            <span>PER. ABD (cm)</span>
            <input
              type="text"
              value={e.perimetroAbdominal}
              onChange={(evt) => updateSeccionE({ perimetroAbdominal: evt.target.value })}
            />
          </div>
        </div>
      </fieldset>

      {/* SECCIÓN F */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">F. EXAMEN FÍSICO REGIONAL</legend>
        <p className="doc-alert-info">
          SI EXISTE EVIDENCIA DE PATOLOGÍA MARCAR CON &quot;X&quot; (Seleccionar la casilla) Y DESCRIBIR EN LA SIGUIENTE SECCIÓN COLOCANDO EL NUMERAL CORRESPONDIENTE.
        </p>

        <div className="regional-grid">
          {EXAMEN_FISICO_ESTRUCTURA.map((group) => (
            <div key={group.region} className="regional-box">
              <strong className="regional-box__header">{group.region}</strong>
              <div className="regional-box__items">
                {group.items.map((item) => {
                  const isPatologico = f.regiones[item.id] ?? false
                  return (
                    <label
                      key={item.id}
                      className={`regional-item ${isPatologico ? 'regional-item--patologico' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isPatologico}
                        onChange={() => toggleRegionItem(item.id)}
                      />
                      <span>{item.label}</span>
                      {isPatologico && <strong className="badge-x">X</strong>}
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="field field--full" style={{ marginTop: '1rem' }}>
          <span>Observación / Descripción del Examen Físico Regional (con numeral):</span>
          <textarea
            rows={3}
            value={f.observacionExamenFisico}
            onChange={(e) => updateSeccionF({ observacionExamenFisico: e.target.value })}
            placeholder="Ejemplo: 2_b: Conjuntivas hiperémicas por astenopia laboral..."
          />
        </div>
      </fieldset>
    </div>
  )
}
