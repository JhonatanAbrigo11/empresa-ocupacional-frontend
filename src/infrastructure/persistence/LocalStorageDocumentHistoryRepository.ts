import type { PatientDocumentRecord } from '@/domain/patientDocument/PatientDocument'

const STORAGE_KEY = 'medocupacional_patient_documents'

const SEED_DOCUMENTS: PatientDocumentRecord[] = [
  {
    id: 'doc_rec_1',
    patientId: '1', // Ana María Rodríguez
    tipoDocumento: 'HISTORIA_CLINICA',
    titulo: 'Historia Clínica Ocupacional (3 Hojas)',
    fechaGuardado: '2026-07-23',
    fechaEmision: '2026-07-23',
    tipoEvaluacion: 'PERIÓDICO',
    aptitud: 'APTO CON LIMITACIONES',
    numFormulario: 'HC-1712345678',
    medicoNombre: 'Dr. Roberto Silva P.',
    observaciones: 'Evaluación médica periódica anual. Astenopia leve por PVD.',
  },
  {
    id: 'doc_rec_2',
    patientId: '1', // Ana María Rodríguez
    tipoDocumento: 'CERTIFICADO_MEDICO',
    titulo: 'Certificado - Evaluación Médica Ocupacional',
    fechaGuardado: '2026-07-23',
    fechaEmision: '2026-07-23',
    tipoEvaluacion: 'PERIÓDICO',
    aptitud: 'APTO CON LIMITACIONES',
    numFormulario: 'CERT-1712345678',
    medicoNombre: 'Dr. Roberto Silva P.',
    observaciones: 'Certificación oficial emitida para Constructora Andina S.A.',
  },
  {
    id: 'doc_rec_3',
    patientId: '1', // Ana María Rodríguez
    tipoDocumento: 'HISTORIA_CLINICA',
    titulo: 'Historia Clínica Ocupacional (Ingreso)',
    fechaGuardado: '2025-03-15',
    fechaEmision: '2025-03-15',
    tipoEvaluacion: 'INGRESO',
    aptitud: 'APTO',
    numFormulario: 'HC-1712345678-2025',
    medicoNombre: 'Dra. Elena Ramos',
    observaciones: 'Examen de ingreso sin novedades patológicas.',
  },
  {
    id: 'doc_rec_4',
    patientId: '2', // Carlos Eduardo Pérez
    tipoDocumento: 'HISTORIA_CLINICA',
    titulo: 'Historia Clínica Ocupacional (3 Hojas)',
    fechaGuardado: '2026-06-10',
    fechaEmision: '2026-06-10',
    tipoEvaluacion: 'PERIÓDICO',
    aptitud: 'APTO',
    numFormulario: 'HC-0912345678',
    medicoNombre: 'Dr. Roberto Silva P.',
    observaciones: 'Evaluación periódica en Petroquímica del Pacífico.',
  },
  {
    id: 'doc_rec_5',
    patientId: '2', // Carlos Eduardo Pérez
    tipoDocumento: 'CERTIFICADO_MEDICO',
    titulo: 'Certificado - Evaluación Médica Ocupacional',
    fechaGuardado: '2026-06-10',
    fechaEmision: '2026-06-10',
    tipoEvaluacion: 'PERIÓDICO',
    aptitud: 'APTO',
    numFormulario: 'CERT-0912345678',
    medicoNombre: 'Dr. Roberto Silva P.',
    observaciones: 'Apto para puesto de Operador de Planta.',
  },
]

function read(): PatientDocumentRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DOCUMENTS))
    return [...SEED_DOCUMENTS]
  }
  return JSON.parse(raw) as PatientDocumentRecord[]
}

function write(docs: PatientDocumentRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs))
}

export class LocalStorageDocumentHistoryRepository {
  async getByPatientId(patientId: string): Promise<PatientDocumentRecord[]> {
    const all = read()
    return all
      .filter((d) => d.patientId === patientId)
      .sort((a, b) => b.fechaGuardado.localeCompare(a.fechaGuardado))
  }

  async addRecord(record: Omit<PatientDocumentRecord, 'id'>): Promise<PatientDocumentRecord> {
    const all = read()
    const newRecord: PatientDocumentRecord = {
      ...record,
      id: `doc_rec_${Date.now()}`,
    }
    all.unshift(newRecord)
    write(all)
    return newRecord
  }

  async deleteRecord(id: string): Promise<void> {
    const all = read()
    write(all.filter((d) => d.id !== id))
  }
}

export const documentHistoryRepo = new LocalStorageDocumentHistoryRepository()
