import type { RecetaMedicaDocument } from '@/domain/recetaMedica/types'

export function createInitialRecetaMedica(): RecetaMedicaDocument {
  const now = new Date()
  return {
    numero: '',
    fechaDia: String(now.getDate()).padStart(2, '0'),
    fechaMes: now.toLocaleDateString('es-EC', { month: 'long' }),
    fechaAnio: String(now.getFullYear()),
    nombresApellidos: '',
    edad: '',
    ci: '',
    hc: '',
    diagnostico: '',
    cie10: '',
    antAlergicos: '',
    rp: '',
    indicaciones: '',
    nombreMedico: '',
    celularMedico: '',
    regMedico: '',
  }
}
