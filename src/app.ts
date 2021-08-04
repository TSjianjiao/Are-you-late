import SystemConfig from './config/system.config'
import Table from 'easy-table'
import ToolKit from '@/utils/ws/toolkits'
import { commandList, getParamCommand, isBetCommand, isCommand, isQueryBet, isQueryPoints, isSignInCommand } from '@/utils/botCommand'

import GameUser from '@/db/model/gameUser'
import SignInModel from '@/db/model/signIn'
import UserPointsModel from '@/db/model/userPoints'
import bet, { betType, betTypeText, Bet} from '@/db/model/bet'

import { GroupMessage, ReceiveMessage, Plain } from '@/types/receiveMessage'
import randomPoint from './utils/randomPoint'
import { EventFlow } from './utils/ws'
import BetModel from '@/db/model/bet'
import dayjs from 'dayjs'
import BaseConfig from './config/base.config'
const lateRegexp = /迟到/gi
const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到/gi
// 添加用户
EventFlow.addUser = async (context) => {
  const { message } = context
  const {
    data: {
      sender: {
        id,
        memberName,
        specialTitle
      }
    }
  } = message
  await GameUser.findOneAndUpdate({qq: id}, {
    qq: id,
    memberName: memberName,
    specialTitle: specialTitle,
  }, {upsert: true}).exec()
}

// 筛选命令 #xxx 消息
EventFlow.filter = (context) => {
  const { message } = context
  const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(message)
    .filterByMessageChainType('GroupMessage')
    .filterByMessageType('At')
    .filterByTaget(SystemConfig.bot_qq)
    .filterByPlainText(text => {
      const t = text.trim()
      return t.includes('#')
    })
    .exec()
  // 把筛选后的消息带在上下文中
  context.commandMessage = filterMsg
  context.commandText = filterMsg?.data?.messageChain?.find(i => i.type === 'Plain')?.text ?? ''
}

// 下注
EventFlow.bet = async (context) => {
  const { message, targetQQ, commandText } = context
  const [words, value] = isBetCommand(commandText)
  if(words && value) {
    // 匹配关键词
    const type = words.search((notLateRegexp)) >= 0 ? betType.不迟到 :
      words.search((lateRegexp)) >= 0 ? betType.迟到 : undefined

    if(type === undefined) return

    // 存储下注积分
    const { success, message } = await BetModel.bet(type, targetQQ, Number(value))

    if(message) {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain('\n' + message)
        .face(undefined, '请')
        .exec()
      return
    }

    // 成功提示
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain(`\n押注${betTypeText[type]}：${value}积分`)
      .face(undefined, '吃糖')
      .exec()
  }
}

// 查询积分
EventFlow.queryPoints = async (context) => {
  const { message, targetQQ, commandText } = context
  if(isQueryPoints(commandText)) {
    const find = await UserPointsModel.findByQQ(targetQQ)
    if(find) {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(`\n当前还剩${find.remainPoints}积分\n${find.remainPoints < 10 ? '穷逼！' : find.remainPoints >1000 ? '增有钱呐' : ''}`)
        .exec()
      return
    }
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain('\n' + '没有记录，发送 #签到 试试？')
      .exec()
  }
}

// 签到
EventFlow.signIn = async (context) => {
  const { message, targetQQ, commandText } = context
  if(isSignInCommand(commandText)) {
    // 随机发积分
    const userPoint = randomPoint()
    const find = await UserPointsModel.findByQQ(targetQQ)
    const { success: SignInSuccess, message: SignInMessage }  = await SignInModel.signIn(targetQQ)
    if(SignInSuccess) {
      const  {success: addPointSuccess, message: addPointMessage} = await find.addPoint(userPoint)
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(addPointSuccess ? `\n签到成功！\n获得积分${userPoint}!` : `\n签到失败：\n${addPointMessage}`)
        .exec()
    }else {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(`\n签到失败：${SignInMessage}`)
        .exec()
    }
  }
}

