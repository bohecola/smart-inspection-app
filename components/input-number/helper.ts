export function intergerFormatter(value: string) {
  // 去除非数字和负号
  value = value.replace(/[^\d-]/g, '')

  // 只保留第一个负号且在最前面
  const firstMinusIndex = value.indexOf('-')
  if (firstMinusIndex > 0) {
    value = value.replace(/-/g, '') // 移除所有负号
  }
  else if (firstMinusIndex === 0) {
    value = `-${value.slice(1).replace(/-/g, '')}` // 保留第一个负号
  }

  return value
}

export function floatFormatter(value: string, maxDecimalPlaces: number = 2) {
  // 1. 去除所有非数字、非小数点、非负号的字符
  value = value.replace(/[^\d.-]/g, '')

  // 2. 处理负号：只保留第一个负号且必须在首位
  const isNegative = value.startsWith('-')
  value = value.replace(/-/g, '')
  if (isNegative) {
    value = `-${value}`
  }

  // 3. 移除开头的小数点（不允许以 . 开头）
  if (value.startsWith('-.')) {
    value = `-0.${value.slice(2)}`
  }
  else if (value.startsWith('.')) {
    value = `0.${value.slice(1)}`
  }

  // 4. 保留第一个小数点，去除后续的小数点
  const firstDotIndex = value.indexOf('.')
  if (firstDotIndex !== -1) {
    value = value.slice(0, firstDotIndex + 1)
      + value.slice(firstDotIndex + 1).replace(/\./g, '')
  }

  // 5. 限制小数点后最多两位
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.')
    value = `${integer}.${decimal.slice(0, maxDecimalPlaces)}`
  }

  return value
}
