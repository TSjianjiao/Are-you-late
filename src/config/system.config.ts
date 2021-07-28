
export interface SystemConfigInterface {
  wsPath: string
  verifyKey:  number
  bot_qq: number
  group_qq: number
}

const SystemConfig:SystemConfigInterface  = {
  /** 服务器地址 */
  wsPath: 'ws://ws.dangdangdang.top',
  /** 鉴权key */
  verifyKey:  1234567890,
  /** bot的qq号 */
  bot_qq: 1092946821,
  /** qq群号 */
  group_qq: 599869861,
}

export default SystemConfig
