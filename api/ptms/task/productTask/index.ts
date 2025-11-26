import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import type { ProductTaskQuery, ProductTaskRecordVO, ProductTaskVO } from './types'
import request from '@/service/request'

// 查询列表
export function listProductTask(query: ProductTaskQuery, config?: AxiosRequestConfig): AxiosPromise<ProductTaskVO[]> {
  return request({
    url: '/ptms/pad/data/productTask/list',
    method: 'get',
    params: query,
    ...config,
  })
}

// 获取生产任务执行记录模板（新增）
export function getProductTaskRecordTemp(taskId: string): AxiosPromise<ProductTaskRecordVO> {
  return request({
    url: `/ptms/pad/data/productTask/getProductTaskRecordTemp/${taskId}`,
    method: 'get',
  })
}

// 任务详情
export function getProductTaskInfo(id: string): AxiosPromise<ProductTaskVO> {
  return request({
    url: `/ptms/pad/data/productTask/getInfo/${id}`,
    method: 'get',
  })
}

// 处理执行
export function doExecute(data: ProductTaskRecordVO) {
  return request({
    url: '/ptms/pad/data/productTask/dealTask',
    method: 'post',
    data,
  })
}

// 处理执行完成-逐日
export function doExecuteDaily(taskId: string) {
  return request({
    url: `/ptms/pad/data/productTask/dealDoneTask/${taskId}`,
    method: 'post',
  })
}
