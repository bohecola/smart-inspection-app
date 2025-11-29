import type { FileType } from '../types'
import { Text } from '@/components/ui/text'

export interface HelperTextProps {
  fileType: FileType
}

export function HelperText(props: HelperTextProps) {
  const { fileType } = props

  return (
    <Text className="text-sm text-typography-400 mt-1">
      {`请上传 ${fileType.join('、')} 等格式文件`}
    </Text>
  )
}
