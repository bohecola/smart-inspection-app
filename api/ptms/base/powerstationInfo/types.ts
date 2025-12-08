export interface PowerstationInfoVO {
  /**
   * 地区
   */
  area?: string
  /**
   * 天气城市代码
   */
  cityCode?: string
  /**
   * 项目公司名称(工商)
   */
  companyName?: string
  /**
   * 所属国家
   */
  country?: string
  /**
   * 所属组织机构id
   */
  deptId?: number
  deptName?: string
  /**
   * 分布式按月填报（日报） 是 Y 否 N
   */
  distributionMonthReport?: string
  /**
   * 能源类型;能源类型;0:光伏发电 1:风力发电 9:其他
   */
  energyType?: string
  /**
   * 能源类型值
   */
  energyTypeLabel?: string
  /**
   * 主键
   */
  id?: string
  /**
   * 附件列表
   */
  ossIdList?: number[]
  /**
   * 业主简称
   */
  ownerName?: string
  /**
   * 业主简称值
   */
  ownerNameLabel?: string
  /**
   * 调度名称
   */
  pdname?: string
  /**
   * 省份
   */
  province?: string
  /**
   * 电站地址
   */
  psaddr?: string
  /**
   * 核定容量(MW)
   */
  pscapacity?: number
  /**
   * 采集编号
   */
  pscode?: number
  /**
   * 电站简介
   */
  psdesc?: string
  /**
   * 电站纬度
   */
  pslatitude?: number
  /**
   * 电站经度
   */
  pslongitude?: number
  /**
   * 电站名称
   */
  psname?: string
  /**
   * 值班电话
   */
  psphone?: string
  /**
   * 实际容量(MW)
   */
  psrealcapacity?: number
  /**
   * 电站状态;电站状态;0:服务中 1:服务终止
   */
  psstate?: string
  /**
   * 电站状态值
   */
  psstateLabel?: string
  /**
   * 电站类型;电站类型;0:户用光伏 1:分布式光伏 2:地面光伏 3:山地光伏 4:水面光伏 5:陆上风电 6:海上风电 7:分散式风电 99:其他
   */
  pstype?: string
  /**
   * 电站类型值
   */
  pstypeLabel?: string
  /**
   * 并网日期
   */
  runDate?: Date
  /**
   * 服务方式;服务方式;0:现场运维 1:平台托管
   */
  seviceType?: string
  /**
   * 服务方式值
   */
  seviceTypeLabel?: string
  /**
   * 设计电站综合效率(%)
   */
  stationpr?: number
  /**
   * 电压等级
   */
  voltageLevel?: number
}
