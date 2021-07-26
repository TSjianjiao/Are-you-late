
import WebSocket from 'ws'
import SystemConfig from '@/config/system.config'
import logger from "@/utils/logger"
import { CodeEnum } from "@/types/code"
import { SessionMsg, GroupMessage, ReceiveMessage } from "@/types/receiveMessage"
import { getSession } from "@/utils/session"

// const ws = new WebSocket(`${SystemConfig.wsPath}/all?verifyKey=${SystemConfig.verifyKey}&qq=${SystemConfig.bot_qq}`)

// ws.on('open', function open() {
//   console.log('websocket连接成功！')
//   logger('ws', 'info', '连接成功！')
// })
// ws.on('error', (err) => {
//   console.log('websocket错误')
//   logger('ws', 'error', err)
// })
// ws.on('close', (code: number, message: string) => {
//   console.log('websocket关闭')
//   logger('ws', 'info', `连接关闭！code: ${code}，message: ${message}`)
// })

// ws.on('message', async (message: string) => {
//   const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(message)

//   if(jsonMsg.data.code === CodeEnum.success) {
//     getSession(jsonMsg)
//   }


// })

export interface WSToolKit {
  sendMessageList: any[],
  send: (id?:number) => this
  at: (id?: number) => this
  exec: () => void
}
const WSToolKit:WSToolKit = {
  sendMessageList: [],
  send(id) {
    this.sendMessageList.push(id)
    return this
  },
  at(id) {
    return this
  },
  exec() {
    this.sendMessageList = []
  },
}

export default WSToolKit
