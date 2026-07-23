import type {
  ImagingRecord,
  ImagingRecordInput,
} from '@/domain/imaging/ImagingRecord'
import type { ImagingRecordRepository } from '@/domain/imaging/ImagingRecordRepository'

export class SaveImagingRecordUseCase {
  private readonly repository: ImagingRecordRepository

  constructor(repository: ImagingRecordRepository) {
    this.repository = repository
  }

  execute(data: ImagingRecordInput): Promise<ImagingRecord> {
    if (!data.folderId) throw new Error('Carpeta de historial requerida')
    return this.repository.save(data)
  }
}
