import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions } from './types'
import axios from 'axios'
import { DialogManager } from '@/components/dialog/DialogManager'
import { useAppToast } from '@/components/toast'
import { ContentTypeEnum, ResultCodeEnum } from '@/enums/httpEnum'
import { useUserStore } from '@/store/user'
import { tansParams } from '@/utils/ruoyi'
import { useMixedEncrypt } from '@/utils/security'
import { useGlobSettings } from '@/utils/settings'
import { checkStatus, useRequstCanceller } from './helper'

const { apiUrl, clientId } = useGlobSettings()

const { addRequestCancel, removeRequestCancel } = useRequstCanceller()

const { showDialog, showConfirmDialog } = DialogManager

const toast = useAppToast()

axios.defaults.headers['Content-Type'] = ContentTypeEnum.JSON
axios.defaults.headers.clientid = clientId

// 请求实例
const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 50 * 1000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const user = useUserStore.getState()

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // Get 请求映射 params 参数
    if (config.method === 'get' && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    // 文件上传
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = ContentTypeEnum.FORM_DATA
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const user = useUserStore.getState()
    if (res) {
      // 移除已响应请求的 cancel
      removeRequestCancel(res.config)
    }

    if (!res.data) {
      // 数据不存在，返回 Axios 响应
      return res
    }

    const { code, msg } = res.data

    switch (code) {
      // 请求成功，直接返回结果
      case ResultCodeEnum.SUCCESS:
        return res.data
      // Token 过期
      case ResultCodeEnum.TOKEN_EXPIRED:
        return showConfirmDialog({
          title: '提示',
          description: '登录身份已失效，请重新登录!',
        })
          .then(user.logout)
          .catch(() => Promise.reject(new Error('登录超时，请退出重新登录')))
      // 系统内部错误
      case ResultCodeEnum.ERROR:
        toast.error(msg)
        return Promise.reject(new Error(msg))
      // 系统警告消息
      case ResultCodeEnum.WARN:
        toast.error(msg)
        return Promise.reject(new Error(msg))
      default:
        return Promise.reject(new Error(msg))
    }
  },

  (error) => {
    const { response, code, message } = error || {}
    // TODO 此处要根据后端接口返回格式修改
    const msg: string = response && response.data && response.data.message ? response.data.message : ''
    const err: string = error.toString()
    try {
      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        toast.error('接口请求超时，请刷新页面重试!')
        return
      }
      if (err && err.includes('Network Error')) {
        showDialog({
          title: '网络异常',
          description: '请检查您的网络连接是否正常',
        })
          .then(() => {})
          .catch(() => {})
        return Promise.reject(error)
      }
    }
    catch (error) {
      throw new Error(error as any)
    }

    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    if (isCancel) {
      console.warn(error, '请求被取消！')
    }
    else {
      checkStatus(response && response.status, msg)
    }
    return Promise.reject(error)
  },
)

export function globalHeaders() {
  const user = useUserStore.getState()

  return {
    Authorization: `Bearer ${user.token}`,
    clientid: clientId,
  }
}

// 请求方法
export default function<T = AxiosResponse>(config: AxiosRequestConfig, requestOptions: RequestOptions = {}) {
  // 配置项
  const { isEncrypt, withCancel = false } = requestOptions

  // 默认取消重复请求
  if (withCancel) {
    addRequestCancel(config)
  }

  // 加密配置
  if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
    // 混合加密
    const { encryptedAesKey, AES } = useMixedEncrypt()
    // 加密密钥
    Object.assign(config.headers ??= {}, {
      'encrypt-key': encryptedAesKey,
    })
    // 加密数据
    config.data = typeof config.data === 'object' ? AES(JSON.stringify(config.data)) : AES(config.data)
  }

  return axiosInstance.request<any, T>(config)
}
