import { usePathname } from 'expo-router'
import { isEmpty, isNil } from 'lodash-es'
import z from 'zod'

export const recordSchema = z.object({
  id: z.string().nullish(),
  taskId: z.string().optional(),
  contentId: z.string().optional(),
  contentName: z.string().nullish(),
  psId: z.string().nullish(),
  psNo: z.string().nullish(),
  partrolType: z.string().optional(),
  objectId: z.string().optional(),
  objectName: z.string().nullish(),
  operator: z.string().nullish(),
  operateDate: z.string().optional(),
  starttime: z.string().nullish(),
  endtime: z.string().nullish(),
  status: z.string().nullish(),
  description: z.string().nullish(),
  remark: z.string().nullish(),
  patrolType: z.string().nullish(),
  location: z.any().nullable(),
  recordResultList: z.array(
    z.object({
      id: z.string().nullish(),
      taskId: z.string().optional(),
      recordId: z.string().nullish(),
      itemId: z.string().optional(),
      imageUrl: z.string().nullable(),
      imageUrlList: z.array(z.string()).nullable(),
      description: z.string().nullish(),
      dataType: z.string().optional(),
      capture: z.string().optional(),
      required: z.string().nullable(),
      sortNo: z.number().nullish(),
      remark: z.string().nullish(),
      result: z.string().nullish(),
      example: z.string().nullish(),
      way: z.string().nullish(),
      files: z.string().nullish(),
      objectName: z.string().optional(),
      projectName: z.string().optional(),
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
