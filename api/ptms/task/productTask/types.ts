export interface ProductTaskVO {
  /**
   * 审批记录
   */
  approveRecordList?: ApproveRecord[]
  /**
   * 类别 0 正常创建-审核-执行 1 直接下达 - 执行
   */
  category?: string
  /**
   * 负责人
   */
  charger?: string
  /**
   * 任务周期 逐月、逐日
   */
  cycel?: string
  /**
   * 项目部id
   */
  deptId?: number
  /**
   * 项目部名称
   */
  deptName?: string
  /**
   * 任务描述
   */
  description?: string
  /**
   * ID;生产工作任务表
   */
  id: string
  /**
   * 名称
   */
  name?: string
  /**
   * 计划结束日期
   */
  planEndDate?: Date
  /**
   * 生产计划id;生产计划id(product_plan表id)
   */
  planId?: number
  /**
   * 生产计划名称
   */
  planName?: string
  /**
   * 计划开始日期
   */
  planStartDate?: Date
  /**
   * 计划类型
   */
  planType?: string
  psId?: number
  /**
   * 电站名称
   */
  psname?: string
  /**
   * 实际结束日期
   */
  realEndDate?: Date
  /**
   * 实际开始日期
   */
  realStartDate?: Date
  /**
   * 备注
   */
  remark?: string
  /**
   * 任务状态
   */
  status?: string
  /**
   * 工作任务项
   */
  taskItemList?: ProductTaskItemVO[]
  /**
   * 任务执行记录
   */
  taskRecordList?: ProductTaskRecordVO[]
  /**
   * 任务执行项模板
   */
  taskResultTempList?: ProductTaskRecordResultVO[]
  /**
   * 生产任务方案id
   */
  taskSchemeId?: number
  /**
   * 任务分类
   */
  type?: string
  /**
   * 执行方式;0：PAD  1：电脑  2：PAD按日
   */
  way?: string
  /**
   * 年度
   */
  year?: string
}

export interface ApproveRecord {
  /**
   * 审批人
   */
  approveBy?: string
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
   * 删除标志;删除标志（0代表存在 2代表删除）
   */
  delFlag?: string
  /**
   * ID
   */
  id?: number
  /**
   * 审批对象id
   */
  objectId?: number
  /**
   * 审批对象名(数据库表名)
   */
  objectName?: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 审批结果（0 不通过 1 通过）
   */
  result?: string
  /**
   * 租户编号
   */
  tenantId?: string
  /**
   * 类型
   */
  type?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface ProductTaskItemVO {
  /**
   * 是否拍摄
   */
  capture?: string
  /**
   * 填报类型
   */
  dataType?: string
  /**
   * 检查项描述
   */
  description?: string
  /**
   * 填写示例
   */
  example?: string
  /**
   * ID;生产工作任务项表
   */
  id?: number
  /**
   * 备注
   */
  remark?: string
  /**
   * 是否必填;是否必填 Y: 是  N: 否
   */
  required?: string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 生产工作任务id;生产工作任务id(product_task表id)
   */
  taskId?: number
}

export interface ProductTaskRecordVO {
  /**
   * 创建人
   */
  createBy?: number
  /**
   * 项目部id
   */
  deptId?: number
  /**
   * 项目部名称
   */
  deptName?: string
  /**
   * 工作过程描述
   */
  description?: string
  /**
   * 结束时间
   */
  endtime?: Date
  /**
   * ID;生产任务执行记录
   */
  id?: number
  /**
   * 执行日期
   */
  operateDate?: Date
  /**
   * 执行人
   */
  operator?: string
  /**
   * PAD设备编号
   */
  padNo?: string
  /**
   * 电站id
   */
  psId?: number
  /**
   * 电站名称
   */
  psname?: string
  /**
   * 任务执行记录结果
   */
  recordResultList?: ProductTaskRecordResultVO[]
  /**
   * 备注
   */
  remark?: string
  /**
   * 开始时间
   */
  starttime?: Date
  /**
   * 状态 0 保存 1 提交
   */
  status?: string
  /**
   * 生产工作任务id
   */
  taskId?: string
}

export interface ProductTaskRecordResultVO {
  /**
   * 是否拍摄
   */
  capture?: string
  /**
   * 填报类型
   */
  dataType?: string
  /**
   * 检查项描述
   */
  description?: string
  /**
   * 填写示例
   */
  example?: string
  /**
   * 附件
   */
  files?: string
  /**
   * ID;生产工作任务执行记录结果表
   */
  id?: number
  /**
   * 工作任务项表id;工作任务项表id(product_task_item表id)
   */
  itemId?: number
  /**
   * 工作任务执行记录id;工作任务执行记录id(product_task_record表id)
   */
  recordId?: number
  /**
   * 备注
   */
  remark?: string
  /**
   * 是否必填;是否必填 Y: 是  N: 否
   */
  required?: string
  /**
   * 结果;如果结果为值，则直接存储如果结果为附件，则保存附件ID
   */
  result?: string
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 工作任务表id;
   */
  taskId?: number
}

export interface ProductTaskQuery extends PageQuery {
  pageNum: number
  pageSize: number
  /**
   * 任务计划类型 0 生产任务 1 巡检任务 2 工程任务
   */
  planType: string
  /**
   * 任务状态
   */
  status?: string
  /**
   * 任务类型 0 生产任务 2 工程任务
   */
  taskType: string
  /**
   * 终端任务状态 可执行0，待执行1，已完成2
   */
  padStatus: string

  keyword?: string
}
