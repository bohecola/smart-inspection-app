import { Button, ButtonText } from "@/components/ui/button";
import { useAuthStore } from "@/utils/authStore";
import { Text, View } from "react-native";

export default function SignInScreen() {
  const { logIn } = useAuthStore()

  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-center">Sign In Screen.</Text>
      <Button action="primary" variant="solid" size="lg" onPress={logIn}>
        <ButtonText>Sign In</ButtonText>
      </Button>
    </View>
  )
}