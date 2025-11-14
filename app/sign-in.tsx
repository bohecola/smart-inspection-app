import { useAuthStore } from "@/utils/authStore";
import { Button, Text, View } from "react-native";


export default function SignInScreen() {
  const { logIn } = useAuthStore()

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-center">Sign In Screen.</Text>
      <Button title="Sign In" onPress={logIn} />
    </View>
  )
}