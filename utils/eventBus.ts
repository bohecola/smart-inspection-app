import type { Handler } from 'mitt'
import mitt from 'mitt'
import { useEffect } from 'react'

// 事件类型
export interface Events {
  'prod:list:refresh': void
  'prod:detail:refresh': void
  'inspec:list:refresh': void
  'inspec:detail:refresh': void
  'inspec:content:refresh': void
  'bug:list:refresh': void
  [key: string | symbol]: unknown
}

// 事件总线
export const eventBus = mitt<Events>()

// 使用事件总线
export function useEventBus<K extends keyof Events>(event: K, handler: Handler<Events[K]>) {
  useEffect(() => {
    eventBus.on(event, handler)
    return () => {
      eventBus.off(event, handler)
    }
  }, [event, handler])
}
