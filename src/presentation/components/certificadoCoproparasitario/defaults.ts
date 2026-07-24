import type { CertificadoCoproparasitarioDocument } from '@/domain/certificadoCoproparasitario/types'

export function createInitialCertificadoCoproparasitario(): CertificadoCoproparasitarioDocument {
  return {
    fechaReferencia: '',
    nombrePaciente: '',
    edad: '',
    cedula: '',
    cargo: '',
    empresa: '',
    tipoExamen: '',
    pa: '',
    pul: '',
    temp: '',
    spo: '',
    fr: '',
    talla: '',
    peso: '',
    imc: '',
    diagnostico: '',
    aptitud: '',
    recomendaciones: '',
    nombreMedico: '',
    msp: '',
  }
}
