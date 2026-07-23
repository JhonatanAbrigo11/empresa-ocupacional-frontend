import type {
  PhysicalExam,
  PhysicalExamInput,
} from '@/domain/physicalExam/PhysicalExam'
import type { PhysicalExamRepository } from '@/domain/physicalExam/PhysicalExamRepository'

const STORAGE_KEY = 'medocupacional_physical_exams_v2'

function readAll(): Record<string, PhysicalExam> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  return JSON.parse(raw) as Record<string, PhysicalExam>
}

function writeAll(data: Record<string, PhysicalExam>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export class LocalStoragePhysicalExamRepository implements PhysicalExamRepository {
  async findByFolderId(folderId: string): Promise<PhysicalExam | null> {
    return readAll()[folderId] ?? null
  }

  async save(data: PhysicalExamInput): Promise<PhysicalExam> {
    const all = readAll()
    const exam: PhysicalExam = {
      ...data,
      updatedAt: new Date().toISOString(),
    }
    all[data.folderId] = exam
    writeAll(all)
    return exam
  }

  async deleteByFolderId(folderId: string): Promise<void> {
    const all = readAll()
    delete all[folderId]
    writeAll(all)
  }
}
