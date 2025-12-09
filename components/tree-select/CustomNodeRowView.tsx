import type { NodeRowProps, TreeViewRef } from 'react-native-tree-multi-select'
import { isEmpty } from 'lodash-es'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox'
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'

const CustomNodeRowView = React.memo(_CustomNodeRowView)
export default CustomNodeRowView

interface Props extends NodeRowProps {
  treeViewRef: React.RefObject<TreeViewRef>
}

function _CustomNodeRowView(props: Props) {
  const {
    node,
    level,
    isExpanded,
    onCheck,
    onExpand,
    treeViewRef,
  } = props

  const _onCheck = () => {
    treeViewRef.current?.unselectAll?.()
    onCheck()
  }

  function onCheckBoxChange(_: boolean) {
    _onCheck()
  }

  const isLast = useMemo(() => {
    return isEmpty(node.children)
  }, [node.children])

  return (
    <View className="flex-row items-center gap-1" style={{ marginStart: level * 16 }}>
      {!isLast
        ? (
            <Text>{node.name}</Text>
          )
        : (
            <Checkbox
              value={node.id}
              isDisabled={false}
              isInvalid={false}
              size="md"
              onChange={onCheckBoxChange}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="flex-1" onPress={_onCheck}>
                {node.name}
              </CheckboxLabel>
            </Checkbox>
          )}

      {!isLast
        ? (
            <Pressable onPress={onExpand}>
              <Icon
                size="md"
                as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
              />
            </Pressable>
          )
        : null}
    </View>
  )
}
