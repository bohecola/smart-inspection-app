import type { AxiosPromise } from 'axios'
import type { UserInfoVO } from '../system/user/types'
import type { CheckVersionResult, UploadResult } from './types'
import request from '@/service/request'

// 获取用户信息
export function person(): AxiosPromise<UserInfoVO> {
  return request({
    url: '/system/user/getInfo',
    method: 'get',
  })
}

// 注销
export function userLogout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

// 文件上传
export function upload(data: FormData): AxiosPromise<UploadResult> {
  return request({
    url: '/resource/oss/upload',
    method: 'post',
    data,
  })
}

// 文件上传（带位置信息）
export function uploadWithLocation(data: FormData): AxiosPromise<UploadResult> {
  return request({
    url: '/resource/oss/uploadLocation',
    method: 'post',
    data,
  })
}

// 检查版本
export function checkVersion(type: string = '1'): AxiosPromise<CheckVersionResult> {
  return request({
    url: `/ptms/pad/syncData/checkVersion/${type}`,
    method: 'get',
  })
}

// 下载最新版本
export function downloadNewVsersion(type: string = '1') {
  return request({
    url: `/ptms/pad/syncData/downloadNewVsersion/${type}`,
    method: 'get',
  })
}

interface DingTalkSignParams {
  nonceStr?: string
  timeStamp?: string
  url: string
}

export function dingTalkSign(params: DingTalkSignParams) {
  return request({
    url: '/auth/dingtalk/sign',
    method: 'get',
    params,
  })
}
