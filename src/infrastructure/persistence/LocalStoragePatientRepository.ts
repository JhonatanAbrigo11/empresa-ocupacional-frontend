import type { Patient, PatientInput } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

const STORAGE_KEY = 'medocupacional_patients'

const SEED: Patient[] = [
  {
    id: '1',
    nombre: 'Rodríguez Ana María',
    primerApellido: 'RODRÍGUEZ',
    segundoApellido: 'PÉRICO',
    primerNombre: 'ANA',
    segundoNombre: 'MARÍA',
    cedula: '1712345678',
    sexo: 'F',
    fechaNacimiento: '1990-04-12',
    grupoSanguineo: 'O+',
    lateralidad: 'diestr@',
    empresa: 'Constructora Andina S.A.',
    cargo: 'Ingeniera de seguridad',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '1792123456001',
    ciiu: '4100',
    establecimiento: 'Constructora Andina - Planta Quitumbe',
    puestoTrabajoCiuo: 'INGENIERA DE SEGURIDAD CIUO 2149',
    fechaIngreso: '2019-03-01',
    numHistoriaClinica: 'HC-1712345678',
    numArchivo: 'ARCH-102',
    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    telefono: '0991234567',
    email: 'ana.rodriguez@andina.com',
    direccion: 'Av. Amazonas N24-12, Quito',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    nombre: 'Pérez Carlos Eduardo',
    primerApellido: 'PÉREZ',
    segundoApellido: 'GARCÍA',
    primerNombre: 'CARLOS',
    segundoNombre: 'EDUARDO',
    cedula: '0912345678',
    sexo: 'M',
    fechaNacimiento: '1985-11-03',
    grupoSanguineo: 'A+',
    lateralidad: 'diestr@',
    empresa: 'Petroquímica del Pacífico',
    cargo: 'Operador de planta',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '0998765432001',
    ciiu: '2011',
    establecimiento: 'Petroquímica del Pacífico - Refinería',
    puestoTrabajoCiuo: 'OPERADOR DE PLANTA CIUO 3133',
    fechaIngreso: '2015-07-15',
    numHistoriaClinica: 'HC-0912345678',
    numArchivo: 'ARCH-205',
    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    telefono: '0987654321',
    email: 'carlos.perez@petropac.com',
    direccion: 'Vía a Daule Km 8.5, Guayaquil',
    createdAt: '2024-02-05T10:00:00.000Z',
    updatedAt: '2024-02-05T10:00:00.000Z',
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
