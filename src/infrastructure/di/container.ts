import { LocalStoragePatientRepository } from '@/infrastructure/persistence/LocalStoragePatientRepository'
import { LocalStorageAuthRepository } from '@/infrastructure/persistence/LocalStorageAuthRepository'
import { LocalStorageClinicalHistoryRepository } from '@/infrastructure/persistence/LocalStorageClinicalHistoryRepository'
import { LocalStoragePhysicalExamRepository } from '@/infrastructure/persistence/LocalStoragePhysicalExamRepository'
import { LocalStorageImagingRecordRepository } from '@/infrastructure/persistence/LocalStorageImagingRecordRepository'
import { LocalStorageHistoryFolderRepository } from '@/infrastructure/persistence/LocalStorageHistoryFolderRepository'
import { LocalStorageSystemUserRepository } from '@/infrastructure/persistence/LocalStorageSystemUserRepository'
import { GetPatientsUseCase } from '@/application/patient/GetPatientsUseCase'
import { GetPatientByIdUseCase } from '@/application/patient/GetPatientByIdUseCase'
import { CreatePatientUseCase } from '@/application/patient/CreatePatientUseCase'
import { UpdatePatientUseCase } from '@/application/patient/UpdatePatientUseCase'
import { DeletePatientUseCase } from '@/application/patient/DeletePatientUseCase'
import { LoginUseCase } from '@/application/auth/LoginUseCase'
import { LogoutUseCase } from '@/application/auth/LogoutUseCase'
import { GetCurrentUserUseCase } from '@/application/auth/GetCurrentUserUseCase'
import { GetClinicalHistoryUseCase } from '@/application/clinicalHistory/GetClinicalHistoryUseCase'
import { SaveClinicalHistoryUseCase } from '@/application/clinicalHistory/SaveClinicalHistoryUseCase'
import { GetPhysicalExamUseCase } from '@/application/physicalExam/GetPhysicalExamUseCase'
import { SavePhysicalExamUseCase } from '@/application/physicalExam/SavePhysicalExamUseCase'
import { GetImagingRecordUseCase } from '@/application/imaging/GetImagingRecordUseCase'
import { SaveImagingRecordUseCase } from '@/application/imaging/SaveImagingRecordUseCase'
import { GetHistoryFoldersUseCase } from '@/application/historyFolder/GetHistoryFoldersUseCase'
import { GetHistoryFolderByIdUseCase } from '@/application/historyFolder/GetHistoryFolderByIdUseCase'
import { CreateHistoryFolderUseCase } from '@/application/historyFolder/CreateHistoryFolderUseCase'
import { DeleteHistoryFolderUseCase } from '@/application/historyFolder/DeleteHistoryFolderUseCase'
import { GetSystemUsersUseCase } from '@/application/systemUser/GetSystemUsersUseCase'
import { CreateSystemUserUseCase } from '@/application/systemUser/CreateSystemUserUseCase'
import { UpdateSystemUserUseCase } from '@/application/systemUser/UpdateSystemUserUseCase'
import { DeleteSystemUserUseCase } from '@/application/systemUser/DeleteSystemUserUseCase'

const patientRepository = new LocalStoragePatientRepository()
const authRepository = new LocalStorageAuthRepository()
const clinicalHistoryRepository = new LocalStorageClinicalHistoryRepository()
const physicalExamRepository = new LocalStoragePhysicalExamRepository()
const imagingRecordRepository = new LocalStorageImagingRecordRepository()
const historyFolderRepository = new LocalStorageHistoryFolderRepository()
const systemUserRepository = new LocalStorageSystemUserRepository()

export const container = {
  getPatients: new GetPatientsUseCase(patientRepository),
  getPatientById: new GetPatientByIdUseCase(patientRepository),
  createPatient: new CreatePatientUseCase(patientRepository),
  updatePatient: new UpdatePatientUseCase(patientRepository),
  deletePatient: new DeletePatientUseCase(patientRepository),
  login: new LoginUseCase(authRepository),
  logout: new LogoutUseCase(authRepository),
  getCurrentUser: new GetCurrentUserUseCase(authRepository),
  getClinicalHistory: new GetClinicalHistoryUseCase(clinicalHistoryRepository),
  saveClinicalHistory: new SaveClinicalHistoryUseCase(clinicalHistoryRepository),
  getPhysicalExam: new GetPhysicalExamUseCase(physicalExamRepository),
  savePhysicalExam: new SavePhysicalExamUseCase(physicalExamRepository),
  getImagingRecord: new GetImagingRecordUseCase(imagingRecordRepository),
  saveImagingRecord: new SaveImagingRecordUseCase(imagingRecordRepository),
  getHistoryFolders: new GetHistoryFoldersUseCase(historyFolderRepository),
  getHistoryFolderById: new GetHistoryFolderByIdUseCase(historyFolderRepository),
  createHistoryFolder: new CreateHistoryFolderUseCase(historyFolderRepository),
  deleteHistoryFolder: new DeleteHistoryFolderUseCase(
    historyFolderRepository,
    clinicalHistoryRepository,
    physicalExamRepository,
    imagingRecordRepository,
  ),
  getSystemUsers: new GetSystemUsersUseCase(systemUserRepository),
  createSystemUser: new CreateSystemUserUseCase(systemUserRepository),
  updateSystemUser: new UpdateSystemUserUseCase(systemUserRepository),
  deleteSystemUser: new DeleteSystemUserUseCase(systemUserRepository),
}
