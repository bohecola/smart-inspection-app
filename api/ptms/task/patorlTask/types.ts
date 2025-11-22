export interface GetContentByContentNameParams {
  /**
   * 巡检标准名称
   */
  contentName: string
  /**
   * 巡检对象Ids
   */
  objectIds?: string
  /**
   * 巡检工作任务表id;生产工作任务表id(product_task表)
   */
  taskId: number
}

export interface PatorlTaskQuery extends PageQuery {
  /**
   * 类别 0 正常创建-审核-执行 1 直接下达 - 执行
   */
  category?: string
  /**
   * 创建者
   */
  createBy?: number
  /**
   * 创建部门
   */
  createDept?: number
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 任务周期 逐月、逐日
   */
  cycel?: string
  /**
   * 任务描述
   */
  description: string
  /**
   * 设备台账id
   */
  devId?: number
  firstNum?: number
  /**
   * ID
   */
  id: number
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string
  /**
   * 名称（周期+巡检方案名称）
   */
  name: string
  /**
   * 排序列
   */
  orderByColumn?: string
  /**
   * 终端任务状态(PadConstant.PadState 可执行0，待执行1，已完成2)
   */
  padStatus?: string
  /**
   * 请求参数
   */
  params?: string
  /**
   * 计划结束日期
   */
  planEndDate: Date
  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId: number
  /**
   * 生产计划名称
   */
  planName?: string
  /**
   * 计划开始日期
   */
  planStartDate: Date
  /**
   * 电站id
   */
  psId: number
  psIdList?: number[]
  /**
   * 实际结束日期
   */
  realEndDate?: Date
  /**
   * 实际开始日期
   */
  realStartDate?: Date
  /**
   * 方案id
   */
  schemeId: number
  schemeIdList?: number[]
  /**
   * 任务状态
   */
  status: string
  /**
   * 任务状态
   */
  statusList?: string[]
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 执行方式;0：PAD  1：电脑
   */
  way: string
  /**
   * 执行方式  处理
   */
  wayProcess?: string[]
  /**
   * 年度
   */
  year: string
}
