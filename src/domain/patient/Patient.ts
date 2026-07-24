export type Sexo = 'M' | 'F' | 'Otro'

export interface AtencionPrioritariaInput {
  embarazada: boolean
  discapacidad: boolean
  enfermedadCatastrofica: boolean
  lactancia: boolean
  adultoMayor: boolean
}

export interface Patient {
  id: string
  nombre: string
  primerApellido: string
  segundoApellido: string
  primerNombre: string
  segundoNombre: string
  cedula: string
  sexo: Sexo
  fechaNacimiento: string
  grupoSanguineo: string
  lateralidad: 'zurd@' | 'diestr@' | 'ambidiestr@' | ''
  
  // Datos Laborales y de Empresa
  empresa: string
  cargo: string
  institucionSistema: string
  rucEmpresa: string
  ciiu: string
  establecimiento: string
  puestoTrabajoCiuo: string
  fechaIngreso: string
  numHistoriaClinica: string
  numArchivo: string
  
  // Atención Prioritaria
  atencionPrioritaria: AtencionPrioritariaInput
  autorizaTransfusiones: 'SI' | 'NO' | ''

  // Contacto
  telefono: string
  email: string
  direccion: string

  createdAt: string
  updatedAt: string
}

export type PatientInput = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>
