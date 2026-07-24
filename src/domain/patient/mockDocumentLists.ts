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

export interface DocumentListItem<T = any> {
  id: string
  codigo: string
  pacienteNombre: string
  pacienteCedula: string
  empresa: string
  cargo: string
  fecha: string
  estado: string
  aptitudBadge?: string
  document: T
}

// ----------------------------------------------------------------------
// 1. Mock Data: Historia Clínica Ocupacional
// ----------------------------------------------------------------------
export const mockHistoriaClinicaList: DocumentListItem<HistoriaClinicaOcupacionalDocument>[] = [
  {
    id: 'hco-001',
    codigo: 'HCO-2026-0089',
    pacienteNombre: 'Carlos Eduardo Mendoza Viteri',
    pacienteCedula: '1723456789',
    empresa: 'Corporación Favorita S.A.',
    cargo: 'Supervisora de Operaciones',
    fecha: '2026-07-22',
    estado: 'Completado',
    aptitudBadge: 'APTO',
    document: (() => {
      const doc = createInitialDocument()
      doc.hoja1.seccionA.primerApellido = 'Mendoza'
      doc.hoja1.seccionA.segundoApellido = 'Viteri'
      doc.hoja1.seccionA.primerNombre = 'Carlos'
      doc.hoja1.seccionA.segundoNombre = 'Eduardo'
      doc.hoja1.seccionA.establecimiento = 'Corporación Favorita S.A.'
      doc.hoja1.seccionA.numHistoriaClinica = 'HCO-2026-0089'
      doc.hoja1.seccionB.puestoTrabajoCiuo = 'Supervisora de Operaciones'
      doc.hoja1.seccionB.tipoEvaluacion = 'PERIÓDICO'
      doc.hoja1.seccionB.fechaAtencion = '2026-07-22'
      doc.hoja3.seccionL.aptitud = 'APTO'
      return doc
    })(),
  },
  {
    id: 'hco-002',
    codigo: 'HCO-2026-0088',
    pacienteNombre: 'María Belén Torres Castillo',
    pacienteCedula: '0918273645',
    empresa: 'Industrial Pesquera del Ecuador',
    cargo: 'Técnica de Laboratorio',
    fecha: '2026-07-21',
    estado: 'Completado',
    aptitudBadge: 'APTO CON OBSERVACIONES',
    document: (() => {
      const doc = createInitialDocument()
      doc.hoja1.seccionA.primerApellido = 'Torres'
      doc.hoja1.seccionA.segundoApellido = 'Castillo'
      doc.hoja1.seccionA.primerNombre = 'María'
      doc.hoja1.seccionA.segundoNombre = 'Belén'
      doc.hoja1.seccionA.establecimiento = 'Industrial Pesquera del Ecuador'
      doc.hoja1.seccionA.numHistoriaClinica = 'HCO-2026-0088'
      doc.hoja1.seccionB.puestoTrabajoCiuo = 'Técnica de Laboratorio'
      doc.hoja1.seccionB.tipoEvaluacion = 'INGRESO'
      doc.hoja1.seccionB.fechaAtencion = '2026-07-21'
      doc.hoja3.seccionL.aptitud = 'APTO EN OBSERVACIÓN'
      return doc
    })(),
  },
  {
    id: 'hco-003',
    codigo: 'HCO-2026-0085',
    pacienteNombre: 'José Antonio Ramírez Morales',
    pacienteCedula: '1719283746',
    empresa: 'Constructora del Norte Cía. Ltda.',
    cargo: 'Operador de Maquinaria Pesada',
    fecha: '2026-07-18',
    estado: 'Completado',
    aptitudBadge: 'APTO CON RESTRICCIONES',
    document: (() => {
      const doc = createInitialDocument()
      doc.hoja1.seccionA.primerApellido = 'Ramírez'
      doc.hoja1.seccionA.segundoApellido = 'Morales'
      doc.hoja1.seccionA.primerNombre = 'José'
      doc.hoja1.seccionA.segundoNombre = 'Antonio'
      doc.hoja1.seccionA.establecimiento = 'Constructora del Norte Cía. Ltda.'
      doc.hoja1.seccionA.numHistoriaClinica = 'HCO-2026-0085'
      doc.hoja1.seccionB.puestoTrabajoCiuo = 'Operador de Maquinaria Pesada'
      doc.hoja1.seccionB.tipoEvaluacion = 'PERIÓDICO'
      doc.hoja1.seccionB.fechaAtencion = '2026-07-18'
      doc.hoja3.seccionL.aptitud = 'APTO CON LIMITACIONES'
      return doc
    })(),
  },
]

