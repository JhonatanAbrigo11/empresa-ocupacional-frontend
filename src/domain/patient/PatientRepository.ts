import type { Patient, PatientInput } from './Patient'

/** Puerto de salida: contrato del repositorio de pacientes */
export interface PatientRepository {
  findAll(): Promise<Patient[]>
  findById(id: string): Promise<Patient | null>
  create(data: PatientInput): Promise<Patient>
  update(id: string, data: PatientInput): Promise<Patient>
  delete(id: string): Promise<void>
}
