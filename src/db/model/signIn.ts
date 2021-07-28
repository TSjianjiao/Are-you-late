
import dayjs from 'dayjs';
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose';

export interface SignIn {
  /** 用户qq */
  qq: number
  /** 押注分数 默认今天*/
  signInTime?: Date
}

const SignInSchema = new Schema<SignIn>({
  qq: {
    type: Schema.Types.Number,
    required: true
  },
  signInTime: {
    type: Schema.Types.Date,
    require: false,
    default: () => dayjs().toDate()
  }
})

// 防止重复定义模型
export default (models && models.SignIn) || model<SignIn>('SignIn', SignInSchema)