// 查询投注
EventFlow.queryBet = async (context) => {
  const { message, targetQQ, commandText, commandMessage } = context
  // const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).filterBySender(SystemConfig.admin_qq).exec()
  if(isQueryBet(commandText)) {
    type Res  = [{
      late: [{
        betPoints: number
        betNum: number
        betUser: {qq: string, betPoint:number}[]
      }],
      notLate: [{
        betPoints: number
        betNum: number
        betUser: {qq: string, betPoint:number}[]
      }]
      targetUserBet: [
        {
          betPoint: number,
          betTime: Date,
          betType: betType
        }
      ]
    }]
    const res:Res = await BetModel.aggregate([
      {
        $facet: {
          late: [
            {
              $match : {
                betTime : {
                  $gt: dayjs().startOf('date').toDate(),
                  $lt: BaseConfig.封盘时间().toDate()
                },
                betType: { $eq: betType.迟到 }
              },
            },
            {
              $group: {
                _id: 'null',
                betPoints: { $sum: '$betPoint' },
                betNum: {$sum: 1},
                betUser: { $push:  { qq: '$qq', betPoint: '$betPoint' } }
              }
            },
            {
              $project: {
                _id: 0,
                betPoints: 1,
                betNum: 1,
                betUser: 1
              }
            }
          ],
          notLate: [
            {
              $match : {
                betTime : {
                  $gt: dayjs().startOf('date').toDate(),
                  $lt: BaseConfig.封盘时间().toDate()
                },
                betType: { $eq: betType.不迟到 }
              }
            },
            {
              // 根据下注类别分组
              $group: {
                _id: 'null',
                betPoints: { $sum: '$betPoint' },
                betNum: {$sum: 1},
                betUser: { $push:  { qq: '$qq', betPoint: '$betPoint' } }
              }
            },
            {
              $project: {
                _id: 0,
                betPoints: 1,
                betNum: 1,
                betUser: 1
              }
            }
          ],
          targetUserBet: [
            {
              $match : {
                betTime : {
                  $gt: dayjs().startOf('date').toDate(),
                  $lt: BaseConfig.封盘时间().toDate()
                },
                qq: { $eq: String(targetQQ) }
              }
            },
            {
              $project: {
                betPoint: 1,
                betTime: 1,
                betType: 1
              }
            }
          ]
        }
      }
    ]).exec()
    const lateTotal = res[0].late[0]?.betPoints ?? 0
    const notLateTotal = res[0].notLate[0]?.betPoints ?? 0
    const total = lateTotal + notLateTotal

    const lateNum = res[0].late[0]?.betNum ?? 0
    const notLateNum = res[0].notLate[0]?.betNum ?? 0

    let forecast
    if(res[0].targetUserBet[0]) {
      const {
        betPoint,
        betTime,
        betType: userBetType
      } = res[0].targetUserBet[0]
      if(userBetType === betType.迟到) {
        forecast = Math.floor((betPoint / lateTotal) * total)
      }else {
        forecast = Math.floor((betPoint / notLateTotal) * total)
      }
    }

    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain(`
      今日投注情况：
      迟到：${lateTotal}积分（${lateNum}人）
      不迟到：${notLateTotal}积分（${notLateNum}人）
      ${forecast ? `<${targetQQ}>已投注<${betTypeText[res[0].targetUserBet[0].betType]}>预计可获得：${forecast}积分` : ''}
      `)
      .exec()
  }
}

// 结算
EventFlow.accountBet = async (context) => {
  const { message, targetQQ, commandText, commandMessage } = context
  const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).filterBySender([SystemConfig.admin_qq, SystemConfig.yuliu_qq]).exec()
  const [word, value] = getParamCommand(filterMsg?.data?.messageChain?.find(i => i.type === 'Plain')?.text)
  //
  if(word && value) {
    if(word === '结算') {
      const type = value.search((notLateRegexp)) >= 0 ? betType.不迟到 :
        value.search((lateRegexp)) >= 0 ? betType.迟到 : undefined
      const find = await BetModel.find({
        betTime : {
          $gt: dayjs().startOf('date').toDate(),
          $lt: BaseConfig.封盘时间().toDate()
        },
      }).exec()

      let totalPoints:number = 0,
        lateTotal:number = 0,
        notLateTotal:number = 0
      find.forEach(data => {
        totalPoints += data.betPoint
        if(data.betType === betType.迟到) {
          lateTotal += data.betPoint
        }else {
          notLateTotal += data.betPoint
        }
      })

      // 计算个人获得
      const caclPoint = (betPoint: number, dataBetType: betType) => {
        if(dataBetType === betType.不迟到) {
          return type === dataBetType ? Math.floor((betPoint / notLateTotal) * totalPoints) : 0
        }else {
          return type === dataBetType ? Math.floor((betPoint / lateTotal) * totalPoints) : 0
        }
      }

      let sendStr = '\n请输入"迟到"或者"没有迟到"'
      if(type !== undefined) {
        const t = new Table
        const willUpdate:any = []
        find.forEach(function(data) {
          const point = caclPoint(data.betPoint, data.betType)
          willUpdate.push({
            qq: data.qq,
            point
          })
          t.cell('QQ号', data.qq)
          t.cell('投注类型', betTypeText[data.betType])
          t.cell('投注积分', data.betPoint)
          t.cell('预计得分', point)
          t.newRow()
        })
        willUpdate.forEach((i) => {
          UserPointsModel.updateOne({
            qq: i.qq
          }, {
            $inc: {
              remainPoints: i.point
            }
          }).exec()
        })
        sendStr = t.toString()
      }

      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain('\n' + `已结算<${betTypeText[type]}>` + '\n' + sendStr)
        .exec()
    }
  }
}

// 帮助
EventFlow.help = async (context) => {
  const { message, targetQQ, commandText, commandMessage } = context
  if(isCommand(commandText, /命令/gi)) {
    let str = ''
    for(let key in commandList) {
      str += `\n${key}：${commandList[key]}`
    }
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain(str)
      .exec()
  }
}
