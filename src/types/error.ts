/**
 * 数据库封装函数返回
 */
export default interface TransactionResponse {
  /** 是否成功 */
  success?: boolean
  /** 错误信息 */
  message?: string
}
