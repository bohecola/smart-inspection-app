import type { DocumentPickerAsset } from 'expo-document-picker'
import type { allTypeEnum } from './helper'

export type FileType = typeof allTypeEnum

export interface UploadAsset {
  uri: string
  name: string
  mimeType?: string
  [key: string]: any
}

export interface UploaderFileListItem {
  fileName?: string
  url: string
  ossId?: string
  status?: '' | 'uploading' | 'done' | 'failed'
  message?: string
  thumbnailUrl?: string
  deletable?: boolean
  ext?: string
}

export interface UploaderRef {
  uploadFile: (assets: UploadAsset[], extra?: FileExtra) => Promise<void>
}

export interface UploaderProps {
  value?: string | string[]
  valueType?: 'string' | 'array'
  limit?: number
  multiple?: boolean
  mimeType?: string | string[]
  fileType?: FileType
  showTip?: boolean
  auto?: boolean
  showUploadButton?: boolean
  isDisabled?: boolean
  onChange?: (value: string | string[]) => void
  onFileListChange?: (value: UploaderFileListItem[]) => void
  onSelectFiles?: (value: DocumentPickerAsset[]) => void
}

export interface UploaderPreviewProps {
  item: UploaderFileListItem
  onPress: (...args: any[]) => void
  onDelete: (...args: any[]) => void
}

export interface FilePreviewRendererProps {
  item: UploaderFileListItem
  type: FilePreviewType
}

export interface FileExtra {
  fileDate?: string
  fileLng?: number
  fileLat?: number
}

export type FilePreviewType = 'image' | 'video' | 'word' | 'excel' | 'ppt' | 'pdf' | 'text' | 'compressed' | 'other'
