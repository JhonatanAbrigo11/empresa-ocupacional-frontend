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
    <section className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">
            <UserCog size={16} /> Configuración
          </p>
          <h1>Usuarios</h1>
          <p className="page__subtitle">
            Administra las cuentas con acceso al sistema.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openCreate}>
          <Plus size={18} />
          Nuevo usuario
        </button>
      </div>

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
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.nombre}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{rolLabel(user.rol)}</td>
                  <td>
                    <span className={`status-pill ${user.activo ? 'status-pill--ok' : 'status-pill--off'}`}>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn--icon"
                        title="Editar"
                        onClick={() => openEdit(user)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn btn--icon btn--danger"
                        title="Eliminar"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
    </section>
  )
}
