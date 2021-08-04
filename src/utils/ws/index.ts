
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

  /** 指令消息链 */
  commandMessage?: ReceiveMessage<MessageData<any>>
   /** 指令 */
  commandText?: string
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
class WS {
  private static WSInstance: WebSocket
  private static reconnection: boolean
  private static reConnectCount: number = 0

  public static getWS() {
    if(WS.WSInstance) {
      return WS.WSInstance
    }else {
      return WS.createWS()
    }
  }

  private static createWS() {
    const ws = new WebSocket(`${SystemConfig.wsPath}/all?verifyKey=${SystemConfig.verifyKey}&qq=${SystemConfig.bot_qq}`)
    ws.on('open', function open() {
      console.log('websocket连接成功！')
      logger('ws', 'info', '连接成功！')
    })
    ws.on('error', (err) => {
      console.log('websocket错误')
      logger('error', 'error', err)
      this.reconnect()
    })
    ws.on('close', (code: number, message: string) => {
      console.log('websocket关闭')
      logger('ws', 'info', `连接关闭！code: ${code}，message: ${message}`)
      this.reconnect()
    })
    ws.onmessage = async ({data}) => {

      ////////////////////// 检查session 必须第一步 //////////////////////////
      const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(data.toString())
      if(jsonMsg.data.code === CodeEnum.success) {
        getSession(jsonMsg)
        return
      }
      ////////////////////////////////////////////////////////////////////////
      // 上下文对象
      const context:Context = {
        message: jsonMsg as any,
        targetQQ: (jsonMsg as any)?.data?.sender?.id,
        text: (jsonMsg as any)?.data?.messageChain?.find(i => i.type === 'Plain')?.text
      }
      // 顺序执行流程
      for(let flow of Object.keys(EventFlow)) {
        const fnReturn = EventFlow[flow](context)
        if(fnReturn instanceof Promise) {
          await fnReturn
        }
      }
    }
    WS.WSInstance = ws
    return ws
  }

  private static reconnect() {
    if(WS.reconnection) return
    logger('ws', 'info', `正在重连${++WS.reConnectCount}次`)
    if(WS.reConnectCount >= 10) {
      logger('ws', 'error', '重连超时')
      return
    }
    WS.reconnection = true
    setTimeout(() => {
      WS.createWS()
      WS.reconnection = false
    }, 2000)
  }
}

export default WS.getWS()
