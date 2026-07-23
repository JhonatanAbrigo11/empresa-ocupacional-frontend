export interface AtencionPrioritaria {
  embarazada: boolean
  discapacidad: boolean
  enfermedadCatastrofica: boolean
  lactancia: boolean
  adultoMayor: boolean
}

export interface ConsumoItem {
  tiempoConsumoMeses: string
  exConsumidor: boolean
  tiempoAbstinenciaMeses: string
  noConsume: boolean
}

export interface ConsumoOtrasItem extends ConsumoItem {
  cual: string
}

export interface GinecoObstetricos {
  fum: string
  gestas: string
  partos: string
  cesareas: string
  abortos: string
  planificacionFamiliar: 'SI' | 'NO' | 'NO RESPONDE'
  planificacionCual: string
  examenesRealizados: string
  examenesTiempo: string
}

export interface ReproductivosMasculinos {
  examenesRealizados: string
  examenesTiempo: string
  planificacionFamiliar: 'SI' | 'NO' | 'NO RESPONDE'
  planificacionCual: string
}

export interface Hoja1Data {
  seccionA: {
    institucionSistema: string
    ruc: string
    ciiu: string
    establecimiento: string
    numHistoriaClinica: string
    numArchivo: string
    primerApellido: string
    segundoApellido: string
    primerNombre: string
    segundoNombre: string
    atencionPrioritaria: AtencionPrioritaria
    sexo: 'hombre' | 'mujer' | ''
    fechaNacimientoAño: string
    fechaNacimientoMes: string
    fechaNacimientoDia: string
    edad: string
    grupoSanguineo: string
    lateralidad: 'zurd@' | 'diestr@' | 'ambidiestr@' | ''
  }
  seccionB: {
    puestoTrabajoCiuo: string
    fechaAtencion: string
    fechaIngresoTrabajo: string
    fechaReintegroTrabajo: string
    fechaUltimoDiaLaboral: string
    tipoEvaluacion: 'INGRESO' | 'PERIÓDICO' | 'REINTEGRO' | 'RETIRO' | ''
    observacionMotivo: string
  }
  seccionC: {
    antecedentesClinicosQuirurgicos: string
    antecedentesFamiliares: string
    condicionEspecialUrgencia: {
      requiereTransfusiones: 'SI' | 'NO' | ''
      tratamientoHormonal: 'SI' | 'NO' | ''
      tratamientoHormonalCual: string
    }
    ginecoObstetricos: GinecoObstetricos
    reproductivosMasculinos: ReproductivosMasculinos
    consumoSustancias: {
      tabaco: ConsumoItem
      alcohol: ConsumoItem
      otras: ConsumoOtrasItem
      observacion: string
    }
    estiloDeVida: {
      actividadFisicaCual: string
      actividadFisicaTiempo: string
    }
    condicionPreexistente: {
      cual: string
      cantidad: string
      medicacionHabitual: string
    }
  }
  seccionD: {
    descripcionEnfermedadActual: string
  }
  seccionE: {
    temperatura: string
    presionArterial: string
    frecuenciaCardiaca: string
    frecuenciaRespiratoria: string
    saturacionOxigeno: string
    peso: string
    talla: string
    imc: string
    perimetroAbdominal: string
  }
  seccionF: {
    regiones: Record<string, boolean>
    observacionExamenFisico: string
  }
}

export interface RiesgoItem {
  id: string
  categoria: 'FISICO' | 'LOCATIVO' | 'MECANICOS' | 'ELECTRICO' | 'OTROS' | 'QUIMICO' | 'BIOLOGICO' | 'ERGONOMICO' | 'PSICOSOCIAL'
  subcategoria?: string
  nombre: string
  puestos: boolean[] // length 7
  otrosDetalle?: string
}

export interface Hoja2Data {
  puestos: string[] // length 7
  riesgos: RiesgoItem[]
  medidasPreventivas: string[] // length 7
}

export interface AntecedenteLaboralItem {
  id: string
  centroTrabajo: string
  actividades: string
  tipoTrabajo: 'ANTERIOR' | 'ACTUAL' | ''
  tiempoTrabajo: string
  incidente: boolean
  accidente: boolean
  enfermedadProfesional: boolean
  calificadoIess: 'SI' | 'NO' | ''
  fechaCalificacion: string
  especificarIess: string
  observaciones: string
}

export interface ActividadExtraLaboralItem {
  id: string
  tipoActividad: string
  descripcion: string
  fecha: string
}

export interface ExamenResultadoItem {
  id: string
  nombreExamen: string
  fecha: string
  resultados: string
}

export interface DiagnosticoCieItem {
  id: string
  cie10: string
  descripcion: string
  tipo: 'PRE' | 'DEF' | ''
}

export interface Hoja3Data {
  seccionH: {
    antecedentesLaborales: AntecedenteLaboralItem[]
  }
  seccionI: {
    actividadesExtraLaborales: ActividadExtraLaboralItem[]
  }
  seccionJ: {
    examenesResultados: ExamenResultadoItem[]
    observaciones: string
  }
  seccionK: {
    diagnosticos: DiagnosticoCieItem[]
  }
  seccionL: {
    aptitud: 'APTO' | 'APTO EN OBSERVACIÓN' | 'APTO CON LIMITACIONES' | 'NO APTO' | ''
    observaciones: string
  }
  seccionM: {
    descripcion: string
  }
  seccionN: {
    realizaEvaluacion: 'SI' | 'NO' | ''
    condicionRelacionadaTrabajo: 'SI' | 'NO' | ''
    observacion: string
  }
  seccionO: {
    nombresApellidosProf: string
    codigoMedico: string
    firmaSello: string
  }
  seccionP: {
    nombresApellidosTrab: string
    cedula: string
    firma: string
  }
}

export interface HistoriaClinicaOcupacionalDocument {
  id: string
  pacienteId?: string
  fechaCreacion: string
  hoja1: Hoja1Data
  hoja2: Hoja2Data
  hoja3: Hoja3Data
}
