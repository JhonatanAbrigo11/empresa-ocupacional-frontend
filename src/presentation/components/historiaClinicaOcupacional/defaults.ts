import type {
  HistoriaClinicaOcupacionalDocument,
  Hoja1Data,
  Hoja2Data,
  Hoja3Data,
  RiesgoItem,
} from '@/domain/historiaClinicaOcupacional/types'

export const EXAMEN_FISICO_ESTRUCTURA = [
  {
    region: '1. Piel',
    items: [
      { id: '1_a', label: 'a. Cicatrices' },
      { id: '1_b', label: 'b. Piel y Faneras' },
    ],
  },
  {
    region: '2. Ojos',
    items: [
      { id: '2_a', label: 'a. Párpados' },
      { id: '2_b', label: 'b. Conjuntivas' },
      { id: '2_c', label: 'c. Pupilas' },
      { id: '2_d', label: 'd. Córnea' },
      { id: '2_e', label: 'e. Motilidad' },
    ],
  },
  {
    region: '3. Oído',
    items: [
      { id: '3_a', label: 'a. C. auditivo externo' },
      { id: '3_b', label: 'b. Pabellón' },
      { id: '3_c', label: 'c. Tímpanos' },
    ],
  },
  {
    region: '4. Oro Faringe',
    items: [
      { id: '4_a', label: 'a. Labios' },
      { id: '4_b', label: 'b. Lengua' },
      { id: '4_c', label: 'c. Faringe' },
      { id: '4_d', label: 'd. Amígdalas' },
      { id: '4_e', label: 'e. Dentadura' },
    ],
  },
  {
    region: '5. Nariz',
    items: [
      { id: '5_a', label: 'a. Tabique' },
      { id: '5_b', label: 'b. Cornetes' },
      { id: '5_c', label: 'c. Mucosas' },
      { id: '5_d', label: 'd. Senos paranasales' },
    ],
  },
  {
    region: '6. Cuello',
    items: [
      { id: '6_a', label: 'a. Tiroides / masas' },
      { id: '6_b', label: 'b. Movilidad' },
    ],
  },
  {
    region: '7. Tórax',
    items: [
      { id: '7_a', label: 'a. Mamas' },
      { id: '7_b', label: 'b. Corazón' },
    ],
  },
  {
    region: '8. Tórax posterior',
    items: [
      { id: '8_a', label: 'a. Pulmones' },
      { id: '8_b', label: 'b. Corazón' },
    ],
  },
  {
    region: '9. Abdomen',
    items: [
      { id: '9_a', label: 'a. Vísceras' },
      { id: '9_b', label: 'b. Pared abdominal' },
    ],
  },
  {
    region: '10. Columna',
    items: [
      { id: '10_a', label: 'a. Flexibilidad' },
      { id: '10_b', label: 'b. Desviación' },
      { id: '10_c', label: 'c. Dolor' },
    ],
  },
  {
    region: '11. Pelvis',
    items: [
      { id: '11_a', label: 'a. Pelvis' },
      { id: '11_b', label: 'b. Genitales' },
    ],
  },
  {
    region: '12. Extremidades',
    items: [
      { id: '12_a', label: 'a. Vascular' },
      { id: '12_b', label: 'b. Miembros superiores' },
      { id: '12_c', label: 'c. Miembros inferiores' },
    ],
  },
  {
    region: '13. Neurológico',
    items: [
      { id: '13_a', label: 'a. Fuerza' },
      { id: '13_b', label: 'b. Sensibilidad' },
      { id: '13_c', label: 'c. Marcha' },
      { id: '13_d', label: 'd. Reflejos' },
    ],
  },
]

