import type { Patient } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

export class GetPatientByIdUseCase {
  private readonly repository: PatientRepository

  constructor(repository: PatientRepository) {
    this.repository = repository
  }

  execute(id: string): Promise<Patient | null> {
    return this.repository.findById(id)
  }
}
