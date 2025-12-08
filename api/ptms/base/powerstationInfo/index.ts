import type { AxiosPromise } from 'axios'
import type { PowerstationInfoVO } from './types'
import request from '@/service/request'

// 获取电站列表接口(授权电站)
export function getPowerList(query?: any): AxiosPromise<PowerstationInfoVO[]> {
  return request({
    url: '/ptms/base/powerstationInfo/getList',
    method: 'get',
    params: query,
  })
};