export function createInitialRiesgos(): RiesgoItem[] {
  return [
    // FÍSICO
    { id: 'r_fis_1', categoria: 'FISICO', nombre: 'Temperaturas altas', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_2', categoria: 'FISICO', nombre: 'Temperaturas bajas', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_3', categoria: 'FISICO', nombre: 'Radiación no ionizante', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_4', categoria: 'FISICO', nombre: 'Radiación ionizante', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_5', categoria: 'FISICO', nombre: 'Ruido', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_fis_6', categoria: 'FISICO', nombre: 'Vibración', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_7', categoria: 'FISICO', nombre: 'Iluminación', puestos: [true, true, false, false, false, false, false] },
    { id: 'r_fis_8', categoria: 'FISICO', nombre: 'Ventilación', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_9', categoria: 'FISICO', nombre: 'Fluido eléctrico', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_fis_10', categoria: 'FISICO', nombre: 'Otros (especificar)', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },

    // LOCATIVO / SEGURIDAD
    { id: 'r_seg_1', categoria: 'LOCATIVO', nombre: 'Falta de señalización / desorden', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_2', categoria: 'LOCATIVO', nombre: 'Atrapamiento entre maquinaria / superficies', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_3', categoria: 'LOCATIVO', nombre: 'Atrapamiento entre objetos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_4', categoria: 'LOCATIVO', nombre: 'Caídas de objetos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_5', categoria: 'LOCATIVO', nombre: 'Caídas a mismo nivel', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_seg_6', categoria: 'LOCATIVO', nombre: 'Caídas a distinto nivel', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_7', categoria: 'LOCATIVO', nombre: 'Perforación', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_8', categoria: 'LOCATIVO', nombre: 'Cortes', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_9', categoria: 'LOCATIVO', nombre: 'Choque con los vehículos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_10', categoria: 'LOCATIVO', nombre: 'Atropellos en lugares de trabajo', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_11', categoria: 'LOCATIVO', nombre: 'Proyección de fluidos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_12', categoria: 'LOCATIVO', nombre: 'Proyección de partículas y fragmentos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_seg_13', categoria: 'LOCATIVO', nombre: 'Contacto con partes con calor', puestos: [false, false, false, false, false, false, false] },

    // ELÉCTRICO
    { id: 'r_elec_1', categoria: 'ELECTRICO', nombre: 'Contacto eléctrico', puestos: [false, false, false, false, false, false, false] },

    // OTROS SEGURIDAD
    { id: 'r_otr_1', categoria: 'OTROS', nombre: 'Otros riesgos de seguridad', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },

    // QUÍMICO
    { id: 'r_qui_1', categoria: 'QUIMICO', nombre: 'Polvo', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_2', categoria: 'QUIMICO', nombre: 'Humo', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_3', categoria: 'QUIMICO', nombre: 'Gases', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_4', categoria: 'QUIMICO', nombre: 'Vapores', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_5', categoria: 'QUIMICO', nombre: 'Aerosoles', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_6', categoria: 'QUIMICO', nombre: 'Niebla', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_7', categoria: 'QUIMICO', nombre: 'Líquidos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_qui_8', categoria: 'QUIMICO', nombre: 'Otros (especificar)', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },

    // BIOLÓGICO
    { id: 'r_bio_1', categoria: 'BIOLOGICO', nombre: 'Virus', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_bio_2', categoria: 'BIOLOGICO', nombre: 'Hongos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_bio_3', categoria: 'BIOLOGICO', nombre: 'Bacterias', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_bio_4', categoria: 'BIOLOGICO', nombre: 'Parásitos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_bio_5', categoria: 'BIOLOGICO', nombre: 'Fluidos de animales', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_bio_6', categoria: 'BIOLOGICO', nombre: 'Exposición a sangre o fluidos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_bio_7', categoria: 'BIOLOGICO', nombre: 'Otros (especificar)', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },

    // ERGONÓMICO
    { id: 'r_erg_1', categoria: 'ERGONOMICO', nombre: 'Manejo manual de cargas', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_erg_2', categoria: 'ERGONOMICO', nombre: 'Movimientos repetitivos', puestos: [true, true, false, false, false, false, false] },
    { id: 'r_erg_3', categoria: 'ERGONOMICO', nombre: 'Postura forzada', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_erg_4', categoria: 'ERGONOMICO', nombre: 'Trabajos en PVD (Pantallas de Visualización)', puestos: [true, true, false, false, false, false, false] },
    { id: 'r_erg_5', categoria: 'ERGONOMICO', nombre: 'Diseño inadecuado del puesto', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_erg_6', categoria: 'ERGONOMICO', nombre: 'Otros ergonómicos', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },

    // PSICOSOCIAL
    { id: 'r_psi_1', categoria: 'PSICOSOCIAL', nombre: 'Monotonía del trabajo', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_2', categoria: 'PSICOSOCIAL', nombre: 'Sobrecarga laboral', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_psi_3', categoria: 'PSICOSOCIAL', nombre: 'Minuciosidad de la tarea', puestos: [true, true, false, false, false, false, false] },
    { id: 'r_psi_4', categoria: 'PSICOSOCIAL', nombre: 'Alta responsabilidad', puestos: [true, false, false, false, false, false, false] },
    { id: 'r_psi_5', categoria: 'PSICOSOCIAL', nombre: 'Autonomía en la toma de decisiones', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_6', categoria: 'PSICOSOCIAL', nombre: 'Nivel de cambio en dirección/organización', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_7', categoria: 'PSICOSOCIAL', nombre: 'Turnos rotativos', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_8', categoria: 'PSICOSOCIAL', nombre: 'Inestabilidad laboral', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_9', categoria: 'PSICOSOCIAL', nombre: 'Amenazas del entorno', puestos: [false, false, false, false, false, false, false] },
    { id: 'r_psi_10', categoria: 'PSICOSOCIAL', nombre: 'Otros psicosociales', puestos: [false, false, false, false, false, false, false], otrosDetalle: '' },
  ]
}

export function createInitialDocument(): HistoriaClinicaOcupacionalDocument {
  const hoy = new Date().toISOString().split('T')[0]

  const hoja1: Hoja1Data = {
    seccionA: {
      institucionSistema: 'SISTEMA NACIONAL DE SALUD',
      ruc: '1792123456001',
      ciiu: '8610',
      establecimiento: 'CENTRO MÉDICO OCUPACIONAL JAIMS',
      numHistoriaClinica: 'HC-2026-0042',
      numArchivo: 'ARCH-089',
      primerApellido: 'GARCÍA',
      segundoApellido: 'MENDOZA',
      primerNombre: 'CARLOS',
      segundoNombre: 'ALBERTO',
      atencionPrioritaria: {
        embarazada: false,
        discapacidad: false,
        enfermedadCatastrofica: false,
        lactancia: false,
        adultoMayor: false,
      },
      sexo: 'hombre',
      fechaNacimientoAño: '1990',
      fechaNacimientoMes: '05',
      fechaNacimientoDia: '14',
      edad: '36',
      grupoSanguineo: 'O+',
      lateralidad: 'diestr@',
    },
    seccionB: {
      puestoTrabajoCiuo: 'ANALISTA DE SISTEMAS / OPERADOR',
      fechaAtencion: hoy,
      fechaIngresoTrabajo: '2021-03-15',
      fechaReintegroTrabajo: '',
      fechaUltimoDiaLaboral: '',
      tipoEvaluacion: 'PERIÓDICO',
      observacionMotivo: 'Evaluación médica ocupacional periódica anual programada.',
    },
    seccionC: {
      antecedentesClinicosQuirurgicos: 'Apendicectomía a los 18 años sin complicaciones. No hipertensión ni diabetes.',
      antecedentesFamiliares: 'Padre con hipertensión arterial controlada. Madre viva sin patologías de importancia.',
      condicionEspecialUrgencia: {
        requiereTransfusiones: 'SI',
        tratamientoHormonal: 'NO',
        tratamientoHormonalCual: '',
      },
      ginecoObstetricos: {
        fum: '',
        gestas: '0',
        partos: '0',
        cesareas: '0',
        abortos: '0',
        planificacionFamiliar: 'NO RESPONDE',
        planificacionCual: '',
        examenesRealizados: 'N/A',
        examenesTiempo: '',
      },
      reproductivosMasculinos: {
        examenesRealizados: 'Ecografía testicular en 2024 (normal)',
        examenesTiempo: '2 años',
        planificacionFamiliar: 'NO',
        planificacionCual: '',
      },
      consumoSustancias: {
        tabaco: { tiempoConsumoMeses: '', exConsumidor: false, tiempoAbstinenciaMeses: '', noConsume: true },
        alcohol: { tiempoConsumoMeses: '12', exConsumidor: false, tiempoAbstinenciaMeses: '', noConsume: false },
        otras: { cual: '', tiempoConsumoMeses: '', exConsumidor: false, tiempoAbstinenciaMeses: '', noConsume: true },
        observacion: 'Consumo ocasional de alcohol social (1 vez al mes). No fumador.',
      },
      estiloDeVida: {
        actividadFisicaCual: 'Caminata / Fútbol semanal',
        actividadFisicaTiempo: '2 horas / semana',
      },
      condicionPreexistente: {
        cual: 'Miopía corregida con lentes',
        cantidad: 'Leve',
        medicacionHabitual: 'Ninguna',
      },
    },
    seccionD: {
      descripcionEnfermedadActual: 'Paciente asintomático al momento del examen. Refiere leve fatiga visual al final de la jornada de trabajo frente a pantallas.',
    },
    seccionE: {
      temperatura: '36.5',
      presionArterial: '120/80',
      frecuenciaCardiaca: '72',
      frecuenciaRespiratoria: '16',
      saturacionOxigeno: '98',
      peso: '74.5',
      talla: '172',
      imc: '25.18',
      perimetroAbdominal: '84',
    },
    seccionF: {
      regiones: {
        '2_b': true, // Conjuntivas con leve hiperemia
      },
      observacionExamenFisico: 'NUMERAL 2_b: Leve hiperemia conjuntival bilateral atribuible a astenopia laboral. Resto del examen físico regional dentro de límites normales.',
    },
  }

  const hoja2: Hoja2Data = {
    puestos: [
      'Puesto 1: Operador PVD / Oficina',
      'Puesto 2: Técnico de Soporte Campo',
      'Puesto 3',
      'Puesto 4',
      'Puesto 5',
      'Puesto 6',
      'Puesto 7',
    ],
    riesgos: createInitialRiesgos(),
    medidasPreventivas: [
      'Pausas activas visuales cada 2 horas, ajuste ergonométrico de silla y monitor, uso de lágrimas artificiales.',
      'Calzado de seguridad, uso de EPP para electricidad e insumos mecánicos.',
      '',
      '',
      '',
      '',
      '',
    ],
  }

  const hoja3: Hoja3Data = {
    seccionH: {
      antecedentesLaborales: [
        {
          id: 'ant_1',
          centroTrabajo: 'Empresa Tecnológica Alfa S.A.',
          actividades: 'Asistente de Soporte Técnico',
          tipoTrabajo: 'ANTERIOR',
          tiempoTrabajo: '3 años',
          incidente: false,
          accidente: false,
          enfermedadProfesional: false,
          calificadoIess: 'NO',
          fechaCalificacion: '',
          especificarIess: '',
          observaciones: 'Sin novedades médicas',
        },
        {
          id: 'ant_2',
          centroTrabajo: 'Establecimiento Actual JAIMS',
          actividades: 'Analista de Sistemas Operativo',
          tipoTrabajo: 'ACTUAL',
          tiempoTrabajo: '4 años',
          incidente: false,
          accidente: false,
          enfermedadProfesional: false,
          calificadoIess: 'NO',
          fechaCalificacion: '',
          especificarIess: '',
          observaciones: 'Exposición a Pantallas de Visualización de Datos',
        },
      ],
    },
    seccionI: {
      actividadesExtraLaborales: [
        {
          id: 'ext_1',
          tipoActividad: 'Deporte recreativo',
          descripcion: 'Fútbol de salón los fines de semana',
          fecha: hoy,
        },
      ],
    },
    seccionJ: {
      examenesResultados: [
        { id: 'ex_1', nombreExamen: 'Biometría Hemática Completa', fecha: hoy, resultados: 'Valores dentro de rangos normales' },
        { id: 'ex_2', nombreExamen: 'Optometría / Agudeza Visual', fecha: hoy, resultados: 'Miopía corregida VOD 20/20 VOI 20/20' },
        { id: 'ex_3', nombreExamen: 'Audiometría Tonal', fecha: hoy, resultados: 'Audición normal bilateral' },
      ],
      observaciones: 'Exámenes complementarios de laboratorio y gabinete sin evidencias de patología ocupacional.',
    },
    seccionK: {
      diagnosticos: [
        { id: 'diag_1', cie10: 'H53.1', descripcion: 'Astenopia / Fatiga visual', tipo: 'PRE' },
        { id: 'diag_2', cie10: 'Z00.0', descripcion: 'Examen médico general (Evaluación ocupacional periódica)', tipo: 'DEF' },
      ],
    },
    seccionL: {
      aptitud: 'APTO CON LIMITACIONES',
      observaciones: 'Apto para el puesto de trabajo con recomendación de corrección óptima y pausas visuales activas.',
    },
    seccionM: {
      descripcion: '1. Mantener pausas activas de 5 minutos cada 2 horas.\n2. Control oftalmológico anual.\n3. Uso permanente de corrección óptica con filtro azul en jornada laboral.',
    },
    seccionN: {
      realizaEvaluacion: 'NO',
      condicionRelacionadaTrabajo: 'NO',
      observacion: 'No aplica evaluación de retiro por tratarse de examen periódico.',
    },
    seccionO: {
      nombresApellidosProf: 'Dr. Roberto Silva P.',
      codigoMedico: 'MSP-17-9842',
      firmaSello: 'Firmado digitalmente - Dr. Roberto Silva (Médico Ocupacional)',
    },
    seccionP: {
      nombresApellidosTrab: 'Carlos Alberto García Mendoza',
      cedula: '1723456789',
      firma: 'Carlos A. García M.',
    },
  }

  return {
    id: 'hco_doc_demo_1',
    fechaCreacion: hoy,
    hoja1,
    hoja2,
    hoja3,
  }
}
