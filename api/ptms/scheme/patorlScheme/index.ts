import type { AxiosPromise } from 'axios'
import type { PatorlSchemeForm, PatorlSchemeQuery, PatorlSchemeVO } from '@/api/ptms/scheme/patorlScheme/types'
import request from '@/service/request'

/**
 * 查询巡检方案列表
 * @param query
 */
export function listPatorlScheme(query?: PatorlSchemeQuery): AxiosPromise<PatorlSchemeVO[]> {
  return request({
    url: '/ptms/scheme/patorlScheme/list',
    method: 'get',
    params: query,
  })
}

/**
 * 查询巡检方案详细
 * @param id
 */
export function getPatorlScheme(id: string | number): AxiosPromise<PatorlSchemeForm> {
  return request({
    url: `/ptms/scheme/patorlScheme/${id}`,
    method: 'get',
  })
}

/**
 * 新增巡检方案
 * @param data
 */
export function addPatorlScheme(data: PatorlSchemeForm) {
  return request({
    url: '/ptms/scheme/patorlScheme',
    method: 'post',
    data,
  })
}

/**
 * 修改巡检方案
 * @param data
 */
export function updatePatorlScheme(data: PatorlSchemeForm) {
  return request({
    url: '/ptms/scheme/patorlScheme',
    method: 'put',
    data,
  })
}

/**
 * 删除巡检方案
 * @param id
 */
export function delPatorlScheme(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/scheme/patorlScheme/${id}`,
    method: 'delete',
  })
}

/**
 * 获取计划方案的下拉框数据
 * @param type
 */
export function getByType(type: string) {
  return request({
    url: `/ptms/scheme/productPlanScheme/getByType/${type}`,
    method: 'get',
  })
}

/**
 * 根据电站id和巡检标准名Id获取设备|区域名称
 * @param psId string 电站ID
 * @param patrolType string 巡检类型
 */
export function getByPsIdAndType(psId: string, patrolType: string) {
  return request({
    url: `/ptms/base/deviceClass/getByPsIdAndType/${psId}/${patrolType}`,
    method: 'get',
  })
}

// 修改状态
export function editStatus(id: string, status: string) {
  return request({
    url: `/ptms/scheme/patorlScheme/editStatus/${id}/${status}`,
    method: 'put',
  })
}
