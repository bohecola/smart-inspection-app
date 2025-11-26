import type { ISelectProps } from '@/components/ui/select'
import { ChevronDownIcon } from '@/components/ui/icon'
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select'

export interface SelectOption {
  label: string
  value: string
  isDisabled?: boolean
  [key: string]: any
}

interface SelectProps extends ISelectProps {
  options?: SelectOption[]
  placeholder?: string
}

export function MySelect(props: SelectProps) {
  const { options = [], placeholder, ...rest } = props

  return (
    <Select {...rest}>
      <SelectTrigger>
        <SelectInput placeholder={placeholder} />
        <SelectIcon className="ml-auto mr-3" as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {options.map(({ label, value, isDisabled }) => (
            <SelectItem
              key={value}
              label={label}
              value={value}
              isDisabled={isDisabled}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
