export type DocumentType = 'HISTORIA_CLINICA' | 'CERTIFICADO_MEDICO'

export interface PatientDocumentRecord {
  id: string
  patientId: string
  tipoDocumento: DocumentType
  titulo: string
  fechaGuardado: string // YYYY-MM-DD or ISO timestamp
  fechaEmision: string
  tipoEvaluacion: 'INGRESO' | 'PERIÓDICO' | 'REINTEGRO' | 'RETIRO' | ''
  aptitud: 'APTO' | 'APTO EN OBSERVACIÓN' | 'APTO CON LIMITACIONES' | 'NO APTO' | ''
  numFormulario: string
  medicoNombre: string
  observaciones: string
  dataPayload?: unknown
}
