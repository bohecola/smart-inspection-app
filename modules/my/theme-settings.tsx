import type { Theme } from '@/components/ui/gluestack-ui-provider/config'
import { colord } from 'colord'
import { CircleIcon } from 'lucide-react-native'
import { useColorScheme } from 'nativewind'
import { useMemo } from 'react'
import { View } from 'react-native'
import { Cell, CellGroup } from '@/components/cell'
import { Card } from '@/components/ui/card'
import { themes } from '@/components/ui/gluestack-ui-provider/config'
import { Grid, GridItem } from '@/components/ui/grid'
import { Pressable } from '@/components/ui/pressable'
import { Radio, RadioGroup, RadioIcon, RadioIndicator } from '@/components/ui/radio'
import { useAppStore } from '@/store/app'
import { cn } from '@/utils'

export default function ThemeSettings() {
  const { colorMode, theme, setColorMode, setTheme } = useAppStore()
  const { colorScheme } = useColorScheme()

  const themeList = useMemo(() => {
    return Object.entries(themes).map(([key, value]) => {
      const [r, g, b] = value[colorScheme]['--color-primary-600'].split(' ').map(Number)

      return {
        key: key as Theme,
        bg: colord({ r, g, b }).toHex(),
      }
    })
  }, [colorScheme])

  return (
    <View className="flex-1 bg-background-50">
      <RadioGroup className="pt-4" value={colorMode} onChange={setColorMode}>
        <CellGroup inset>
          <Cell title="跟随系统" onPress={() => setColorMode('system')}>
            <Radio value="system">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
          </Cell>
          <Cell title="深色模式" onPress={() => setColorMode('dark')}>
            <Radio value="dark">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
          </Cell>
          <Cell title="浅色模式" onPress={() => setColorMode('light')}>
            <Radio value="light">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
          </Cell>
        </CellGroup>
      </RadioGroup>

      <View className="p-4">
        <Card>
          <Grid _extra={{ className: 'grid-cols-12' }}>
            {themeList.map(item => (
              <GridItem
                key={item.key}
                _extra={{ className: 'col-span-2' }}
              >
                <Pressable onPress={() => setTheme(item.key)}>
                  <View
                    className={cn(
                      'w-14 h-14 items-center justify-center',
                      theme === item.key ? 'bg-background-600/10 rounded-lg' : '',
                    )}
                  >
                    <View
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: item.bg,
                      }}
                    />
                  </View>
                </Pressable>
              </GridItem>
            ))}
          </Grid>
        </Card>
      </View>
    </View>
  )
}
