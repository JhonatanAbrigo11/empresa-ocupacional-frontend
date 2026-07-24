export interface InmunizacionDosis {
  etiqueta: string
  fecha: string
  lote: string
  esquemaCompleto: boolean
  responsable: string
  establecimiento: string
  observaciones: string
}

export interface InmunizacionVacuna {
  id: string
  nombre: string
  nombreEditable: boolean
  dosis: InmunizacionDosis[]
}

export interface InmunizacionesSeccionA {
  institucionEmpresa: string
  ruc: string
  ciiu: string
  establecimientoSalud: string
  numeroHistoriaClinica: string
  numeroArchivo: string
  primerApellido: string
  segundoApellido: string
  primerNombre: string
  segundoNombre: string
  sexo: string
  cargoOcupacion: string
}

export interface InmunizacionesDocument {
  seccionA: InmunizacionesSeccionA
  vacunasBase: InmunizacionVacuna[]
  vacunasRiesgo: InmunizacionVacuna[]
}