// ----------------------------------------------------------------------
// 2. Mock Data: Certificado Médico Ocupacional
// ----------------------------------------------------------------------
export const mockCertificadoOcupacionalList: DocumentListItem<CertificadoOcupacionalDocument>[] = [
  {
    id: 'cert-001',
    codigo: 'CERT-2026-0142',
    pacienteNombre: 'María Belén Torres Castillo',
    pacienteCedula: '0918273645',
    empresa: 'Industrial Pesquera del Ecuador',
    cargo: 'Técnica de Laboratorio',
    fecha: '2026-07-21',
    estado: 'Emitido',
    aptitudBadge: 'APTO',
    document: (() => {
      const doc = createInitialCertificadoDocument()
      doc.seccionA.primerApellido = 'Torres'
      doc.seccionA.segundoApellido = 'Castillo'
      doc.seccionA.primerNombre = 'María'
      doc.seccionA.segundoNombre = 'Belén'
      doc.seccionA.establecimiento = 'Industrial Pesquera del Ecuador'
      doc.seccionA.numFormulario = 'CERT-2026-0142'
      doc.seccionA.puestoTrabajoCiuo = 'Técnica de Laboratorio'
      doc.seccionB.tipoEvaluacion = 'INGRESO'
      doc.seccionC.aptitud = 'APTO'
      doc.seccionB.fechaEmisionAño = '2026'
      doc.seccionB.fechaEmisionMes = '07'
      doc.seccionB.fechaEmisionDia = '21'
      return doc
    })(),
  },
  {
    id: 'cert-002',
    codigo: 'CERT-2026-0140',
    pacienteNombre: 'Carlos Eduardo Mendoza Viteri',
    pacienteCedula: '1723456789',
    empresa: 'Corporación Favorita S.A.',
    cargo: 'Supervisora de Operaciones',
    fecha: '2026-07-22',
    estado: 'Emitido',
    aptitudBadge: 'APTO CON OBSERVACIONES',
    document: (() => {
      const doc = createInitialCertificadoDocument()
      doc.seccionA.primerApellido = 'Mendoza'
      doc.seccionA.segundoApellido = 'Viteri'
      doc.seccionA.primerNombre = 'Carlos'
      doc.seccionA.segundoNombre = 'Eduardo'
      doc.seccionA.establecimiento = 'Corporación Favorita S.A.'
      doc.seccionA.numFormulario = 'CERT-2026-0140'
      doc.seccionA.puestoTrabajoCiuo = 'Supervisora de Operaciones'
      doc.seccionB.tipoEvaluacion = 'PERIÓDICO'
      doc.seccionC.aptitud = 'APTO EN OBSERVACIÓN'
      doc.seccionB.fechaEmisionAño = '2026'
      doc.seccionB.fechaEmisionMes = '07'
      doc.seccionB.fechaEmisionDia = '22'
      return doc
    })(),
  },
  {
    id: 'cert-003',
    codigo: 'CERT-2026-0138',
    pacienteNombre: 'Ana Lucía Gómez Paredes',
    pacienteCedula: '1102938475',
    empresa: 'Servicios Logísticos del Pacífico',
    cargo: 'Analista de Control de Calidad',
    fecha: '2026-07-15',
    estado: 'Emitido',
    aptitudBadge: 'APTO',
    document: (() => {
      const doc = createInitialCertificadoDocument()
      doc.seccionA.primerApellido = 'Gómez'
      doc.seccionA.segundoApellido = 'Paredes'
      doc.seccionA.primerNombre = 'Ana'
      doc.seccionA.segundoNombre = 'Lucía'
      doc.seccionA.establecimiento = 'Servicios Logísticos del Pacífico'
      doc.seccionA.numFormulario = 'CERT-2026-0138'
      doc.seccionA.puestoTrabajoCiuo = 'Analista de Control de Calidad'
      doc.seccionB.tipoEvaluacion = 'RETIRO'
      doc.seccionC.aptitud = 'APTO'
      doc.seccionB.fechaEmisionAño = '2026'
      doc.seccionB.fechaEmisionMes = '07'
      doc.seccionB.fechaEmisionDia = '15'
      return doc
    })(),
  },
]

