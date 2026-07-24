import type {
  AptitudCoproparasitario,
  CertificadoCoproparasitarioDocument,
} from '@/domain/certificadoCoproparasitario/types'

interface Props {
  value: CertificadoCoproparasitarioDocument
  onChange: (value: CertificadoCoproparasitarioDocument) => void
}

const APTITUD_OPTIONS: { value: AptitudCoproparasitario; label: string }[] = [
  { value: 'apto', label: 'Apto' },
  { value: 'apto_recomendaciones', label: 'Apto con recomendaciones' },
  { value: 'apto_restricciones', label: 'Apto con restricciones' },
  { value: 'no_apto', label: 'No Apto' },
]

export function CertificadoCoproparasitarioForm({ value, onChange }: Props) {
  const update = <K extends keyof CertificadoCoproparasitarioDocument>(
    key: K,
    fieldValue: CertificadoCoproparasitarioDocument[K],
  ) => {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <div className="copro-simple-form">
      <section className="copro-simple-card">
        <h2>Datos del paciente</h2>
        <div className="form-grid">
          <div className="field field--full">
            <span>Fecha</span>
            <input
              type="text"
              value={value.fechaReferencia}
              onChange={(e) => update('fechaReferencia', e.target.value)}
              placeholder="Ej. Dayuma, 23 de julio de 2026"
            />
          </div>
          <div className="field">
            <span>Nombre completo</span>
            <input
              type="text"
              value={value.nombrePaciente}
              onChange={(e) => update('nombrePaciente', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Edad</span>
            <input
              type="text"
              value={value.edad}
              onChange={(e) => update('edad', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Cédula</span>
            <input
              type="text"
              value={value.cedula}
              onChange={(e) => update('cedula', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Cargo</span>
            <input
              type="text"
              value={value.cargo}
              onChange={(e) => update('cargo', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Empresa</span>
            <input
              type="text"
              value={value.empresa}
              onChange={(e) => update('empresa', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Examen / procedimiento</span>
            <input
              type="text"
              value={value.tipoExamen}
              onChange={(e) => update('tipoExamen', e.target.value)}
              placeholder="Examen coproparasitario"
            />
          </div>
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Signos vitales</h2>
        <div className="form-grid copro-vitals-grid">
          {(
            [
              ['pa', 'P/A'],
              ['pul', 'PUL'],
              ['temp', 'TEMP'],
              ['spo', 'SPO'],
              ['fr', 'FR'],
              ['talla', 'T'],
              ['peso', 'P'],
              ['imc', 'IMC'],
            ] as const
          ).map(([key, label]) => (
            <div className="field" key={key}>
              <span>{label}</span>
              <input
                type="text"
                value={value[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Diagnóstico y aptitud</h2>
        <div className="form-grid">
          <div className="field field--full">
            <span>Diagnóstico</span>
            <input
              type="text"
              value={value.diagnostico}
              onChange={(e) => update('diagnostico', e.target.value)}
            />
          </div>

          <div className="field field--full">
            <span>Se declara que el paciente está</span>
            <div className="copro-aptitud-list">
              {APTITUD_OPTIONS.map((opt) => (
                <label key={opt.value} className="copro-aptitud-option">
                  <input
                    type="radio"
                    name="aptitud-copro"
                    checked={value.aptitud === opt.value}
                    onChange={() => update('aptitud', opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field field--full">
            <span>Recomendaciones</span>
            <input
              type="text"
              value={value.recomendaciones}
              onChange={(e) => update('recomendaciones', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Médico</h2>
        <div className="form-grid">
          <div className="field">
            <span>Nombre del médico</span>
            <input
              type="text"
              value={value.nombreMedico}
              onChange={(e) => update('nombreMedico', e.target.value)}
              placeholder="Dr. / Dra."
            />
          </div>
          <div className="field">
            <span>MSP</span>
            <input
              type="text"
              value={value.msp}
              onChange={(e) => update('msp', e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
