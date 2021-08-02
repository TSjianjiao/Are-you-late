const runOnPro = process.env.NODE_ENV === 'production'
export interface SystemConfigInterface {
  wsPath: string
  httpPath: string
  verifyKey:  number
  bot_qq: string
  group_qq: string
  admin_qq: string
}

const SystemConfig:SystemConfigInterface  = {
  /** 服务器地址 */
  wsPath: runOnPro ?  'ws://172.17.82.247:3002' : 'ws://ws.dangdangdang.top',
  /** http地址 */
  httpPath: runOnPro ? 'http://172.17.82.247:3001' : 'http://api.dangdangdang.top',
  /** 鉴权key */
  verifyKey:  1234567890,
  /** bot的qq号 */
  bot_qq: '1092946821',
  /** qq群号 */
  group_qq: '599869861',
  /** 管理员qq */
  admin_qq: '929175050'
}

export default SystemConfig
