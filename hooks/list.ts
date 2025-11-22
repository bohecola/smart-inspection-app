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

  function resetListState() {
    setLoading(false)
    setRefreshing(false)
    setHasMore(true)
    setData([])
  }

  // 控制器
  const controllerRef = useRef<AbortController>(null)

  // 加载数据
  const load = async () => {
    if (loading || refreshing || !hasMore) {
      return false
    }

    // 取消上一次请求
    controllerRef.current?.abort()

    // 创建新的控制器
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      setLoading(true)
      setError(false)

      const { rows, total } = await request(query, { signal: controller.signal })

      controllerRef.current = null

      setData((prev) => {
        const newData = [...prev, ...rows]

        setHasMore(total > newData.length)
        return newData
      })

      setQuery({ ...query, pageNum: query.pageNum + 1 })

      setLoading(false)
    }
    catch (error: any) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        return
      }

      setError(true)
      setLoading(false)
      console.error(error)
    }
  }

  // 刷新
  const onRefresh = async () => {
    if (refreshing) {
      return false
    }

    // 取消上一次请求
    controllerRef.current?.abort()

    // 创建新的控制器
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      setData([])
      setHasMore(true)
      setRefreshing(true)

      const newQuery = cloneDeep(initialQuery)

      const { rows, total } = await request(newQuery, { signal: controller.signal })

      controllerRef.current = null

      setData(rows)
      setHasMore(total > rows.length)
      setQuery({ ...newQuery, pageNum: newQuery.pageNum + 1 })

      setRefreshing(false)
    }
    catch (error: any) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        return
      }
      setError(true)
      setRefreshing(false)
      console.error(error)
    }
  }

  return { query, data, loading, refreshing, hasMore, error, load, onRefresh, setQuery, setData, resetListState }
}
