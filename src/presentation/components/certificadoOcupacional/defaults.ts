import type { CertificadoOcupacionalDocument } from '@/domain/historiaClinicaOcupacional/../certificadoOcupacional/types'

export function createInitialCertificadoDocument(): CertificadoOcupacionalDocument {
  const hoy = new Date()
  const y = hoy.getFullYear().toString()
  const m = String(hoy.getMonth() + 1).padStart(2, '0')
  const d = String(hoy.getDate()).padStart(2, '0')

  return {
    id: 'cert_doc_demo_1',
    fechaCreacion: `${y}-${m}-${d}`,
    seccionA: {
      institucionSistema: 'SISTEMA NACIONAL DE SALUD',
      ruc: '1792123456001',
      ciiu: '8610',
      establecimiento: 'CENTRO MÉDICO OCUPACIONAL JAIMS',
      numFormulario: 'CERT-2026-0104',
      numArchivo: 'ARCH-089',
      primerApellido: 'GARCÍA',
      segundoApellido: 'MENDOZA',
      primerNombre: 'CARLOS',
      segundoNombre: 'ALBERTO',
      sexo: 'HOMBRE',
      puestoTrabajoCiuo: 'ANALISTA DE SISTEMAS / OPERADOR',
    },
    seccionB: {
      fechaEmisionAño: y,
      fechaEmisionMes: m,
      fechaEmisionDia: d,
      tipoEvaluacion: 'PERIÓDICO',
    },
    seccionC: {
      aptitud: 'APTO CON LIMITACIONES',
      detalleObservaciones: 'El trabajador presenta astenopia visual leve secundaria a exposición prolongada a Pantallas de Visualización de Datos (PVD). Requiere lentes con corrección y filtro antireflejo en horario laboral.',
    },
    seccionD: {
      descripcionRecomendaciones: 'ESTILO DE VIDA SALUDABLE. USO DE EPP VISUAL (Lentes de protección / corrección). Pausas activas visuales de 5 minutos cada 2 horas.',
      observacionGeneral: 'Se recomienda reevaluación médica optométrica en 6 meses.',
    },
    seccionE: {
      nombreApellidoProf: 'Dr. Roberto Silva P.',
      codigoMedico: 'MSP-17-9842',
      firmaSello: 'Firmado digitalmente - Dr. Roberto Silva (Médico Ocupacional)',
    },
    seccionF: {
      firmaUsuario: 'Carlos A. García M.',
      cedulaUsuario: '1723456789',
    },
  }
}
