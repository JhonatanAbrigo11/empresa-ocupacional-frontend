import type {
  PhysicalExam,
  PhysicalExamInput,
} from '@/domain/physicalExam/PhysicalExam'
import type { PhysicalExamRepository } from '@/domain/physicalExam/PhysicalExamRepository'

export class SavePhysicalExamUseCase {
  private readonly repository: PhysicalExamRepository

  constructor(repository: PhysicalExamRepository) {
    this.repository = repository
  }

  execute(data: PhysicalExamInput): Promise<PhysicalExam> {
    if (!data.folderId) throw new Error('Carpeta de historial requerida')
    return this.repository.save(data)
  }
}
