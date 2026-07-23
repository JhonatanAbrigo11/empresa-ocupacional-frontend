export type SystemUserRole = 'admin' | 'medico' | 'asistente'

export interface SystemUser {
  id: string
  nombre: string
  email: string
  rol: SystemUserRole
  activo: boolean
  createdAt: string
  updatedAt: string
}

export type SystemUserInput = Omit<SystemUser, 'id' | 'createdAt' | 'updatedAt'>
