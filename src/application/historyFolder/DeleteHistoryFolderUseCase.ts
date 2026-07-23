import type { HistoryFolderRepository } from '@/domain/historyFolder/HistoryFolderRepository'
import type { ClinicalHistoryRepository } from '@/domain/clinicalHistory/ClinicalHistoryRepository'
import type { PhysicalExamRepository } from '@/domain/physicalExam/PhysicalExamRepository'
import type { ImagingRecordRepository } from '@/domain/imaging/ImagingRecordRepository'

export class DeleteHistoryFolderUseCase {
  private readonly folders: HistoryFolderRepository
  private readonly histories: ClinicalHistoryRepository
  private readonly exams: PhysicalExamRepository
  private readonly imaging: ImagingRecordRepository

  constructor(
    folders: HistoryFolderRepository,
    histories: ClinicalHistoryRepository,
    exams: PhysicalExamRepository,
    imaging: ImagingRecordRepository,
  ) {
    this.folders = folders
    this.histories = histories
    this.exams = exams
    this.imaging = imaging
  }

  async execute(id: string): Promise<void> {
    const existing = await this.folders.findById(id)
    if (!existing) throw new Error('Carpeta no encontrada')
    await this.histories.deleteByFolderId(id)
    await this.exams.deleteByFolderId(id)
    await this.imaging.deleteByFolderId(id)
    await this.folders.delete(id)
  }
}
