import type { ChangeEvent, FormEvent } from 'react'
import type { ImagingRecordInput } from '@/domain/imaging/ImagingRecord'
import { ClinicalFormHeader } from '@/presentation/components/clinicalHistory/ClinicalFormHeader'

interface ImagingFormProps {
  value: ImagingRecordInput
  saving: boolean
  message: string | null
  onChange: (next: ImagingRecordInput) => void
  onSubmit: (e: FormEvent) => void
}

type FieldKey = keyof ImagingRecordInput

export function ImagingForm({
  value,
  saving,
  message,
  onChange,
  onSubmit,
}: ImagingFormProps) {
  const setField = (field: FieldKey, val: string) => {
    onChange({ ...value, [field]: val })
  }

  const onText = (field: FieldKey) => (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setField(field, e.target.value)

  return (
    <form className="hc-form" onSubmit={onSubmit}>
      <ClinicalFormHeader title="ESTUDIOS DE IMÁGENES" />

      <div className="hc-section-title">ESTUDIOS DE IMÁGENES</div>
      <div className="hc-block">
        <textarea
          className="hc-textarea"
          rows={4}
          value={value.estudiosImagenes}
          onChange={onText('estudiosImagenes')}
        />
      </div>

      <div className="hc-section-title">OTROS</div>
      <div className="hc-block">
        <textarea
          className="hc-textarea"
          rows={3}
          value={value.otros}
          onChange={onText('otros')}
        />
      </div>

      <div className="img-diag-head">
        <div className="hc-section-title img-diag-head__left">DIAGNÓSTICOS:</div>
        <div className="hc-section-title img-diag-head__right">CIE 10:</div>
      </div>
      <div className="img-diag-body">
        <div className="hc-block img-diag-body__left">
          <textarea
            className="hc-textarea"
            rows={3}
            value={value.diagnosticos}
            onChange={onText('diagnosticos')}
          />
        </div>
        <div className="hc-block img-diag-body__right">
          <textarea
            className="hc-textarea"
            rows={3}
            value={value.cie10}
            onChange={onText('cie10')}
          />
        </div>
      </div>

      <div className="hc-section-title">TRATAMIENTO CLINICO DE INGRESO</div>
      <div className="hc-block">
        <textarea
          className="hc-textarea hc-textarea--tall"
          rows={6}
          value={value.tratamientoIngreso}
          onChange={onText('tratamientoIngreso')}
        />
      </div>

      <div className="hc-section-title">TRATAMIENTO CLINICO DE EGRESO</div>
      <div className="hc-block">
        <textarea
          className="hc-textarea hc-textarea--tall"
          rows={6}
          value={value.tratamientoEgreso}
          onChange={onText('tratamientoEgreso')}
        />
      </div>

      <div className="hc-section-title">INTERCONSULTA</div>
      <div className="img-interconsulta">
        <label className="img-interconsulta__field">
          <span>ESPECIALIDAD:</span>
          <input
            value={value.especialidad}
            onChange={onText('especialidad')}
          />
        </label>
      </div>

      <div className="hc-actions">
        {message && <p className="hc-message">{message}</p>}
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar imágenes'}
        </button>
      </div>
    </form>
  )
}
