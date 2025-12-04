import type { AxiosPromise } from 'axios'
import type { DataPatorlTaskInfoVO, GetContentByContentNameParams, PatorlTaskContentVO, PatorlTaskQuery, PatorlTaskVO, PatrolTaskRecordVO } from './types'
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
export function getPatorlTaskInfo(id: string): AxiosPromise<DataPatorlTaskInfoVO> {
  return request({
    url: `/ptms/pad/data/patorlTask/getInfo/${id}`,
    method: 'get',
  })
}

// 处理执行
export function doPatorlTaskExecute(data: PatrolTaskRecordVO) {
  return request({
    url: '/ptms/pad/data/patorlTask/dealTask',
    method: 'post',
    data,
  })
}

// 根据巡检标准名称查询巡检内容（巡检标准）
export function getContentByContentName(data: GetContentByContentNameParams): AxiosPromise<PatorlTaskContentVO[]> {
  return request({
    url: '/ptms/pad/data/patorlTask/getContentByContentName',
    method: 'post',
    data,
  })
}

// 根据内容 Id 查询执行记录对象
export function getPatorlTaskRecordByContentId(contentId: string): AxiosPromise<PatrolTaskRecordVO> {
  return request({
    url: `/ptms/pad/data/patorlTask/getPatorlTaskRecordByContentId/${contentId}`,
    method: 'get',
  })
}
