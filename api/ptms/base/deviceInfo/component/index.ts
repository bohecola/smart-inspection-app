import type { AxiosPromise } from 'axios'
import type { DeviceComponentoForm, DeviceComponentVO } from '@/api/ptms/base/deviceInfo/component/types'
import request from '@/service/request'

/**
 * 查询设备部件详细
 * @param id
 */
export function getComponentInfo(id: string | number): AxiosPromise<DeviceComponentVO> {
  return request({
    url: `/ptms/base/deviceComponent/${id}`,
    method: 'get',
  })
}

/**
 * 新增设备部件
 * @param data
 */
export function addComponent(data: DeviceComponentoForm) {
  return request({
    url: '/ptms/base/deviceComponent',
    method: 'post',
    data,
  })
}

/**
 * 修改设备部件
 * @param data
 */
export function updateComponent(data: DeviceComponentoForm) {
  return request({
    url: '/ptms/base/deviceComponent',
    method: 'put',
    data,
  })
}

/**
 * 删除设备部件
 * @param id
 */
export function delComponent(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/base/deviceComponent/${id}`,
    method: 'delete',
  })
}

/**
 * 根据设备台账id查询部件列表
 * @param devId
 */
export function getByDevId(devId: string | number): AxiosPromise<DeviceComponentVO> {
  return request({
    url: `/ptms/base/deviceComponent/getByDevId/${devId}`,
    method: 'get',
  })
}

/**
 * 导入新增部件确定按钮
 */
export function importDeviceComponent(data: any) {
  return request({
    url: '/ptms/base/deviceComponent/importDeviceComponent',
    method: 'post',
    data,
  })
}
