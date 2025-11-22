import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { useAppStore } from '@/store/app'

export default function TabsLayout() {
  const { color, backgroundColor } = useAppStore()

  return (
    <Tabs screenOptions={{
      headerTitleAlign: 'center',
      headerTintColor: color,
      headerStyle: {
        backgroundColor,
      },
      tabBarStyle: {
        backgroundColor,
      },
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons color={color} name={focused ? 'home' : 'home-outline'} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons color={color} name={focused ? 'person' : 'person-outline'} size={24} />
          ),
        }}
      />
    </Tabs>
  )
}
