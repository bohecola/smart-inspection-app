import { usePathname } from 'expo-router'
import { isEmpty, isNil } from 'lodash-es'
import z from 'zod'

export const recordSchema = z.object({
  id: z.string().nullish(),
  taskId: z.string().optional(),
  padNo: z.string().nullish(),
  deptId: z.string().nullish(),
  deptName: z.string().nullish(),
  psId: z.string().nullish(),
  psname: z.string().nullish(),
  operator: z.string().nullish(),
  operateDate: z.string().nullish(),
  starttime: z.string().nullish(),
  endtime: z.string().nullish(),
  status: z.string().nullish(),
  description: z.string().nullish(),
  remark: z.string().nullish(),
  recordResultList: z.array(
    z.object({
      id: z.string().nullish(),
      recordId: z.string().nullish(),
      taskId: z.string().optional(),
      itemId: z.string().optional(),
      description: z.string().nullish(),
      dataType: z.string().optional(),
      capture: z.string().optional(),
      required: z.string().optional(),
      sortNo: z.number().nullish(),
      remark: z.string().nullish(),
      result: z.string().nullish(),
      files: z.string().nullish(),
      cameraActive: z.boolean().optional(),
    }).superRefine((value, ctx) => {
      if (isNil(value.result) || value.result === '') {
        ctx.addIssue({
          code: 'invalid_type',
          message: `${value.description}不能为空`,
          path: ['result'],
          expected: 'string',
        })
      }

      if (value.capture === 'Y' && isEmpty(value.files)) {
        ctx.addIssue({
          code: 'invalid_type',
          message: '拍摄不能为空',
          path: ['files'],
          expected: 'string',
        })
      }
    }),
  ),
})

export type RecordForm = z.infer<typeof recordSchema>

export function useIsAddOrEditRoute() {
  const pathname = usePathname()
  const isAdd = pathname.endsWith('add-record')
  const isEdit = pathname.endsWith('edit-record')
  return { isAdd, isEdit }
}
