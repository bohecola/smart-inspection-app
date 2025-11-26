import { isNil } from 'lodash-es'

export * from './base'
export * from './dict'

// 处理下拉框选项数据
export function transformOptions(value: string) {
  if (isNil(value)) {
    return []
  }

  return value.split('/').map(e => ({ label: e, value: e }))
}
