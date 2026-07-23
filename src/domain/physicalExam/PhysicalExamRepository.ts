import type { PhysicalExam, PhysicalExamInput } from './PhysicalExam'

export interface PhysicalExamRepository {
  findByFolderId(folderId: string): Promise<PhysicalExam | null>
  save(data: PhysicalExamInput): Promise<PhysicalExam>
  deleteByFolderId(folderId: string): Promise<void>
}
