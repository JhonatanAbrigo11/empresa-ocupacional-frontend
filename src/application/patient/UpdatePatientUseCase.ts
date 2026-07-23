import type { Patient, PatientInput } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

export class UpdatePatientUseCase {
  private readonly repository: PatientRepository

  constructor(repository: PatientRepository) {
    this.repository = repository
  }

  async execute(id: string, data: PatientInput): Promise<Patient> {
    if (!data.nombre.trim()) throw new Error('El nombre es obligatorio')
    if (!data.cedula.trim()) throw new Error('La cédula es obligatoria')
    if (!data.empresa.trim()) throw new Error('La empresa es obligatoria')

    const existing = await this.repository.findById(id)
    if (!existing) throw new Error('Paciente no encontrado')

    return this.repository.update(id, data)
  }
}
