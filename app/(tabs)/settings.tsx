import { useAuthStore } from "@/utils/authStore";
import { Button, Text, View } from "react-native";

export default function SettingsScreen() {
  const { logOut } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Settings screen.</Text>
      <Button title="Sign Out" onPress={logOut} />
    </View>
  );
}
