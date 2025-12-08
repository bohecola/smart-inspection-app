import { useCallback, useState } from 'react'
import { captcha } from '@/api/open'

// 密码显示/隐藏
export function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false)

  const toggle = useCallback(() => {
    setShowPassword(showPassword => !showPassword)
  }, [])

  return { showPassword, toggle }
}

// 验证码
export function useCaptcha() {
  const [captchaImage, setCaptchaImage] = useState<string>(undefined)
  const [captchaEnabled, setCaptchaEnabled] = useState<boolean>(false)
  const [uuid, setUuid] = useState<string>(undefined)

  const getCaptcha = useCallback(async () => {
    const { data } = await captcha()
    setCaptchaImage(`data:image/gif;base64,${data.img}`)
    setCaptchaEnabled(data.captchaEnabled)
    setUuid(data.uuid ?? '')
  }, [])

  return { captchaImage, captchaEnabled, uuid, getCaptcha }
}

export function useVisible() {
  const [visible, setVisible] = useState(false)

  const open = useCallback(() => {
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  return { visible, open, close }
}
