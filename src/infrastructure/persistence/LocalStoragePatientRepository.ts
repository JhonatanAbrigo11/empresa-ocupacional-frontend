import type { Patient, PatientInput } from '@/domain/patient/Patient'
import type { PatientRepository } from '@/domain/patient/PatientRepository'

const STORAGE_KEY = 'medocupacional_patients'

const SEED: Patient[] = [
  {
    id: '1',
    nombre: 'RODRÍGUEZ PÉRICO ANA MARÍA',
    primerApellido: 'RODRÍGUEZ',
    segundoApellido: 'PÉRICO',
    primerNombre: 'ANA',
    segundoNombre: 'MARÍA',
    cedula: '1712345678',
    sexo: 'F',
    fechaNacimiento: '1990-04-12',
    grupoSanguineo: 'O+',
    lateralidad: 'diestr@',

    estadoCivil: 'Casado/a',
    escolaridad: 'Tercer Nivel',
    provincia: 'Pichincha',
    canton: 'Quito',
    parroquia: 'Iñaquito',

    empresa: 'Constructora Andina S.A.',
    cargo: 'Ingeniera de Seguridad',
    areaDepartamento: 'Seguridad y Salud Ocupacional',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '1792123456001',
    ciiu: '4100',
    establecimiento: 'Constructora Andina - Planta Quitumbe',
    puestoTrabajoCiuo: 'INGENIERA DE SEGURIDAD CIUO 2149',
    fechaIngreso: '2019-03-01',
    numHistoriaClinica: 'HC-1712345678',
    numArchivo: 'ARCH-102',

    alergias: 'Penicilina (Urticaria severa), Polvo y Ácaros',
    antecedentesPatologicos: 'Apendicectomía (2018), Hipotiroidismo controlado',
    antecedentesFamiliares: 'Padre: Hipertensión Arterial, Madre: Diabetes Tipo 2',
    medicacionHabitual: 'Levotiroxina 50mcg/día en ayunas',

    consumoTabaco: 'No consume',
    consumoAlcohol: 'Ocasional / Social (1 vez al mes)',
    actividadFisica: 'Caminata 30 min (3 veces/semana)',

    fum: '2026-07-02',
    formulaObstetrica: 'G1 P1 C0 A0',
    metodoAnticonceptivo: 'Dispositivo Intrauterino (DIU)',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'Carlos Alberto Rodríguez',
    contactoEmergenciaTelefono: '0998887766',
    contactoEmergenciaParentesco: 'Cónyuge',

    telefono: '0991234567',
    email: 'ana.rodriguez@andina.com',
    direccion: 'Av. Amazonas N24-12 y Colón, Quito',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    nombre: 'PÉREZ GARCÍA CARLOS EDUARDO',
    primerApellido: 'PÉREZ',
    segundoApellido: 'GARCÍA',
    primerNombre: 'CARLOS',
    segundoNombre: 'EDUARDO',
    cedula: '0912345678',
    sexo: 'M',
    fechaNacimiento: '1985-11-03',
    grupoSanguineo: 'A+',
    lateralidad: 'diestr@',

    estadoCivil: 'Soltero/a',
    escolaridad: 'Secundaria',
    provincia: 'Guayas',
    canton: 'Guayaquil',
    parroquia: 'Tarqui',

    empresa: 'Petroquímica del Pacífico',
    cargo: 'Operador de Planta',
    areaDepartamento: 'Mantenimiento y Refinería',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '0998765432001',
    ciiu: '2011',
    establecimiento: 'Petroquímica del Pacífico - Refinería Guayaquil',
    puestoTrabajoCiuo: 'OPERADOR DE PLANTA CIUO 3133',
    fechaIngreso: '2015-07-15',
    numHistoriaClinica: 'HC-0912345678',
    numArchivo: 'ARCH-205',

    alergias: 'Aspirina / AINEs (Espasmo bronquial)',
    antecedentesPatologicos: 'Lumbalgia mecánica ocupacional, Colecistectomía laparoscópica (2021)',
    antecedentesFamiliares: 'Madre: Hipertensión Arterial, Abuelo: Infarto de Miocardio',
    medicacionHabitual: 'Paracetamol 500mg prn dolor',

    consumoTabaco: 'Ex-consumidor (Abstinencia 24 meses)',
    consumoAlcohol: 'Ocasional (Fines de semana)',
    actividadFisica: 'Fútbol fin de semana (90 min)',

    fum: '',
    formulaObstetrica: '',
    metodoAnticonceptivo: '',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'Lucía Pérez García',
    contactoEmergenciaTelefono: '0987776655',
    contactoEmergenciaParentesco: 'Hermana',

    telefono: '0987654321',
    email: 'carlos.perez@petropac.com',
    direccion: 'Vía a Daule Km 8.5, Cooperativa Balerio Estacio, Guayaquil',
    createdAt: '2024-02-05T10:00:00.000Z',
    updatedAt: '2024-02-05T10:00:00.000Z',
  },
  {
    id: '3',
    nombre: 'SALGADO VEGA VERÓNICA PATRICIA',
    primerApellido: 'SALGADO',
    segundoApellido: 'VEGA',
    primerNombre: 'VERÓNICA',
    segundoNombre: 'PATRICIA',
    cedula: '0923847165',
    sexo: 'F',
    fechaNacimiento: '1992-08-25',
    grupoSanguineo: 'O+',
    lateralidad: 'diestr@',

    estadoCivil: 'Casado/a',
    escolaridad: 'Tercer Nivel',
    provincia: 'Guayas',
    canton: 'Guayaquil',
    parroquia: 'Ximena',

    empresa: 'Clínica de Especialidades Guayaquil',
    cargo: 'Enfermera de Quirófano',
    areaDepartamento: 'Centro Quirúrgico',
    institucionSistema: 'INSTITUTO ECUATORIANO DE SEGURIDAD SOCIAL (IESS)',
    rucEmpresa: '0991122334001',
    ciiu: '8610',
    establecimiento: 'Clínica Especialidades - Sede Matriz',
    puestoTrabajoCiuo: 'ENFERMERA PROFESIONAL CIUO 2221',
    fechaIngreso: '2021-01-10',
    numHistoriaClinica: 'HC-0923847165',
    numArchivo: 'ARCH-310',

    alergias: 'Látex y Sulfamidas',
    antecedentesPatologicos: 'Gastritis antral crónica por Helicobacter pylori tratado',
    antecedentesFamiliares: 'Tía materna: Cáncer de Mama',
    medicacionHabitual: 'Omeprazol 20mg en ayunas',

    consumoTabaco: 'No consume',
    consumoAlcohol: 'No consume',
    actividadFisica: 'Pilates 2 veces por semana',

    fum: '2026-07-10',
    formulaObstetrica: 'G2 P2 C0 A0',
    metodoAnticonceptivo: 'Anticonceptivos Orales Combinados',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: true,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'Fernando Salgado',
    contactoEmergenciaTelefono: '0995554433',
    contactoEmergenciaParentesco: 'Esposo',

    telefono: '0994443322',
    email: 'veronica.salgado@clinicaesq.med.ec',
    direccion: 'Cdla. Kennedy Norte Av. Luis Orrantia N° 402, Guayaquil',
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-03-01T10:00:00.000Z',
  },
  {
    id: '4',
    nombre: 'RAMÍREZ MORALES JOSÉ ANTONIO',
    primerApellido: 'RAMÍREZ',
    segundoApellido: 'MORALES',
    primerNombre: 'JOSÉ',
    segundoNombre: 'ANTONIO',
    cedula: '1719283746',
    sexo: 'M',
    fechaNacimiento: '1988-02-14',
    grupoSanguineo: 'B+',
    lateralidad: 'diestr@',

    estadoCivil: 'Unión de hecho',
    escolaridad: 'Secundaria',
    provincia: 'Pichincha',
    canton: 'Quito',
    parroquia: 'Calderón',

    empresa: 'Hotel & Catering Los Andes',
    cargo: 'Manipulador de Alimentos',
    areaDepartamento: 'Cocina Central y Alimentos',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '1798877665001',
    ciiu: '5610',
    establecimiento: 'Hotel Los Andes - Cocina Principal',
    puestoTrabajoCiuo: 'COCINERO / MANIPULADOR CIUO 5120',
    fechaIngreso: '2018-09-01',
    numHistoriaClinica: 'HC-1719283746',
    numArchivo: 'ARCH-415',

    alergias: 'Mariscos y Sulfidruros',
    antecedentesPatologicos: 'Rinitis alérgica estacional',
    antecedentesFamiliares: 'Padre: Asma Bronquial',
    medicacionHabitual: 'Loratadina 10mg en caso de alergia',

    consumoTabaco: 'Fumador ocasional (2 cigarrillos/semana)',
    consumoAlcohol: 'Ocasional / Social',
    actividadFisica: 'Ciclismo de montaña domingos',

    fum: '',
    formulaObstetrica: '',
    metodoAnticonceptivo: '',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'María Carmen Morales',
    contactoEmergenciaTelefono: '0991112233',
    contactoEmergenciaParentesco: 'Madre',

    telefono: '0993332211',
    email: 'jose.ramirez@losandes.com.ec',
    direccion: 'Calle Carapungo N° E4-128 y Panamericana Norte, Quito',
    createdAt: '2024-03-15T10:00:00.000Z',
    updatedAt: '2024-03-15T10:00:00.000Z',
  },
  {
    id: '5',
    nombre: 'TORRES CASTILLO MARÍA BELÉN',
    primerApellido: 'TORRES',
    segundoApellido: 'CASTILLO',
    primerNombre: 'MARÍA',
    segundoNombre: 'BELÉN',
    cedula: '0918273645',
    sexo: 'F',
    fechaNacimiento: '1995-06-18',
    grupoSanguineo: 'O-',
    lateralidad: 'zurd@',

    estadoCivil: 'Soltero/a',
    escolaridad: 'Tercer Nivel',
    provincia: 'El Oro',
    canton: 'Machala',
    parroquia: 'Puerto Bolívar',

    empresa: 'Industrial Pesquera del Ecuador',
    cargo: 'Técnica de Laboratorio',
    areaDepartamento: 'Control de Calidad Ocupacional',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '0791234567001',
    ciiu: '1020',
    establecimiento: 'Planta de Procesamiento Machala',
    puestoTrabajoCiuo: 'TÉCNICA DE LABORATORIO CIUO 3211',
    fechaIngreso: '2022-05-16',
    numHistoriaClinica: 'HC-0918273645',
    numArchivo: 'ARCH-520',

    alergias: 'Alergia al polvillo de pescado e Iodo',
    antecedentesPatologicos: 'Miopía corregida con lentes de contacto',
    antecedentesFamiliares: 'Madre: Hipotiroidismo, Abuela: Diabetes',
    medicacionHabitual: 'Gotas lubricantes oftálmicas prn',

    consumoTabaco: 'No consume',
    consumoAlcohol: 'Ocasional / Social',
    actividadFisica: 'Natación 2 veces por semana (45 min)',

    fum: '2026-07-15',
    formulaObstetrica: 'G0 P0 C0 A0',
    metodoAnticonceptivo: 'Ninguno',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'Gonzalo Torres',
    contactoEmergenciaTelefono: '0984445566',
    contactoEmergenciaParentesco: 'Padre',

    telefono: '0986667788',
    email: 'mbelen.torres@pesquera.com.ec',
    direccion: 'Av. Bolívar Madero Vargas Km 2.5, Machala',
    createdAt: '2024-04-02T10:00:00.000Z',
    updatedAt: '2024-04-02T10:00:00.000Z',
  },
  {
    id: '6',
    nombre: 'BENÍTEZ DELGADO LUIS FERNANDO',
    primerApellido: 'BENÍTEZ',
    segundoApellido: 'DELGADO',
    primerNombre: 'LUIS',
    segundoNombre: 'FERNANDO',
    cedula: '1709823412',
    sexo: 'M',
    fechaNacimiento: '1980-01-30',
    grupoSanguineo: 'AB+',
    lateralidad: 'diestr@',

    estadoCivil: 'Casado/a',
    escolaridad: 'Secundaria',
    provincia: 'Tungurahua',
    canton: 'Ambato',
    parroquia: 'Huachi Loreto',

    empresa: 'Distribuidora Logística Express',
    cargo: 'Chofer de Carga Pesada',
    areaDepartamento: 'Transporte y Flotas',
    institucionSistema: 'SISTEMA NACIONAL DE SALUD',
    rucEmpresa: '1891239876001',
    ciiu: '4923',
    establecimiento: 'Terminal Logístico Ambato',
    puestoTrabajoCiuo: 'CONDUCTOR DE CAMIÓN CIUO 8332',
    fechaIngreso: '2012-04-01',
    numHistoriaClinica: 'HC-1709823412',
    numArchivo: 'ARCH-630',

    alergias: 'Penicilina G Benzatínica',
    antecedentesPatologicos: 'Lumbalgia L4-L5 leve, Gastritis erosiva leve',
    antecedentesFamiliares: 'Padre: Hipertensión Arterial y Cardiopatía',
    medicacionHabitual: 'Meloxicam 15mg prn, Esomeprazol 40mg/día',

    consumoTabaco: 'Fumador leve (3 cigarrillos por día)',
    consumoAlcohol: 'Moderado (Fines de semana)',
    actividadFisica: 'Caminata ocasional',

    fum: '',
    formulaObstetrica: '',
    metodoAnticonceptivo: '',

    atencionPrioritaria: {
      embarazada: false,
      discapacidad: false,
      enfermedadCatastrofica: false,
      lactancia: false,
      adultoMayor: false,
    },
    autorizaTransfusiones: 'SI',
    contactoEmergenciaNombre: 'Rosa Amelia Delgado',
    contactoEmergenciaTelefono: '0997778899',
    contactoEmergenciaParentesco: 'Esposa',

    telefono: '0992223344',
    email: 'luis.benitez@logisticaexpress.com.ec',
    direccion: 'Av. Atahualpa N° 15-40 y Los Chasquis, Ambato',
    createdAt: '2024-04-20T10:00:00.000Z',
    updatedAt: '2024-04-20T10:00:00.000Z',
  },
]

function read(): Patient[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return [...SEED]
  }
  try {
    const list = JSON.parse(raw) as Patient[]
    // If SEED has more items or updated structure, re-seed if list length is low or missing new fields
    if (!list || list.length < SEED.length || !list[0]?.alergias) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
      return [...SEED]
    }
    return list
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return [...SEED]
  }
}

function write(patients: Patient[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
}

export class LocalStoragePatientRepository implements PatientRepository {
  async findAll(): Promise<Patient[]> {
    return read().sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  async findById(id: string): Promise<Patient | null> {
    return read().find((p) => p.id === id) ?? null
  }

  async create(data: PatientInput): Promise<Patient> {
    const patients = read()
    const now = new Date().toISOString()
    const patient: Patient = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    patients.push(patient)
    write(patients)
    return patient
  }

  async update(id: string, data: PatientInput): Promise<Patient> {
    const patients = read()
    const index = patients.findIndex((p) => p.id === id)
    if (index === -1) throw new Error('Paciente no encontrado')

    const updated: Patient = {
      ...patients[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    patients[index] = updated
    write(patients)
    return updated
  }

  async delete(id: string): Promise<void> {
    write(read().filter((p) => p.id !== id))
  }
}
