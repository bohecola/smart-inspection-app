export interface BugInfoVO {
  /**
   * ID缺陷编号;ID缺陷编号-带附件
   */
  id: string

  /**
   * 电站id;电站id(powerstation_info表id)
   */
  psId: string

  /**
   * 缺陷名称
   */
  name: string

  /**
   * 类型;类型;0：缺陷；1：故障
   */
  type: string

  /**
   * 缺陷位置
   */
  bugAddr: string

  /**
   * 设备id;设备id(asset_device表id)
   */
  devId: string

  /**
   * 设备名称
   */
  devName: string

  /**
   * 设备类型
   */
  devType: string

  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level: string

  /**
   * 缺陷发现人
   */
  finder: string

  /**
   * 缺陷发现时间
   */
  findtime: string

  /**
   * 缺陷描述
   */
  description: string

  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable: string

  /**
   * 是否需要安全措施
   */
  hstep: string

  /**
   * 是否通讯故障
   */
  combug: number

  /**
   * 影响发电功率(kW)
   */
  noworkbattery: string

  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status: string

  /**
   * 处理过程及结果
   */
  result: string

  /**
   * 来源;0：pc新建 1：pad 新建 2：巡检记录
   */
  source: string

  /**
   * 来源关联id;pad 新建：padid ; 巡检记录：巡检记录id
   */
  sourceRelId: string

  /**
   * 审批意见
   */
  opinions: string
}

export interface DataBugVO {
  /**
   * 故障分析
   */
  analysis?: string
  /**
   * 缺陷位置
   */
  bugAddr?: string
  /**
   * 故障类别
   */
  bugCategory?: string
  /**
   * 故障类别名称
   */
  bugCategoryName?: string
  /**
   * 消缺前、消缺中、投运前信息
   */
  bugDealList?: BugDealVO[]
  /**
   * 故障时长
   */
  bughour?: number
  /**
   * 消缺物料
   */
  bugMaterialList?: BugMaterialVO[]
  /**
   * 电站项目部id
   */
  deptId?: string
  deptName?: string
  /**
   * 缺陷描述
   */
  description?: string
  /**
   * 设备id
   */
  devId?: string
  /**
   * 设备名称
   */
  devName?: string
  /**
   * 设备类型
   */
  devType?: string
  /**
   * 缺陷发现人
   */
  finder?: string
  /**
   * 缺陷发现时间
   */
  findtime?: string
  /**
   * 缺陷完成时间
   */
  finishtime?: string
  /**
   * 是否需要安全措施
   */
  hstep?: string
  /**
   * ID缺陷编号
   */
  id?: string
  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level?: string
  /**
   * 影响发电功率(kW)
   */
  noworkbattery?: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable?: string
  /**
   * 处理过程及结果
   */
  process?: string
  /**
   * 电站id
   */
  psId?: string
  /**
   * 电站名称
   */
  psname?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
}

export interface BugDealVO {
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
   * 缺陷id;缺陷id(bug_info表id)
   */
  bugId?: string
  /**
   * 安全措施
   */
  description?: string
  /**
   * 附件
   */
  files?: string
  /**
   * ID
   */
  id?: string
  /**
   * 操作时间
   */
  operateDate?: string
  /**
   * 操作人
   */
  operator?: string
  /**
   * 审批意见
   */
  opinions?: string
  /**
   * 审核表数据  中的 审核结果
   */
  result?: string
  /**
   * 类型;0消缺前，1消缺中，2投运前
   */
  type?: string
  /**
   * 类型名称
   */
  typeName?: string
}

export interface BugMaterialVO {
  /**
   * 缺陷id
   */
  bugId?: string
  /**
   * 数量
   */
  count?: number
  /**
   * 厂家
   */
  factor?: string
  /**
   * ID
   */
  id?: string
  /**
   * 物料规则型号
   */
  model?: string
  /**
   * 物料名称
   */
  name?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 计量单位
   */
  unit?: string
}

export interface BugForm {
  /**
   * 缺陷位置
   */
  bugAddr?: string
  /**
   * 故障类别
   */
  bugCategory: string
  /**
   * 缺陷描述
   */
  description: string
  /**
   * 设备id
   */
  devId?: string
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
  findtime: string
  /**
   * 是否部门监督
   */
  hstep?: string
  /**
   * ID缺陷编号;ID缺陷编号-带附件
   */
  id?: string
  /**
   * 缺陷级别;缺陷级别;0：一般缺陷；1：重大缺陷；2：紧急缺陷
   */
  level: string
  /**
   * 影响发电功率(kW)
   */
  noworkbattery?: string
  /**
   * 责任方;责任方;ops：运维方; owner：业主
   */
  personliable?: string
  /**
   * 电站id
   */
  psId?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
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
  bugId?: string
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
  /**
   * 创建者
   */
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 缺陷恢复时间
   */
  finishtime?: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
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
  bugId?: string
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
  /**
   * 创建者
   */
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 缺陷恢复时间
   */
  finishtime?: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
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
  bugId?: string
  /**
   * 消缺物料表List
   */
  bugMaterialList?: BugMaterialBo[]
  /**
   * 创建者
   */
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 缺陷恢复时间
   */
  finishtime?: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

export interface BugMaterialBo {
  /**
   * 缺陷id
   */
  bugId: string
  /**
   * 数量
   */
  count: number
  /**
   * 创建者
   */
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 厂家
   */
  factor?: string
  /**
   * ID
   */
  id?: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
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
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * ID
   */
  id?: string
  /**
   * 审批对象id
   */
  objectId: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
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
  bugId: string
  /**
   * 创建者
   */
  createBy?: string
  /**
   * 创建部门
   */
  createDept?: string
  /**
   * 创建时间
   */
  createTime?: string
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
  id?: string
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
  psId?: string
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
  updateBy?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

export interface BugQuery extends Partial<PageQuery> {
  /**
   * 设备类型
   */
  devType?: string
  firstNum?: number
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string
  /**
   * 关键字(工作计划、工作任务、任务类别)
   */
  keyword?: string
  /**
   * 排序列
   */
  orderByColumn?: string
  /**
   * 请求参数（时间）
   */
  params?: string
  /**
   * 电站id
   */
  psId?: string
  /**
   * 状态;0：待消缺 1：消缺中 2：挂起 3：已消缺 4：已归档
   */
  status?: string
}
