import TransactionResponse from '@/types/error'
import { ErrorNames } from '../error'
import logger from '../logger'

/**
 * 包装try catch的装饰器
 * 没有返回数据的操作才能用tryCatchPromise
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
        if(err.name !== ErrorNames.custom) {
          logger('db', 'error', err)
        }
        return {
          message: errorMessage || err.MessageData
        }
      }
    }
  }
}
