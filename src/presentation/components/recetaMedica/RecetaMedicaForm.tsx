import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'

interface Props {
  value: RecetaMedicaDocument
  onChange: (value: RecetaMedicaDocument) => void
}

export function RecetaMedicaForm({ value, onChange }: Props) {
  const update = <K extends keyof RecetaMedicaDocument>(
    key: K,
    fieldValue: RecetaMedicaDocument[K],
  ) => {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <div className="copro-simple-form">
      <section className="copro-simple-card">
        <h2>Datos de la receta</h2>
        <div className="form-grid">
          <div className="field">
            <span>No. receta</span>
            <input
              type="text"
              value={value.numero}
              onChange={(e) => update('numero', e.target.value)}
              placeholder="000000"
            />
          </div>
          <div className="field">
            <span>Día</span>
            <input
              type="text"
              value={value.fechaDia}
              onChange={(e) => update('fechaDia', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Mes</span>
            <input
              type="text"
              value={value.fechaMes}
              onChange={(e) => update('fechaMes', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Año</span>
            <input
              type="text"
              value={value.fechaAnio}
              onChange={(e) => update('fechaAnio', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Datos del paciente</h2>
        <div className="form-grid">
          <div className="field field--full">
            <span>Nombres y apellidos</span>
            <input
              type="text"
              value={value.nombresApellidos}
              onChange={(e) => update('nombresApellidos', e.target.value)}
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
            <span>CI</span>
            <input
              type="text"
              value={value.ci}
              onChange={(e) => update('ci', e.target.value)}
            />
          </div>
          <div className="field">
            <span>HC</span>
            <input
              type="text"
              value={value.hc}
              onChange={(e) => update('hc', e.target.value)}
            />
          </div>
          <div className="field">
            <span>CIE 10</span>
            <input
              type="text"
              value={value.cie10}
              onChange={(e) => update('cie10', e.target.value)}
            />
          </div>
          <div className="field field--full">
            <span>Diagnóstico</span>
            <input
              type="text"
              value={value.diagnostico}
              onChange={(e) => update('diagnostico', e.target.value)}
            />
          </div>
          <div className="field field--full">
            <span>Ant. alérgicos</span>
            <input
              type="text"
              value={value.antAlergicos}
              onChange={(e) => update('antAlergicos', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Prescripción e indicaciones</h2>
        <div className="form-grid">
          <div className="field field--full">
            <span>Rp (medicamentos)</span>
            <textarea
              className="hc-textarea hc-textarea--tall"
              rows={8}
              value={value.rp}
              onChange={(e) => update('rp', e.target.value)}
              placeholder="Liste los medicamentos..."
            />
          </div>
          <div className="field field--full">
            <span>Indicaciones</span>
            <textarea
              className="hc-textarea hc-textarea--tall"
              rows={8}
              value={value.indicaciones}
              onChange={(e) => update('indicaciones', e.target.value)}
              placeholder="Indicaciones para el paciente..."
            />
          </div>
        </div>
      </section>

      <section className="copro-simple-card">
        <h2>Médico</h2>
        <div className="form-grid">
          <div className="field">
            <span>Nombre</span>
            <input
              type="text"
              value={value.nombreMedico}
              onChange={(e) => update('nombreMedico', e.target.value)}
            />
          </div>
          <div className="field">
            <span>Celular</span>
            <input
              type="text"
              value={value.celularMedico}
              onChange={(e) => update('celularMedico', e.target.value)}
            />
          </div>
          <div className="field">
            <span>REG N.</span>
            <input
              type="text"
              value={value.regMedico}
              onChange={(e) => update('regMedico', e.target.value)}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
