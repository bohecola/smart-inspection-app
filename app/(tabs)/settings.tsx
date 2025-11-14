import { Button, ButtonText } from "@/components/ui/button";
import { useAuthStore } from "@/utils/authStore";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  const { logOut } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Settings screen.</Text>
      <Button  onPress={logOut}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </View>
  );
}
