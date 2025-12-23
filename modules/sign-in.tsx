import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { debounce } from 'lodash'
import { Lock, ShieldCheck, User } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'
import { login } from '@/api/open'
import { MyButton } from '@/components/button'
import { FormItem } from '@/components/form'
import { MyInput } from '@/components/input'
import { useAppToast } from '@/components/toast'
import { ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormControl } from '@/components/ui/form-control'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useCaptcha, useShowPassword } from '@/hooks'
import { useUserStore } from '@/store/user'
import { useGlobSettings } from '@/utils/settings'

// eslint-disable-next-line perfectionist/sort-imports
const logoImage = require('@/assets/images/Logo.png')

export default function SignIn() {
  const router = useRouter()
  const toast = useAppToast()
  const user = useUserStore()

  const { appName, clientId } = useGlobSettings()
  const { showPassword, toggle } = useShowPassword()
  const { captchaImage, captchaEnabled, uuid, getCaptcha } = useCaptcha()

  const [loading, setLoading] = useState(false)

  const loginSchema = z.object({
    username: z.string().nonempty({ message: '账号不能为空' }),
    password: z.string().nonempty({ message: '密码不能为空' }),
    code: z.string().nonempty({ message: '验证码不能为空' }),
  })

  type LoginForm = z.infer<typeof loginSchema>

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
      code: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    setLoading(true)
    try {
      const loginData = {
        tenantId: '000000',
        uuid,
        clientId,
        grantType: 'password',
        ...data,
      }
      const { data: { access_token } } = await login(loginData)
      toast.show('登录成功')
      user.setToken(access_token)
      user.get()
      router.push('/')
    }
    catch (error) {
      getCaptcha()
      toast.show((error as Error).message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCaptcha()
  }, [])

  const handleCaptchaClick = debounce(getCaptcha, 300)

  return (
    <FormControl className="px-4 flex-1 bg-background-50">
      <Card className="mt-36 gap-4">

        <View className="items-center gap-2">
          <Image
            className="w-20 h-20"
            source={logoImage}
            alt="Logo"
          />
          <Text>{appName}</Text>
        </View>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem isInvalid={!!error} errorText={error?.message}>
              <MyInput
                prefixIcon={User}
                value={value}
                onChangeText={onChange}
                type="text"
                placeholder="请输入账号"
              />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem isInvalid={!!error} errorText={error?.message}>
              <MyInput
                prefixIcon={Lock}
                suffixIcon={showPassword ? EyeIcon : EyeOffIcon}
                value={value}
                onChangeText={onChange}
                onSuffixIconPress={toggle}
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
              />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="flex-row gap-2">
              <FormItem isInvalid={!!error} errorText={error?.message} className="flex-[2]">
                <MyInput
                  prefixIcon={ShieldCheck}
                  value={value}
                  onChangeText={onChange}
                  type="text"
                  keyboardType="numeric"
                  placeholder="请输入验证码"
                />
              </FormItem>

              {captchaEnabled && (
                <Pressable className="flex-1 h-10" onPress={handleCaptchaClick}>
                  <Image
                    className="w-full h-full rounded"
                    source={captchaImage}
                    alt="验证码"
                  />
                </Pressable>
              )}
            </View>
          )}
        />

        <MyButton
          action="primary"
          variant="solid"
          size="lg"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>登录</ButtonText>
        </MyButton>
      </Card>
    </FormControl>
  )
}
