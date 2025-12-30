import type { ISelectProps } from '@/components/ui/select'
import { useMemo } from 'react'
import { ChevronDownIcon } from '@/components/ui/icon'
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from '@/components/ui/select'

export interface SelectOption {
  label: string
  value: string
  isDisabled?: boolean
  [key: string]: any
}

interface SelectProps extends ISelectProps {
  options?: SelectOption[]
  placeholder?: string
  onChange?: (value: string) => void
}

export function MySelect(props: SelectProps) {
  const { options = [], placeholder = '请选择', onChange, ...rest } = props

  function onValueChange(value: string) {
    rest.onValueChange?.(value)
    onChange?.(value)
  }

  const label = useMemo(() => {
    return options.find(option => option.value === rest.selectedValue)?.label
  }, [options, rest.selectedValue])

  return (
    <Select {...rest} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectInput value={label} placeholder={placeholder} />
        <SelectIcon className="ml-auto mr-3" as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="max-h-[70%]">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          <SelectScrollView>
            {options.map(({ label, value, isDisabled }) => (
              <SelectItem
                key={value}
                label={label}
                value={value}
                isDisabled={isDisabled}
              />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
