import { MessageData, ReceiveMessage, MessageType, CommonMessage } from '@/types/receiveMessage'
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
   * @param message （不要传递值）返回的是上一步过滤的消息
   */
  @filter()
  filterByMessageChainType(type: keyof typeof MessageType, message?: MessageType)  {
  	if(message) {
  		if(message.data.type === type) {
  			this.filteredMsg = message
  		}else {
  			this.filteredMsg = undefined
  		}
  	}
  	// 必须返回 this 不然类型提示有错误
  	// 真实返回的 this 是在装饰器里面
  	return this
  }

  /**
   * 消息类型筛选
   */
  @filter()
  filterByMessageType(type: keyof typeof messageType, message?: MessageType) {
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

  /**`
   * 消息发送者qq号筛选
   */
  @filter()
  filterBySender(qq: string | string[], message?: MessageType) {
  	if(message) {
      if(Array.isArray(qq)) {
        if(qq.some(q => q === String(message?.data?.sender?.id))) {
          this.filteredMsg = message
        }else {
          this.filteredMsg = undefined
        }
      }else {
        if(String(message?.data?.sender?.id) === qq) {
          this.filteredMsg = message
        }else {
          this.filteredMsg = undefined
        }
      }
  	}
  	return this
  }

  /**
   * 消息接收者qq号筛选
   */
  @filter()
  filterByTaget(qq: string, message?: MessageType) {
    // 不能直接在参数上设置默认值 因为装饰器里面获取不到参数
    if (message) {
      if(message.data.messageChain) {
        if(message.data.messageChain.some(i => String(i.target) === qq)) {
          this.filteredMsg = message
          return
        }
      }
    }
    this.filteredMsg = undefined
  	return this
  }

  /**
   * 消息内容筛选
   * @param filterFn 筛选函数必须返回一个布尔值
   */
  @filter()
  filterByPlainText(filterFn: (text: string) => boolean, message?: MessageType) {
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
