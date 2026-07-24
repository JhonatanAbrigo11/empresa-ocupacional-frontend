import type { Patient } from '@/domain/patient/Patient'
import type { HistoriaClinicaOcupacionalDocument } from './types'
import type { CertificadoOcupacionalDocument } from '@/domain/certificadoOcupacional/types'
import { createInitialDocument } from '@/presentation/components/historiaClinicaOcupacional/defaults'
import { createInitialCertificadoDocument } from '@/presentation/components/certificadoOcupacional/defaults'

export function mapPatientToHistoriaClinica(patient: Patient): HistoriaClinicaOcupacionalDocument {
  const initial = createInitialDocument()
  const hoy = new Date().toISOString().split('T')[0]

  // Parse birth date (aaaa/mm/dd)
  let birthYr = ''
  let birthMo = ''
  let birthDy = ''
  let edadCalc = ''

  if (patient.fechaNacimiento) {
    const parts = patient.fechaNacimiento.split('-')
    if (parts.length === 3) {
      birthYr = parts[0]
      birthMo = parts[1]
      birthDy = parts[2]
      const birthDate = new Date(patient.fechaNacimiento)
      if (!isNaN(birthDate.getTime())) {
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
        edadCalc = age.toString()
      }
    }
  }

  // Seccion A
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
  initial.hoja1.seccionA.fechaNacimientoAño = birthYr
  initial.hoja1.seccionA.fechaNacimientoMes = birthMo
  initial.hoja1.seccionA.fechaNacimientoDia = birthDy
  initial.hoja1.seccionA.edad = edadCalc
  initial.hoja1.seccionA.grupoSanguineo = patient.grupoSanguineo || 'O+'
  initial.hoja1.seccionA.lateralidad = patient.lateralidad || 'diestr@'

  // Seccion B
  initial.hoja1.seccionB.puestoTrabajoCiuo = patient.puestoTrabajoCiuo || patient.cargo || ''
  initial.hoja1.seccionB.fechaAtencion = hoy
  initial.hoja1.seccionB.fechaIngresoTrabajo = patient.fechaIngreso || ''

  // Seccion C
  initial.hoja1.seccionC.condicionEspecialUrgencia.requiereTransfusiones = patient.autorizaTransfusiones || 'SI'

  // Seccion P
  initial.hoja3.seccionP.nombresApellidosTrab = `${patient.primerNombre} ${patient.primerApellido}`.trim() || patient.nombre
  initial.hoja3.seccionP.cedula = patient.cedula || ''

  return initial
}

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

  ;(initial.seccionF as any).nombresApellidosTrab = `${patient.primerNombre} ${patient.primerApellido}`.trim() || patient.nombre
  initial.seccionF.cedulaUsuario = patient.cedula || ''

  return initial
}
