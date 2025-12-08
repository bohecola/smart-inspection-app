import type { BugDevCategoryForm, queryParamsForm } from './types'
import request from '@/service/request'

/**
 * 根据设备类型进行查询
 * @param devType
 */
export function getDevType(devType: string) {
  return request({
    url: `/ptms/bug/bugDevCategory/getDevType/${devType}`,
    method: 'get',
  })
}

/**
 * 新增缺陷故障类别
 * @param data
 */
export function addBugDevCategory(data: BugDevCategoryForm) {
  return request({
    url: '/ptms/bug/bugDevCategory',
    method: 'post',
    data,
  })
}

/**
 * 修改缺陷故障类别
 * @param data
 */
export function updateBugDevCategory(data: BugDevCategoryForm) {
  return request({
    url: '/ptms/bug/bugDevCategory',
    method: 'put',
    data,
  })
}

/**
 * 删除缺陷故障类别
 */
export function delBugDevCategory(ids: string | number | Array<string | number>) {
  return request({
    url: `/ptms/bug/bugDevCategory/${ids}`,
    method: 'delete',
  })
}
/**
 * 查看缺陷故障类别
 * @param id
 */
export function getBugDevCategory(id: string | number | Array<string | number>) {
  return request({
    url: `/ptms/bug/bugDevCategory/${id}`,
    method: 'get',
  })
}

/**
 * 查询缺陷故障类别列表
 * @param query
 */
export function getBugDevCategoryList(query: queryParamsForm) {
  return request({
    url: '/ptms/bug/bugDevCategory/list',
    method: 'get',
    params: query,
  })
}
