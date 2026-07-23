import type { HistoryFolder } from '@/domain/historyFolder/HistoryFolder'
import type { HistoryFolderRepository } from '@/domain/historyFolder/HistoryFolderRepository'

export class GetHistoryFoldersUseCase {
  private readonly repository: HistoryFolderRepository

  constructor(repository: HistoryFolderRepository) {
    this.repository = repository
  }

  execute(patientId: string): Promise<HistoryFolder[]> {
    return this.repository.findByPatientId(patientId)
  }
}
