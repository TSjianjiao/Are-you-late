

export interface SystemConfigInterface {
  wsPath: string
  httpPath: string
  verifyKey:  number
  bot_qq: number
  group_qq: number
}

const SystemConfig:SystemConfigInterface  = {
  /** 服务器地址 */
  wsPath: process.env.TS_NODE_DEV ? 'ws://ws.dangdangdang.top' : 'ws://172.17.82.247:3002',
  /** http地址 */
  httpPath: process.env.TS_NODE_DEV ? 'http://api.dangdangdang.top' : 'http://172.17.82.247:3001',
  /** 鉴权key */
  verifyKey:  1234567890,
  /** bot的qq号 */
  bot_qq: 1092946821,
  /** qq群号 */
  group_qq: 599869861,
}

export default SystemConfig
