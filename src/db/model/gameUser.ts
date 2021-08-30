
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose'
export interface GameUser {
  qq: string;
  memberName: string;
  specialTitle: string;
}
const GameUserSchema = new Schema<GameUser>({
  qq: {
    type: Schema.Types.String,
    required: true
  },
  memberName: {
    type: Schema.Types.String,
    require: true
  },
  specialTitle: {
    type: Schema.Types.String,
    require: true
  },
  // memberName: { type: Schema.Types.String, default: () => 0, min: 0},
  // specialTitle: { type: Schema.Types.Number, default: () => Math.random(), select: false}
})

// 防止重复定义模型
export default (models && models.GameUser) || model<GameUser>('GameUser', GameUserSchema)
