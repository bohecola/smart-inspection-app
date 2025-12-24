import { useEffect, useState } from 'react'
import { getDicts } from '@/api/system/dict/data'
import { useDictStore } from '@/store/dict'

type DictObj = Record<string, DictDataOption[]>

export function useDict(...args: string[]) {
  const [dictObj, setDictObj] = useState<DictObj>(() => {
    return args.reduce<DictObj>((acc, key) => ({ ...acc, [key]: [] }), {})
  })

  const dictStore = useDictStore()

  useEffect(() => {
    if (!args.length) {
      return
    }

    const load = async () => {
      const result: Record<string, DictDataOption[]> = {}

      await Promise.all(
        args
          .filter(Boolean)
          .map(async (key) => {
            // 先从缓存取
            const cached = dictStore.getDict(key)
            if (cached) {
              result[key] = cached
              return
            }

            // 缓存不存在 => 请求
            const { data = [] } = await getDicts(key)
            const dictData = data.map((e: any): DictDataOption => ({
              label: e.dictLabel,
              value: e.dictValue,
              elTagType: e.listClass,
              elTagClass: e.cssClass,
              remark: e.remark,
              remark1: e.remark1,
            }))

            result[key] = dictData
            dictStore.setDict(key, dictData)
          }),
      )

      setDictObj(result)
    }

    load()
  }, [JSON.stringify(args)])

  return dictObj
}
