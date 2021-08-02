import logger from '@/utils/logger'
import { Model } from 'mongoose'

export interface ModelError {
  [k:string]: {
    reason: {
      message: string
    }
  }
}
/**
 * 插入唯一的数据
 * @param id 筛选条件
 * @param data 插入数据
 * @param model 要被插入数据的model
 * @returns 插入成功返回`true`插入失败返回`false`
 */
export async function addOnlyOneDocument<D>(id:Object, data: D, model: Model<any>):Promise<[ModelError, boolean]> {
  const find = await model.find(id).exec()
  if(find.length > 0) {
    return [{foo: {reason:{message: '已有记录'}}}, false]
  }else {
    try {
      await model.create(data)
    }catch(err) {
      logger('db', 'error', err.errors)
      return [err.errors, false]
    }
    return [null, true]
  }
}


/**
 * 获取第一个错误消息
 * @returns 错误消息
 */
export function getOneErrorMessage(errors: Object): string {
  return errors[Object.keys(errors)[0]].reason.message
}
