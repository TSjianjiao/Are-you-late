
import TransactionResponse from '@/types/error'
import tryCatchPromise from '@/utils/decorators/tryCatchPromise'
import { thorwCustomError } from '@/utils/error'
import dayjs from 'dayjs'
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose'
import UserPointsModel from './userPoints'

export enum betType {
  迟到,
  不迟到
}
export const betTypeText = {
  [betType.迟到]: '迟到',
  [betType.不迟到]: '不迟到',
}

export interface Bet {
  /** 用户qq */
  qq: string
  /** 押注分数 */
  betPoint?: number
  /** 下注时间 默认今天 */
  betTime?: Date
  /** 押注方向 */
  betType?: betType
}

interface DocMethod {

}
interface StaticMethod {
  /**
   * 根据qq查询document
   * */
 findByQQ(qq: string): Promise<Bet & Document<any, any, Bet> & DocMethod>

  /**
   * 下注
   *  */
  bet(betType:betType, qq:string, point: number): Promise<TransactionResponse>
}
type IBetModel = Model<Bet, {}, DocMethod> & StaticMethod


const BetSchema = new Schema<Bet>({
  qq: {
    type: Schema.Types.String,
    required: true
  },
  betPoint: {
    type: Schema.Types.Number,
    require: false,
    validate: {
      validator: function(v) {
        if(v < 0) {
          thorwCustomError('只能投注正数')
        }
        if(!Number.isInteger(v)) {
          thorwCustomError('只能投注整数')
        }
        return true
      },
    },
    default: () => 0
  },
  betTime: {
    type: Schema.Types.Date,
    require: false,
    default: () => dayjs().toDate()
  },
  betType: {
    type: Schema.Types.Number,
    require: false,
    default: () => betType.迟到
  }
})

class LoadClass {
  @tryCatchPromise()
  static async bet(this: Bet & Model<Bet> & StaticMethod, betType:betType, qq:string, point:number) {
    const betRecord = await this.findByQQ(qq)
    const userPoint = await UserPointsModel.findByQQ(qq)
    if( betRecord.betType !== betType) {
      thorwCustomError(`你已投注摆子哥 ${betTypeText[betType]}!`)
    }
    if(userPoint.remainPoints >= point) {
      await this.findOneAndUpdate({
        qq,
        betTime: {
          $gt: dayjs().startOf('date').valueOf()
        }
      }, {
        $inc: {
          betPoint: point
        }
      }).exec()
    }else {
      thorwCustomError('你没有足够的积分！穷逼!')
    }
  }


  static async findByQQ(this: Bet & Model<Bet>, qq: string) {
    const find = await this.findOne({qq}).exec()
    if(find) {
      return find
    }else {
      await this.create({
        qq
      })
    }
  }
}

BetSchema.loadClass(LoadClass)

// 创建表 实例化Schema
const BetModel = model<Bet, IBetModel>('Bet', BetSchema)
export default BetModel
