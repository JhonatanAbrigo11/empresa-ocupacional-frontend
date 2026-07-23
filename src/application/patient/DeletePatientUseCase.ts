import type { PatientRepository } from '@/domain/patient/PatientRepository'

export class DeletePatientUseCase {
  private readonly repository: PatientRepository

  constructor(repository: PatientRepository) {
    this.repository = repository
  }

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id)
    if (!existing) throw new Error('Paciente no encontrado')
    return this.repository.delete(id)
  }
}
