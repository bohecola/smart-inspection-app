import { isEmpty } from 'lodash-es'
import z from 'zod'

export const handleSchema = z.object({
  fixList: z.array(z.object({
    approver: z.string().nullish(),
    approverDate: z.string().nullish(),
    approveResult: z.string().nullish(),
    bugId: z.string().nullish(),
    operator: z.string().nullish().refine(value => !isEmpty(value), { message: '操作人不能为空' }),
    operateDate: z.string().nullish().refine(value => !isEmpty(value), { message: '操作时间不能为空' }),
    description: z.string().nullish().refine(value => !isEmpty(value), { message: '安全措施不能为空' }),
    files: z.string().nullish().refine(value => !isEmpty(value), { message: '附件不能为空' }),
    id: z.string().nullish(),
    opinions: z.string().nullish(),
    result: z.string().nullish(),
    type: z.string().nullish(),
    typeName: z.string().nullish(),
  })),
  secondStep: z.object({
    bugId: z.string().nullish(),
    status: z.string().nullish(),
    process: z.string().nullish().refine(value => !isEmpty(value), { message: '处理过程不能为空' }),
    analysis: z.string().nullish().refine(value => !isEmpty(value), { message: '故障分析不能为空' }),
    finishtime: z.string().nullish().refine(value => !isEmpty(value), { message: '恢复时间不能为空' }),
    bugMaterialList: z.array(z.object({
      id: z.string().nullish(),
      bugId: z.string().nullish(),
      name: z.string().nullish().refine(value => !isEmpty(value), { message: '物料名称不能为空' }),
      model: z.string().nullish().refine(value => !isEmpty(value), { message: '物料型号不能为空' }),
      factor: z.string().nullish().refine(value => !isEmpty(value), { message: '厂家不能为空' }),
      count: z.string().nullish().refine(value => !isEmpty(value), { message: '数量不能为空' }),
      unit: z.string().nullish().refine(value => !isEmpty(value), { message: '计量单位不能为空' }),
    })),
  }),
})

export type HandleForm = z.infer<typeof handleSchema>
