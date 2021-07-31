
import WebSocket from 'ws'
import SystemConfig from '@/config/system.config'
import logger from '@/utils/logger'
import { MessageData, ReceiveMessage, SessionMsg } from '@/types/receiveMessage'
import { CodeEnum } from '@/types/code'
import { getSession } from '../session'
interface Context {
	/** websocket的消息 */
	message: ReceiveMessage<MessageData<any>> 
	/** 发送者qq */
	targetQQ: string
	[key:string]: any
}
interface EventFlow {
	[key: string]: (context: Context) => any
}
export const EventFlow:EventFlow = {}

// class FlowClass {
// 	public context:{[key:string]: any} = {}
// }

// export const Flow = new FlowClass()
// Flow.context.a = 1

const ws = new WebSocket(`${SystemConfig.wsPath}/all?verifyKey=${SystemConfig.verifyKey}&qq=${SystemConfig.bot_qq}`)

ws.on('open', function open() {
  console.log('websocket连接成功！')
  logger('ws', 'info', '连接成功！')
})
ws.on('error', (err) => {
  console.log('websocket错误')
  logger('error', 'error', err)
})
ws.on('close', (code: number, message: string) => {
  console.log('websocket关闭')
  logger('ws', 'info', `连接关闭！code: ${code}，message: ${message}`)
})


ws.addEventListener('message', async ({data}) => {

  ////////////////////// 检查session 必须第一步 //////////////////////////
  const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(data)
  if(jsonMsg.data.code === CodeEnum.success) {
    getSession(jsonMsg)
    return
  }
  ////////////////////////////////////////////////////////////////////////
  // 上下文对象
  const context:Context = {
    message: jsonMsg as any,
    targetQQ: (jsonMsg as any).data.sender.id,
    text: (jsonMsg as any).data.messageChain?.find(i => i.type === 'Plain')?.text
  }
  // 顺序执行流程
  for(let flow of Object.keys(EventFlow)) {
    const fnReturn = EventFlow[flow](context)
    if(fnReturn instanceof Promise) {
      await fnReturn
    }
  }
})

export default ws
