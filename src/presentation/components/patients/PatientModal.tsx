import { useEffect, useState, type FormEvent } from 'react'
import { X, User, Briefcase, HeartHandshake, Phone, Activity } from 'lucide-react'
import type { Patient, PatientInput, Sexo } from '@/domain/patient/Patient'

const emptyForm: PatientInput = {
  nombre: '',
  primerApellido: '',
  segundoApellido: '',
  primerNombre: '',
  segundoNombre: '',
  cedula: '',
  sexo: 'M',
  fechaNacimiento: '',
  grupoSanguineo: 'O+',
  lateralidad: 'diestr@',
  
  // Demográficos Adicionales
  estadoCivil: '',
  escolaridad: '',
  provincia: 'Pichincha',
  canton: 'Quito',
  parroquia: '',

  // Laborales
  empresa: '',
  cargo: '',
  areaDepartamento: '',
  institucionSistema: 'SISTEMA NACIONAL DE SALUD',
  rucEmpresa: '',
  ciiu: '',
  establecimiento: '',
  puestoTrabajoCiuo: '',
  fechaIngreso: '',
  numHistoriaClinica: '',
  numArchivo: '',

  // Antecedentes
  alergias: '',
  antecedentesPatologicos: '',
  antecedentesFamiliares: '',
  medicacionHabitual: '',

  // Hábitos
  consumoTabaco: 'No consume',
  consumoAlcohol: 'No consume',
  actividadFisica: '',

  // Gineco-Obstétricos
  fum: '',
  formulaObstetrica: '',
  metodoAnticonceptivo: '',

  // Vulnerabilidad y Emergencias
  atencionPrioritaria: {
    embarazada: false,
    discapacidad: false,
    enfermedadCatastrofica: false,
    lactancia: false,
    adultoMayor: false,
  },
  autorizaTransfusiones: 'SI',
  contactoEmergenciaNombre: '',
  contactoEmergenciaTelefono: '',
  contactoEmergenciaParentesco: '',

  // Contacto
  telefono: '',
  email: '',
  direccion: '',
}

interface PatientModalProps {
  open: boolean
  patient: Patient | null
  onClose: () => void
  onSubmit: (data: PatientInput) => Promise<void>
}

