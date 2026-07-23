import type {
  ClinicalHistory,
  ClinicalHistoryInput,
} from '@/domain/clinicalHistory/ClinicalHistory'
import type { ClinicalHistoryRepository } from '@/domain/clinicalHistory/ClinicalHistoryRepository'

export class SaveClinicalHistoryUseCase {
  private readonly repository: ClinicalHistoryRepository

  constructor(repository: ClinicalHistoryRepository) {
    this.repository = repository
  }

  execute(data: ClinicalHistoryInput): Promise<ClinicalHistory> {
    if (!data.folderId) throw new Error('Carpeta de historial requerida')
    return this.repository.save(data)
  }
}
