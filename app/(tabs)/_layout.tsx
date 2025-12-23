import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { useThemeSettings } from '@/hooks'

export default function TabsLayout() {
  const { primaryColor, tintColor, backgroundColor } = useThemeSettings()

  return (
    <Tabs screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: tintColor,
      headerStyle: {
        backgroundColor,
      },
      tabBarStyle: {
        backgroundColor,
      },
      tabBarActiveTintColor: primaryColor,
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? 'home' : 'home-outline'}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? 'person' : 'person-outline'}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}
