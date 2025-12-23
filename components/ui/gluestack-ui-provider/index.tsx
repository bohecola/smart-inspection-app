import React, { useEffect, useMemo } from 'react';
import { GenerateConfig } from './config';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';
import { useAppStore } from '@/store/app';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();

  const { theme } = useAppStore();

  const config = useMemo(() => {
    return GenerateConfig(theme);
  }, [theme]);

  useEffect(() => {
    setColorScheme(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <View
      style={[
        config[colorScheme!],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
