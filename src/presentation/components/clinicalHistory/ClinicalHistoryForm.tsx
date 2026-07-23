import type { ChangeEvent, FormEvent } from 'react'
import type { ClinicalHistoryInput } from '@/domain/clinicalHistory/ClinicalHistory'
import { ClinicalFormHeader } from '@/presentation/components/clinicalHistory/ClinicalFormHeader'

interface ClinicalHistoryFormProps {
  value: ClinicalHistoryInput
  saving: boolean
  message: string | null
  onChange: (next: ClinicalHistoryInput) => void
  onSubmit: (e: FormEvent) => void
}

type FieldKey = keyof ClinicalHistoryInput

function CellInput({
  label,
  field,
  value,
  onChange,
  multiline = false,
  rows = 2,
}: {
  label: string
  field: FieldKey
  value: ClinicalHistoryInput
  onChange: (field: FieldKey, val: string) => void
  multiline?: boolean
  rows?: number
}) {
  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <label className="hc-cell">
      <span className="hc-cell__label">{label}</span>
      {multiline ? (
        <textarea
          className="hc-cell__input"
          rows={rows}
          value={value[field]}
          onChange={handle}
        />
      ) : (
        <input
          className="hc-cell__input"
          value={value[field]}
          onChange={handle}
        />
      )}
    </label>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <div className="hc-section-title">{children}</div>
}

