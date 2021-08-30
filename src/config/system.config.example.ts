const runOnPro = process.env.NODE_ENV === 'production'
export interface SystemConfigInterface {
  wsPath: string
  httpPath: string
  verifyKey:  number
  bot_qq: string
  group_qq: string
  admin_qq: string
  yuliu_qq: string
}

const SystemConfig:SystemConfigInterface  = {
  /** 服务器地址 */
  wsPath: '',
  /** http地址 */
  httpPath: '',
  /** 鉴权key */
  verifyKey:  1,
  /** bot的qq号 */
  bot_qq: '',
  /** qq群号 */
  group_qq: '',
  /** 管理员qq */
  admin_qq: '',
  /** 摆子哥qq */
  yuliu_qq: ''
}

export default SystemConfig
