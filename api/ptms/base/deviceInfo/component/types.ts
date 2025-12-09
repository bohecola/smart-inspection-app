export interface DeviceComponentVO {
  /**
   * 设备部件
   */
  id: string | number

  /**
   * 设备台账ID
   */
  devId: string | number

  /**
   * 类别
   */
  type: string

  /**
   * 部件/参数名称
   */
  name: string

  /**
   * 部件型号/参数值
   */
  value: string

  /**
   * 厂家名称
   */
  factor: string

  /**
   * 数量
   */
  count: string | number

  /**
   * 计量单位
   */
  unit: string

  /**
   * 备注
   */
  remark: string
}

export interface DeviceComponentoForm extends BaseEntity {
  /**
   * 设备部件
   */
  id?: string | number

  /**
   * 设备台账ID
   */
  devId?: string | number

  /**
   * 类别
   */
  type?: string

  /**
   * 部件/参数名称
   */
  name?: string

  /**
   * 部件型号/参数值
   */
  value?: string

  /**
   * 厂家名称
   */
  factor?: string

  /**
   * 数量
   */
  count?: string | number

  /**
   * 计量单位
   */
  unit?: string

  /**
   * 备注
   */
  remark?: string
}
