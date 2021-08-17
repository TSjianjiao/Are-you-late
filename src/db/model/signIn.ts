
import TransactionResponse from '@/types/error'
import tryCatchPromise from '@/utils/decorators/tryCatchPromise'
import { thorwCustomError } from '@/utils/error'
import dayjs from 'dayjs'
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose'

export interface SignIn {
  /** 用户qq */
  qq: string
  /** 押注分数 默认今天*/
  signInTime?: Date
  /** 签到获得积分 */
  point: number
}
interface DocMethod {

}
interface StaticMethod {
  signIn(qq: string, point: number): Promise<TransactionResponse>
}
type ISignInModel = Model<SignIn, {}, DocMethod> & StaticMethod

const SignInSchema = new Schema<SignIn, ISignInModel>({
  qq: {
    type: Schema.Types.String,
    required: true
  },
  signInTime: {
    type: Schema.Types.Date,
    require: false,
    default: () => dayjs().toDate()
  },
  point: {
    type: Schema.Types.Number,
    require: true,
  }
})

class LoadClass {
  @tryCatchPromise()
  static async signIn(this: SignIn & Model<SignIn>, qq: string, point: number) {
    const find = await this.findOne({
      qq,
      signInTime: {
        $gt: dayjs().startOf('date').toDate()
      },
    }).exec()
    if(!find) {
      await this.create({
        qq,
        point: point ?? 0
      })
    }else {
      thorwCustomError('今天已签到')
    }
  }
}
SignInSchema.loadClass(LoadClass)
// 创建表 实例化Schema
const SignInModel = model<SignIn, ISignInModel>('SignIn', SignInSchema)

export default SignInModel
