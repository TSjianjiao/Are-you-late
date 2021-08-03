import SystemConfig from './config/system.config'

import ToolKit from '@/utils/ws/toolkits'
import { isBetCommand, isQueryBet, isQueryPoints, isSignInCommand } from '@/utils/botCommand'

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
  const lateRegexp = /迟到/gi
  const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到/gi
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
        .face(undefined, '请/gun')
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
  const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).filterBySender(SystemConfig.admin_qq).exec()
  if(isQueryBet(filterMsg?.data?.messageChain?.find(i => i.type === 'Plain')?.text)) {
    type Res  = [{
      late: [{
        betPoints: number
      }],
      notLate: [{
        betPoints: number
      }]
    }]
    const res: Res = await BetModel.aggregate([
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
                betPoints: { $sum: '$betPoint' }
              }
            },
            {
              $project: {
                _id: 0,
                betPoints: 1
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
                betPoints: { $sum: '$betPoint' }
              }
            },
            {
              $project: {
                _id: 0,
                betPoints: 1
              }
            }
          ]
        }
      }
    ]).exec()
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain(`\n今日投注结果：\n迟到：${res[0].late[0]?.betPoints ?? 0}\n不迟到：${res[0].notLate[0]?.betPoints ?? 0}`)
      .exec()
  }
}
