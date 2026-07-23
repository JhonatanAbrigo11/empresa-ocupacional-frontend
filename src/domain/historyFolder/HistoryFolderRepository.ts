import type { HistoryFolder, HistoryFolderInput } from './HistoryFolder'

export interface HistoryFolderRepository {
  findByPatientId(patientId: string): Promise<HistoryFolder[]>
  findById(id: string): Promise<HistoryFolder | null>
  create(data: HistoryFolderInput): Promise<HistoryFolder>
  delete(id: string): Promise<void>
}
