import type { LabResult, PhysicalExamInput } from '@/domain/physicalExam/PhysicalExam'

const LAB_CATALOG: Array<{
  id: string
  grupo: LabResult['grupo']
  prueba: string
}> = [
  { id: 'hb', grupo: 'BIOMETRIA', prueba: 'HB' },
  { id: 'hto', grupo: 'BIOMETRIA', prueba: 'HTO' },
  { id: 'gr', grupo: 'BIOMETRIA', prueba: 'GR' },
  { id: 'gb', grupo: 'BIOMETRIA', prueba: 'GB' },
  { id: 'seg', grupo: 'BIOMETRIA', prueba: 'SEG' },
  { id: 'linf', grupo: 'BIOMETRIA', prueba: 'LINF' },
  { id: 'mid', grupo: 'BIOMETRIA', prueba: 'MID' },
  { id: 'plt', grupo: 'BIOMETRIA', prueba: 'PLT' },
  { id: 'glicemia', grupo: 'QUIMICA SANGUINEA', prueba: 'GLICEMIA' },
  { id: 'urea', grupo: 'QUIMICA SANGUINEA', prueba: 'UREA' },
  { id: 'creatinina', grupo: 'QUIMICA SANGUINEA', prueba: 'CREATININA' },
  { id: 'colesterol', grupo: 'QUIMICA SANGUINEA', prueba: 'COLESTEROL' },
  { id: 'trigliceridos', grupo: 'QUIMICA SANGUINEA', prueba: 'TRIGLICERIDOS' },
  { id: 'hdl', grupo: 'QUIMICA SANGUINEA', prueba: 'HDL' },
  { id: 'ldl', grupo: 'QUIMICA SANGUINEA', prueba: 'LDL' },
  { id: 'acido_urico', grupo: 'QUIMICA SANGUINEA', prueba: 'ACIDO URICO' },
  { id: 'tgo', grupo: 'QUIMICA SANGUINEA', prueba: 'TGO' },
  { id: 'tgp', grupo: 'QUIMICA SANGUINEA', prueba: 'TGP' },
  { id: 'ggt', grupo: 'QUIMICA SANGUINEA', prueba: 'GGT' },
  { id: 'helicobacter', grupo: 'OTROS', prueba: 'HELICOBACTER PYLORI' },
  { id: 'adenovirus', grupo: 'OTROS', prueba: 'ADENOVIRUS' },
  { id: 'rotavirus', grupo: 'OTROS', prueba: 'ROTAVIRUS' },
  { id: 'dengue', grupo: 'OTROS', prueba: 'DENGUE' },
  { id: 'copro', grupo: 'OTROS', prueba: 'COPRO' },
  { id: 'emo', grupo: 'OTROS', prueba: 'EMO' },
]

export function createEmptyPhysicalExam(
  folderId: string,
  patientId: string,
): PhysicalExamInput {
  return {
    folderId,
    patientId,
    examenFisico: '',
    laboratorio: LAB_CATALOG.map((item) => ({
      ...item,
      fecha: '',
      resultado: '',
    })),
  }
}

export function mergePhysicalExam(
  folderId: string,
  patientId: string,
  existing: PhysicalExamInput | null,
): PhysicalExamInput {
  const base = createEmptyPhysicalExam(folderId, patientId)
  if (!existing) return base

  const byId = new Map(existing.laboratorio.map((row) => [row.id, row]))

  return {
    folderId,
    patientId,
    examenFisico: existing.examenFisico,
    laboratorio: base.laboratorio.map((row) => {
      const saved = byId.get(row.id)
      return saved
        ? { ...row, fecha: saved.fecha, resultado: saved.resultado }
        : row
    }),
  }
}
