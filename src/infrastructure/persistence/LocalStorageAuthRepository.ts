import type { Credentials, User } from '@/domain/auth/User'
import type { AuthRepository } from '@/domain/auth/AuthRepository'

const SESSION_KEY = 'medocupacional_session'

const DEMO_USER: User = {
  id: 'u1',
  nombre: 'Dr. Juan Méndez',
  email: 'admin@medocupacional.com',
}

const DEMO_PASSWORD = 'admin123'

export class LocalStorageAuthRepository implements AuthRepository {
  async login(credentials: Credentials): Promise<User> {
    const email = credentials.email.trim().toLowerCase()
    const password = credentials.password

    if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(DEMO_USER))
      return DEMO_USER
    }

    throw new Error('Credenciales incorrectas')
  }

  async logout(): Promise<void> {
    localStorage.removeItem(SESSION_KEY)
  }

  async getCurrentUser(): Promise<User | null> {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  }
}
