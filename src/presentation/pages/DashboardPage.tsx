import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  FileText,
  FileCheck,
  Microscope,
  TrendingUp,
  Plus,
  ShieldCheck,
  Activity,
  ChevronRight,
} from 'lucide-react'
import { usePatients } from '@/presentation/hooks/usePatients'
import { PatientModal } from '@/presentation/components/patients/PatientModal'
import type { PatientInput } from '@/domain/patient/Patient'

export function DashboardPage() {
  const navigate = useNavigate()
  const { patients, create } = usePatients()

  const [period, setPeriod] = useState<'30d' | 'trimestre' | '2026'>('30d')
  const [modalOpen, setModalOpen] = useState(false)
  const [hoveredDonutSlice, setHoveredDonutSlice] = useState<string | null>(null)
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null)

  const handleCreatePatient = async (data: PatientInput) => {
    await create(data)
  }

  // Calculated KPI numbers
  const totalPacientes = patients.length || 6

  // Monthly Evaluations Mock Data
  const monthlyData = [
    { mes: 'Ene', ingreso: 12, periodico: 24, retiro: 4 },
    { mes: 'Feb', ingreso: 18, periodico: 30, retiro: 6 },
    { mes: 'Mar', ingreso: 15, periodico: 28, retiro: 3 },
    { mes: 'Abr', ingreso: 22, periodico: 35, retiro: 8 },
    { mes: 'May', ingreso: 19, periodico: 40, retiro: 5 },
    { mes: 'Jun', ingreso: 25, periodico: 48, retiro: 7 },
    { mes: 'Jul', ingreso: 28, periodico: 52, retiro: 10 },
  ]

  // Donut chart data
  const aptitudData = [
    { label: 'Apto Sin Restricción', valor: 65, color: '#10b981', count: 42 },
    { label: 'Apto Con Observaciones', valor: 20, color: '#0284c7', count: 13 },
    { label: 'Apto Con Restricciones', valor: 10, color: '#f59e0b', count: 6 },
    { label: 'No Apto Temporal', valor: 5, color: '#ef4444', count: 3 },
  ]

  // Risk matrix data
  const riesgosData = [
    { nombre: 'Ergonómico / Postural', porcentaje: 48, nivel: 'Alto', color: '#f59e0b' },
    { nombre: 'Físico (Ruido / Iluminación)', porcentaje: 38, nivel: 'Medio', color: '#0284c7' },
    { nombre: 'Psicosocial (Turnos / Estrés)', porcentaje: 30, nivel: 'Medio', color: '#6366f1' },
    { nombre: 'Mecanico (Maquinarias)', porcentaje: 24, nivel: 'Bajo', color: '#10b981' },
    { nombre: 'Químico (Polvos / Vapores)', porcentaje: 16, nivel: 'Bajo', color: '#8b5cf6' },
  ]

  // Recent activity stream
  const recentActivities = [
    {
      id: '1',
      tipo: 'HCO',
      codigo: 'HCO-2026-0089',
      paciente: 'Carlos Eduardo Mendoza Viteri',
      empresa: 'Corporación Favorita S.A.',
      estado: 'APTO',
      fecha: 'Hoy 14:30',
      route: '/app/documentos/historia-clinica-ocupacional',
    },
    {
      id: '2',
      tipo: 'CERT',
      codigo: 'CERT-2026-0142',
      paciente: 'María Belén Torres Castillo',
      empresa: 'Industrial Pesquera del Ecuador',
      estado: 'APTO',
      fecha: 'Hoy 11:15',
      route: '/app/documentos/certificado-medico-ocupacional',
    },
    {
      id: '3',
      tipo: 'COP',
      codigo: 'COP-2026-0034',
      paciente: 'José Antonio Ramírez Morales',
      empresa: 'Hotel & Catering Los Andes',
      estado: 'APTO',
      fecha: 'Ayer 16:45',
      route: '/app/documentos/certificado-coproparasitario',
    },
    {
      id: '4',
      tipo: 'REC',
      codigo: 'REC-2026-0781',
      paciente: 'Luis Fernando Benítez Delgado',
      empresa: 'Distribuidora Logística Express',
      estado: 'PRESCRITA',
      fecha: 'Ayer 09:20',
      route: '/app/documentos/receta-medica',
    },
    {
      id: '5',
      tipo: 'INM',
      codigo: 'INM-2026-0119',
      paciente: 'Verónica Patricia Salgado Vega',
      empresa: 'Clínica de Especialidades Guayaquil',
      estado: 'ESQUEMA COMPLETO',
      fecha: '22 Jul 2026',
      route: '/app/documentos/inmunizaciones',
    },
  ]

  return (
    <div className="page dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Patient Modal shortcut */}
      <PatientModal
        open={modalOpen}
        patient={null}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePatient}
      />

      {/* Top Banner & Header */}
      <div className="page-card-header">
        <div className="header-left">
          <div className="header-icon-box">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="header-title">Panel de Control &amp; Analytics</h1>
            <p className="header-subtitle">
              Resumen en tiempo real de aptitud laboral, documentos digitalizados y matriz de riesgos ocupacionales.
            </p>
          </div>
        </div>

        <div className="header-actions-wrap">
          {/* Period Selector */}
          <div className="toolbar-btn-group">
            {(['30d', 'trimestre', '2026'] as const).map((p) => (
              <button
                key={p}
                type="button"
                className={`btn-toolbar-pill ${period === p ? 'btn-toolbar-pill--active' : ''}`}
                onClick={() => setPeriod(p)}
                style={{
                  background: period === p ? '#1d6bf3' : '#f8fafc',
                  color: period === p ? '#ffffff' : '#334155',
                  borderColor: period === p ? '#1d6bf3' : '#e2e8f0',
                }}
              >
                {p === '30d' ? 'Últimos 30 días' : p === 'trimestre' ? 'Trimestre' : 'Año 2026'}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-primary-blue"
            onClick={() => setModalOpen(true)}
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Nuevo Paciente</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* KPI 1 */}
        <div className="kpi-card" style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Trabajadores Registrados
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'grid', placeItems: 'center' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{totalPacientes}</h2>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <TrendingUp size={14} /> +18% este mes
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Pacientes con ficha activa y empresa asignada</span>
        </div>

        {/* KPI 2 */}
        <div className="kpi-card" style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Historias Clínicas Ocupacionales
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#d1fae5', color: '#059669', display: 'grid', placeItems: 'center' }}>
              <FileCheck size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>12</h2>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ShieldCheck size={14} /> 85% Aptos
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Hojas 1, 2 y 3 procesadas en el sistema</span>
        </div>

        {/* KPI 3 */}
        <div className="kpi-card" style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Certificados Emitidos
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'grid', placeItems: 'center' }}>
              <FileText size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>14</h2>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '2px' }}>
              100% Imprimibles
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Certificados de Aptitud e Ingreso/Retiro</span>
        </div>

        {/* KPI 4 */}
        <div className="kpi-card" style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Exámenes Coproparasitarios
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f3e8ff', color: '#7e22ce', display: 'grid', placeItems: 'center' }}>
              <Microscope size={20} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>8</h2>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>Alimentos al día</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Control para manipuladores de alimentos</span>
        </div>
      </div>

      {/* Main Charts Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* CHART CARD 1: Distribuición de Aptitud Médica (Donut Chart) */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Distribución de Aptitud Médica Ocupacional
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Porcentaje por dictamen médica en evaluaciones</span>
            </div>
            <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '0.3rem 0.65rem', borderRadius: '6px', fontWeight: 600, color: '#475569' }}>
              Total: 64 Eval.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', padding: '0.5rem 0' }}>
            {/* SVG Donut Chart */}
            <div style={{ position: 'relative', width: '180px', height: '180px', display: 'grid', placeItems: 'center' }}>
              <svg width="180" height="180" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f1f5f9" strokeWidth="5" />
                
                {/* Slice 1: Apto (65%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="5.5"
                  strokeDasharray="65 35"
                  strokeDashoffset="25"
                  style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSlice('Apto Sin Restricción')}
                  onMouseLeave={() => setHoveredDonutSlice(null)}
                />
                
                {/* Slice 2: Observaciones (20%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#0284c7"
                  strokeWidth="5.5"
                  strokeDasharray="20 80"
                  strokeDashoffset="-40"
                  style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSlice('Apto Con Observaciones')}
                  onMouseLeave={() => setHoveredDonutSlice(null)}
                />

                {/* Slice 3: Restricciones (10%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="5.5"
                  strokeDasharray="10 90"
                  strokeDashoffset="-60"
                  style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSlice('Apto Con Restricciones')}
                  onMouseLeave={() => setHoveredDonutSlice(null)}
                />

                {/* Slice 4: No Apto (5%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="5.5"
                  strokeDasharray="5 95"
                  strokeDashoffset="-70"
                  style={{ transition: 'stroke-width 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDonutSlice('No Apto Temporal')}
                  onMouseLeave={() => setHoveredDonutSlice(null)}
                />
              </svg>

              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'block', lineHeight: 1 }}>
                  {hoveredDonutSlice ? (aptitudData.find(d => d.label === hoveredDonutSlice)?.valor + '%') : '65%'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                  {hoveredDonutSlice || 'Aptos Total'}
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minWidth: '180px' }}>
              {aptitudData.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.5rem',
                    borderRadius: '6px',
                    background: hoveredDonutSlice === item.label ? '#f8fafc' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                    <span style={{ color: '#334155', fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <strong style={{ color: '#0f172a' }}>{item.valor}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHART CARD 2: Evolución Mensual de Evaluaciones (Bar Chart) */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Evaluaciones Médicas por Mes (2026)
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Exámenes de Ingreso, Periódicos y Retiro</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0284c7' }}>● Periódico</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>● Ingreso</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', height: '170px', padding: '1rem 0.5rem 0 0.5rem', borderBottom: '1px solid var(--border)' }}>
            {monthlyData.map((d, index) => {
              const heightP = (d.periodico / 60) * 100
              const heightI = (d.ingreso / 60) * 100
              const isHovered = hoveredBarIndex === index

              return (
                <div
                  key={d.mes}
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    cursor: 'pointer',
                  }}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div style={{ position: 'absolute', transform: 'translateY(-36px)', background: '#0f172a', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10 }}>
                      {d.mes}: {d.periodico + d.ingreso} eval.
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '130px', width: '100%', justifyContent: 'center' }}>
                    {/* Periodico bar */}
                    <div
                      style={{
                        width: '12px',
                        height: `${heightP}%`,
                        background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)',
                        borderRadius: '4px 4px 0 0',
                        opacity: isHovered ? 1 : 0.85,
                        transition: 'all 0.2s ease',
                      }}
                    />
                    {/* Ingreso bar */}
                    <div
                      style={{
                        width: '12px',
                        height: `${heightI}%`,
                        background: 'linear-gradient(180deg, #10b981 0%, #047857 100%)',
                        borderRadius: '4px 4px 0 0',
                        opacity: isHovered ? 1 : 0.85,
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>

                  <span style={{ fontSize: '0.78rem', color: isHovered ? '#0f172a' : '#64748b', fontWeight: isHovered ? 700 : 500 }}>
                    {d.mes}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Matriz de Riesgos & Últimas Actividades */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Matriz de Riesgos Ocupacionales */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Factores de Riesgo Ocupacional Prevalentes
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Identificados en las matrices de puestos de trabajo</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {riesgosData.map((item) => (
              <div key={item.nombre} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.nombre}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.porcentaje}% Prevalencia</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${item.porcentaje}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimos Documentos Emitidos (Live Stream) */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Actividad Reciente &amp; Documentos Emitidos
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Últimas evaluaciones y certificados procesados</span>
            </div>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => navigate('/app/documentos/historia-clinica-ocupacional')}
              style={{ gap: '4px', fontSize: '0.78rem' }}
            >
              <span>Ver todos</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {recentActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => navigate(act.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = '#f0f9ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background:
                        act.tipo === 'HCO' ? '#e0f2fe' : act.tipo === 'CERT' ? '#d1fae5' : act.tipo === 'COP' ? '#fef3c7' : '#f3e8ff',
                      color:
                        act.tipo === 'HCO' ? '#0284c7' : act.tipo === 'CERT' ? '#059669' : act.tipo === 'COP' ? '#d97706' : '#7e22ce',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    {act.tipo}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>
                      {act.paciente}
                    </strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{act.codigo}</span>
                      <span>•</span>
                      <span>{act.empresa}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="status-pill status-pill--ok" style={{ fontSize: '0.72rem', padding: '2px 6px' }}>
                    {act.estado}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginTop: '2px' }}>
                    {act.fecha}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
