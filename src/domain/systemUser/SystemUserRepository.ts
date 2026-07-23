import type { SystemUser, SystemUserInput } from './SystemUser'

export interface SystemUserRepository {
  findAll(): Promise<SystemUser[]>
  create(data: SystemUserInput): Promise<SystemUser>
  update(id: string, data: SystemUserInput): Promise<SystemUser>
  delete(id: string): Promise<void>
}
