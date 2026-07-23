import type {
  HistoryFolder,
  HistoryFolderInput,
} from '@/domain/historyFolder/HistoryFolder'
import type { HistoryFolderRepository } from '@/domain/historyFolder/HistoryFolderRepository'

export class CreateHistoryFolderUseCase {
  private readonly repository: HistoryFolderRepository

  constructor(repository: HistoryFolderRepository) {
    this.repository = repository
  }

  execute(data: HistoryFolderInput): Promise<HistoryFolder> {
    if (!data.patientId) throw new Error('Paciente requerido')
    if (!data.fecha.trim()) throw new Error('La fecha es obligatoria')
    return this.repository.create({
      ...data,
      titulo: data.titulo.trim() || `Historia clínica ${data.fecha}`,
    })
  }
}
