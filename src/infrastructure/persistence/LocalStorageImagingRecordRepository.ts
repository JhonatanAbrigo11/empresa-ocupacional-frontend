import type {
  ImagingRecord,
  ImagingRecordInput,
} from '@/domain/imaging/ImagingRecord'
import type { ImagingRecordRepository } from '@/domain/imaging/ImagingRecordRepository'

const STORAGE_KEY = 'medocupacional_imaging_records_v2'

function readAll(): Record<string, ImagingRecord> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  return JSON.parse(raw) as Record<string, ImagingRecord>
}

function writeAll(data: Record<string, ImagingRecord>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export class LocalStorageImagingRecordRepository implements ImagingRecordRepository {
  async findByFolderId(folderId: string): Promise<ImagingRecord | null> {
    return readAll()[folderId] ?? null
  }

  async save(data: ImagingRecordInput): Promise<ImagingRecord> {
    const all = readAll()
    const record: ImagingRecord = {
      ...data,
      updatedAt: new Date().toISOString(),
    }
    all[data.folderId] = record
    writeAll(all)
    return record
  }

  async deleteByFolderId(folderId: string): Promise<void> {
    const all = readAll()
    delete all[folderId]
    writeAll(all)
  }
}
