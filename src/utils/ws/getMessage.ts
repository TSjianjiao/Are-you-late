import { MessageData, ReceiveMessage, MessageType, CommonMessage } from "@/types/receiveMessage"
import { messageType } from '@/types/sendMessage'
import SystemConfig from '@/config/system.config'
import filter from '@/utils/decorators/getMessageFilter'
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
   * @param type 消息链类型
   * @param message （不要传递值）返回的是上一步
   */
  @filter<MessageType>()
  filterByMessageChainType(type: keyof typeof MessageType, message?: MessageType)  {
    if(message.data.type === type) {
      this.filteredMsg = message
    }else {
      this.filteredMsg = undefined
    }


    return this
  }

  /**
   * 消息类型筛选
   */
  @filter<MessageType>()
  filterByMessageType(type: keyof typeof messageType, actionLength?: number) {
    let message: MessageType
    if(actionLength > 0) {
      if(this.filteredMsg) {
        message = {...this.filteredMsg}
      }
    }else {
      message = {...this.msg}
    }
    if(message) {
      if(message.data.messageChain) {
        if(message.data.messageChain.some(i => i.type === type)) {
          this.filteredMsg = message
        }else {
          this.filteredMsg = undefined
        }
      }else {
        this.filteredMsg = undefined
      }
    }
    return this
  }

  /**
   * 消息发送者qq号筛选
   */
  filterBySender(qq: number) {

    const actionLength = this.actionList.length

    this.actionList.push({
      methodName: 'filterBySender',
      params: [qq],
      method: () => {
        let message: MessageType
        if(actionLength > 0) {
          if(this.filteredMsg) {
            message = {...this.filteredMsg}
          }
        }else {
          message = {...this.msg}
        }
        if(message) {
          if(message.data.sender.id === qq) {
            this.filteredMsg = message
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
    const actionLength = this.actionList.length

    this.actionList.push({
      methodName: 'filterBySender',
      params: [qq],
      method: () => {
        let message: MessageType
        if(actionLength > 0) {
          if(this.filteredMsg) {
            message = {...this.filteredMsg}
          }
        }else {
          message = {...this.msg}
        }

        if(message) {
          if(message.data.messageChain) {
            if(message.data.messageChain.some(i => i.target === qq)) {
              this.filteredMsg = message
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
    const actionLength = this.actionList.length

    this.actionList.push({
      methodName: 'filterByPlainText',
      params: [filterFn],
      method: () => {
        let message: MessageType
        if(actionLength > 0) {
          if(this.filteredMsg) {
            message = {...this.filteredMsg}
          }
        }else {
          message = {...this.msg}
        }
        if(message) {
          if(message.data.messageChain) {
            const find = message.data.messageChain.find(i => i.type === 'Plain' && filterFn(i.text))
            if(find) {
              this.filteredMsg = message
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
