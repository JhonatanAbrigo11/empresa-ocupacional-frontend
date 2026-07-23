import type { Patient, PatientInput } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

const STORAGE_KEY = 'medocupacional_patients'

const SEED: Patient[] = [
  {
    id: '1',
    nombre: 'Ana María Rodríguez',
    cedula: '1712345678',
    empresa: 'Constructora Andina S.A.',
    cargo: 'Ingeniera de seguridad',
    telefono: '0991234567',
    email: 'ana.rodriguez@andina.com',
    fechaNacimiento: '1990-04-12',
    sexo: 'F',
    fechaIngreso: '2019-03-01',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    nombre: 'Carlos Eduardo Pérez',
    cedula: '0912345678',
    empresa: 'Petroquímica del Pacífico',
    cargo: 'Operador de planta',
    telefono: '0987654321',
    email: 'carlos.perez@petropac.com',
    fechaNacimiento: '1985-11-03',
    sexo: 'M',
    fechaIngreso: '2015-07-15',
    createdAt: '2024-02-05T10:00:00.000Z',
    updatedAt: '2024-02-05T10:00:00.000Z',
  },
  {
    id: '3',
    nombre: 'Lucía Fernanda Mora',
    cedula: '1756789012',
    empresa: 'Alimentos Sierra Verde',
    cargo: 'Supervisora de calidad',
    telefono: '0971122334',
    email: 'lucia.mora@sierraverde.com',
    fechaNacimiento: '1993-08-22',
    sexo: 'F',
    fechaIngreso: '2021-01-20',
    createdAt: '2024-03-12T10:00:00.000Z',
    updatedAt: '2024-03-12T10:00:00.000Z',
  },
]

function read(): Patient[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return [...SEED]
  }
  return JSON.parse(raw) as Patient[]
}

function write(patients: Patient[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
}

export class LocalStoragePatientRepository implements PatientRepository {
  async findAll(): Promise<Patient[]> {
    return read().sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  async findById(id: string): Promise<Patient | null> {
    return read().find((p) => p.id === id) ?? null
  }

  async create(data: PatientInput): Promise<Patient> {
    const patients = read()
    const now = new Date().toISOString()
    const patient: Patient = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    patients.push(patient)
    write(patients)
    return patient
  }

  async update(id: string, data: PatientInput): Promise<Patient> {
    const patients = read()
    const index = patients.findIndex((p) => p.id === id)
    if (index === -1) throw new Error('Paciente no encontrado')

    const updated: Patient = {
      ...patients[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    patients[index] = updated
    write(patients)
    return updated
  }

  async delete(id: string): Promise<void> {
    write(read().filter((p) => p.id !== id))
  }
}
