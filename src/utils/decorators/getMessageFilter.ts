import logger from "../logger"
import { MessageData, ReceiveMessage, MessageType, CommonMessage } from "@/types/receiveMessage"
import { GetMsg } from "../ws/getMessage"

/**
 * 包装try catch的装饰器
 */
export default function <M>() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function(...args: any[]) {
      // 调用的时候保存action长度
      const actionLength = this.actionList.length
      this.actionList.push({
        methodName: 'filterByMessageChainType',
        params: args,
        method: () => {
          let message:M = undefined
          if(actionLength > 0) {
            if(this.filteredMsg) {
              message = {...this.filteredMsg}
            }
          }else {
            message = {...this.msg}
          }
          if(message) {
            originalMethod.apply(this, [...args, message])
          }
        }
      })
      return this
    }
  }
}
