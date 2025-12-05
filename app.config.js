const { EXPO_PUBLIC_APP_NAME, APP_UNIQUE_IDENTIFIER } = process.env

const cameraPermission = `允许${EXPO_PUBLIC_APP_NAME}访问相机以拍摄照片和视频`
const microphonePermission = `允许${EXPO_PUBLIC_APP_NAME}访问麦克风以录制视频声音`
const photosPermission = `允许${EXPO_PUBLIC_APP_NAME}访问相册以选择照片`
const savePhotosPermission = `允许${EXPO_PUBLIC_APP_NAME}保存照片到相册`
const locationPermission = `允许${EXPO_PUBLIC_APP_NAME}访问位置以获取位置信息`

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
        cameraPermission,
        microphonePermission,
        recordAudioAndroid: true,
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission,
        savePhotosPermission,
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission,
        savePhotosPermission,
        isAccessMediaLocationEnabled: true,
      },
    ],
    [
      'expo-document-picker',
      {
        iCloudContainerEnvironment: 'Production',
      },
    ],
    [
      'expo-video',
      {
        supportsBackgroundPlayback: true,
        supportsPictureInPicture: true,
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: locationPermission,
      },
    ],
  ],
})
