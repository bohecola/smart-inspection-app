import type { Href } from 'expo-router'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useCheckRelease } from '@/components/check-release'
import { Card } from '@/components/ui/card'
import { Grid, GridItem } from '@/components/ui/grid'
import { Image } from '@/components/ui/image'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'

// eslint-disable-next-line perfectionist/sort-imports
const BannerImage = require('@/assets/images/banner.png')

interface Menu {
  title: string
  imgUrl: string
  path?: Href
}

export default function Index() {
  const router = useRouter()
  const { checkRelease } = useCheckRelease()

  const menus: Menu[] = [
    { title: '生产任务', imgUrl: require('@/assets/images/icons/1.png'), path: '/prod' },
    { title: '巡检任务', imgUrl: require('@/assets/images/icons/2.png'), path: '/inspec' },
    { title: '缺陷', imgUrl: require('@/assets/images/icons/4.png'), path: '/bug' },
    // { title: '生产日报', imgUrl: require('@/assets/images/icons/3.png'), path: '/daily-report' },
  ]

  useEffect(() => {
    checkRelease({ quiet: true })
  }, [])

  return (
    <View className="p-4 flex-1 bg-background-50">
      <Image
        source={BannerImage}
        className="w-full h-32 rounded-xl"
        alt="Banner"
      />

      <Card className="p-0 mt-4">
        <Grid _extra={{ className: 'grid-cols-12' }}>
          {menus.map(menu => (
            <GridItem
              key={menu.title}
              _extra={{ className: 'col-span-4' }}
            >
              <Pressable
                className="py-6 items-center active:bg-background-100"
                onPress={() => {
                  router.push(menu.path)
                }}
              >
                <Image
                  source={menu.imgUrl}
                  className="w-16 h-16"
                  alt={menu.title}
                />
                <Text className="text-sm">{menu.title}</Text>
              </Pressable>
            </GridItem>
          ))}
        </Grid>
      </Card>
    </View>
  )
}
