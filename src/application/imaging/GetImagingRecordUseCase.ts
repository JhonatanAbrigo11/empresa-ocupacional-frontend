import type { ImagingRecord } from '@/domain/imaging/ImagingRecord'
import type { ImagingRecordRepository } from '@/domain/imaging/ImagingRecordRepository'

export class GetImagingRecordUseCase {
  private readonly repository: ImagingRecordRepository

  constructor(repository: ImagingRecordRepository) {
    this.repository = repository
  }

  execute(folderId: string): Promise<ImagingRecord | null> {
    return this.repository.findByFolderId(folderId)
  }
}
