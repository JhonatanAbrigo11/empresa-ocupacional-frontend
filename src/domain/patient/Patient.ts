export type Sexo = 'M' | 'F' | 'Otro'

export interface Patient {
  id: string
  nombre: string
  cedula: string
  empresa: string
  cargo: string
  telefono: string
  email: string
  fechaNacimiento: string
  sexo: Sexo
  fechaIngreso: string
  createdAt: string
  updatedAt: string
}

export type PatientInput = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>
