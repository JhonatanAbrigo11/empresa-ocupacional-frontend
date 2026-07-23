import type {
  ClinicalHistory,
  ClinicalHistoryInput,
} from '@/domain/clinicalHistory/ClinicalHistory'
import type { ClinicalHistoryRepository } from '@/domain/clinicalHistory/ClinicalHistoryRepository'

const STORAGE_KEY = 'medocupacional_clinical_histories_v2'

function readAll(): Record<string, ClinicalHistory> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  return JSON.parse(raw) as Record<string, ClinicalHistory>
}

function writeAll(data: Record<string, ClinicalHistory>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export class LocalStorageClinicalHistoryRepository
  implements ClinicalHistoryRepository
{
  async findByFolderId(folderId: string): Promise<ClinicalHistory | null> {
    return readAll()[folderId] ?? null
  }

  async save(data: ClinicalHistoryInput): Promise<ClinicalHistory> {
    const all = readAll()
    const history: ClinicalHistory = {
      ...data,
      updatedAt: new Date().toISOString(),
    }
    all[data.folderId] = history
    writeAll(all)
    return history
  }

  async deleteByFolderId(folderId: string): Promise<void> {
    const all = readAll()
    delete all[folderId]
    writeAll(all)
  }
}
