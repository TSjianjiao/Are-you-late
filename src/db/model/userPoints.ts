
import dayjs from 'dayjs';
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose';


export interface UserPoints {
  /** 用户qq */
  qq: number
  /** 总获得分数 (只加不减)*/
  totalPoints: number
  /** 剩余分数 (加减操作使用次)*/
  remainPoints: number
}

const UserPointSchema = new Schema<UserPoints>({
  qq: {
    type: Schema.Types.Number,
    required: true
  },
  totalPoints: {
    type: Schema.Types.Number,
    require: true,
    validate: {
      validator: function(v:number) {
        if(v < 0) {
          throw new Error('不能再减少')
        }
        if(!Number.isInteger(v)) {
          throw new Error('只能为整数')
        }
        return true
      },
    },
  },
  remainPoints: {
    type: Schema.Types.Number,
    require: true,
    validate: {
      validator: function(v:number) {
        if(v < 0) {
          throw new Error('不能再减少')
        }
        if(!Number.isInteger(v)) {
          throw new Error('只能为整数')
        }
        return true
      },
    },
  }
})

// 防止重复定义模型
export default (models && models.UserPoints) || model<UserPoints>('UserPoints', UserPointSchema)