export function PatientModal({ open, patient, onClose, onSubmit }: PatientModalProps) {
  const [activeTab, setActiveTab] = useState<'personales' | 'laborales' | 'antecedentes' | 'prioritaria' | 'contacto'>('personales')
  const [form, setForm] = useState<PatientInput>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    setActiveTab('personales')
    if (patient) {
      setForm({
        nombre: patient.nombre || `${patient.primerApellido} ${patient.primerNombre}`,
        primerApellido: patient.primerApellido || '',
        segundoApellido: patient.segundoApellido || '',
        primerNombre: patient.primerNombre || '',
        segundoNombre: patient.segundoNombre || '',
        cedula: patient.cedula || '',
        sexo: patient.sexo || 'M',
        fechaNacimiento: patient.fechaNacimiento || '',
        grupoSanguineo: patient.grupoSanguineo || 'O+',
        lateralidad: patient.lateralidad || 'diestr@',
        
        estadoCivil: patient.estadoCivil || '',
        escolaridad: patient.escolaridad || '',
        provincia: patient.provincia || 'Pichincha',
        canton: patient.canton || 'Quito',
        parroquia: patient.parroquia || '',

        empresa: patient.empresa || '',
        cargo: patient.cargo || '',
        areaDepartamento: patient.areaDepartamento || '',
        institucionSistema: patient.institucionSistema || 'SISTEMA NACIONAL DE SALUD',
        rucEmpresa: patient.rucEmpresa || '',
        ciiu: patient.ciiu || '',
        establecimiento: patient.establecimiento || '',
        puestoTrabajoCiuo: patient.puestoTrabajoCiuo || '',
        fechaIngreso: patient.fechaIngreso || '',
        numHistoriaClinica: patient.numHistoriaClinica || '',
        numArchivo: patient.numArchivo || '',

        alergias: patient.alergias || '',
        antecedentesPatologicos: patient.antecedentesPatologicos || '',
        antecedentesFamiliares: patient.antecedentesFamiliares || '',
        medicacionHabitual: patient.medicacionHabitual || '',

        consumoTabaco: patient.consumoTabaco || 'No consume',
        consumoAlcohol: patient.consumoAlcohol || 'No consume',
        actividadFisica: patient.actividadFisica || '',

        fum: patient.fum || '',
        formulaObstetrica: patient.formulaObstetrica || '',
        metodoAnticonceptivo: patient.metodoAnticonceptivo || '',

        atencionPrioritaria: patient.atencionPrioritaria || {
          embarazada: false,
          discapacidad: false,
          enfermedadCatastrofica: false,
          lactancia: false,
          adultoMayor: false,
        },
        autorizaTransfusiones: patient.autorizaTransfusiones || 'SI',
        contactoEmergenciaNombre: patient.contactoEmergenciaNombre || '',
        contactoEmergenciaTelefono: patient.contactoEmergenciaTelefono || '',
        contactoEmergenciaParentesco: patient.contactoEmergenciaParentesco || '',

        telefono: patient.telefono || '',
        email: patient.email || '',
        direccion: patient.direccion || '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [open, patient])

  if (!open) return null

  const setField = <K extends keyof PatientInput>(key: K, value: PatientInput[K]) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value }
      if (['primerApellido', 'segundoApellido', 'primerNombre', 'segundoNombre'].includes(key as string)) {
        const full = [updated.primerApellido, updated.segundoApellido, updated.primerNombre, updated.segundoNombre]
          .filter(Boolean)
          .join(' ')
        updated.nombre = full
      }
      return updated
    })
  }

  const setPrioritaria = (field: keyof PatientInput['atencionPrioritaria'], val: boolean) => {
    setForm((prev) => ({
      ...prev,
      atencionPrioritaria: {
        ...prev.atencionPrioritaria,
        [field]: val,
      },
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal modal--wide"
        style={{ maxWidth: '850px', width: '94%' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="patient-modal-title">
            {patient ? 'Editar Registro de Paciente' : 'Nuevo Registro de Paciente'}
          </h2>
          <button type="button" className="btn btn--icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        {/* Modal Section Tabs */}
        <div className="patient-modal-tabs" style={{ display: 'flex', overflowX: 'auto', gap: '0.4rem', padding: '0.5rem 1.25rem', background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'personales' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('personales')}
          >
            <User size={16} />
            <span>1. Filiación</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'laborales' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('laborales')}
          >
            <Briefcase size={16} />
            <span>2. Laborales</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'antecedentes' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('antecedentes')}
          >
            <Activity size={16} />
            <span>3. Antecedentes &amp; Hábitos</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'prioritaria' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('prioritaria')}
          >
            <HeartHandshake size={16} />
            <span>4. Vulnerabilidad</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'contacto' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('contacto')}
          >
            <Phone size={16} />
            <span>5. Contacto</span>
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit} style={{ padding: '1.25rem' }}>
          {/* TAB 1: FILIACIÓN PERSONAL */}
          {activeTab === 'personales' && (
            <div className="form-grid">
              <label className="field">
                <span>Primer Apellido *</span>
                <input
                  required
                  value={form.primerApellido}
                  onChange={(e) => setField('primerApellido', e.target.value.toUpperCase())}
                  placeholder="Ej. RODRÍGUEZ"
                />
              </label>

              <label className="field">
                <span>Segundo Apellido</span>
                <input
                  value={form.segundoApellido}
                  onChange={(e) => setField('segundoApellido', e.target.value.toUpperCase())}
                  placeholder="Ej. PÉRICO"
                />
              </label>

              <label className="field">
                <span>Primer Nombre *</span>
                <input
                  required
                  value={form.primerNombre}
                  onChange={(e) => setField('primerNombre', e.target.value.toUpperCase())}
                  placeholder="Ej. ANA"
                />
              </label>

              <label className="field">
                <span>Segundo Nombre</span>
                <input
                  value={form.segundoNombre}
                  onChange={(e) => setField('segundoNombre', e.target.value.toUpperCase())}
                  placeholder="Ej. MARÍA"
                />
              </label>

              <label className="field">
                <span>Cédula / Identificación *</span>
                <input
                  required
                  value={form.cedula}
                  onChange={(e) => setField('cedula', e.target.value)}
                  placeholder="Ej. 1712345678"
                />
              </label>

              <label className="field">
                <span>Sexo *</span>
                <select
                  value={form.sexo}
                  onChange={(e) => setField('sexo', e.target.value as Sexo)}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </label>

              <label className="field">
                <span>Fecha de nacimiento</span>
                <input
                  type="date"
                  value={form.fechaNacimiento}
                  onChange={(e) => setField('fechaNacimiento', e.target.value)}
                />
              </label>

              <label className="field">
                <span>Estado Civil</span>
                <select
                  value={form.estadoCivil}
                  onChange={(e) => setField('estadoCivil', e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="Soltero/a">Soltero/a</option>
                  <option value="Casado/a">Casado/a</option>
                  <option value="Divorciado/a">Divorciado/a</option>
                  <option value="Unión de hecho">Unión de hecho</option>
                  <option value="Viudo/a">Viudo/a</option>
                </select>
              </label>

              <label className="field">
                <span>Escolaridad / Nivel Instrucción</span>
                <select
                  value={form.escolaridad}
                  onChange={(e) => setField('escolaridad', e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="Primaria">Primaria completa</option>
                  <option value="Secundaria">Secundaria / Bachillerato</option>
                  <option value="Tercer Nivel">Tercer Nivel / Universidad</option>
                  <option value="Cuarto Nivel">Cuarto Nivel / Posgrado</option>
                  <option value="Sin instrucción">Sin instrucción</option>
                </select>
              </label>

              <label className="field">
                <span>Grupo Sanguíneo</span>
                <select
                  value={form.grupoSanguineo}
                  onChange={(e) => setField('grupoSanguineo', e.target.value)}
                >
                  <option value="O+">O Rh(+)</option>
                  <option value="O-">O Rh(-)</option>
                  <option value="A+">A Rh(+)</option>
                  <option value="A-">A Rh(-)</option>
                  <option value="B+">B Rh(+)</option>
                  <option value="B-">B Rh(-)</option>
                  <option value="AB+">AB Rh(+)</option>
                  <option value="AB-">AB Rh(-)</option>
                </select>
              </label>

              <label className="field">
                <span>Lateralidad</span>
                <select
                  value={form.lateralidad}
                  onChange={(e) => setField('lateralidad', e.target.value as PatientInput['lateralidad'])}
                >
                  <option value="diestr@">Diestr@</option>
                  <option value="zurd@">Zurd@</option>
                  <option value="ambidiestr@">Ambidiestr@</option>
                </select>
              </label>

              <label className="field">
                <span>Provincia</span>
                <input
                  value={form.provincia}
                  onChange={(e) => setField('provincia', e.target.value)}
                  placeholder="Pichincha"
                />
              </label>

              <label className="field">
                <span>Cantón</span>
                <input
                  value={form.canton}
                  onChange={(e) => setField('canton', e.target.value)}
                  placeholder="Quito"
                />
              </label>
            </div>
          )}

          {/* TAB 2: DATOS LABORALES */}
          {activeTab === 'laborales' && (
            <div className="form-grid">
              <label className="field">
                <span>Institución del Sistema</span>
                <input
                  value={form.institucionSistema}
                  onChange={(e) => setField('institucionSistema', e.target.value)}
                  placeholder="SISTEMA NACIONAL DE SALUD"
                />
              </label>

              <label className="field">
                <span>Empresa / Razón Social *</span>
                <input
                  required
                  value={form.empresa}
                  onChange={(e) => setField('empresa', e.target.value)}
                  placeholder="Ej. Constructora Andina S.A."
                />
              </label>

              <label className="field">
                <span>Área / Departamento</span>
                <input
                  value={form.areaDepartamento}
                  onChange={(e) => setField('areaDepartamento', e.target.value)}
                  placeholder="Ej. Planta de Producción / Mantenimiento"
                />
              </label>

              <label className="field">
                <span>RUC Empresa</span>
                <input
                  value={form.rucEmpresa}
                  onChange={(e) => setField('rucEmpresa', e.target.value)}
                  placeholder="1792123456001"
                />
              </label>

              <label className="field">
                <span>CIIU (Actividad Económica)</span>
                <input
                  value={form.ciiu}
                  onChange={(e) => setField('ciiu', e.target.value)}
                  placeholder="4100"
                />
              </label>

              <label className="field field--span-2">
                <span>Establecimiento / Centro de Trabajo</span>
                <input
                  value={form.establecimiento}
                  onChange={(e) => setField('establecimiento', e.target.value)}
                  placeholder="Planta Quitumbe / Oficina Central"
                />
              </label>

              <label className="field">
                <span>Puesto de Trabajo (CIUO) / Cargo *</span>
                <input
                  required
                  value={form.puestoTrabajoCiuo || form.cargo}
                  onChange={(e) => {
                    setField('puestoTrabajoCiuo', e.target.value)
                    setField('cargo', e.target.value)
                  }}
                  placeholder="Ej. Ingeniera de seguridad CIUO 2149"
                />
              </label>

              <label className="field">
                <span>Fecha de Ingreso al Trabajo</span>
                <input
                  type="date"
                  value={form.fechaIngreso}
                  onChange={(e) => setField('fechaIngreso', e.target.value)}
                />
              </label>

              <label className="field">
                <span>Número de Historia Clínica</span>
                <input
                  value={form.numHistoriaClinica}
                  onChange={(e) => setField('numHistoriaClinica', e.target.value)}
                  placeholder={`HC-${form.cedula || '2026-XXXX'}`}
                />
              </label>

              <label className="field">
                <span>Número de Archivo</span>
                <input
                  value={form.numArchivo}
                  onChange={(e) => setField('numArchivo', e.target.value)}
                  placeholder="ARCH-102"
                />
              </label>
            </div>
          )}

          {/* TAB 3: ANTECEDENTES Y HÁBITOS */}
          {activeTab === 'antecedentes' && (
            <div className="form-grid">
              <label className="field field--span-2">
                <span>Alergias a Medicamentos / Alimentos</span>
                <input
                  value={form.alergias}
                  onChange={(e) => setField('alergias', e.target.value)}
                  placeholder="Ej. Penicilina, Sulfa, Ninguna conocida"
                />
              </label>

              <label className="field field--span-2">
                <span>Antecedentes Patológicos y Quirúrgicos Personales</span>
                <textarea
                  rows={2}
                  value={form.antecedentesPatologicos}
                  onChange={(e) => setField('antecedentesPatologicos', e.target.value)}
                  placeholder="Ej. Apendicectomía (2019), Hipertensión Arterial leve"
                />
              </label>

              <label className="field field--span-2">
                <span>Antecedentes Familiares</span>
                <input
                  value={form.antecedentesFamiliares}
                  onChange={(e) => setField('antecedentesFamiliares', e.target.value)}
                  placeholder="Ej. Padre: Hipertensión, Madre: Diabetes Tipo 2"
                />
              </label>

              <label className="field">
                <span>Medicación Habitual de Uso Continuo</span>
                <input
                  value={form.medicacionHabitual}
                  onChange={(e) => setField('medicacionHabitual', e.target.value)}
                  placeholder="Ej. Losartán 50mg/día"
                />
              </label>

              <label className="field">
                <span>Actividad Física / Ejercicio</span>
                <input
                  value={form.actividadFisica}
                  onChange={(e) => setField('actividadFisica', e.target.value)}
                  placeholder="Ej. Caminata 30 min (3 veces/semana)"
                />
              </label>

              <label className="field">
                <span>Consumo de Tabaco</span>
                <select
                  value={form.consumoTabaco}
                  onChange={(e) => setField('consumoTabaco', e.target.value)}
                >
                  <option value="No consume">No consume</option>
                  <option value="Ex-consumidor">Ex-consumidor</option>
                  <option value="Fumador ocasional">Fumador ocasional</option>
                  <option value="Fumador habitual">Fumador habitual</option>
                </select>
              </label>

              <label className="field">
                <span>Consumo de Alcohol</span>
                <select
                  value={form.consumoAlcohol}
                  onChange={(e) => setField('consumoAlcohol', e.target.value)}
                >
                  <option value="No consume">No consume</option>
                  <option value="Ocasional / Social">Ocasional / Social</option>
                  <option value="Moderado">Moderado</option>
                </select>
              </label>

              {form.sexo === 'F' && (
                <>
                  <div className="field field--span-2" style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
                    ANTECEDENTES GINECO-OBSTÉTRICOS
                  </div>
                  <label className="field">
                    <span>FUM (Última Menstruación)</span>
                    <input
                      type="date"
                      value={form.fum}
                      onChange={(e) => setField('fum', e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>Fórmula Obstétrica (G_ P_ C_ A_)</span>
                    <input
                      value={form.formulaObstetrica}
                      onChange={(e) => setField('formulaObstetrica', e.target.value)}
                      placeholder="Ej. G2 P2 C0 A0"
                    />
                  </label>
                  <label className="field">
                    <span>Método Anticonceptivo</span>
                    <input
                      value={form.metodoAnticonceptivo}
                      onChange={(e) => setField('metodoAnticonceptivo', e.target.value)}
                      placeholder="Ej. DIU, Preservativo, Ninguno"
                    />
                  </label>
                </>
              )}
            </div>
          )}

          {/* TAB 4: VULNERABILIDAD */}
          {activeTab === 'prioritaria' && (
            <div className="form-grid">
              <div className="field field--span-2">
                <span>ATENCIÓN PRIORITARIA Y GRUPOS VULNERABLES</span>
                <div className="checkbox-group flex-wrap" style={{ marginTop: '0.5rem' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.atencionPrioritaria.discapacidad}
                      onChange={(e) => setPrioritaria('discapacidad', e.target.checked)}
                    />
                    Persona con Discapacidad
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.atencionPrioritaria.enfermedadCatastrofica}
                      onChange={(e) => setPrioritaria('enfermedadCatastrofica', e.target.checked)}
                    />
                    Enfermedad Catastrófica
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.atencionPrioritaria.lactancia}
                      onChange={(e) => setPrioritaria('lactancia', e.target.checked)}
                    />
                    Lactancia
                  </label>
                  {form.sexo === 'F' && (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={form.atencionPrioritaria.embarazada}
                        onChange={(e) => setPrioritaria('embarazada', e.target.checked)}
                      />
                      Embarazada
                    </label>
                  )}
                </div>
              </div>

              <div className="field field--span-2" style={{ marginTop: '0.5rem' }}>
                <span>CONDICIÓN DE EMERGENCIA</span>
                <div className="inline-options" style={{ marginTop: '0.4rem' }}>
                  <span>En caso de requerir transfusiones de sangre autoriza:</span>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="autorizaTransf"
                      checked={form.autorizaTransfusiones === 'SI'}
                      onChange={() => setField('autorizaTransfusiones', 'SI')}
                    />
                    SI
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="autorizaTransf"
                      checked={form.autorizaTransfusiones === 'NO'}
                      onChange={() => setField('autorizaTransfusiones', 'NO')}
                    />
                    NO
                  </label>
                </div>
              </div>

              <div className="field field--span-2" style={{ marginTop: '0.75rem', fontWeight: 700, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem' }}>
                CONTACTO DE EMERGENCIA
              </div>

              <label className="field">
                <span>Nombre del Contacto</span>
                <input
                  value={form.contactoEmergenciaNombre}
                  onChange={(e) => setField('contactoEmergenciaNombre', e.target.value)}
                  placeholder="Ej. Juan Carlos Rodríguez"
                />
              </label>

              <label className="field">
                <span>Teléfono de Emergencia</span>
                <input
                  value={form.contactoEmergenciaTelefono}
                  onChange={(e) => setField('contactoEmergenciaTelefono', e.target.value)}
                  placeholder="0998887766"
                />
              </label>

              <label className="field">
                <span>Parentesco</span>
                <input
                  value={form.contactoEmergenciaParentesco}
                  onChange={(e) => setField('contactoEmergenciaParentesco', e.target.value)}
                  placeholder="Ej. Cónyuge / Madre"
                />
              </label>
            </div>
          )}

          {/* TAB 5: CONTACTO */}
          {activeTab === 'contacto' && (
            <div className="form-grid">
              <label className="field">
                <span>Teléfono / Celular</span>
                <input
                  value={form.telefono}
                  onChange={(e) => setField('telefono', e.target.value)}
                  placeholder="0991234567"
                />
              </label>

              <label className="field">
                <span>Correo electrónico</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="correo@empresa.com"
                />
              </label>

              <label className="field field--span-2">
                <span>Dirección de Domicilio</span>
                <textarea
                  rows={2}
                  value={form.direccion}
                  onChange={(e) => setField('direccion', e.target.value)}
                  placeholder="Calle, Número, Sector, Ciudad"
                />
              </label>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Guardando…' : patient ? 'Guardar cambios' : 'Registrar paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
