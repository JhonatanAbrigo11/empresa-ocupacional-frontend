import type { AuthRepository } from '@/domain/auth/AuthRepository'

export class LogoutUseCase {
  private readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  execute(): Promise<void> {
    return this.repository.logout()
  }
}
