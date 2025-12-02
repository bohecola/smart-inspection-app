import type { AxiosPromise } from 'axios'
import type { GetContentByContentNameParams, PatorlTaskQuery, PatorlTaskVO } from './types'
import request from '@/service/request'

// 查询列表
export function listPatorlTask(query: PatorlTaskQuery): AxiosPromise<PatorlTaskVO[]> {
  return request({
    url: '/ptms/pad/data/patorlTask/list',
    method: 'get',
    params: query,
  })
}

// 任务详情
export function getPatorlTaskInfo(id: string): AxiosPromise<any> {
  return request({
    url: `/ptms/pad/data/patorlTask/getInfo/${id}`,
    method: 'get',
  })
}

// 处理执行
export function handleExecute(data: any) {
  return request({
    url: '/ptms/pad/data/patorlTask/dealTask',
    method: 'post',
    data,
  })
}

// 根据巡检标准名称查询巡检内容（巡检标准）
export function getContentByContentName(data: GetContentByContentNameParams) {
  return request({
    url: '/ptms/pad/data/patorlTask/getContentByContentName',
    method: 'post',
    data,
  })
}

// 根据内容 Id 查询执行记录对象
export function getExecuteRecordByContentId(contentId: string) {
  return request({
    url: `/ptms/pad/data/patorlTask/getExecuteRecordByContentId/${contentId}`,
    method: 'get',
  })
}