// ----------------------------------------------------------------------
// 3. Mock Data: Certificado Coproparasitario
// ----------------------------------------------------------------------
export const mockCertificadoCoproparasitarioList: DocumentListItem<CertificadoCoproparasitarioDocument>[] = [
  {
    id: 'copro-001',
    codigo: 'COP-2026-0034',
    pacienteNombre: 'José Antonio Ramírez Morales',
    pacienteCedula: '1719283746',
    empresa: 'Hotel & Catering Los Andes',
    cargo: 'Manipulador de Alimentos',
    fecha: '2026-07-23',
    estado: 'Completado',
    aptitudBadge: 'APTO',
    document: (() => {
      const doc = createInitialCertificadoCoproparasitario()
      doc.nombrePaciente = 'José Antonio Ramírez Morales'
      doc.cedula = '1719283746'
      doc.empresa = 'Hotel & Catering Los Andes'
      doc.cargo = 'Manipulador de Alimentos'
      doc.fechaReferencia = '2026-07-23'
      doc.aptitud = 'apto'
      doc.diagnostico = 'Examen Coproparasitario Negativo para Parásitos y Quistes'
      return doc
    })(),
  },
  {
    id: 'copro-002',
    codigo: 'COP-2026-0032',
    pacienteNombre: 'Verónica Patricia Salgado Vega',
    pacienteCedula: '0923847165',
    empresa: 'Alimentos Procesados San Francisco',
    cargo: 'Auxiliar de Cocina',
    fecha: '2026-07-19',
    estado: 'Completado',
    aptitudBadge: 'APTO CON RECOMENDACIONES',
    document: (() => {
      const doc = createInitialCertificadoCoproparasitario()
      doc.nombrePaciente = 'Verónica Patricia Salgado Vega'
      doc.cedula = '0923847165'
      doc.empresa = 'Alimentos Procesados San Francisco'
      doc.cargo = 'Auxiliar de Cocina'
      doc.fechaReferencia = '2026-07-19'
      doc.aptitud = 'apto_recomendaciones'
      doc.diagnostico = 'Presencia leve de Entamoeba coli quistes (Comensal)'
      doc.recomendaciones = 'Desparasitación preventiva semestral e higiene de manos.'
      return doc
    })(),
  },
]

// ----------------------------------------------------------------------
// 4. Mock Data: Documento Historial Clínico
// ----------------------------------------------------------------------
export const mockHistorialClinicoList: DocumentListItem<{
  historia: ClinicalHistoryInput
  fisico: PhysicalExamInput
  imagenes: ImagingRecordInput
}>[] = [
  {
    id: 'hc-001',
    codigo: 'HC-2026-0512',
    pacienteNombre: 'Ana Lucía Gómez Paredes',
    pacienteCedula: '1102938475',
    empresa: 'Constructora del Norte Cía. Ltda.',
    cargo: 'Ingeniera de Campo',
    fecha: '2026-07-20',
    estado: 'Registrado',
    aptitudBadge: 'HISTORIA ACTIVA',
    document: {
      historia: (() => {
        const h = createEmptyHistory('folder-1', 'pat-1')
        h.nombresApellidos = 'Ana Lucía Gómez Paredes'
        h.nroIdentificacion = '1102938475'
        h.numeroHc = 'HC-2026-0512'
        h.convenio = 'Constructora del Norte Cía. Ltda.'
        h.profesionOcupacion = 'Ingeniera de Campo'
        h.motivoConsulta = 'Evaluación médica periódica ocupacional anual.'
        h.fecha = '2026-07-20'
        return h
      })(),
      fisico: createEmptyPhysicalExam('folder-1', 'pat-1'),
      imagenes: createEmptyImagingRecord('folder-1', 'pat-1'),
    },
  },
  {
    id: 'hc-002',
    codigo: 'HC-2026-0510',
    pacienteNombre: 'Luis Fernando Benítez Delgado',
    pacienteCedula: '1709823412',
    empresa: 'Distribuidora Logística Express',
    cargo: 'Chofer de Carga Pesada',
    fecha: '2026-07-16',
    estado: 'Registrado',
    aptitudBadge: 'HISTORIA ACTIVA',
    document: {
      historia: (() => {
        const h = createEmptyHistory('folder-2', 'pat-2')
        h.nombresApellidos = 'Luis Fernando Benítez Delgado'
        h.nroIdentificacion = '1709823412'
        h.numeroHc = 'HC-2026-0510'
        h.convenio = 'Distribuidora Logística Express'
        h.profesionOcupacion = 'Chofer de Carga Pesada'
        h.motivoConsulta = 'Dolor lumbar mecánico por esfuerzo postural al conducir.'
        h.fecha = '2026-07-16'
        return h
      })(),
      fisico: createEmptyPhysicalExam('folder-2', 'pat-2'),
      imagenes: createEmptyImagingRecord('folder-2', 'pat-2'),
    },
  },
]

