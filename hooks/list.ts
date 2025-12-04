import type { AxiosPromise, AxiosRequestConfig } from 'axios'
import { cloneDeep } from 'lodash-es'
import { useRef, useState } from 'react'

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

  const abortController = useRef<AbortController>(null)

  // 加载数据
  const loadMore = async (isRefreshing: boolean = false) => {
    if (loading || !hasMore) {
      return
    }

    try {
      abortController.current?.abort()
      abortController.current = new AbortController()

      setLoading(true)
      setError(false)

      const { rows, total } = await request(query, { signal: abortController.current.signal })

      abortController.current = null

      const currentTotal = data.length + rows.length

      setData(isRefreshing ? rows : [...data, ...rows])
      setHasMore(total > currentTotal)
      setQuery({ ...query, pageNum: query.pageNum + 1 })
    }
    catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        console.log('请求被取消')
        return
      }

      setError(true)
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  // reload
  const reload = async () => {
    try {
      setData([])

      abortController.current?.abort()
      abortController.current = new AbortController()

      setLoading(true)
      setError(false)

      const { rows, total } = await request(Object.assign({}, query, { pageNum: 1 }), { signal: abortController.current.signal })

      abortController.current = null

      const currentTotal = data.length + rows.length

      setData(rows)
      setHasMore(total > currentTotal)
      setQuery({ ...query, pageNum: query.pageNum + 1 })
    }
    catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        console.log('请求被取消')
        return
      }

      setError(true)
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  // 刷新
  const onRefresh = async () => {
    setRefreshing(true)
    setData([])
    setHasMore(true)
    setQuery({ ...query, pageNum: 1 })
    await loadMore(true)
    setRefreshing(false)
  }

  return { query, data, loading, refreshing, hasMore, error, loadMore, reload, onRefresh, setQuery, setData }
}
