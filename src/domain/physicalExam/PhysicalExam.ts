export interface LabResult {
  id: string
  grupo: 'BIOMETRIA' | 'QUIMICA SANGUINEA' | 'OTROS'
  prueba: string
  fecha: string
  resultado: string
}

export interface PhysicalExam {
  folderId: string
  patientId: string
  examenFisico: string
  laboratorio: LabResult[]
  updatedAt: string
}

export type PhysicalExamInput = Omit<PhysicalExam, 'updatedAt'>
