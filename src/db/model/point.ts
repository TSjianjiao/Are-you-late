
import dayjs from 'dayjs';
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose';

export enum betType {
  迟到,
  不迟到
}
export const betTypeText = {
  [betType.迟到]: '迟到',
  [betType.不迟到]: '不迟到',
}

export interface Point {
  /** 用户qq */
  qq: number
  /** 押注分数 */
  betPoint: number
  /** 下注时间 默认今天 */
  betTime?: Date
  /** 押注方向 */
  betType: betType
}

const PointSchema = new Schema<Point>({
  qq: {
    type: Schema.Types.Number,
    required: true
  },
  betPoint: {
    type: Schema.Types.Number,
    require: true,
    validate: {
      validator: function(v) {
        if(v < 0) {
          throw new Error('只能投注正数')
        }
        if(!Number.isInteger(v)) {
          throw new Error('只能投注整数')
        }
        return true
      },
    },
  },
  betTime: {
    type: Schema.Types.Date,
    require: false,
    default: () => dayjs().toDate()
  },
  betType: {
    type: Schema.Types.Number,
    require: true,
  }
})

// 防止重复定义模型
export default (models && models.Point) || model<Point>('Point', PointSchema)
