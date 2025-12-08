import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import { cloneDeep } from 'lodash-es'
import { useState } from 'react'

interface Options<T, Q> {
  initialQuery: Q
  request: (params: Q, config?: AxiosRequestConfig) => AxiosPromise<T[]>
}

export function useList<T, Q extends PageQuery>(options: Options<T, Q>) {
  // 配置
  const { initialQuery, request } = options

  // 查询
  const [query, setQuery] = useState(cloneDeep(initialQuery))

  // 数据
  const [data, setData] = useState<T[]>([])

  // 状态
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)

  async function onLoad() {
    const { rows, total } = await request(query)
  }
}
