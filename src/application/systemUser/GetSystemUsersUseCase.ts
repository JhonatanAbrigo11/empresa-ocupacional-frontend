import type { SystemUser } from '@/domain/systemUser/SystemUser'
import type { SystemUserRepository } from '@/domain/systemUser/SystemUserRepository'

export class GetSystemUsersUseCase {
  private readonly repository: SystemUserRepository

  constructor(repository: SystemUserRepository) {
    this.repository = repository
  }

  execute(): Promise<SystemUser[]> {
    return this.repository.findAll()
  }
}
