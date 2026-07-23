export interface HistoryFolder {
  id: string
  patientId: string
  fecha: string
  titulo: string
  createdAt: string
  updatedAt: string
}

export type HistoryFolderInput = {
  patientId: string
  fecha: string
  titulo: string
}
