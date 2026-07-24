import type {
  InmunizacionDosis,
  InmunizacionVacuna,
  InmunizacionesDocument,
} from '@/domain/inmunizaciones/types'

interface Props {
  value: InmunizacionesDocument
  onChange: (value: InmunizacionesDocument) => void
}

function VacunasTable({
  vacunas,
  onChangeVacuna,
  onChangeDosis,
}: {
  vacunas: InmunizacionVacuna[]
  onChangeVacuna: (vacunaId: string, nombre: string) => void
  onChangeDosis: (
    vacunaId: string,
    dosisIndex: number,
    patch: Partial<InmunizacionDosis>,
  ) => void
}) {
  return (
    <div className="inm-table-wrap">
      <table className="inm-table">
        <thead>
          <tr>
            <th>Vacunas</th>
            <th>Dosis</th>
            <th>Fecha</th>
            <th>Lote</th>
            <th>Esquema completo</th>
            <th>Responsable de la vacunación</th>
            <th>Establecimiento de salud</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {vacunas.map((vacuna) =>
            vacuna.dosis.map((dosis, dosisIndex) => (
              <tr key={`${vacuna.id}-${dosisIndex}`}>
                {dosisIndex === 0 && (
                  <td rowSpan={vacuna.dosis.length} className="inm-table__vacuna">
                    {vacuna.nombreEditable ? (
                      <input
                        type="text"
                        value={vacuna.nombre}
                        onChange={(e) => onChangeVacuna(vacuna.id, e.target.value)}
                        placeholder="Nombre de vacuna"
                      />
                    ) : (
                      <strong>{vacuna.nombre}</strong>
                    )}
                  </td>
                )}
                <td className="inm-table__dosis">{dosis.etiqueta}</td>
                <td>
                  <input
                    type="date"
                    value={dosis.fecha}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, { fecha: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dosis.lote}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, { lote: e.target.value })
                    }
                  />
                </td>
                <td className="inm-table__check">
                  <input
                    type="checkbox"
                    checked={dosis.esquemaCompleto}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, {
                        esquemaCompleto: e.target.checked,
                      })
                    }
                    aria-label="Esquema completo"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dosis.responsable}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, {
                        responsable: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dosis.establecimiento}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, {
                        establecimiento: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={dosis.observaciones}
                    onChange={(e) =>
                      onChangeDosis(vacuna.id, dosisIndex, {
                        observaciones: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}

export function InmunizacionesForm({ value, onChange }: Props) {
  const updateSeccionA = (fields: Partial<InmunizacionesDocument['seccionA']>) => {
    onChange({
      ...value,
      seccionA: { ...value.seccionA, ...fields },
    })
  }

  const updateVacunaNombre = (
    listKey: 'vacunasBase' | 'vacunasRiesgo',
    vacunaId: string,
    nombre: string,
  ) => {
    onChange({
      ...value,
      [listKey]: value[listKey].map((v) =>
        v.id === vacunaId ? { ...v, nombre } : v,
      ),
    })
  }

  const updateDosis = (
    listKey: 'vacunasBase' | 'vacunasRiesgo',
    vacunaId: string,
    dosisIndex: number,
    patch: Partial<InmunizacionDosis>,
  ) => {
    onChange({
      ...value,
      [listKey]: value[listKey].map((v) => {
        if (v.id !== vacunaId) return v
        return {
          ...v,
          dosis: v.dosis.map((d, i) => (i === dosisIndex ? { ...d, ...patch } : d)),
        }
      }),
    })
  }

  const a = value.seccionA

  return (
    <div className="doc-sheet">
      <div className="doc-banner doc-banner--teal">
        <h2>REGISTRO DE INMUNIZACIONES</h2>
      </div>

      <fieldset className="doc-section">
        <legend className="doc-section__title">
          A. DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO
        </legend>
        <div className="doc-grid doc-grid--6">
          <div className="field field--span-2">
            <span>Institución del Sistema o Nombre de la Empresa</span>
            <input
              type="text"
              value={a.institucionEmpresa}
              onChange={(e) => updateSeccionA({ institucionEmpresa: e.target.value })}
            />
          </div>
          <div className="field">
            <span>RUC</span>
            <input
              type="text"
              value={a.ruc}
              onChange={(e) => updateSeccionA({ ruc: e.target.value })}
            />
          </div>
          <div className="field">
            <span>CIIU</span>
            <input
              type="text"
              value={a.ciiu}
              onChange={(e) => updateSeccionA({ ciiu: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Establecimiento de Salud</span>
            <input
              type="text"
              value={a.establecimientoSalud}
              onChange={(e) => updateSeccionA({ establecimientoSalud: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Nº Historia Clínica</span>
            <input
              type="text"
              value={a.numeroHistoriaClinica}
              onChange={(e) => updateSeccionA({ numeroHistoriaClinica: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Nº Archivo</span>
            <input
              type="text"
              value={a.numeroArchivo}
              onChange={(e) => updateSeccionA({ numeroArchivo: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Primer Apellido</span>
            <input
              type="text"
              value={a.primerApellido}
              onChange={(e) => updateSeccionA({ primerApellido: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Segundo Apellido</span>
            <input
              type="text"
              value={a.segundoApellido}
              onChange={(e) => updateSeccionA({ segundoApellido: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Primer Nombre</span>
            <input
              type="text"
              value={a.primerNombre}
              onChange={(e) => updateSeccionA({ primerNombre: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Segundo Nombre</span>
            <input
              type="text"
              value={a.segundoNombre}
              onChange={(e) => updateSeccionA({ segundoNombre: e.target.value })}
            />
          </div>
          <div className="field">
            <span>Sexo</span>
            <select
              value={a.sexo}
              onChange={(e) => updateSeccionA({ sexo: e.target.value })}
            >
              <option value="">—</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="field">
            <span>Cargo / Ocupación</span>
            <input
              type="text"
              value={a.cargoOcupacion}
              onChange={(e) => updateSeccionA({ cargoOcupacion: e.target.value })}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="doc-section">
        <legend className="doc-section__title">B. INMUNIZACIONES</legend>
        <VacunasTable
          vacunas={value.vacunasBase}
          onChangeVacuna={(id, nombre) => updateVacunaNombre('vacunasBase', id, nombre)}
          onChangeDosis={(id, index, patch) =>
            updateDosis('vacunasBase', id, index, patch)
          }
        />
      </fieldset>

      <fieldset className="doc-section">
        <legend className="doc-section__title">
          INMUNIZACIONES DE ACUERDO AL TIPO DE EMPRESA Y RIESGO
        </legend>
        <VacunasTable
          vacunas={value.vacunasRiesgo}
          onChangeVacuna={(id, nombre) => updateVacunaNombre('vacunasRiesgo', id, nombre)}
          onChangeDosis={(id, index, patch) =>
            updateDosis('vacunasRiesgo', id, index, patch)
          }
        />
        <p className="inm-note">
          La vacuna contra la Fiebre Amarilla es obligatoria para quien viva o se desplace
          en la Región Amazónica, su aplicación es hasta los 59 años de edad.
        </p>
      </fieldset>
    </div>
  )
}
