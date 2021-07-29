
import TransactionResponse from '@/types/error';
import logger from '@/utils/logger';
import dayjs from 'dayjs';
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose';
import tryCatchPromise from '@/utils/decorators/tryCatchPromise';
export interface UserPoints {
  /** 用户qq */
  qq: string
  /** 总获得分数 (只加不减)*/
  totalPoints: number
  /** 剩余分数 (加减操作使用次)*/
  remainPoints: number
}
// 定义model实例也就是document方法
interface DocMethod {
  /**
   * 加分
   * */
  addPoint(points:number): Promise<TransactionResponse>
  /**
   * 减分
   * */
  subPoint(points:number): Promise<TransactionResponse>
}
// 定义model静态方法
interface StaticMethod {
  /**
   * 根据qq查询document
   * */
 findByQQ(qq: string): Promise<UserPoints & Document<any, any, UserPoints> & DocMethod>
}
type IUserPointsModel = Model<UserPoints, {}, DocMethod> & StaticMethod

// 创建结构
const UserPointSchema = new Schema<UserPoints, IUserPointsModel>({
  qq: {
    type: Schema.Types.String,
    required: true
  },
  totalPoints: {
    type: Schema.Types.Number,
    require: false,
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
    default: () => 0
  },
  remainPoints: {
    type: Schema.Types.Number,
    require: false,
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
      default: () => 0
  }
})

// 添加方法
class LoadClass {
  @tryCatchPromise('添加积分失败！')
  async addPoint(this: Document<UserPoints> & UserPoints, points:number) {
    this.updateOne({
      $inc: {
        totalPoints: points,
        remainPoints: points,
      }
    }).exec()
  }
  @tryCatchPromise('减少积分失败！')
  async subPoint(this: this & UserPoints & Model<UserPoints>, points:number) {
    const remainPoints = this.remainPoints - points
    await this.updateOne({
      remainPoints: remainPoints < 0 ? 0: remainPoints
    }).exec()
  }

  static async findByQQ(this: UserPoints & Model<UserPoints>, qq: string) {
    const find = await this.findOne({qq}).exec()
    if(find) {
      return find
    }else {
      return await this.create({
        qq
      })
    }
  }

}
UserPointSchema.loadClass(LoadClass)

// 创建表 实例化Schema
const UserPointsModel = model<UserPoints, IUserPointsModel>('UserPoints', UserPointSchema)

// 防止重复定义模型
// export default (models && models.UserPoints) || model<UserPoints>('UserPoints', UserPointSchema)
export default UserPointsModel
