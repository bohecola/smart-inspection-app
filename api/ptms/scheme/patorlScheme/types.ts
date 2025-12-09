export interface PatorlSchemeVO {
  /**
   * ID;巡检方案(初始化咸林方案id为-1)
   */
  id: string | number

  /**
   * 生产工作计划模板id;生产工作任务模板id(product_task_scheme表id)
   */
  planSchemeId: string | number

  planSchemeName: string

  /**
   * 电站id
   */
  psId: string | number

  psName: string

  /**
   * 名称
   */
  name: string

  /**
   * 执行数
   */
  count: number

  /**
   * 执行周期
   */
  cycel: string

  /**
   * 排序号
   */
  sortNo: number

  /**
   * 描述
   */
  description: string

  status: string
}

export interface PatorlSchemeForm extends BaseEntity {
  /**
   * ID;巡检方案(初始化咸林方案id为-1)
   */
  id?: string | number

  /**
   * 生产工作计划模板id;生产工作任务模板id(product_task_scheme表id)
   */
  planSchemeId?: string | number

  /**
   * 生产计划名称
   */
  planSchemeName?: string

  /**
   * 电站id
   */
  psId?: string | number

  psName?: string

  /**
   * 名称
   */
  name?: string

  /**
   * 执行方式
   */
  way?: string

  /**
   * 执行数
   */
  count?: number

  /**
   * 执行周期
   */
  cycel?: string

  /**
   * 排序号
   */
  sortNo?: number

  /**
   * 描述
   */
  description?: string

  contentList?: Patorlcontent[]
}

export interface PatorlSchemeQuery extends PageQuery {
  /**
   * 生产工作计划模板id;生产工作任务模板id(product_task_scheme表id)
   */
  planSchemeId?: string | number

  /**
   * 电站id
   */
  psId?: string | number

  /**
   * 名称
   */
  name?: string

  /**
   * 执行数
   */
  count?: number

  /**
   * 执行周期
   */
  cycel?: string

  /**
   * 状态
   */
  status?: string

  params?: Record<string, any>
}

/**
 * PatorlContentBySchemeBo，巡检内容业务对象 pt_patorl_content
 */
export interface Patorlcontent {
  /**
   * 巡检标准Id
   */
  criterionId?: string

  criterionName?: string
  /**
   * 设备或区域
   */
  objectIds?: string | string[]

  objectNames?: string | string[]

  /**
   * 设备类型(巡检对象为设备时可以通过设备类型来确定设备)
   */
  devType?: string
  /**
   * 巡检方案类型
   */
  patrolType?: string
  /**
   * 排序号
   */
  sortNo?: number
  [property: string]: any
}