// ----------------------------------------------------------------------
// 5. Mock Data: Receta Médica
// ----------------------------------------------------------------------
export const mockRecetaMedicaList: DocumentListItem<RecetaMedicaDocument>[] = [
  {
    id: 'rec-001',
    codigo: 'REC-2026-0781',
    pacienteNombre: 'Luis Fernando Benítez Delgado',
    pacienteCedula: '1709823412',
    empresa: 'Distribuidora Logística Express',
    cargo: 'Chofer de Carga Pesada',
    fecha: '2026-07-23',
    estado: 'Impresa',
    aptitudBadge: 'PRESCRITA',
    document: (() => {
      const doc = createInitialRecetaMedica()
      doc.numero = 'REC-2026-0781'
      doc.nombresApellidos = 'Luis Fernando Benítez Delgado'
      doc.ci = '1709823412'
      doc.hc = 'HC-2026-0510'
      doc.diagnostico = 'Lumbalgia Mecánica Aguda - CIE10 M54.5'
      doc.rp = '1. Meloxicam 15mg Tab N° 7\n2. Pridinol 4mg Tab N° 7\n3. Paracetamol 500mg Tab N° 10'
      doc.indicaciones = 'Tomar Meloxicam 1 tableta cada 24 horas después del almuerzo por 7 días.\nTomar Pridinol 1 tableta cada 12 horas por 5 días.'
      return doc
    })(),
  },
  {
    id: 'rec-002',
    codigo: 'REC-2026-0775',
    pacienteNombre: 'Carlos Eduardo Mendoza Viteri',
    pacienteCedula: '1723456789',
    empresa: 'Corporación Favorita S.A.',
    cargo: 'Supervisora de Operaciones',
    fecha: '2026-07-20',
    estado: 'Impresa',
    aptitudBadge: 'PRESCRITA',
    document: (() => {
      const doc = createInitialRecetaMedica()
      doc.numero = 'REC-2026-0775'
      doc.nombresApellidos = 'Carlos Eduardo Mendoza Viteri'
      doc.ci = '1723456789'
      doc.hc = 'HC-2026-0089'
      doc.diagnostico = 'Faringitis Aguda no Especificada - CIE10 J02.9'
      doc.rp = '1. Amoxicilina + Ac. Clavulánico 875/125mg Tab N° 14\n2. Ibuprofeno 400mg Tab N° 10'
      doc.indicaciones = 'Amoxicilina: 1 tableta cada 12 horas por 7 días con alimentos.'
      return doc
    })(),
  },
]

// ----------------------------------------------------------------------
// 6. Mock Data: Registro de Inmunizaciones
// ----------------------------------------------------------------------
export const mockInmunizacionesList: DocumentListItem<InmunizacionesDocument>[] = [
  {
    id: 'inm-001',
    codigo: 'INM-2026-0119',
    pacienteNombre: 'Verónica Patricia Salgado Vega',
    pacienteCedula: '0923847165',
    empresa: 'Clínica de Especialidades Guayaquil',
    cargo: 'Enfermera de Quirófano',
    fecha: '2026-07-19',
    estado: 'Actualizado',
    aptitudBadge: 'ESQUEMA COMPLETO',
    document: (() => {
      const doc = createInitialInmunizacionesDocument()
      doc.seccionA.primerApellido = 'Salgado'
      doc.seccionA.segundoApellido = 'Vega'
      doc.seccionA.primerNombre = 'Verónica'
      doc.seccionA.segundoNombre = 'Patricia'
      doc.seccionA.institucionEmpresa = 'Clínica de Especialidades Guayaquil'
      doc.seccionA.cargoOcupacion = 'Enfermera de Quirófano'
      doc.seccionA.numeroHistoriaClinica = 'HC-0923847165'
      return doc
    })(),
  },
  {
    id: 'inm-002',
    codigo: 'INM-2026-0115',
    pacienteNombre: 'José Antonio Ramírez Morales',
    pacienteCedula: '1719283746',
    empresa: 'Hotel & Catering Los Andes',
    cargo: 'Manipulador de Alimentos',
    fecha: '2026-07-14',
    estado: 'Actualizado',
    aptitudBadge: 'ESQUEMA EN PROCESO',
    document: (() => {
      const doc = createInitialInmunizacionesDocument()
      doc.seccionA.primerApellido = 'Ramírez'
      doc.seccionA.segundoApellido = 'Morales'
      doc.seccionA.primerNombre = 'José'
      doc.seccionA.segundoNombre = 'Antonio'
      doc.seccionA.institucionEmpresa = 'Hotel & Catering Los Andes'
      doc.seccionA.cargoOcupacion = 'Manipulador de Alimentos'
      doc.seccionA.numeroHistoriaClinica = 'HC-1719283746'
      return doc
    })(),
  },
]