export function ClinicalHistoryForm({
  value,
  saving,
  message,
  onChange,
  onSubmit,
}: ClinicalHistoryFormProps) {
  const setField = (field: FieldKey, val: string) => {
    onChange({ ...value, [field]: val })
  }

  return (
    <form className="hc-form" onSubmit={onSubmit}>
      <ClinicalFormHeader title="HISTORIA CLINICA GENERAL" />

      <div className="hc-grid hc-grid--admin">
        <CellInput label="Nº HC" field="numeroHc" value={value} onChange={setField} />
        <CellInput label="Convenio" field="convenio" value={value} onChange={setField} />
        <CellInput label="Fecha" field="fecha" value={value} onChange={setField} />
      </div>

      <div className="hc-grid hc-grid--personales-1">
        <CellInput label="Nombres y Apellidos" field="nombresApellidos" value={value} onChange={setField} />
        <CellInput label="Nro de Identificación" field="nroIdentificacion" value={value} onChange={setField} />
        <CellInput label="Fecha de Nacimiento" field="fechaNacimiento" value={value} onChange={setField} />
      </div>

      <div className="hc-grid hc-grid--personales-2">
        <CellInput label="EDAD" field="edad" value={value} onChange={setField} />
        <CellInput label="GENERO" field="genero" value={value} onChange={setField} />
        <CellInput label="ESTADO CIVIL" field="estadoCivil" value={value} onChange={setField} />
        <CellInput label="ESCOLARIDAD" field="escolaridad" value={value} onChange={setField} />
        <CellInput label="PROFESIÓN Y OCUPACION" field="profesionOcupacion" value={value} onChange={setField} />
        <CellInput label="TELEFONO" field="telefono" value={value} onChange={setField} />
      </div>

      <div className="hc-grid hc-grid--personales-3">
        <CellInput label="Domicilio" field="domicilio" value={value} onChange={setField} />
        <CellInput label="Cantón" field="canton" value={value} onChange={setField} />
        <CellInput label="Provincia" field="provincia" value={value} onChange={setField} />
        <CellInput label="País" field="pais" value={value} onChange={setField} />
      </div>

      <div className="hc-grid hc-grid--personales-4">
        <CellInput label="Dirección" field="direccion" value={value} onChange={setField} />
        <CellInput label="Nacionalidad" field="nacionalidad" value={value} onChange={setField} />
      </div>

      <SectionTitle>MOTIVO DE CONSULTA</SectionTitle>
      <div className="hc-block">
        <textarea
          className="hc-textarea"
          rows={3}
          value={value.motivoConsulta}
          onChange={(e) => setField('motivoConsulta', e.target.value)}
        />
      </div>

      <SectionTitle>ANTECEDENTES PERSONALES PATOLOGICOS</SectionTitle>
      <div className="hc-grid hc-grid--2">
        <CellInput label="Cardiovasculares" field="cardiovasculares" value={value} onChange={setField} multiline />
        <CellInput label="Metabólicos" field="metabolicos" value={value} onChange={setField} multiline />
        <CellInput label="Renales" field="renales" value={value} onChange={setField} multiline />
        <CellInput label="Digestivos" field="digestivos" value={value} onChange={setField} multiline />
        <CellInput label="Quirúrgicos" field="quirurgicos" value={value} onChange={setField} multiline />
        <CellInput label="Alérgicos" field="alergicos" value={value} onChange={setField} multiline />
        <CellInput label="Transfusiones" field="transfusiones" value={value} onChange={setField} multiline />
        <CellInput label="Medicamentos" field="medicamentos" value={value} onChange={setField} multiline />
      </div>

      <SectionTitle>HABITOS PSICOBIOLÓGICOS</SectionTitle>
      <div className="hc-grid hc-grid--2">
        <CellInput label="Alcohol" field="alcohol" value={value} onChange={setField} multiline />
        <CellInput label="Drogas" field="drogas" value={value} onChange={setField} multiline />
        <CellInput label="Tabaquismo" field="tabaquismo" value={value} onChange={setField} multiline />
        <CellInput label="Otros" field="otrosHabitos" value={value} onChange={setField} multiline />
      </div>

      <SectionTitle>ANTECEDENTES FAMILIARES</SectionTitle>
      <div className="hc-grid hc-grid--2">
        <CellInput label="Madre" field="madre" value={value} onChange={setField} multiline />
        <CellInput label="Hijos" field="hijos" value={value} onChange={setField} multiline />
        <CellInput label="Padre" field="padre" value={value} onChange={setField} multiline />
        <CellInput label="Hermanos" field="hermanos" value={value} onChange={setField} multiline />
      </div>

      <SectionTitle>ANTECEDENTES GINECO-OBSTETRICOS</SectionTitle>
      <div className="hc-grid hc-grid--gineco">
        <CellInput label="Menarquia" field="menarquia" value={value} onChange={setField} />
        <CellInput label="Ciclo Menstrual" field="cicloMenstrual" value={value} onChange={setField} />
        <CellInput label="Partos" field="partos" value={value} onChange={setField} />
        <CellInput label="Sexarquia" field="sexarquia" value={value} onChange={setField} />
        <CellInput label="FUM" field="fum" value={value} onChange={setField} />
        <CellInput label="Gestaciones" field="gestaciones" value={value} onChange={setField} />
        <CellInput label="Abortos" field="abortos" value={value} onChange={setField} />
        <CellInput label="Anticonceptivos" field="anticonceptivos" value={value} onChange={setField} />
        <CellInput label="Cesareas" field="cesareas" value={value} onChange={setField} />
      </div>

      <SectionTitle>ENFERMEDAD ACTUAL</SectionTitle>
      <div className="hc-block">
        <textarea
          className="hc-textarea hc-textarea--tall"
          rows={5}
          value={value.enfermedadActual}
          onChange={(e) => setField('enfermedadActual', e.target.value)}
        />
      </div>

      <SectionTitle>SIGNOS VITALES</SectionTitle>
      <div className="hc-grid hc-grid--vitals">
        <CellInput label="Presión Arterial" field="presionArterial" value={value} onChange={setField} />
        <CellInput label="Peso Kg" field="pesoKg" value={value} onChange={setField} />
        <CellInput label="IMC" field="imc" value={value} onChange={setField} />
        <CellInput label="F. Cardiaca" field="frecuenciaCardiaca" value={value} onChange={setField} />
        <CellInput label="Talla" field="talla" value={value} onChange={setField} />
        <div className="hc-cell hc-cell--empty" aria-hidden="true" />
        <CellInput label="F. Respiratoria" field="frecuenciaRespiratoria" value={value} onChange={setField} />
        <CellInput label="Temperatura °C" field="temperatura" value={value} onChange={setField} />
        <CellInput label="SAT" field="sat" value={value} onChange={setField} />
      </div>

      <div className="hc-actions">
        {message && <p className="hc-message">{message}</p>}
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar historial clínico'}
        </button>
      </div>
    </form>
  )
}
