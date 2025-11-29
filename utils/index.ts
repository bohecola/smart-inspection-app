import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { isNil, isNumber } from 'lodash-es'
import { twMerge } from 'tailwind-merge'

// 处理下拉框选项数据
export function transformOptions(value: string) {
  if (isNil(value)) {
    return []
  }

  return value.split('/').map(e => ({ label: e, value: e }))
}

// 获取文件扩展名
export function getFilenameExt(filename: string) {
  const ext = filename.split('.').pop()
  return ext?.toLowerCase() ?? ''
}

// 是否为负数
export function isNegative(value?: number | string): boolean {
  if (value === undefined || value === null) {
    // 如果是 null 或 undefined，直接返回 false
    return false
  }

  const number = typeof value === 'number' ? value : Number.parseFloat(value)

  // 确保转换后的值是有效数字
  return !Number.isNaN(number) && number < 0
}

// 是否为数值
export function isNumeric(value?: any) {
  if (value === '' || value === null || value === undefined) {
    return false
  }

  return isNumber(value) || (!Number.isNaN(Number(value)) && Number.isFinite(Number(value)))
}

// 合并类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export * from './base'
export * from './dict'
