import type {
  InmunizacionDosis,
  InmunizacionVacuna,
  InmunizacionesDocument,
} from '@/domain/inmunizaciones/types'

function createDosis(etiquetas: string[]): InmunizacionDosis[] {
  return etiquetas.map((etiqueta) => ({
    etiqueta,
    fecha: '',
    lote: '',
    esquemaCompleto: false,
    responsable: '',
    establecimiento: '',
    observaciones: '',
  }))
}

function createVacuna(
  id: string,
  nombre: string,
  etiquetas: string[],
  nombreEditable = false,
): InmunizacionVacuna {
  return {
    id,
    nombre,
    nombreEditable,
    dosis: createDosis(etiquetas),
  }
}

export function createInitialInmunizacionesDocument(): InmunizacionesDocument {
  return {
    seccionA: {
      institucionEmpresa: '',
      ruc: '',
      ciiu: '',
      establecimientoSalud: '',
      numeroHistoriaClinica: '',
      numeroArchivo: '',
      primerApellido: '',
      segundoApellido: '',
      primerNombre: '',
      segundoNombre: '',
      sexo: '',
      cargoOcupacion: '',
    },
    vacunasBase: [
      createVacuna('tetanos', 'Tétanos - Difteria', ['1ª', '2ª', '3ª', '4ª', '5ª']),
      createVacuna('hepatitis-a', 'Hepatitis A', ['1ª', '2ª', '3ª']),
      createVacuna('hepatitis-b', 'Hepatitis B', ['1ª', '2ª', '3ª']),
      createVacuna('influenza', 'Influenza estacional', ['Dosis única']),
      createVacuna('fiebre-amarilla', 'Fiebre Amarilla', ['Dosis única']),
    ],
    vacunasRiesgo: [
      createVacuna('riesgo-1', '', ['1ª', '2ª', '3ª', '4ª', '5ª'], true),
      createVacuna('riesgo-2', '', ['1ª', '2ª', '3ª'], true),
      createVacuna('riesgo-3', '', ['1ª', '2ª', '3ª', '4ª', '5ª'], true),
      createVacuna('riesgo-4', '', ['1ª', '2ª', '3ª'], true),
    ],
  }
}
