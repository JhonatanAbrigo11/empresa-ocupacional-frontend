export type AptitudCoproparasitario =
  | 'apto'
  | 'apto_recomendaciones'
  | 'apto_restricciones'
  | 'no_apto'

export interface CertificadoCoproparasitarioDocument {
  fechaReferencia: string
  nombrePaciente: string
  edad: string
  cedula: string
  cargo: string
  empresa: string
  tipoExamen: string
  pa: string
  pul: string
  temp: string
  spo: string
  fr: string
  talla: string
  peso: string
  imc: string
  diagnostico: string
  aptitud: AptitudCoproparasitario | ''
  recomendaciones: string
  nombreMedico: string
  msp: string
}
