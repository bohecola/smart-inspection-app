/**
 * BugDevCategoryVo，缺陷故障类别视图对象 pt_bug_dev_category
 */
export interface BugDevCategoryVo {
  /**
   * 设备类型
   */
  devType: string;
  /**
   * ID
   */
  id: number;
  /**
   * 类别名称
   */
  name: string;
  /**
   * 状态;（0正常 1停用）
   */
  status: string;
}

/**
 * BugDevCategoryBo，缺陷故障类别业务对象 pt_bug_dev_category
 */
export interface BugDevCategoryForm {
  /**
   * 设备类型
   */
  devType?: string;
  /**
   * ID
   */
  id?: number;
  /**
   * 类别名称
   */
  name?: string;
  /**
   * 状态;（0正常 1停用）
   */
  status?: string;

  bugDealLimit?: number;
}

export interface queryParamsForm {
  /**
   * 设备类型
   */
  devType: string;
  /**
   * ID
   */
  id?: number | string;
  /**
   * 类别名称
   */
  name?: string;
  /**
   * 当前页数
   */
  pageNum?: number;
  /**
   * 分页大小
   */
  pageSize?: number;
  /**
   * 请求参数
   */
  params?: string;
  /**
   * 状态;（0正常 1停用）
   */
  status?: string;
}
