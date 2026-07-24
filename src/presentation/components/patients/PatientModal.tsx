import { useEffect, useState, type FormEvent } from 'react'
import { X, User, Briefcase, HeartHandshake, Phone } from 'lucide-react'
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
  empresa: '',
  cargo: '',
  institucionSistema: 'SISTEMA NACIONAL DE SALUD',
  rucEmpresa: '',
  ciiu: '',
  establecimiento: '',
  puestoTrabajoCiuo: '',
  fechaIngreso: '',
  numHistoriaClinica: '',
  numArchivo: '',
  atencionPrioritaria: {
    embarazada: false,
    discapacidad: false,
    enfermedadCatastrofica: false,
    lactancia: false,
    adultoMayor: false,
  },
  autorizaTransfusiones: 'SI',
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
  const [activeTab, setActiveTab] = useState<'personales' | 'laborales' | 'prioritaria' | 'contacto'>('personales')
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
        empresa: patient.empresa || '',
        cargo: patient.cargo || '',
        institucionSistema: patient.institucionSistema || 'SISTEMA NACIONAL DE SALUD',
        rucEmpresa: patient.rucEmpresa || '',
        ciiu: patient.ciiu || '',
        establecimiento: patient.establecimiento || '',
        puestoTrabajoCiuo: patient.puestoTrabajoCiuo || '',
        fechaIngreso: patient.fechaIngreso || '',
        numHistoriaClinica: patient.numHistoriaClinica || '',
        numArchivo: patient.numArchivo || '',
        atencionPrioritaria: patient.atencionPrioritaria || {
          embarazada: false,
          discapacidad: false,
          enfermedadCatastrofica: false,
          lactancia: false,
          adultoMayor: false,
        },
        autorizaTransfusiones: patient.autorizaTransfusiones || 'SI',
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
      // Auto-compute full nombre
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
        <div className="patient-modal-tabs">
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'personales' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('personales')}
          >
            <User size={16} />
            <span>1. Filiación Personal</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'laborales' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('laborales')}
          >
            <Briefcase size={16} />
            <span>2. Datos Laborales &amp; Empresa</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'prioritaria' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('prioritaria')}
          >
            <HeartHandshake size={16} />
            <span>3. Vulnerabilidad &amp; Emergencias</span>
          </button>
          <button
            type="button"
            className={`pm-tab-btn ${activeTab === 'contacto' ? 'pm-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('contacto')}
          >
            <Phone size={16} />
            <span>4. Contacto</span>
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
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

          {/* TAB 3: VULNERABILIDAD */}
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
            </div>
          )}

          {/* TAB 4: CONTACTO */}
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
