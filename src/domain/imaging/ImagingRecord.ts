export interface ImagingRecord {
  folderId: string
  patientId: string
  estudiosImagenes: string
  otros: string
  diagnosticos: string
  cie10: string
  tratamientoIngreso: string
  tratamientoEgreso: string
  especialidad: string
  updatedAt: string
}

export type ImagingRecordInput = Omit<ImagingRecord, 'updatedAt'>
