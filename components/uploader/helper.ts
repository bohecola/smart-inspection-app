import type { UploaderFileListItem } from './types'

export const wordTypeEnum = ['doc', 'docx'] as const
export const excelTypeEnum = ['xls', 'xlsx'] as const
export const pptTypeEnum = ['ppt', 'pptx'] as const
export const pdfTypeEnum = ['pdf'] as const
export const imageTypeEnum = ['png', 'jpg', 'jpeg'] as const
export const videoTypeEnum = ['avi', 'mp4'] as const
export const txtTypeEnum = ['txt'] as const
export const compressedTypeEnum = ['zip', 'rar', 'jar', 'tar', 'gzip', '7z'] as const
export const otherTypeEnum = ['dwg', 'apk'] as const

export const docTypeEnum = [...wordTypeEnum, ...excelTypeEnum, ...pptTypeEnum, ...pdfTypeEnum] as const
export const allTypeEnum = [...imageTypeEnum, ...videoTypeEnum, ...docTypeEnum, ...txtTypeEnum, ...compressedTypeEnum, ...otherTypeEnum] as const

export const isImageType = (val: any) => imageTypeEnum.includes(val)
export const isVideoType = (val: any) => videoTypeEnum.includes(val)
export const isWordType = (val: any) => wordTypeEnum.includes(val)
export const isExcelType = (val: any) => excelTypeEnum.includes(val)
export const isPptType = (val: any) => pptTypeEnum.includes(val)
export const isPdfType = (val: any) => pdfTypeEnum.includes(val)
export const isDocType = (val: any) => docTypeEnum.includes(val)
export const isTxtType = (val: any) => txtTypeEnum.includes(val)
export const isCompressedType = (val: any) => compressedTypeEnum.includes(val)
export const isOtherType = (val: any) => otherTypeEnum.includes(val)

export function getFilePreviewType(val: any) {
  if (isImageType(val)) {
    return 'image'
  }

  if (isVideoType(val)) {
    return 'video'
  }

  if (isWordType(val)) {
    return 'word'
  }

  if (isExcelType(val)) {
    return 'excel'
  }

  if (isPptType(val)) {
    return 'ppt'
  }

  if (isPdfType(val)) {
    return 'pdf'
  }

  if (isTxtType(val)) {
    return 'text'
  }

  if (isCompressedType(val)) {
    return 'compressed'
  }

  return 'other'
}

// 获取文件列表值
export function getValue(list: UploaderFileListItem[], valueType: 'string' | 'array') {
  const idsArr = list.map(e => e.ossId).filter(Boolean)

  if (valueType === 'string') {
    const idsStr = idsArr.join(',')
    return idsStr
  }

  return idsArr
}
