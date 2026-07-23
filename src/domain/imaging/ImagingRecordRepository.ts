import type { ImagingRecord, ImagingRecordInput } from './ImagingRecord'

export interface ImagingRecordRepository {
  findByFolderId(folderId: string): Promise<ImagingRecord | null>
  save(data: ImagingRecordInput): Promise<ImagingRecord>
  deleteByFolderId(folderId: string): Promise<void>
}
