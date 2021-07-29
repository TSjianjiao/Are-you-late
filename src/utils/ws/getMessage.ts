import { MessageData, ReceiveMessage, MessageType, CommonMessage } from "@/types/receiveMessage"
import { messageType } from '@/types/sendMessage'
import SystemConfig from '@/config/system.config'
interface ActionListItem {
  methodName: string,
  params: any[],
  method: () => void
}
export interface GetMsg {
  syncId: number,
  data: {
    type: keyof typeof MessageType,
    sender?: any,
    messageChain?: any[]
  },
}

export default class GetMessage<MessageType extends GetMsg> {
  private actionList: ActionListItem[] = []
  private filteredMsg:MessageType

  constructor(private msg: MessageType) {}

  /**
   * 根据消息链类型筛选
   */
   filterByMessageChainType(type: keyof typeof MessageType) {
    this.actionList.push({
      methodName: 'filterByMessageChainType',
      params: [type],
      method: () => {
        if(this.msg) {
          if(this.msg.data.type === type) {
            this.filteredMsg = this.msg
          }else {
            this.filteredMsg = undefined
          }
        }
      }
    })
    return this
  }

  /**
   * 消息类型筛选
   */
   filterByMessageType(type: keyof typeof messageType) {
    this.actionList.push({
      methodName: 'filterByMessageType',
      params: [type],
      method: () => {
        if(this.msg) {
          if(this.msg.data.messageChain) {
            if(this.msg.data.messageChain.some(i => i.type === type)) {
              this.filteredMsg = this.msg
            }else {
              this.filteredMsg = undefined
            }
          }else {
            this.filteredMsg = undefined
          }
        }
      }
    })
    return this
  }

  /**
   * 消息发送者qq号筛选
   */
  filterBySender(qq: number) {
    this.actionList.push({
      methodName: 'filterBySender',
      params: [qq],
      method: () => {
        if(this.msg) {
          if(this.msg.data.sender.id === qq) {
            this.filteredMsg = this.msg
          }else {
            this.filteredMsg = undefined
          }
        }
      }
    })
    return this
  }

  /**
   * 消息接收者qq号筛选
   * @param qq 默认是bot的qq
   */
  filterByTaget(qq: number = SystemConfig.bot_qq) {
    this.actionList.push({
      methodName: 'filterBySender',
      params: [qq],
      method: () => {
        if(this.msg) {
          if(this.msg.data.messageChain) {
            if(this.msg.data.messageChain.some(i => i.target === qq)) {
              this.filteredMsg = this.msg
            }else {
              this.filteredMsg = undefined
            }
          }else {
            this.filteredMsg = undefined
          }
        }
      }
    })
    return this
  }

  /**
   * 消息内容筛选
   * @param filterFn 筛选函数必须返回一个布尔值
   */
  filterByPlainText(filterFn: (text: string) => boolean) {
    this.actionList.push({
      methodName: 'filterByPlainText',
      params: [filterFn],
      method: () => {
        if(this.msg) {
          if(this.msg.data.messageChain) {
            const find = this.msg.data.messageChain.find(i => i.type === 'Plain' && filterFn(i.text))
            if(find) {
              this.filteredMsg = this.msg
            }else {
              this.filteredMsg = undefined
            }
          }
        }
      }
    })
    return this
  }



  /**
   * 执行
   * @returns 筛选后的结果
   */
  exec() {
    this.actionList.forEach(action => {
      action.method()
    })
    this.actionList = []
    return this.filteredMsg
  }

}
