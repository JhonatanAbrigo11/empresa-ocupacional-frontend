import type { ClinicalHistory } from '@/domain/clinicalHistory/ClinicalHistory'
import type { ClinicalHistoryRepository } from '@/domain/clinicalHistory/ClinicalHistoryRepository'

export class GetClinicalHistoryUseCase {
  private readonly repository: ClinicalHistoryRepository

  constructor(repository: ClinicalHistoryRepository) {
    this.repository = repository
  }

  execute(folderId: string): Promise<ClinicalHistory | null> {
    return this.repository.findByFolderId(folderId)
  }
}
