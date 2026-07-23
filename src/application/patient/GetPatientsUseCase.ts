import type { Patient } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

export class GetPatientsUseCase {
  private readonly repository: PatientRepository

  constructor(repository: PatientRepository) {
    this.repository = repository
  }

  execute(): Promise<Patient[]> {
    return this.repository.findAll()
  }
}
