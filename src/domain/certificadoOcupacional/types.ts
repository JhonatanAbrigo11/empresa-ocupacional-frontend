export interface CertificadoOcupacionalDocument {
  id: string
  pacienteId?: string
  fechaCreacion: string
  seccionA: {
    institucionSistema: string
    ruc: string
    ciiu: string
    establecimiento: string
    numFormulario: string
    numArchivo: string
    primerApellido: string
    segundoApellido: string
    primerNombre: string
    segundoNombre: string
    sexo: 'HOMBRE' | 'MUJER' | ''
    puestoTrabajoCiuo: string
  }
  seccionB: {
    fechaEmisionAño: string
    fechaEmisionMes: string
    fechaEmisionDia: string
    tipoEvaluacion: 'INGRESO' | 'PERIÓDICO' | 'REINTEGRO' | 'RETIRO' | ''
  }
  seccionC: {
    aptitud: 'APTO' | 'APTO EN OBSERVACIÓN' | 'APTO CON LIMITACIONES' | 'NO APTO' | ''
    detalleObservaciones: string
  }
  seccionD: {
    descripcionRecomendaciones: string
    observacionGeneral: string
  }
  seccionE: {
    nombreApellidoProf: string
    codigoMedico: string
    firmaSello: string
  }
  seccionF: {
    firmaUsuario: string
    cedulaUsuario: string
  }
}
