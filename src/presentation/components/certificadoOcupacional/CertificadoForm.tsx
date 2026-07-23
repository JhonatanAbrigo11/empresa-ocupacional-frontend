import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'

interface CertificadoFormProps {
  value: CertificadoOcupacionalDocument
  onChange: (value: CertificadoOcupacionalDocument) => void
}

export function CertificadoForm({ value, onChange }: CertificadoFormProps) {
  const updateSeccionA = (fields: Partial<CertificadoOcupacionalDocument['seccionA']>) => {
    onChange({
      ...value,
      seccionA: { ...value.seccionA, ...fields },
    })
  }

  const updateSeccionB = (fields: Partial<CertificadoOcupacionalDocument['seccionB']>) => {
    onChange({
      ...value,
      seccionB: { ...value.seccionB, ...fields },
    })
  }

  const updateSeccionC = (fields: Partial<CertificadoOcupacionalDocument['seccionC']>) => {
    onChange({
      ...value,
      seccionC: { ...value.seccionC, ...fields },
    })
  }

  const updateSeccionD = (fields: Partial<CertificadoOcupacionalDocument['seccionD']>) => {
    onChange({
      ...value,
      seccionD: { ...value.seccionD, ...fields },
    })
  }

  const updateSeccionE = (fields: Partial<CertificadoOcupacionalDocument['seccionE']>) => {
    onChange({
      ...value,
      seccionE: { ...value.seccionE, ...fields },
    })
  }

  const updateSeccionF = (fields: Partial<CertificadoOcupacionalDocument['seccionF']>) => {
    onChange({
      ...value,
      seccionF: { ...value.seccionF, ...fields },
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
      <div className="doc-banner doc-banner--teal">
        <h2>CERTIFICADO - EVALUACIÓN MÉDICA OCUPACIONAL</h2>
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
            <span>NÚMERO DE FORMULARIO</span>
            <input
              type="text"
              value={a.numFormulario}
              onChange={(evt) => updateSeccionA({ numFormulario: evt.target.value })}
            />
          </div>
        </div>

        <div className="doc-grid doc-grid--6" style={{ marginTop: '0.75rem' }}>
          <div className="field">
            <span>NÚMERO DE ARCHIVO</span>
            <input
              type="text"
              value={a.numArchivo}
              onChange={(evt) => updateSeccionA({ numArchivo: evt.target.value })}
            />
          </div>
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
          <div className="field">
            <span>SEXO</span>
            <select
              value={a.sexo}
              onChange={(evt) => updateSeccionA({ sexo: evt.target.value as 'HOMBRE' | 'MUJER' })}
            >
              <option value="">Seleccionar</option>
              <option value="HOMBRE">HOMBRE</option>
              <option value="MUJER">MUJER</option>
            </select>
          </div>
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>PUESTO DE TRABAJO (CIUO)</span>
          <input
            type="text"
            value={a.puestoTrabajoCiuo}
            onChange={(evt) => updateSeccionA({ puestoTrabajoCiuo: evt.target.value })}
          />
        </div>
      </fieldset>

      {/* SECCIÓN B */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">B. DATOS GENERALES</legend>
        <div className="doc-grid doc-grid--2">
          <div className="doc-box">
            <span className="doc-box__label">FECHA DE EMISIÓN (aaaa / mm / dd)</span>
            <div className="inline-fields">
              <input
                type="text"
                placeholder="AAAA"
                value={b.fechaEmisionAño}
                onChange={(e) => updateSeccionB({ fechaEmisionAño: e.target.value })}
              />
              <input
                type="text"
                placeholder="MM"
                value={b.fechaEmisionMes}
                onChange={(e) => updateSeccionB({ fechaEmisionMes: e.target.value })}
              />
              <input
                type="text"
                placeholder="DD"
                value={b.fechaEmisionDia}
                onChange={(e) => updateSeccionB({ fechaEmisionDia: e.target.value })}
              />
            </div>
          </div>

          <div className="doc-box">
            <span className="doc-box__label">EVALUACIÓN MÉDICA</span>
            <div className="radio-group radio-group--tiles">
              {(['INGRESO', 'PERIÓDICO', 'REINTEGRO', 'RETIRO'] as const).map((tipo) => (
                <label key={tipo} className={`radio-tile ${b.tipoEvaluacion === tipo ? 'radio-tile--active' : ''}`}>
                  <input
                    type="radio"
                    name="tipoEvalCert"
                    checked={b.tipoEvaluacion === tipo}
                    onChange={() => updateSeccionB({ tipoEvaluacion: tipo })}
                  />
                  {tipo}
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* SECCIÓN C */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">C. APTITUD MÉDICA PARA EL TRABAJO</legend>
        <p className="text-sm text-muted" style={{ marginBottom: '0.6rem' }}>
          Después de la valoración médica ocupacional se certifica que la persona en mención, es calificada como:
        </p>

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
              className={`aptitud-tile ${c.aptitud === item.id ? 'aptitud-tile--active' : ''}`}
            >
              <input
                type="radio"
                name="aptitudCert"
                checked={c.aptitud === item.id}
                onChange={() => updateSeccionC({ aptitud: item.id })}
              />
              <span className={`aptitud-badge ${item.badgeClass}`}>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="field field--full" style={{ marginTop: '0.85rem' }}>
          <span>DETALLE DE OBSERVACIONES</span>
          <textarea
            rows={4}
            value={c.detalleObservaciones}
            onChange={(e) => updateSeccionC({ detalleObservaciones: e.target.value })}
            placeholder="Especificar limitaciones o hallazgos observados..."
          />
        </div>
      </fieldset>

      {/* SECCIÓN D */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">D. RECOMENDACIONES / OBSERVACIONES</legend>
        <div className="field field--full">
          <span>Descripción (Recomendaciones)</span>
          <textarea
            rows={3}
            value={d.descripcionRecomendaciones}
            onChange={(e) => updateSeccionD({ descripcionRecomendaciones: e.target.value })}
            placeholder="Ejemplo: ESTILO DE VIDA SALUDABLE. USO DE EPP..."
          />
        </div>

        <div className="field field--full" style={{ marginTop: '0.75rem' }}>
          <span>Observación</span>
          <textarea
            rows={2}
            value={d.observacionGeneral}
            onChange={(e) => updateSeccionD({ observacionGeneral: e.target.value })}
          />
        </div>

        <div className="doc-alert-info" style={{ marginTop: '0.85rem' }}>
          <p>
            Con este documento certifico que el trabajador se ha sometido a la evaluación médica requerida para (el ingreso /la ejecución/ el reingreso y retiro) al puesto laboral y se le ha informado sobre los riesgos relacionados con el trabajo emitiendo recomendaciones relacionadas con su estado de salud.
          </p>
          <span className="text-xs block mt-1">
            La presente certificación se expide con base en el formulario de Evaluación Ocupacional, el cual tiene carácter de confidencial.
          </span>
        </div>
      </fieldset>

      {/* SECCIONES E & F */}
      <div className="doc-grid doc-grid--2" style={{ marginTop: '1.25rem' }}>
        <fieldset className="doc-section">
          <legend className="doc-section__title">E. DATOS DEL PROFESIONAL</legend>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>NOMBRE Y APELLIDO DEL PROFESIONAL</span>
            <input
              type="text"
              value={e.nombreApellidoProf}
              onChange={(evt) => updateSeccionE({ nombreApellidoProf: evt.target.value })}
            />
          </div>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>CÓDIGO MÉDICO</span>
            <input
              type="text"
              value={e.codigoMedico}
              onChange={(evt) => updateSeccionE({ codigoMedico: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>FIRMA Y SELLO</span>
            <textarea
              rows={2}
              value={e.firmaSello}
              onChange={(evt) => updateSeccionE({ firmaSello: evt.target.value })}
            />
          </div>
        </fieldset>

        <fieldset className="doc-section">
          <legend className="doc-section__title">F. FIRMA DEL USUARIO (TRABAJADOR)</legend>
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <span>CÉDULA DE IDENTIDAD</span>
            <input
              type="text"
              value={f.cedulaUsuario}
              onChange={(evt) => updateSeccionF({ cedulaUsuario: evt.target.value })}
            />
          </div>
          <div className="field">
            <span>FIRMA</span>
            <textarea
              rows={3}
              value={f.firmaUsuario}
              onChange={(evt) => updateSeccionF({ firmaUsuario: evt.target.value })}
            />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
