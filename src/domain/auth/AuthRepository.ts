import type { Credentials, User } from './User'

/** Puerto de salida: contrato de autenticación */
export interface AuthRepository {
  login(credentials: Credentials): Promise<User>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
}
