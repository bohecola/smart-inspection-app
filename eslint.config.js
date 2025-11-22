// https://docs.expo.dev/guides/using-eslint/
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist/*',
    'android/*',
    'ios/*',
    'components/ui/*',
  ],
  rules: {
    'node/prefer-global/process': 'off',
    'regexp/no-dupe-disjunctions': 'off',
    'ts/no-require-imports': 'off',
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'prefer-promise-reject-errors': 'off',
  },
})
