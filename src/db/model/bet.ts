
import BaseConfig from '@/config/base.config'
import TransactionResponse from '@/types/error'
import tryCatchPromise from '@/utils/decorators/tryCatchPromise'
import { thorwCustomError } from '@/utils/error'
import dayjs from 'dayjs'
import { Document, Model, Query, Schema, connect, model, models } from 'mongoose'
import UserPointsModel from './userPoints'
const allInRegexp = /梭哈|allin/gi

export enum betType {
  迟到,
  不迟到,
}
export const betTypeText = {
  [betType.迟到]: '迟到',
  [betType.不迟到]: '不迟到',
}
export enum betState {
  迟到,
  不迟到,
  未结束,
}
export const betStateText = {
  [betState.迟到]: '迟到',
  [betState.不迟到]: '不迟到',
  [betState.未结束]: '未结束',
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
  /** 押注状态 是否已结算 */
  betState?: betState | betType
  /** 盈利 */
  betProfit?: number
}

interface DocMethod {

}
interface StaticMethod {
  /**
   * 根据qq查询document
   * */
 findByQQ(qq: string, otherFilter?: any): Promise<Bet & Document<any, any, Bet> & DocMethod>

  /**
   * 下注
   *  */
  bet(betType:betType, qq:string, point: number | string): Promise<TransactionResponse>
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
      validator: function (v) {
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
    require: false
  },
  betState: {
    type: Schema.Types.Number,
    require: false,
    default: () => betState.未结束
  },
  betProfit: {
    type: Schema.Types.Number,
    require: false,
    default: () => 0
  }
})

class LoadClass {
  @tryCatchPromise()
  static async bet (this: Bet & Model<Bet> & StaticMethod, betType:betType, qq:string, point:number | string) {
    let _point = 0
    if(dayjs().isAfter(BaseConfig.封盘时间())) {
      thorwCustomError(`每天 ${ BaseConfig.封盘时间().format('HH:mm:ss') } 前可投注！`)
    }

    const betRecord = await this.findByQQ(qq, {
      betTime : {
        $gt: dayjs().startOf('date').toDate(),
        $lt: BaseConfig.封盘时间().toDate()
      }
    })
    if( betRecord && betRecord?.betType !== undefined && betRecord.betType !== betType) {
      thorwCustomError(`你已认定摆子哥 ${ betTypeText[betRecord.betType] }了!改不了咯~`)
    }

    const userPoint = await UserPointsModel.findByQQ(qq)


    const parsePoint = Number(point)
    if(isNaN(parsePoint)) {
      if(allInRegexp.test((point as string))) {
        _point = userPoint.remainPoints
      }else {
        thorwCustomError('指令不正确')
      }
    }else {
      if(parsePoint <= 0 || !Number.isInteger(parsePoint)) {
        thorwCustomError('只能为正整数')
      }
      _point = parsePoint
    }


    if(_point === 0) {
      thorwCustomError('你没有足够的积分！')
    }

    if(userPoint.remainPoints >= _point) {
      await betRecord.updateOne({
        $inc: {
          betPoint: _point
        },
        betTime: dayjs().toDate(),
        betType: betType
      }).exec()

      await userPoint.updateOne({
        $inc: {
          remainPoints: -_point
        }
      }).exec()
    }else {
      thorwCustomError('你没有足够的积分！穷逼!')
    }
  }


  static async findByQQ (this: Bet & Model<Bet>, qq: string, otherFilter?: any) {
    const find = await this.findOne({qq, ...otherFilter}).exec()
    if(find) {
      return find
    }else {
      return await this.create({
        qq,
        betState: betState.未结束
      })
    }
  }
}

BetSchema.loadClass(LoadClass)

// 创建表 实例化Schema
const BetModel = model<Bet, IBetModel>('Bet', BetSchema)
export default BetModel
