
import WebSocket from 'ws'
import SystemConfig from '@/config/system.config'
import logger from "@/utils/logger"


const ws = new WebSocket(`${SystemConfig.wsPath}/all?verifyKey=${SystemConfig.verifyKey}&qq=${SystemConfig.bot_qq}`)

ws.on('open', function open() {
  console.log('websocket连接成功！')
  logger('ws', 'info', '连接成功！')
})
ws.on('error', (err) => {
  console.log('websocket错误')
  logger('ws', 'error', err)
})
ws.on('close', (code: number, message: string) => {
  console.log('websocket关闭')
  logger('ws', 'info', `连接关闭！code: ${code}，message: ${message}`)
})

export default ws
