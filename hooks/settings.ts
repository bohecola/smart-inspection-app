import type { GlobConfig } from 'types/config'

export function useGlobSettings(): Readonly<GlobConfig> {
  const {
    EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_API_URL_PREFIX,
    EXPO_PUBLIC_APP_NAME,
    EXPO_PUBLIC_RSA_PUBLIC_KEY,
    EXPO_PUBLIC_CLIENT_ID,
  } = process.env

  return {
    rsaPublicKey: EXPO_PUBLIC_RSA_PUBLIC_KEY,
    apiUrl: EXPO_PUBLIC_API_URL,
    apiUrlPrefix: EXPO_PUBLIC_API_URL_PREFIX,
    appName: EXPO_PUBLIC_APP_NAME ?? 'Expo App',
    clientId: EXPO_PUBLIC_CLIENT_ID,
  }
}
