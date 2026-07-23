import type { ClinicalHistory, ClinicalHistoryInput } from './ClinicalHistory'

export interface ClinicalHistoryRepository {
  findByFolderId(folderId: string): Promise<ClinicalHistory | null>
  save(data: ClinicalHistoryInput): Promise<ClinicalHistory>
  deleteByFolderId(folderId: string): Promise<void>
}
