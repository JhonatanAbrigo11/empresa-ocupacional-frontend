import type { ClinicalHistoryInput } from '@/domain/clinicalHistory/ClinicalHistory'
import type { Patient } from '@/domain/patient/Patient'

function calcAge(fechaNacimiento: string): string {
  if (!fechaNacimiento) return ''
  const birth = new Date(fechaNacimiento)
  if (Number.isNaN(birth.getTime())) return ''
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1
  return String(age)
}

function generoFromSexo(sexo: Patient['sexo']): string {
  if (sexo === 'M') return 'Masculino'
  if (sexo === 'F') return 'Femenino'
  return 'Otro'
}

export function createEmptyHistory(
  folderId: string,
  patientId: string,
  fecha = new Date().toISOString().slice(0, 10),
): ClinicalHistoryInput {
  return {
    folderId,
    patientId,
    numeroHc: '',
    convenio: '',
    fecha,
    nombresApellidos: '',
    nroIdentificacion: '',
    fechaNacimiento: '',
    edad: '',
    genero: '',
    estadoCivil: '',
    escolaridad: '',
    profesionOcupacion: '',
    telefono: '',
    domicilio: '',
    canton: '',
    provincia: '',
    pais: 'Ecuador',
    direccion: '',
    nacionalidad: 'Ecuatoriana',
    motivoConsulta: '',
    cardiovasculares: '',
    metabolicos: '',
    renales: '',
    digestivos: '',
    quirurgicos: '',
    alergicos: '',
    transfusiones: '',
    medicamentos: '',
    alcohol: '',
    drogas: '',
    tabaquismo: '',
    otrosHabitos: '',
    madre: '',
    hijos: '',
    padre: '',
    hermanos: '',
    menarquia: '',
    cicloMenstrual: '',
    partos: '',
    sexarquia: '',
    fum: '',
    gestaciones: '',
    abortos: '',
    anticonceptivos: '',
    cesareas: '',
    enfermedadActual: '',
    presionArterial: '',
    pesoKg: '',
    imc: '',
    frecuenciaCardiaca: '',
    talla: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    sat: '',
  }
}

export function historyFromPatient(
  folderId: string,
  patient: Patient,
  fecha: string,
): ClinicalHistoryInput {
  return {
    ...createEmptyHistory(folderId, patient.id, fecha),
    nombresApellidos: patient.nombre,
    nroIdentificacion: patient.cedula,
    fechaNacimiento: patient.fechaNacimiento,
    edad: calcAge(patient.fechaNacimiento),
    genero: generoFromSexo(patient.sexo),
    profesionOcupacion: patient.cargo,
    telefono: patient.telefono,
    convenio: patient.empresa,
  }
}

export function toHistoryInput(existing: ClinicalHistoryInput): ClinicalHistoryInput {
  return { ...existing }
}
