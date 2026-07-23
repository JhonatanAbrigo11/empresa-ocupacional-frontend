import type { PhysicalExam } from '@/domain/physicalExam/PhysicalExam'
import type { PhysicalExamRepository } from '@/domain/physicalExam/PhysicalExamRepository'

export class GetPhysicalExamUseCase {
  private readonly repository: PhysicalExamRepository

  constructor(repository: PhysicalExamRepository) {
    this.repository = repository
  }

  execute(folderId: string): Promise<PhysicalExam | null> {
    return this.repository.findByFolderId(folderId)
  }
}
