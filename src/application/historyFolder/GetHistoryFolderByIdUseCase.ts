import type { HistoryFolder } from '@/domain/historyFolder/HistoryFolder'
import type { HistoryFolderRepository } from '@/domain/historyFolder/HistoryFolderRepository'

export class GetHistoryFolderByIdUseCase {
  private readonly repository: HistoryFolderRepository

  constructor(repository: HistoryFolderRepository) {
    this.repository = repository
  }

  execute(id: string): Promise<HistoryFolder | null> {
    return this.repository.findById(id)
  }
}
