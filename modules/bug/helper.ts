import { isNil } from 'lodash-es'
import { useEffect, useState } from 'react'
import z from 'zod'
import { getPowerList } from '@/api/ptms/base/powerstationInfo'
import { getDevType } from '@/api/ptms/bug/bugDevCategory'

export const bugSchema = z.object({
  id: z.string().nullish(),
  description: z.string().nonempty({ message: '缺陷描述不能为空' }),
  psId: z.string().optional().refine(value => !isNil(value), { message: '电站不能为空' }),
  devId: z.string().nullish(),
  devName: z.string().nullish(),
  bugAddr: z.string().nullish(),
  devType: z.string().nonempty({ message: '设备类型不能为空' }),
  bugCategory: z.string().nonempty({ message: '故障类别不能为空' }),
  level: z.string().nonempty({ message: '缺陷级别不能为空' }),
  finder: z.string().nonempty({ message: '发现人不能为空' }),
  findtime: z.string().nonempty({ message: '发现时间不能为空' }),
  personliable: z.string().nonempty({ message: '责任方不能为空' }),
  hstep: z.string().nullish(),
  noworkbattery: z.string().nullish(),
  status: z.string().nullish(),
})

export type BugForm = z.infer<typeof bugSchema>

// 电站列表
export function usePowerList() {
  const [powerList, setPowerList] = useState([])
  const [powerOptions, setPowerOptions] = useState([])

  const fetchPowerList = async () => {
    const { data } = await getPowerList()
    const options = data
      .filter(e => e.psstate === '0')
      .map(e => ({ label: e.psname, value: e.id }))
    setPowerList(data)
    setPowerOptions(options)
  }

  useEffect(() => {
    fetchPowerList()
  }, [])

  return { powerList, powerOptions }
}

// 故障类别列表
export function useBugCategoryList() {
  const [bugCategoryList, setBugCategoryList] = useState([])
  const [bugCategoryOptions, setBugCategoryOptions] = useState([])

  const fetchBugCategoryList = async (type: string) => {
    const { data } = await getDevType(type)
    setBugCategoryList(data)
    setBugCategoryOptions(data.map((e: any) => ({ label: e.name, value: e.id })))
  }

  return { bugCategoryList, bugCategoryOptions, fetchBugCategoryList }
}
