import type { SystemUserRepository } from '@/domain/systemUser/SystemUserRepository'

export class DeleteSystemUserUseCase {
  private readonly repository: SystemUserRepository

  constructor(repository: SystemUserRepository) {
    this.repository = repository
  }

  execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
