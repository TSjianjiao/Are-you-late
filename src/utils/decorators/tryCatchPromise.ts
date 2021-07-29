import TransactionResponse from "@/types/error"
import logger from "../logger"

/**
 * 包装try catch的装饰器
 * @param errorMessage 错误消息
 */
export default function (errorMessage?: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function(...args: any[]) {
      try {
        await originalMethod.call(this, ...args)
        return {
          success: true
        }
      }catch(err) {
        logger('db', 'error', err)
        return {
          message: err.message || errorMessage
        }
      }
    }
  }
}
