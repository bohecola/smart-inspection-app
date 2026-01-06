import type { ProductTaskRecordResultVO } from '@/api/ptms/task/productTask/types'
import { isEmpty } from 'lodash-es'
import { MyInputNumber } from '@/components/input-number'
import { MySelect } from '@/components/select'
import { MySwitch } from '@/components/switch'
import { Textarea, TextareaInput } from '@/components/ui/textarea'
import { Uploader } from '@/components/uploader'
import { transformOptions } from '@/utils'

interface Props {
  type: 'textarea' | 'input-number' | 'switch' | 'select' | 'file'
  value: string
  data: ProductTaskRecordResultVO
  onChange: (...event: any[]) => void
}

export function FieldRenderer(props: Props) {
  const { type, value, data, onChange } = props

  switch (type) {
    case 'textarea':
      return (
        <Textarea>
          <TextareaInput
            placeholder={
              isEmpty(data.remark)
                ? `请输入${data.description}`
                : data.remark
            }
            value={value}
            onChangeText={onChange}
          />
        </Textarea>
      )
    case 'input-number':
      return (
        <MyInputNumber
          placeholder={
            isEmpty(data.remark)
              ? '请输入'
              : data.remark
          }
          value={value}
          onChangeText={onChange}
        />
      )
    case 'switch':
      return (
        <MySwitch
          value={value}
          activeValue="是"
          inactiveValue="否"
          showValueText
          onChange={onChange}
        />
      )
    case 'select':
      return (
        <MySelect
          selectedValue={value}
          onValueChange={onChange}
          options={transformOptions(data.example)}
          placeholder="请选择"
        />
      )
    case 'file':
      return (
        <Uploader
          value={value}
          onChange={onChange}
        />
      )
    default:
      return null
  }
}
