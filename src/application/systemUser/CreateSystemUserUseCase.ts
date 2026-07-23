import type { SystemUser, SystemUserInput } from '@/domain/systemUser/SystemUser'
import type { SystemUserRepository } from '@/domain/systemUser/SystemUserRepository'

export class CreateSystemUserUseCase {
  private readonly repository: SystemUserRepository

  constructor(repository: SystemUserRepository) {
    this.repository = repository
  }

  execute(data: SystemUserInput): Promise<SystemUser> {
    if (!data.nombre.trim()) throw new Error('El nombre es obligatorio')
    if (!data.email.trim()) throw new Error('El correo es obligatorio')
    return this.repository.create(data)
  }
}
