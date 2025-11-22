import type { AxiosPromise } from 'axios'
import type { AddBugForm, BugQuery, FinishBugForm, FirstBugSaveForm, SecondBugSaveForm, UpdateBugForm } from './types'
import request from '@/service/request'

// 查询缺陷记录列表
export function listBug(data: BugQuery): AxiosPromise<any[]> {
  return request({
    url: '/ptms/pad/data/bug/list',
    method: 'get',
    params: data,
  })
}

// 新增缺陷
export function addBug(data: AddBugForm) {
  return request({
    url: '/ptms/pad/data/addBug',
    method: 'post',
    data,
  })
}

// 获取缺陷记录详细信息
export function getBugInfo(id: string): AxiosPromise<AddBugForm> {
  return request({
    url: `/ptms/pad/data/getBugInfo/${id}`,
    method: 'get',
  })
}

// 缺陷挂起
export function suspendBug(id: string) {
  return request({
    url: `/ptms/pad/data/suspendBug/${id}`,
    method: 'put',
  })
}

// 消缺前、消缺中、投运前提交(第一步)
export function firstBugSave(data: FirstBugSaveForm) {
  return request({
    url: '/ptms/pad/data/firstBugSave',
    method: 'put',
    data,
  })
}

// 消缺处理界面(第二步) 保存
export function secondBugSave(data: SecondBugSaveForm) {
  return request({
    url: '/ptms/pad/data/secondBugSave',
    method: 'put',
    data,
  })
}

// 消缺完成
export function finishBug(data: FinishBugForm) {
  return request({
    url: '/ptms/pad/data/finishBug',
    method: 'put',
    data,
  })
}

// 修改缺陷记录
export function updateBug(data: UpdateBugForm) {
  return request({
    url: '/ptms/pad/data/editBug',
    method: 'put',
    data,
  })
}
