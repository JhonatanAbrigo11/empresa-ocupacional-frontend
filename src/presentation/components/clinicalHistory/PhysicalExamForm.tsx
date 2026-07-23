import type { FormEvent } from 'react'
import type { LabResult, PhysicalExamInput } from '@/domain/physicalExam/PhysicalExam'
import { ClinicalFormHeader } from '@/presentation/components/clinicalHistory/ClinicalFormHeader'

interface PhysicalExamFormProps {
  value: PhysicalExamInput
  saving: boolean
  message: string | null
  onChange: (next: PhysicalExamInput) => void
  onSubmit: (e: FormEvent) => void
}

const GROUPS: LabResult['grupo'][] = ['BIOMETRIA', 'QUIMICA SANGUINEA', 'OTROS']

export function PhysicalExamForm({
  value,
  saving,
  message,
  onChange,
  onSubmit,
}: PhysicalExamFormProps) {
  const updateLab = (id: string, patch: Partial<Pick<LabResult, 'fecha' | 'resultado'>>) => {
    onChange({
      ...value,
      laboratorio: value.laboratorio.map((row) =>
        row.id === id ? { ...row, ...patch } : row,
      ),
    })
  }

  return (
    <form className="hc-form" onSubmit={onSubmit}>
      <ClinicalFormHeader title="EXAMEN FISICO" />

      <div className="hc-section-title">EXAMEN FISICO</div>
      <div className="hc-block">
        <textarea
          className="hc-textarea hc-textarea--tall"
          rows={8}
          placeholder="Describa el examen físico del paciente…"
          value={value.examenFisico}
          onChange={(e) => onChange({ ...value, examenFisico: e.target.value })}
        />
      </div>

      <div className="hc-section-title">LABORATORIO</div>

      <div className="lab-table-wrap">
        <table className="lab-table">
          <thead>
            <tr>
              <th className="lab-table__prueba">PRUEBA</th>
              <th className="lab-table__fecha">FECHA</th>
              <th className="lab-table__resultado">RESULTADO</th>
            </tr>
          </thead>
          <tbody>
            {GROUPS.flatMap((grupo) => {
              const rows = value.laboratorio.filter((r) => r.grupo === grupo)
              return [
                <tr key={`group-${grupo}`} className="lab-table__group-row">
                  <td colSpan={3}>{grupo}</td>
                </tr>,
                ...rows.map((row) => (
                  <tr key={row.id}>
                    <td className="lab-table__name">{row.prueba}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="AAAA-MM-DD"
                        value={row.fecha}
                        onChange={(e) => updateLab(row.id, { fecha: e.target.value })}
                        aria-label={`Fecha ${row.prueba}`}
                      />
                    </td>
                    <td>
                      <input
                        value={row.resultado}
                        onChange={(e) => updateLab(row.id, { resultado: e.target.value })}
                        aria-label={`Resultado ${row.prueba}`}
                      />
                    </td>
                  </tr>
                )),
              ]
            })}
          </tbody>
        </table>
      </div>

      <div className="hc-actions">
        {message && <p className="hc-message">{message}</p>}
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar examen físico'}
        </button>
      </div>
    </form>
  )
}
