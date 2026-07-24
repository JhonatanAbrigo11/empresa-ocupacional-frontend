import type { Patient } from '@/domain/patient/Patient'
import type { HistoriaClinicaOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/types'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'
import type { CertificadoCoproparasitarioDocument } from '@/domain/certificadoCoproparasitario/types'
import type { ClinicalHistoryInput } from '@/domain/clinicalHistory/ClinicalHistory'
import type { PhysicalExamInput } from '@/domain/physicalExam/PhysicalExam'
import type { ImagingRecordInput } from '@/domain/imaging/ImagingRecord'
import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'
import type { InmunizacionesDocument } from '@/domain/inmunizaciones/types'

import { createInitialDocument } from '@/presentation/components/historiaClinicaOcupacional/defaults'
import { createInitialCertificadoDocument } from '@/presentation/components/certificadoOcupacional/defaults'
import { createInitialCertificadoCoproparasitario } from '@/presentation/components/certificadoCoproparasitario/defaults'
import { createEmptyHistory } from '@/presentation/components/clinicalHistory/historyDefaults'
import { createEmptyPhysicalExam } from '@/presentation/components/clinicalHistory/physicalExamDefaults'
import { createEmptyImagingRecord } from '@/presentation/components/clinicalHistory/imagingDefaults'
import { createInitialRecetaMedica } from '@/presentation/components/recetaMedica/defaults'
import { createInitialInmunizacionesDocument } from '@/presentation/components/inmunizaciones/defaults'

// Helper for calculated age
export function calculateAge(fechaNacimiento: string): string {
  if (!fechaNacimiento) return ''
  const parts = fechaNacimiento.split('-')
  if (parts.length === 3) {
    const birthDate = new Date(fechaNacimiento)
    if (!isNaN(birthDate.getTime())) {
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
      return age.toString()
    }
  }
  return ''
}

// 1. Historia Clínica Ocupacional Mapper
export function mapPatientToHistoriaClinica(patient: Patient): HistoriaClinicaOcupacionalDocument {
  const initial = createInitialDocument()
  const hoy = new Date().toISOString().split('T')[0]
  const edad = calculateAge(patient.fechaNacimiento)

  // Seccion A: Filiación
  initial.hoja1.seccionA.institucionSistema = patient.institucionSistema || 'SISTEMA NACIONAL DE SALUD'
  initial.hoja1.seccionA.ruc = patient.rucEmpresa || ''
  initial.hoja1.seccionA.ciiu = patient.ciiu || ''
  initial.hoja1.seccionA.establecimiento = patient.establecimiento || patient.empresa || ''
  initial.hoja1.seccionA.numHistoriaClinica = patient.numHistoriaClinica || `HC-${patient.cedula}`
  initial.hoja1.seccionA.numArchivo = patient.numArchivo || ''

  initial.hoja1.seccionA.primerApellido = patient.primerApellido || ''
  initial.hoja1.seccionA.segundoApellido = patient.segundoApellido || ''
  initial.hoja1.seccionA.primerNombre = patient.primerNombre || ''
  initial.hoja1.seccionA.segundoNombre = patient.segundoNombre || ''

  initial.hoja1.seccionA.atencionPrioritaria = {
    ...initial.hoja1.seccionA.atencionPrioritaria,
    ...(patient.atencionPrioritaria || {}),
  }

  initial.hoja1.seccionA.sexo = patient.sexo === 'F' ? 'mujer' : 'hombre'
  if (patient.fechaNacimiento) {
    const parts = patient.fechaNacimiento.split('-')
    if (parts.length === 3) {
      initial.hoja1.seccionA.fechaNacimientoAño = parts[0]
      initial.hoja1.seccionA.fechaNacimientoMes = parts[1]
      initial.hoja1.seccionA.fechaNacimientoDia = parts[2]
    }
  }
  initial.hoja1.seccionA.edad = edad
  initial.hoja1.seccionA.grupoSanguineo = patient.grupoSanguineo || 'O+'
  initial.hoja1.seccionA.lateralidad = patient.lateralidad || 'diestr@'

  // Seccion B: Datos Laborales
  initial.hoja1.seccionB.puestoTrabajoCiuo = patient.puestoTrabajoCiuo || patient.cargo || ''
  initial.hoja1.seccionB.fechaAtencion = hoy
  initial.hoja1.seccionB.fechaIngresoTrabajo = patient.fechaIngreso || ''

  // Seccion C: Antecedentes & Hábitos
  initial.hoja1.seccionC.antecedentesClinicosQuirurgicos = patient.antecedentesPatologicos || ''
  initial.hoja1.seccionC.antecedentesFamiliares = patient.antecedentesFamiliares || ''
  initial.hoja1.seccionC.condicionEspecialUrgencia.requiereTransfusiones = patient.autorizaTransfusiones || 'SI'
  initial.hoja1.seccionC.condicionPreexistente.medicacionHabitual = patient.medicacionHabitual || ''
  
  if (patient.sexo === 'F') {
    initial.hoja1.seccionC.ginecoObstetricos.fum = patient.fum || ''
    initial.hoja1.seccionC.ginecoObstetricos.gestas = patient.formulaObstetrica || ''
    initial.hoja1.seccionC.ginecoObstetricos.planificacionCual = patient.metodoAnticonceptivo || ''
    initial.hoja1.seccionC.ginecoObstetricos.planificacionFamiliar = patient.metodoAnticonceptivo ? 'SI' : 'NO'
  }

  initial.hoja1.seccionC.estiloDeVida.actividadFisicaCual = patient.actividadFisica || ''

  if (patient.consumoTabaco) {
    ;(initial.hoja1.seccionC.consumoSustancias.tabaco as any).observacion = patient.consumoTabaco
  }
  if (patient.consumoAlcohol) {
    ;(initial.hoja1.seccionC.consumoSustancias.alcohol as any).observacion = patient.consumoAlcohol
  }

  // Seccion P: Firma Trabajador
  const fullName = `${patient.primerNombre} ${patient.segundoNombre || ''} ${patient.primerApellido} ${patient.segundoApellido || ''}`.replace(/\s+/g, ' ').trim()
  initial.hoja3.seccionP.nombresApellidosTrab = fullName || patient.nombre
  initial.hoja3.seccionP.cedula = patient.cedula || ''

  return initial
}

// 2. Certificado Médico Ocupacional Mapper
export function mapPatientToCertificado(patient: Patient): CertificadoOcupacionalDocument {
  const initial = createInitialCertificadoDocument()
  const hoy = new Date()
  const y = hoy.getFullYear().toString()
  const m = String(hoy.getMonth() + 1).padStart(2, '0')
  const d = String(hoy.getDate()).padStart(2, '0')

  initial.seccionA.institucionSistema = patient.institucionSistema || 'SISTEMA NACIONAL DE SALUD'
  initial.seccionA.ruc = patient.rucEmpresa || ''
  initial.seccionA.ciiu = patient.ciiu || ''
  initial.seccionA.establecimiento = patient.establecimiento || patient.empresa || ''
  initial.seccionA.numFormulario = `CERT-${patient.cedula}`
  initial.seccionA.numArchivo = patient.numArchivo || ''

  initial.seccionA.primerApellido = patient.primerApellido || ''
  initial.seccionA.segundoApellido = patient.segundoApellido || ''
  initial.seccionA.primerNombre = patient.primerNombre || ''
  initial.seccionA.segundoNombre = patient.segundoNombre || ''
  initial.seccionA.sexo = patient.sexo === 'F' ? 'MUJER' : 'HOMBRE'
  initial.seccionA.puestoTrabajoCiuo = patient.puestoTrabajoCiuo || patient.cargo || ''

  initial.seccionB.fechaEmisionAño = y
  initial.seccionB.fechaEmisionMes = m
  initial.seccionB.fechaEmisionDia = d

  const fullName = `${patient.primerNombre} ${patient.segundoNombre || ''} ${patient.primerApellido} ${patient.segundoApellido || ''}`.replace(/\s+/g, ' ').trim()
  ;(initial.seccionF as any).nombresApellidosTrab = fullName || patient.nombre
  initial.seccionF.cedulaUsuario = patient.cedula || ''

  return initial
}

// 3. Certificado Coproparasitario Mapper
export function mapPatientToCertificadoCoproparasitario(patient: Patient): CertificadoCoproparasitarioDocument {
  const initial = createInitialCertificadoCoproparasitario()
  const hoy = new Date().toISOString().split('T')[0]
  const edad = calculateAge(patient.fechaNacimiento)
  const fullName = `${patient.primerApellido} ${patient.segundoApellido || ''} ${patient.primerNombre} ${patient.segundoNombre || ''}`.replace(/\s+/g, ' ').trim()

  return {
    ...initial,
    fechaReferencia: hoy,
    nombrePaciente: fullName || patient.nombre,
    edad: edad || '32',
    cedula: patient.cedula || '',
    cargo: patient.puestoTrabajoCiuo || patient.cargo || '',
    empresa: patient.establecimiento || patient.empresa || '',
  }
}

// 4. Documento Historial Clínico Mapper
export function mapPatientToHistorialClinico(patient: Patient): {
  historia: ClinicalHistoryInput
  fisico: PhysicalExamInput
  imagenes: ImagingRecordInput
} {
  const folderId = `folder-${patient.id}`
  const hoy = new Date().toISOString().split('T')[0]
  const edad = calculateAge(patient.fechaNacimiento)
  const fullName = `${patient.primerNombre} ${patient.segundoNombre || ''} ${patient.primerApellido} ${patient.segundoApellido || ''}`.replace(/\s+/g, ' ').trim()

  const historia = createEmptyHistory(folderId, patient.id)
  historia.nombresApellidos = fullName || patient.nombre
  historia.nroIdentificacion = patient.cedula || ''
  historia.numeroHc = patient.numHistoriaClinica || `HC-${patient.cedula}`
  historia.fechaNacimiento = patient.fechaNacimiento || ''
  historia.edad = edad
  historia.genero = patient.sexo === 'F' ? 'Femenino' : patient.sexo === 'M' ? 'Masculino' : patient.sexo || ''
  historia.profesionOcupacion = patient.cargo || ''
  historia.telefono = patient.telefono || ''
  historia.direccion = patient.direccion || ''
  historia.convenio = patient.empresa || ''
  historia.fecha = hoy

  // Precargado completo desde los datos del paciente
  historia.estadoCivil = patient.estadoCivil || ''
  historia.escolaridad = patient.escolaridad || ''
  historia.provincia = patient.provincia || ''
  historia.canton = patient.canton || ''
  historia.alergicos = patient.alergias || ''
  historia.quirurgicos = patient.antecedentesPatologicos || ''
  historia.medicamentos = patient.medicacionHabitual || ''
  historia.tabaquismo = patient.consumoTabaco || ''
  historia.alcohol = patient.consumoAlcohol || ''
  historia.otrosHabitos = patient.actividadFisica || ''
  historia.fum = patient.fum || ''

  const fisico = createEmptyPhysicalExam(folderId, patient.id)
  const imagenes = createEmptyImagingRecord(folderId, patient.id)

  return { historia, fisico, imagenes }
}

// 5. Receta Médica Mapper
export function mapPatientToRecetaMedica(patient: Patient): RecetaMedicaDocument {
  const initial = createInitialRecetaMedica()
  const hoy = new Date()
  const edad = calculateAge(patient.fechaNacimiento)
  const fullName = `${patient.primerNombre} ${patient.segundoNombre || ''} ${patient.primerApellido} ${patient.segundoApellido || ''}`.replace(/\s+/g, ' ').trim()

  return {
    ...initial,
    numero: `REC-${patient.cedula || '001'}`,
    fechaDia: String(hoy.getDate()).padStart(2, '0'),
    fechaMes: String(hoy.getMonth() + 1).padStart(2, '0'),
    fechaAnio: String(hoy.getFullYear()),
    nombresApellidos: fullName || patient.nombre,
    edad: edad || '30',
    ci: patient.cedula || '',
    hc: patient.numHistoriaClinica || `HC-${patient.cedula}`,
    antAlergicos: patient.alergias || 'Ninguna conocida',
  }
}

// 6. Inmunizaciones Mapper
export function mapPatientToInmunizaciones(patient: Patient): InmunizacionesDocument {
  const initial = createInitialInmunizacionesDocument()
  return {
    ...initial,
    seccionA: {
      institucionEmpresa: patient.empresa || '',
      ruc: patient.rucEmpresa || '',
      ciiu: patient.ciiu || '',
      establecimientoSalud: patient.establecimiento || patient.empresa || '',
      numeroHistoriaClinica: patient.numHistoriaClinica || `HC-${patient.cedula}`,
      numeroArchivo: patient.numArchivo || '',
      primerApellido: patient.primerApellido || '',
      segundoApellido: patient.segundoApellido || '',
      primerNombre: patient.primerNombre || '',
      segundoNombre: patient.segundoNombre || '',
      sexo: patient.sexo === 'F' ? 'MUJER' : 'HOMBRE',
      cargoOcupacion: patient.puestoTrabajoCiuo || patient.cargo || '',
    },
  }
}
