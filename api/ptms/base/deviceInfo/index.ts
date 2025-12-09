import type { AxiosPromise } from 'axios'
import type { DeviceInfoForm, DeviceInfoVO } from '@/api/ptms/base/deviceInfo/types'
import request from '@/service/request'

/**
 * 查询设备台账列表
 * @param query
 */
export function listDeviceInfo(query?: any) {
  return request({
    url: '/ptms/base/deviceInfo/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询设备台账详细
 * @param id
 */
export function getDeviceInfo(id: string): AxiosPromise<DeviceInfoVO> {
  return request({
    url: `/ptms/base/deviceInfo/${id}`,
    method: 'get',
  })
}

/**
 * 新增设备台账
 * @param data
 */
export function addDeviceInfo(data: DeviceInfoForm) {
  return request({
    url: '/ptms/base/deviceInfo',
    method: 'post',
    data,
  })
}

/**
 * 复制设备台账
 * @param data
 */
export function copeDeviceInfo(data: any) {
  return request({
    url: '/ptms/base/deviceInfo/cope',
    method: 'post',
    data,
  })
}

/**
 * 修改设备台账
 * @param data
 */
export function updateDeviceInfo(data: DeviceInfoForm) {
  return request({
    url: '/ptms/base/deviceInfo',
    method: 'put',
    data,
  })
}

/**
 * 删除设备台账
 * @param id
 */
export function delDeviceInfo(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/base/deviceInfo/${id}`,
    method: 'delete',
  })
}

/**
 * 根据设备类型获取型号厂家
 * @param devType 设备类型
 */
export function getFactorBydevType(devType: string) {
  return request({
    url: `/ptms/base/deviceModel/getFactorBydevType/${devType}`,
    method: 'get',
  })
}
