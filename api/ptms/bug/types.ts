export interface AddBugForm {
  /**
   * 故障分析
   */
  analysis?: string
  approveRecordBo?: ApproveRecordBo
  /**
   * 缺陷位置
   */
  bugAddr?: string
  /**
   * 故障类别
   */
  bugCategory?: number
  bugDealBo?: BugDealBo
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
   * 缺陷描述
   */
  description: string
  /**
   * 设备id;设备id(asset_device表id)
   */
  devId?: number
  /**
   * 设备名称
   */
  devName?: string
  /**
   * 设备类型
   */
  devType: string
  /**
   * 缺陷发现人
   */
  finder: string
  /**
   * 缺陷发现时间
   */
  findtime: Date
  /**
   * 缺陷完成时间
   */
  finishtime?: Date
  /**
   * 是否部门监督
   */
  hstep?: string
  /**
   * ID缺陷编号;ID缺陷编号-带附件
   */
  id?: number
  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level: string
  /**
   * 影响发电功率(kW)
   */
  noworkbattery?: number
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable?: string
  /**
   * 处理过程
   */
  process?: string
  /**
   * 电站id;电站id(powerstation_info表id)
   */
  psId: number
  /**
   * 是否缺陷共享管理
   */
  share?: string
  /**
   * 来源;0：pc新建 1：pad 新建 2：巡检记录
   */
  source?: string
  /**
   * 来源关联id;pad 新建：padNo ; 巡检记录：巡检记录id
   */
  sourceRelId?: number
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface UpdateBugForm {
  /**
   * 故障分析
   */
  analysis?: string
  approveRecordBo?: ApproveRecordBo
  /**
   * 缺陷位置
   */
  bugAddr?: string
  /**
   * 故障类别
   */
  bugCategory?: number
  bugDealBo?: BugDealBo
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
   * 缺陷描述
   */
  description: string
  /**
   * 设备id;设备id(asset_device表id)
   */
  devId?: number
  /**
   * 设备名称
   */
  devName?: string
  /**
   * 设备类型
   */
  devType: string
  /**
   * 缺陷发现人
   */
  finder: string
  /**
   * 缺陷发现时间
   */
  findtime: Date
  /**
   * 缺陷完成时间
   */
  finishtime?: Date
  /**
   * 是否部门监督
   */
  hstep?: string
  /**
   * ID缺陷编号;ID缺陷编号-带附件
   */
  id?: number
  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level: string
  /**
   * 影响发电功率(kW)
   */
  noworkbattery?: number
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable?: string
  /**
   * 处理过程
   */
  process?: string
  /**
   * 电站id;电站id(powerstation_info表id)
   */
  psId: number
  /**
   * 是否缺陷共享管理
   */
  share?: string
  /**
   * 来源;0：pc新建 1：pad 新建 2：巡检记录
   */
  source?: string
  /**
   * 来源关联id;pad 新建：padNo ; 巡检记录：巡检记录id
   */
  sourceRelId?: number
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface FinishBugForm {
  /**
   * 故障分析
   */
  analysis?: string
  bugDealBo?: BugDealBo
  /**
   * 缺陷处理dealList
   */
  bugDealSaveMap?: { [key: string]: BugDealBo }
  /**
   * 缺陷Id
   */
  bugId?: number
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
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
   * 缺陷恢复时间
   */
  finishtime?: Date
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 处理过程
   */
  process?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档  常量
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface FirstBugSaveForm {
  /**
   * 故障分析
   */
  analysis?: string
  bugDealBo?: BugDealBo
  /**
   * 缺陷处理dealList
   */
  bugDealSaveMap?: { [key: string]: BugDealBo }
  /**
   * 缺陷Id
   */
  bugId?: number
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
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
   * 缺陷恢复时间
   */
  finishtime?: Date
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 处理过程
   */
  process?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档  常量
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface SecondBugSaveForm {
  /**
   * 故障分析
   */
  analysis?: string
  bugDealBo?: BugDealBo
  /**
   * 缺陷处理dealList
   */
  bugDealSaveMap?: { [key: string]: BugDealBo }
  /**
   * 缺陷Id
   */
  bugId?: number
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
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
   * 缺陷恢复时间
   */
  finishtime?: Date
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 处理过程
   */
  process?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档  常量
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface BugMaterialBo {
  /**
   * 缺陷id
   */
  bugId: number
  /**
   * 数量
   */
  count: number
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
   * 厂家
   */
  factor?: string
  /**
   * ID
   */
  id?: number
  /**
   * 物料规则型号
   */
  model: string
  /**
   * 物料名称
   */
  name: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 备注
   */
  remark?: string
  /**
   * 计量单位
   */
  unit: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface ApproveRecordBo {
  /**
   * 审批时间
   */
  approve_date?: string
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
   * ID
   */
  id?: number
  /**
   * 审批对象id
   */
  objectId: number
  /**
   * 审批对象名(数据库表名)
   */
  objectName: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 审批结果（1 不通过 0 通过）
   */
  result?: string
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

export interface BugDealBo {
  /**
   * 审核人
   */
  approver?: string
  /**
   * 审核时间
   */
  approverDate?: string
  /**
   * 审核结果 0 待审核  1 审核通过  2 审核不通过
   */
  approveResult?: string
  /**
   * 审核类型
   */
  approveType?: string
  /**
   * 缺陷描述
   */
  bugDescription?: string
  /**
   * 缺陷id;缺陷id(bug_info表id)
   */
  bugId: number
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
   * 安全措施
   */
  description: string
  /**
   * 附件
   */
  files: string
  /**
   * ID
   */
  id?: number
  /**
   * 操作时间
   */
  operateDate: string
  /**
   * 操作人
   */
  operator: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 电站名称
   */
  psId?: number
  /**
   * 授权电站
   */
  psIds?: string
  /**
   * 类型;0消缺前，1消缺中，2投运前
   */
  type: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}

export interface BugQuery extends PageQuery {
  /**
   * 故障分析
   */
  analysis?: string
  approveRecordBo?: string
  /**
   * 缺陷位置
   */
  bugAddr?: string
  /**
   * 故障类别
   */
  bugCategory?: number
  bugDealBo?: string
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
   * 缺陷描述
   */
  description: string
  /**
   * 设备id;设备id(asset_device表id)
   */
  devId?: number
  /**
   * 设备名称
   */
  devName?: string
  /**
   * 设备类型
   */
  devType: string
  /**
   * 缺陷发现人
   */
  finder: string
  /**
   * 缺陷发现时间
   */
  findtime: Date
  /**
   * 缺陷完成时间
   */
  finishtime?: Date
  firstNum?: number
  /**
   * 是否部门监督
   */
  hstep?: string
  /**
   * ID缺陷编号;ID缺陷编号-带附件
   */
  id?: number
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string
  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level: string
  /**
   * 影响发电功率(kW)
   */
  noworkbattery?: number
  /**
   * 排序列
   */
  orderByColumn?: string
  /**
   * 请求参数
   */
  params?: string
  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable?: string
  /**
   * 处理过程
   */
  process?: string
  /**
   * 电站id;电站id(powerstation_info表id)
   */
  psId: number
  /**
   * 是否缺陷共享管理
   */
  share?: string
  /**
   * 来源;0：pc新建 1：pad 新建 2：巡检记录
   */
  source?: string
  /**
   * 来源关联id;pad 新建：padNo ; 巡检记录：巡检记录id
   */
  sourceRelId?: number
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
}
