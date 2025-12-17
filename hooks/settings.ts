import type { GlobConfig } from 'types/config'

export function useGlobSettings(): Readonly<GlobConfig> {
  return {
    rsaPublicKey: process.env.EXPO_PUBLIC_RSA_PUBLIC_KEY,
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    apiUrlPrefix: process.env.EXPO_PUBLIC_API_URL_PREFIX,
    appName: process.env.EXPO_PUBLIC_APP_NAME ?? 'Expo App',
    clientId: process.env.EXPO_PUBLIC_CLIENT_ID,
  }
}
