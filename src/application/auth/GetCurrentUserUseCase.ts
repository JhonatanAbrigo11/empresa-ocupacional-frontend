import type { User } from '@/domain/auth/User'
import type { AuthRepository } from '@/domain/auth/AuthRepository'

export class GetCurrentUserUseCase {
  private readonly repository: AuthRepository

  constructor(repository: AuthRepository) {
    this.repository = repository
  }

  execute(): Promise<User | null> {
    return this.repository.getCurrentUser()
  }
}
