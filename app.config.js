const { EXPO_PUBLIC_APP_NAME, APP_UNIQUE_IDENTIFIER } = process.env

export default ({ config }) => ({
  ...config,
  name: EXPO_PUBLIC_APP_NAME,
  ios: {
    ...config.ios,
    bundleIdentifier: APP_UNIQUE_IDENTIFIER,
  },
  android: {
    ...config.android,
    package: APP_UNIQUE_IDENTIFIER,
  },
  plugins: [
    ...config.plugins,
    [
      'expo-camera',
      {
        cameraPermission: `允许${EXPO_PUBLIC_APP_NAME}访问相机以拍摄照片和视频`,
        microphonePermission: `允许${EXPO_PUBLIC_APP_NAME}访问麦克风以录制视频声音`,
        recordAudioAndroid: true,
      },
    ],
  ],
})
