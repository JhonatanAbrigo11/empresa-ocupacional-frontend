import type { Patient, PatientInput } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

export class CreatePatientUseCase {
  private readonly repository: PatientRepository

  constructor(repository: PatientRepository) {
    this.repository = repository
  }

  execute(data: PatientInput): Promise<Patient> {
    this.validate(data)
    return this.repository.create(data)
  }

  private validate(data: PatientInput): void {
    if (!data.nombre.trim()) throw new Error('El nombre es obligatorio')
    if (!data.cedula.trim()) throw new Error('La cédula es obligatoria')
    if (!data.empresa.trim()) throw new Error('La empresa es obligatoria')
  }
}
