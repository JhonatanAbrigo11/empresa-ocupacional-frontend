import type { Hoja2Data, RiesgoItem } from '@/domain/historiaClinicaOcupacional/types'

interface Hoja2FormProps {
  value: Hoja2Data
  onChange: (value: Hoja2Data) => void
}

const CATEGORIA_LABELS: Record<RiesgoItem['categoria'], { title: string; colorClass: string }> = {
  FISICO: { title: 'FÍSICO', colorClass: 'cat-banner--blue' },
  LOCATIVO: { title: 'DE SEGURIDAD / LOCATIVO / MECÁNICOS', colorClass: 'cat-banner--amber' },
  MECANICOS: { title: 'MECÁNICOS', colorClass: 'cat-banner--amber' },
  ELECTRICO: { title: 'ELÉCTRICO', colorClass: 'cat-banner--yellow' },
  OTROS: { title: 'OTROS DE SEGURIDAD', colorClass: 'cat-banner--gray' },
  QUIMICO: { title: 'QUÍMICO', colorClass: 'cat-banner--teal' },
  BIOLOGICO: { title: 'BIOLÓGICO', colorClass: 'cat-banner--emerald' },
  ERGONOMICO: { title: 'ERGONÓMICO', colorClass: 'cat-banner--purple' },
  PSICOSOCIAL: { title: 'PSICOSOCIAL', colorClass: 'cat-banner--rose' },
}

export function Hoja2Form({ value, onChange }: Hoja2FormProps) {
  const handlePuestoNameChange = (index: number, newName: string) => {
    const updated = [...value.puestos]
    updated[index] = newName
    onChange({ ...value, puestos: updated })
  }

  const handleToggleRisk = (riesgoId: string, puestoIdx: number) => {
    const updatedRiesgos = value.riesgos.map((r) => {
      if (r.id !== riesgoId) return r
      const newPuestos = [...r.puestos]
      newPuestos[puestoIdx] = !newPuestos[puestoIdx]
      return { ...r, puestos: newPuestos }
    })
    onChange({ ...value, riesgos: updatedRiesgos })
  }

  const handleOtrosDetailChange = (riesgoId: string, detalle: string) => {
    const updatedRiesgos = value.riesgos.map((r) => {
      if (r.id !== riesgoId) return r
      return { ...r, otrosDetalle: detalle }
    })
    onChange({ ...value, riesgos: updatedRiesgos })
  }

  const handleMedidaChange = (puestoIdx: number, medida: string) => {
    const updatedMedidas = [...value.medidasPreventivas]
    updatedMedidas[puestoIdx] = medida
    onChange({ ...value, medidasPreventivas: updatedMedidas })
  }

  // Group risks by category
  const categorias: RiesgoItem['categoria'][] = [
    'FISICO',
    'LOCATIVO',
    'ELECTRICO',
    'OTROS',
    'QUIMICO',
    'BIOLOGICO',
    'ERGONOMICO',
    'PSICOSOCIAL',
  ]

  return (
    <div className="doc-sheet">
      <div className="doc-banner doc-banner--teal">
        <h2>G. FACTORES DE RIESGO DEL TRABAJO ACTUAL - HOJA 2 DE 3</h2>
      </div>

      <div className="doc-alert-info">
        Identificación de factores de riesgo ocupacionales por puesto de trabajo (1 al 7). Marque con un clic las casillas de los riesgos presentes.
      </div>

      {/* Puestos Header Config */}
      <fieldset className="doc-section">
        <legend className="doc-section__title">DEFINICIÓN DE PUESTOS DE TRABAJO (1 A 7)</legend>
        <div className="puestos-grid">
          {value.puestos.map((puesto, idx) => (
            <div key={idx} className="field">
              <span>Puesto {idx + 1}</span>
              <input
                type="text"
                placeholder={`Nombre Puesto ${idx + 1}`}
                value={puesto}
                onChange={(e) => handlePuestoNameChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Risk Matrix Table */}
      <div className="table-wrap risk-table-container">
        <table className="data-table risk-table">
          <thead>
            <tr>
              <th className="risk-col-name">FACTORES DE RIESGO</th>
              {value.puestos.map((p, idx) => (
                <th key={idx} className="risk-col-puesto" title={p}>
                  <div className="puesto-th-badge">{idx + 1}</div>
                  <span className="puesto-th-label">{p.split(':')[0]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categorias.map((catKey) => {
              const catRiesgos = value.riesgos.filter((r) => r.categoria === catKey)
              if (catRiesgos.length === 0) return null

              const catInfo = CATEGORIA_LABELS[catKey]

              return (
                <template key={catKey}>
                  <tr className={`category-header-row ${catInfo.colorClass}`}>
                    <td colSpan={8}>
                      <strong>{catInfo.title}</strong>
                    </td>
                  </tr>
                  {catRiesgos.map((riesgo) => (
                    <tr key={riesgo.id} className="risk-row">
                      <td className="risk-name-cell">
                        <span>{riesgo.nombre}</span>
                        {riesgo.nombre.toLowerCase().includes('otros') && (
                          <input
                            type="text"
                            className="inline-input-sm"
                            placeholder="Detallar..."
                            value={riesgo.otrosDetalle ?? ''}
                            onChange={(e) => handleOtrosDetailChange(riesgo.id, e.target.value)}
                          />
                        )}
                      </td>
                      {riesgo.puestos.map((checked, pIdx) => (
                        <td key={pIdx} className="risk-cell">
                          <button
                            type="button"
                            className={`risk-check-btn ${checked ? 'risk-check-btn--checked' : ''}`}
                            onClick={() => handleToggleRisk(riesgo.id, pIdx)}
                            title={`Alternar ${riesgo.nombre} en Puesto ${pIdx + 1}`}
                          >
                            {checked ? '✓' : ''}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </template>
              )
            })}

            {/* Medidas Preventivas Row */}
            <tr className="medidas-header-row">
              <td colSpan={8}>
                <strong>MEDIDAS PREVENTIVAS POR PUESTO DE TRABAJO</strong>
              </td>
            </tr>
            <tr className="medidas-row">
              <td className="risk-name-cell">
                <strong>Recomendaciones / Medidas de Control</strong>
              </td>
              {value.medidasPreventivas.map((medida, idx) => (
                <td key={idx} className="medida-cell">
                  <textarea
                    rows={3}
                    placeholder={`Medidas para Puesto ${idx + 1}...`}
                    value={medida}
                    onChange={(e) => handleMedidaChange(idx, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
