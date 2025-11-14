const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.bohecola.smartinspectionapp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.bohecola.smartinspectionapp.preview';
  }

  return 'com.bohecola.smartinspectionapp';
}

const getAppName = () => {
  if (IS_DEV) {
    return 'Smart Inspection (Dev)';
  }

  if (IS_PREVIEW) {
    return 'Smart Inspection (Preview)';
  }

  return 'Smart Inspection';
}

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
  updates: {
    url: 'https://u.expo.dev/c6f86fa7-3848-4c35-97e7-80894d6642a8',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
})