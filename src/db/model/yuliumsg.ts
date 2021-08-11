
import TransactionResponse from '@/types/error'
import tryCatchPromise from '@/utils/decorators/tryCatchPromise'
import { thorwCustomError } from '@/utils/error'
import dayjs from 'dayjs'
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose'

export interface YuliuMsg {
  // 消息
  msg: string
  // 记录时间
  saveTime?: Date
}
interface DocMethod {

}
interface StaticMethod {
  saveMsg(msg: string): Promise<TransactionResponse>
}
type IYuliuMsgModel = Model<YuliuMsg, {}, DocMethod> & StaticMethod

const YuliuMsgSchema = new Schema<YuliuMsg, IYuliuMsgModel>({
  msg: {
    type: Schema.Types.String,
    required: true
  },
  saveTime: {
    type: Schema.Types.Date,
    require: false,
    default: () => dayjs().toDate()
  }
})

class LoadClass {
  @tryCatchPromise()
  static async saveMsg(this: YuliuMsg & Model<YuliuMsg>, msg: string) {
    await this.create({
      msg
    })
  }
}
YuliuMsgSchema.loadClass(LoadClass)
// 创建表 实例化Schema
const YuliuMsgModel = model<YuliuMsg, IYuliuMsgModel>('YuliuMsg', YuliuMsgSchema)

export default YuliuMsgModel
