import type { DeviceComponentVO } from './component/types'

export interface DeviceInfoVO {
  /**
   * 设备台账ID;设备台账表
   */
  id: string

  /**
   * 电站id;电站id(p_powerstation_info表id)
   */
  psId: string

  /**
   * 设备名称
   */
  name: string

  factor: string

  /**
   * 设备类型;设备类型;0：线路；1：主变；2：SVG；3：二次设备；4：箱变；5：逆变器；6：汇流箱；7：:组件；8：建筑；9：其它
   */
  type: string

  /**
   * 设备型号ID;设备型号ID(device_model表id)
   */
  modelId: string

  /**
   * 出厂编号
   */
  productNo: string

  /**
   * 安装位置
   */
  installPos: string

  /**
   * 安装日期
   */
  installDate: string

  /**
   * 生产日期
   */
  productDate: string

  /**
   * 投运日期
   */
  runDate: string

  /**
   * 运行状态;运行状态;0：在运；1：停运 2：检修 3：报废
   */
  runState: string

  /**
   * 停运日期
   */
  stopDate: string

  /**
   * 额定容量/数量
   */
  ratedCapacity: number

  /**
   * 额定容量/数量 单位
   */
  ratedCapacityUnit: string

  /**
   * 二维码
   */
  rqcode: string

  /**
   * 管理归属
   */
  manageAttribution: string

  /**
   * 供应商
   */
  supplier: string

  /**
   * 采购日期
   */
  buyDate: string

  /**
   * 使用年限
   */
  usefulLife: number

  /**
   * 质保开始日期
   */
  warrantyStartDate: string

  /**
   * 质保结束日期
   */
  warrantyEndDate: string

  /**
   * 中修周期
   */
  mediumRepairCycle: string

  /**
   * 大修周期
   */
  majorRepairCycle: string

  /**
   * 排序号
   */
  sortNo: number

  /**
   * 备注
   */
  remark: string
}

export interface DeviceInfoForm extends BaseEntity {
  /**
   * 设备台账ID;设备台账表
   */
  id?: string | number

  /**
   * 电站id;电站id(p_powerstation_info表id)
   */
  psId?: string | number

  /**
   * 电站名称
   */
  psName?: string

  /**
   * 设备名称
   */
  name?: string

  /**
   * 设备类型;设备类型;0：线路；1：主变；2：SVG；3：二次设备；4：箱变；5：逆变器；6：汇流箱；7：:组件；8：建筑；9：其它
   */
  type?: string

  typeLabel?: string

  no: string // 设备编号

  /**
   * 设备型号ID;设备型号ID(device_model表id)
   */
  modelId?: string | number

  /**
   * 设备型号名称
   */
  modelName?: string

  /**
   * 型号厂家
   */
  factor?: string

  /**
   * 出厂编号
   */
  productNo?: string

  /**
   * 安装位置
   */
  installPos?: string

  /**
   * 安装日期
   */
  installDate?: string

  /**
   * 生产日期
   */
  productDate?: string

  /**
   * 投运日期
   */
  runDate?: string

  /**
   * 运行状态;运行状态;0：在运；1：停运 2：检修 3：报废
   */
  runState?: string

  runStateLabel?: string
  /**
   * 停运日期
   */
  stopDate?: string

  /**
   * 额定容量/数量
   */
  ratedCapacity?: number

  /**
   * 额定容量/数量 单位
   */
  ratedCapacityUnit?: string

  /**
   * 二维码
   */
  rqcode?: string

  /**
   * 管理归属
   */
  manageAttribution?: string

  /**
   * 供应商
   */
  supplier?: string

  /**
   * 采购日期
   */
  buyDate?: string

  /**
   * 使用年限
   */
  usefulLife?: number

  /**
   * 质保开始日期
   */
  warrantyStartDate?: string

  /**
   * 质保结束日期
   */
  warrantyEndDate?: string

  /**
   * 中修周期
   */
  mediumRepairCycle?: string

  /**
   * 大修周期
   */
  majorRepairCycle?: string

  /**
   * 排序号
   */
  sortNo?: number

  /**
   * 备注
   */
  remark?: string

  componentList?: DeviceComponentVO[]

  modelParameterList?: DeviceModelParameter[]

  /**
   * 附件列表
   */
  ossIdList: string[]
}

export interface DeviceInfoQuery extends PageQuery {
  /**
   * 电站id;电站id(p_powerstation_info表id)
   */
  psId?: string | number

  /**
   * 设备名称
   */
  name?: string

  /**
   * 设备类型;设备类型;0：线路；1：主变；2：SVG；3：二次设备；4：箱变；5：逆变器；6：汇流箱；7：:组件；8：建筑；9：其它
   */
  type?: string

  /**
   * 运行状态;运行状态;0：在运；1：停运 2：检修 3：报废
   */
  runState?: string

  // 关键字
  keyword?: string

  params?: Record<string, any>
}

/**
 * DeviceModelParameter，设备型号参数对象 p_device_model_parameter
 */
export interface DeviceModelParameter {
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
   * 设备型号参数ID;设备型号参数表
   */
  id?: number
  /**
   * 设备型号ID;设备型号ID(device_model表id)
   */
  modelId?: number
  /**
   * 名称
   */
  name?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 排序
   */
  sortNo?: number
  /**
   * 租户编号
   */
  tenantId?: string
  /**
   * 计量单位
   */
  unit?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 值
   */
  value?: string
  [property: string]: any
}
