import "../global.css";

import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {

  const { isLoggedIn } = useAuthStore();

  return (
    
    <GluestackUIProvider mode="dark">
      <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
    </GluestackUIProvider>
  
  );
}
