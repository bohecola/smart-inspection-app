import type { NodeRowProps, SelectionPropagation, TreeNode, TreeViewRef } from 'react-native-tree-multi-select'
import { useFormControlContext } from '@gluestack-ui/core/form-control/creator'
import { isArray, isEmpty, isEqual } from 'lodash-es'
import { useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { TreeView } from 'react-native-tree-multi-select'
import { Empty } from '@/components/empty'
import { MyModal } from '@/components/modal'
import { CheckboxGroup } from '@/components/ui/checkbox'
import { ChevronDownIcon, Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useVisible } from '@/hooks'
import { cn } from '@/utils'
import CustomNodeRowView from './CustomNodeRowView'

interface TreeSelectProps {
  title?: string
  value?: string | string[]
  data: TreeNode[]
  rawData: TreeNode[]
  placeholder?: string
  valueType?: 'string' | 'array'
  isDisabled?: boolean
  emptyText?: string
  onChange?: (value: string | string[]) => void
  onItemsChange?: (items: TreeNode[]) => void
}

export function TreeSelect(props: TreeSelectProps) {
  const { isDisabled: isFormControlDisabled, isInvalid } = useFormControlContext()

  // 属性
  const {
    title,
    value,
    data,
    rawData,
    placeholder = '请选择',
    valueType = 'string',
    isDisabled = isFormControlDisabled,
    emptyText,
    onChange,
    onItemsChange,
  } = props

  // 弹窗状态
  const { visible, open, close } = useVisible()

  // 选中项
  const [values, setValues] = useState<string[]>(isArray(value) ? value : value ? value.split(',') : [])

  const selectedNodes = useMemo(() => {
    return rawData?.filter(item => values.includes(item.id))
  }, [rawData, values])

  // 选中项的传播方式
  const selectionPropagation: SelectionPropagation = {
    toChildren: false,
    toParents: false,
  }

  // 树引用
  const treeViewRef = useRef<TreeViewRef>(null)

  // 选中回调
  const handleCheck = (ids: string[]) => {
    setValues(ids)
  }

  // 打开弹窗
  const onInputPress = () => {
    if (isDisabled) {
      return
    }

    open()

    setTimeout(() => {
      treeViewRef.current?.expandNodes(values)
      treeViewRef.current?.selectNodes(values)
    }, 100)
  }

  // 确认
  const onConfirm = () => {
    // 关闭
    close()
    // 荷载
    const payload = valueType === 'string' ? values.join(',') : values
    // 如果值没有变化，则不进行回调
    if (isEqual(payload, value)) {
      return
    }

    onChange?.(payload)
    onItemsChange?.(selectedNodes)
  }

  return (
    <View>
      <Pressable onPress={onInputPress}>
        <View className={cn(
          'py-2 px-3 flex-row justify-between items-center border border-outline-200 rounded',
          isDisabled ? 'bg-outline-50' : '',
          isInvalid ? 'border-error-700' : '',
        )}
        >
          {isEmpty(value) && <Text className="text-typography-500">{placeholder}</Text>}
          {!isEmpty(value) && <Text className="text-typography-900">{selectedNodes?.map(item => item.name).join(',')}</Text>}
          <Icon className="ml-auto text-outline-500" size="md" as={ChevronDownIcon} />
        </View>
      </Pressable>

      <MyModal
        title={title}
        isOpen={visible}
        onClose={close}
        onCancel={close}
        onConfirm={onConfirm}
      >
        <CheckboxGroup value={values}>
          {isEmpty(data)
            ? (
                <Empty text={emptyText} />
              )
            : (
                <TreeView
                  ref={treeViewRef}
                  data={data}
                  onCheck={handleCheck}
                  CustomNodeRowComponent={(props: NodeRowProps) => (
                    <CustomNodeRowView
                      treeViewRef={treeViewRef}
                      {...props}
                    />
                  )}
                  selectionPropagation={selectionPropagation}
                  treeFlashListProps={{
                    style: { height: 360, flex: 1, width: '100%' },
                    keyExtractor: (item: TreeNode) => item.id,
                  }}
                />
              )}
        </CheckboxGroup>
      </MyModal>
    </View>
  )
}
