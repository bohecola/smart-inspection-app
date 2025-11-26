export interface PatorlTaskVO {
  /**
   * 类别 0 正常创建-审核-执行 1 直接下达 - 执行
   */
  category?: string
  /**
   * 任务周期 逐月、逐日
   */
  cycel?: string
  /**
   * 电站项目部id
   */
  deptId?: number
  /**
   * 电站项目部名称
   */
  deptName?: string
  /**
   * 任务描述
   */
  description?: string
  /**
   * ID
   */
  id?: string
  /**
   * 名称（周期+巡检方案名称）
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
  planName?: string
  /**
   * 计划开始日期
   */
  planStartDate?: Date
  /**
   * 计划类型
   */
  planType?: string
  /**
   * 电站id
   */
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
   * 方案id
   */
  schemeId?: number
  /**
   * 任务状态
   */
  status?: string
  /**
   * 巡检工作内容
   */
  taskContentList?: PatorlTaskContentVO[]
  /**
   * 任务类型 0 生产任务 2 工程任务
   */
  taskType?: string
  /**
   * 执行方式;0：PAD  1：电脑
   */
  way?: string
  /**
   * 年度
   */
  year?: string
}

export interface PatorlTaskContentVO {
  /**
   * 设备编号
   */
  devNo?: string
  /**
   * 设备类型(巡检对象为设备时可以通过设备类型来确定设备)
   */
  devType?: string
  /**
   * ID
   */
  id?: number
  /**
   * 巡检标准名称;巡检标准名称(pt_patorl_criterion表name)
   */
  name?: string
  /**
   * 对象id（设备id或区域id）
   */
  objectId?: string
  /**
   * 对象名称（设备名或区域名）
   */
  objectName?: string
  /**
   * 巡检类型;巡检类型 0：设备 1：区域
   */
  patrolType?: string
  /**
   * 电站id
   */
  psId?: number
  /**
   * 巡检工作任务记录结果
   */
  recordList?: PatrolTaskRecordVO[]
  /**
   * 排序号
   */
  sortNo?: number
  /**
   * 状态 0:未开始 1:进行中 2:已完成
   */
  status?: string
  /**
   * 巡检工作内容项
   */
  taskContentItemList?: PatorlTaskContentItemVO[]
  /**
   * 巡检任务id
   */
  taskId?: number
}

export interface PatrolTaskRecordVO {
  /**
   * 巡检内容id
   */
  contentId?: number
  /**
   * 巡检内容名称
   */
  contentName?: string
  /**
   * 巡检描述
   */
  description?: string
  /**
   * 巡检结束时间
   */
  endtime?: Date
  /**
   * ID;任务巡检记录
   */
  id?: number
  /**
   * 对象id（设备id或区域id）
   */
  objectId?: number
  /**
   * 对象名称（设备id或区域id）
   */
  objectName?: string
  /**
   * 巡检人
   */
  operator?: string
  /**
   * PAD设备编号
   */
  padNo?: number
  /**
   * 巡检类型;巡检类型 0: 设备 1：区域
   */
  patrolType?: string
  /**
   * 电站id;电站id(p_powerstation_info表id)
   */
  psId?: number
  /**
   * 巡检记录结果
   */
  recordResultList?: PatrolTaskRecordResultVO[]
  /**
   * 备注
   */
  remark?: string
  /**
   * 巡检开始时间
   */
  starttime?: Date
  /**
   * 状态
   */
  status?: string
  /**
   * 巡检工作任务表id
   */
  taskId?: number
}

export interface PatrolTaskRecordResultVO {
  /**
   * 是否拍摄 Y: 是  N: 否
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
   * 拍摄附件
   */
  files?: string
  /**
   * ID;任务巡检记录结果
   */
  id?: number
  /**
   * 拍摄附件
   */
  imageUrl?: string
  /**
   * 图片地址 List
   */
  imageUrlList?: string[]
  /**
   * 巡检工作内容项id;巡检工作内容项id(patorl_task_content_item表id)
   */
  itemId?: number
  /**
   * 巡视对象
   */
  objectName?: string
  /**
   * 巡视项目
   */
  projectName?: string
  /**
   * 任务巡检记录id;任务巡检记录id(patrol_task_record表id)
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
   * 工作任务表id;工作任务表id(product_task)
   */
  taskId?: string
  /**
   * 巡视方法 目视、鼻闻、耳听
   */
  way?: string
}

export interface PatorlTaskContentItemVO {
  /**
   * 是否拍摄 Y: 是  N: 否
   */
  capture?: string
  /**
   * 巡检工作内容id
   */
  contentId?: number
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
   * ID
   */
  id?: number
  /**
   * 巡视对象
   */
  objectName?: string
  /**
   * 巡视项目
   */
  projectName?: string
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
   * 巡视方法 目视、鼻闻、耳听
   */
  way?: string
}

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
  firstNum?: number
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string
  /**
   * 关键字(工作计划、工作任务)
   */
  keyword?: string
  /**
   * 排序列
   */
  orderByColumn?: string
  /**
   * 终端任务状态(PadConstant.PadState 可执行0，待执行1，已完成2)
   */
  padStatus?: string
  /**
   * 电站id
   */
  psId?: number
  /**
   * 年度
   */
  year?: string
}
