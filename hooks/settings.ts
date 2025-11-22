import type { GlobConfig } from 'types/config'

export function useGlobSettings(): Readonly<GlobConfig> {
  const {
    EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_API_URL_PREFIX,
    EXPO_PUBLIC_APP_TITLE,
    EXPO_PUBLIC_RSA_PUBLIC_KEY,
    EXPO_PUBLIC_CLIENT_ID,
  } = process.env

  return {
    rsaPublicKey: EXPO_PUBLIC_RSA_PUBLIC_KEY,
    apiUrl: EXPO_PUBLIC_API_URL,
    apiUrlPrefix: EXPO_PUBLIC_API_URL_PREFIX,
    appTitle: EXPO_PUBLIC_APP_TITLE ?? 'Expo App',
    clientId: EXPO_PUBLIC_CLIENT_ID,
  }
}
