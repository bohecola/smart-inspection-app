export {}

declare global {
  interface BaseEntity {
    createBy?: any
    createByName?: string
    createDept?: any
    createDeptName?: string
    createTime?: string
    updateBy?: any
    updateTime?: any
    operation?: 'tempSave' | 'submit'
    initiator?: Initiator
  }

  // 分页数据
  interface PageData<T, D> {
    form: T
    queryParams: D
    rules: {
      [k in keyof T]?: FieldRule[]
    }
  }

  // 分页查询参数
  interface PageQuery {
    // 业务主键
    businessKey?: string
    pageNum: number
    pageSize: number
  }

  // 字典数据  数据配置
  interface DictDataOption {
    label: string
    value: string
    elTagType?: ElTagType
    elTagClass?: string
    remark?: string
    [key: string]: any
  }
}
