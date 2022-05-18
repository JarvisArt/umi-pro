export const PRO_TITLE = 'Friday Tracking Pro';

export enum ResponseCode {
  /** 数据返回成功 */
  Success = 0,
  /** 未登录或者鉴权失效 */
  NotLoggedIn = 40011,
  /** 模型分析大查询 */
  BigQuery = 40030300,
}
