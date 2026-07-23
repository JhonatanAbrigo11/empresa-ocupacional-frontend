import type { Credentials, User } from '@/domain/auth/User'
import type { AuthRepository } from '@/domain/auth/AuthRepository'

export class LoginUseCase {
  private readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  execute(credentials: Credentials): Promise<User> {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      throw new Error('Correo y contraseña son obligatorios')
    }
    return this.repository.login(credentials)
  }
}
