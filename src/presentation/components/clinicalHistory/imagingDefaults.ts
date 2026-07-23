import type { ImagingRecordInput } from '@/domain/imaging/ImagingRecord'

export function createEmptyImagingRecord(
  folderId: string,
  patientId: string,
): ImagingRecordInput {
  return {
    folderId,
    patientId,
    estudiosImagenes: '',
    otros: '',
    diagnosticos: '',
    cie10: '',
    tratamientoIngreso: '',
    tratamientoEgreso: '',
    especialidad: 'MEDICINA GENERAL',
  }
}
