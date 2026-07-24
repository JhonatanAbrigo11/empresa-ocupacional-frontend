import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, UserCog, X } from 'lucide-react'
import type {
  SystemUser,
  SystemUserInput,
  SystemUserRole,
} from '@/domain/systemUser/SystemUser'
import { container } from '@/infrastructure/di/container'

const emptyForm: SystemUserInput = {
  nombre: '',
  email: '',
  rol: 'medico',
  activo: true,
}

function rolLabel(rol: SystemUserRole): string {
  if (rol === 'admin') return 'Administrador'
  if (rol === 'medico') return 'Médico'
  return 'Asistente'
}

export function UsersPage() {
  const [users, setUsers] = useState<SystemUser[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<SystemUser | null>(null)
  const [form, setForm] = useState<SystemUserInput>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const list = await container.getSystemUsers.execute()
    setUsers(list)
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setError(null)
    setModalOpen(true)
  }

  const openEdit = (user: SystemUser) => {
    setEditing(user)
    setForm({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      activo: user.activo,
    })
    setError(null)
    setModalOpen(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editing) {
        await container.updateSystemUser.execute(editing.id, form)
      } else {
        await container.createSystemUser.execute(form)
      }
      setModalOpen(false)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (user: SystemUser) => {
    const ok = window.confirm(`¿Eliminar al usuario ${user.nombre}?`)
    if (!ok) return
    await container.deleteSystemUser.execute(user.id)
    await refresh()
  }

  return (
    <div className="page-container">
      {/* Page Card Header matching reference image */}
      <div className="page-card-header">
        <div className="header-left">
          <div className="header-icon-box">
            <UserCog size={24} />
          </div>
          <div>
            <h1 className="header-title">Usuarios del Sistema</h1>
            <p className="header-subtitle">
              Administración de roles, permisos y credenciales de acceso.
            </p>
          </div>
        </div>

        <div className="header-actions-wrap">
          <button
            type="button"
            className="btn-primary-blue"
            onClick={openCreate}
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Page Card Body */}
      <div className="page-card-body">
        {loading ? (
          <div className="app-loading app-loading--inline">
            <div className="spinner" />
            <p>Cargando usuarios…</p>
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <p>No hay usuarios registrados.</p>
            <span>Crea el primer usuario del sistema.</span>
          </div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="norm-table">
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>CORREO ELECTRÓNICO</th>
                    <th>ROL</th>
                    <th>ESTADO</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="col-name">
                        <strong>{user.nombre}</strong>
                      </td>
                      <td style={{ color: '#334155' }}>{user.email}</td>
                      <td style={{ fontWeight: 600, color: '#1d6bf3' }}>{rolLabel(user.rol)}</td>
                      <td>
                        <span className={`status-dot-badge ${user.activo ? 'status-dot-badge--active' : 'status-dot-badge--inactive'}`}>
                          <span className="status-dot" /> {user.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="norm-action-group" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="norm-action-btn"
                            title="Editar"
                            onClick={() => openEdit(user)}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            type="button"
                            className="norm-action-btn norm-action-btn--danger"
                            title="Eliminar"
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="table-pagination-footer">
              <span className="pagination-info">
                Mostrando 1 a {users.length} de {users.length} resultados
              </span>
              <div className="pagination-controls">
                <button type="button" className="page-btn" disabled>
                  &lt;
                </button>
                <button type="button" className="page-num page-num--active">
                  1
                </button>
                <button type="button" className="page-btn" disabled>
                  &gt;
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {modalOpen && (
        <div className="modal-overlay" role="presentation" onClick={() => setModalOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__header">
              <h2 id="user-modal-title">
                {editing ? 'Editar usuario' : 'Nuevo usuario'}
              </h2>
              <button
                type="button"
                className="btn btn--icon"
                onClick={() => setModalOpen(false)}
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <form className="modal__body" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field">
                  <span>Nombre completo *</span>
                  <input
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span>Correo electrónico *</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span>Rol</span>
                  <select
                    value={form.rol}
                    onChange={(e) =>
                      setForm({ ...form, rol: e.target.value as SystemUserRole })
                    }
                  >
                    <option value="admin">Administrador</option>
                    <option value="medico">Médico</option>
                    <option value="asistente">Asistente</option>
                  </select>
                </label>
                <label className="field">
                  <span>Estado</span>
                  <select
                    value={form.activo ? '1' : '0'}
                    onChange={(e) =>
                      setForm({ ...form, activo: e.target.value === '1' })
                    }
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </label>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="modal__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? 'Guardando…' : editing ? 'Guardar cambios' : 'Crear usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
