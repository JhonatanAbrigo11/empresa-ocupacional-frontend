import type { SystemUser, SystemUserInput } from '@/domain/systemUser/SystemUser'
import type { SystemUserRepository } from '@/domain/systemUser/SystemUserRepository'

const STORAGE_KEY = 'medocupacional_system_users'

const SEED: SystemUser[] = [
  {
    id: 'u1',
    nombre: 'Dr. Juan Méndez',
    email: 'admin@medocupacional.com',
    rol: 'admin',
    activo: true,
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
  },
]

function read(): SystemUser[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return [...SEED]
  }
  return JSON.parse(raw) as SystemUser[]
}

function write(users: SystemUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export class LocalStorageSystemUserRepository implements SystemUserRepository {
  async findAll(): Promise<SystemUser[]> {
    return read().sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  async create(data: SystemUserInput): Promise<SystemUser> {
    const users = read()
    const now = new Date().toISOString()
    const user: SystemUser = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    users.push(user)
    write(users)
    return user
  }

  async update(id: string, data: SystemUserInput): Promise<SystemUser> {
    const users = read()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('Usuario no encontrado')
    const updated: SystemUser = {
      ...users[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    users[index] = updated
    write(users)
    return updated
  }

  async delete(id: string): Promise<void> {
    write(read().filter((u) => u.id !== id))
  }
}
