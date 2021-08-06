import { thorwCustomError } from '@/utils/error'
import dayjs from 'dayjs'
import { Model, Schema, model } from 'mongoose'

export interface FlashImage {
  /** 用户qq */
  qq: string
  /** 闪照图片地址 */
  url: string
  createTime?: Date
}
interface DocMethod {

}
interface StaticMethod {
}

type IBetModel = Model<FlashImage, {}, DocMethod> & StaticMethod


const FlashImageSchema = new Schema<FlashImage>({
  qq: {
    type: Schema.Types.String,
    required: true
  },
  url: {
    type: Schema.Types.String,
    require: true,
  },
  createTime: {
    type: Schema.Types.String,
    require: false,
    default: () => dayjs().toDate()
  }
})
class LoadClass {

}

FlashImageSchema.loadClass(LoadClass)

const FlashImageModel = model<FlashImage, IBetModel>('FlashImage', FlashImageSchema)
export default FlashImageModel
