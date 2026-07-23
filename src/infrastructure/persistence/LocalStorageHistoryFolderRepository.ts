import type {
  HistoryFolder,
  HistoryFolderInput,
} from '@/domain/historyFolder/HistoryFolder'
import type { HistoryFolderRepository } from '@/domain/historyFolder/HistoryFolderRepository'

const STORAGE_KEY = 'medocupacional_history_folders'

function readAll(): HistoryFolder[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw) as HistoryFolder[]
}

function writeAll(folders: HistoryFolder[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(folders))
}

export class LocalStorageHistoryFolderRepository implements HistoryFolderRepository {
  async findByPatientId(patientId: string): Promise<HistoryFolder[]> {
    return readAll()
      .filter((f) => f.patientId === patientId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.createdAt.localeCompare(a.createdAt))
  }

  async findById(id: string): Promise<HistoryFolder | null> {
    return readAll().find((f) => f.id === id) ?? null
  }

  async create(data: HistoryFolderInput): Promise<HistoryFolder> {
    const now = new Date().toISOString()
    const folder: HistoryFolder = {
      id: crypto.randomUUID(),
      patientId: data.patientId,
      fecha: data.fecha,
      titulo: data.titulo,
      createdAt: now,
      updatedAt: now,
    }
    const all = readAll()
    all.push(folder)
    writeAll(all)
    return folder
  }

  async delete(id: string): Promise<void> {
    writeAll(readAll().filter((f) => f.id !== id))
  }
}
