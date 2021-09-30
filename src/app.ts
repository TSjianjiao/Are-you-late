// config
import SystemConfig from './config/system.config'
import BaseConfig from './config/base.config'

// util
import TextTable from '@/utils/textTable'
import ToolKit from '@/utils/ws/toolkits'
import { commandList, getParamCommand, isBetCommand, isCommand, isQueryBet, isQueryPoints, isSignInCommand } from '@/utils/botCommand'
import randomPoint from './utils/randomPoint'
import { EventFlow } from './utils/ws'


// model
import GameUser from '@/db/model/gameUser'
import SignInModel from '@/db/model/signIn'
import UserPointsModel from '@/db/model/userPoints'
import BetModel, { betType, betTypeText, Bet, betState, betStateText} from '@/db/model/bet'
import FlashImageModel from '@/db/model/flashImage'
import YuliuMsgModel from '@/db/model/yuliumsg'

// types
import { GroupMessage, ReceiveMessage, Plain } from '@/types/receiveMessage'

// module
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/zh-cn'


const lateRegexp = /迟到/gi
const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到|迟不到/gi
dayjs.extend(isBetween)

// 保存闪照
EventFlow.saveFlashImage = async (context) => {
  const { message } = context
  const find = message?.data?.messageChain?.find(mc => mc.type === 'FlashImage')
  if(find?.url) {
    const sender = message.data.sender.id
    FlashImageModel.create({
      qq: sender,
      url: find.url
    })
  }
}

// 添加用户
EventFlow.addUser = async (context) => {
  const { message } = context
  if(message?.data?.sender?.id) {
    const {
      data: {
        sender: {
          id,
          memberName,
          specialTitle
        }
      }
    } = message
    await GameUser.findOneAndUpdate({qq: message.data.sender.id}, {
      qq: message.data.sender.id,
      memberName: memberName,
      specialTitle: specialTitle,
    }, {upsert: true}).exec()
  }
}

// 记录摆子哥消息
EventFlow.saveYuLiuMessage = async (context) => {
  const { message, targetQQ, commandText, text } = context
  // 8点到封盘的消息记录
  if(dayjs().isBetween(dayjs().set('hours', 8).set('minutes', 0).set('seconds', 0), BaseConfig.封盘时间())) {
    if(targetQQ === SystemConfig.yuliu_qq) {
      YuliuMsgModel.saveMsg(text)
    }
  }
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

// 查询闪照
EventFlow.findFlashImage = async (context) => {
  const { message, targetQQ, commandText } = context
  const [word, value] = getParamCommand(commandText)
  if(word === '查询闪照') {
    try {
      const limit = 5
      if(!value) throw new Error('\n请输入正确QQ号')
      const res = await FlashImageModel.find({qq: value}).sort({createTime: 'desc'}).limit(limit).exec()
      if(res.length <= 0) throw new Error('\n没有数据')
      let msg = ''
      msg = res.reduce((pre, cur, curIndex) => {
        return pre += `\n${ dayjs(cur.createTime).format('YYYY-MM-DD') }：${ cur.url }`
      }, '')
      throw new Error(`\n<${ value }>的最近${ limit }张闪照地址：` + msg )
    }catch({message}) {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .plain(message)
        .exec()
    }
  }
}

// 下注
EventFlow.bet = async (context) => {
  const { message, targetQQ, commandText } = context
  const [words, value] = isBetCommand(commandText)
  if(words && value) {
    // 匹配关键词
    const type = words.search((notLateRegexp)) >= 0 ? betType.不迟到 :
      words.search((lateRegexp)) >= 0 ? betType.迟到 : undefined

    if(type === undefined) {
      return
    }

    // 存储下注积分
    const { success, message } = await BetModel.bet(type, targetQQ, value)

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
      .plain(`\n押注${ betTypeText[type] }：${ value }积分`)
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
        .plain(`\n当前还剩${ find.remainPoints }积分\n${ find.remainPoints < 10 ? '穷逼！' : find.remainPoints >1000 ? '增有钱呐' : '' }`)
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
    const { success: SignInSuccess, message: SignInMessage }  = await SignInModel.signIn(targetQQ, userPoint)
    if(SignInSuccess) {
      const  {success: addPointSuccess, message: addPointMessage} = await find.addPoint(userPoint)
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(addPointSuccess ? `\n签到成功！\n获得积分${ userPoint }!\n${ userPoint <= 5 ? 'maybe!' : '' }` : `\n签到失败：\n${ addPointMessage }`)
        .exec()
    }else {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(`\n签到失败：${ SignInMessage }`)
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
      迟到：${ lateTotal }积分（${ lateNum }人）
      不迟到：${ notLateTotal }积分（${ notLateNum }人）
      ${ forecast ? `<${ targetQQ }>已投注<${ betTypeText[res[0].targetUserBet[0].betType] }>预计可获得：${ forecast }积分` : '' }
      `)
      .exec()
  }
}

// 结算
EventFlow.accountBet = async (context) => {
  const { message, targetQQ, commandMessage } = context
  // const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).filterBySender([SystemConfig.admin_qq, SystemConfig.yuliu_qq]).exec()
  const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).exec()
  const [word, value] = getParamCommand(filterMsg?.data?.messageChain?.find(i => i.type === 'Plain')?.text ?? '')
  if(word === '结算') {

    // 结算命令type
    let type = value.search((notLateRegexp)) >= 0 ? betType.不迟到 :
      value.search((lateRegexp)) >= 0 ? betType.迟到 : undefined

    // 查询今日所有投注
    const todayAllBet = await BetModel.aggregate([
      {
        $match: {
          betTime : {
            $gt: dayjs().startOf('date').toDate(),
            $lt: BaseConfig.封盘时间().toDate()
          }
        }
      },
      {
        $lookup: {
          from: 'gameusers',
          let: { qq: '$qq' },
          pipeline: [
            {
              $match: {
                $expr: {
                  // $$是外表的 $是内表的
                  $eq: ['$$qq', '$qq']
                }
              }
            },
            {
              $project: {
                _id: 0,
                memberName: 1,
                specialTitle: 1,
              }
            },
            {
              $lookup: {
                from: 'userpoints',
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        // $$是外表的 $是内表的
                        $eq: ['$$qq', '$qq']
                      }
                    }
                  },
                ],
                as: 'userpoints'
              }
            },
            {
              $unwind: {
                path: '$userpoints'
              }
            },
            {
              $replaceRoot: { newRoot: { $mergeObjects: [ '$userpoints', '$$ROOT' ] } }
            },
            {
              $project: {
                _id: 0,
                memberName: 1,
                remainPoints: 1,
                specialTitle: 1,
                totalPoints: 1
              }
            }
          ],
          as: 'gameusers'
        }
      },
      {
        $unwind: {
          path: '$gameusers'
        }
      },
    ]).exec()

    if(todayAllBet.length <= 0) {
      // 没人投注
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain('今天还没有人下注')
        .exec()
      return
    }

    // 是否已结算
    const isAreadyAccount = todayAllBet[0].betState !== betState.未结束
    type = isAreadyAccount ? todayAllBet[0].betState : type

    let totalPoints:number = 0
    let lateTotal:number = 0
    let notLateTotal:number = 0
    todayAllBet.forEach(data => {
      totalPoints += data.betPoint
      if(data.betType === betType.迟到) {
        lateTotal += data.betPoint
      }else {
        notLateTotal += data.betPoint
      }
    })

    // 计算个人获得
    const caclPoint = (data: any) => {
      const {
        betPoint,
        betType: dataBetType,
        betProfit
      } = data
      if(isAreadyAccount) {
        return betProfit
      }else {
        if(dataBetType === betType.不迟到) {
          return (type === dataBetType || type === undefined) ? Math.floor((betPoint / notLateTotal) * totalPoints) : 0
        }else {
          return (type === dataBetType || type === undefined) ? Math.floor((betPoint / lateTotal) * totalPoints) : 0
        }
      }
    }

    let sendStr = '\n请输入"迟到"或者"没有迟到"'

    const willUpdate:Bet[] = []

    if(todayAllBet.length > 0) {
      // 计算得分
      // const t = new Table
      const t = new TextTable

      todayAllBet.forEach(function (data) {
        // 计算盈利
        const profit = caclPoint(data)

        willUpdate.push({
          ...data,
          betProfit: profit,
        })
        t.cell('昵称', data.gameusers.memberName)
        t.cell('投注类型', betTypeText[data.betType])
        t.cell('投注积分', data.betPoint)
        t.cell('剩余积分', data.gameusers.remainPoints)
        t.cell(isAreadyAccount ? '获得积分' : '预计得分', profit)

      })

      sendStr = t.output()
    }
    if(type !== undefined && !isAreadyAccount) {
      willUpdate.forEach((i) => {
        UserPointsModel.updateOne({
          qq: i.qq
        }, {
          $inc: {
            remainPoints: i.betProfit
          }
        }).exec()

        BetModel.updateOne({
          qq: i.qq
        }, {
          $set: {
            betState: i.betType,
            betProfit: i.betProfit
          }
        }).exec()
      })
    }
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain('\n' + `${ (isAreadyAccount || type !== undefined) ? `已结算<${ betTypeText[type] || betStateText[todayAllBet[0].betState] }>` : '未结算' }` + '\n' + sendStr + '\n')
      .exec()
  }
}

// 积分排行榜
EventFlow.pointsRank = async (context) => {
  const { message, targetQQ, commandText } = context
  if(isCommand(commandText, /积分排行/ig)) {
    interface Res {
      qq: string,
      totalPoints: number,
      remainPoints: number,
      gameusers: { memberName: string, specialTitle: string }
    }
    const res:Res[] = await UserPointsModel.aggregate([
      {
        $sort: {
          remainPoints: -1
        }
      },
      {
        $lookup: {
          from: 'gameusers',
          let: { qq: '$qq' },
          as: 'gameusers',
          pipeline: [
            {
              $match: {
                $expr: {
                  // $$是外表的 $是内表的
                  $eq: ['$$qq', '$qq']
                }
              }
            },
            {
              $project: {
                _id: 0,
                memberName: 1,
                specialTitle: 1,
              }
            },
          ]
        }
      },
      {
        $unwind: {
          path: '$gameusers'
        }
      },
      {
        $project: {
          _id: 0,
          qq: 1,
          totalPoints: 1,
          remainPoints: 1,
          gameusers: 1
        }
      },
    ]).exec()

    const t = new TextTable
    const len = res.length
    const size = 5
    let index = 0
    let rank = 1
    while(index < len) {
      res.slice(index, (index += size)).forEach((r, index) => {
        t.cell('排名', rank++)
        t.cell('昵称', r.gameusers.memberName)
        t.cell('剩余积分', r.remainPoints)
        t.cell('总获得积分', r.totalPoints)
      })
      let sendStr = t.output()
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .plain('\n' + sendStr + '\n')
        .exec()
    }

  }
}

// 查询眉笔
EventFlow.queryMaybe = async (context) => {
  const { message, targetQQ, commandMessage, commandText } = context
  const [word, value] = getParamCommand(commandText)
  // 默认今天
  let date = dayjs()
  if(word === '查询眉笔') {
    if(value) {
      if(dayjs(value).isValid()) {
        date = dayjs(value)
      }
    }
    const res = await SignInModel.find({
      signInTime: {
        $gt: date.startOf('date').toDate(),
        $lt: date.endOf('date').toDate()
      },
      point: {
        $lt: 5
      }
    }).sort({point: 1}).exec()
    if(res.length > 0) {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .plain(`${ date.format('MM[月]DD[日]') }的眉笔是\n`)
        .at(res[0].qq)
        .plain(`\nta通过努力签到获得了${ res[0].point }分！\n`)
        .plain('\n让我们恭喜ta')
        .face(undefined,'庆祝')
        .face(undefined,'庆祝')
        .exec()
    }else {
      ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .plain(`${ date.format('MM[月]DD[日]') }没有眉笔\n`)
        .exec()
    }
  }
}



// 抽奖
// EventFlow.luckDraw = async (context) => {
//   const { message, targetQQ, commandText } = context
//   if(isCommand(commandText, /抽奖/ig)) {
//     let str = ''
//     const find = await UserPointsModel.find({qq:targetQQ}).exec()
//     if(find && find.length > 0 && find[0].remainPoints >= 5) {
//       await UserPointsModel.updateOne({
//         qq: targetQQ
//       }, {
//         $inc: {
//           remainPoints: -5
//         }
//       }).exec()

//       let gainPoints = 0
//       let num = Math.ceil(Math.random() * 1000)
//       if(num>0&&num<500){
//         gainPoints = 0
//         str =  '谢谢惠顾'
//       }else if(num>=500&&num<800){
//         gainPoints = 10
//         str =  '中奖10积分'
//       }else if(num>=800&&num<950){
//         gainPoints = 100
//         str =  '中奖100积分!'
//       }else if(num>950){
//         gainPoints = 1000
//         str =  '中奖1000积分!!'
//       }
//       await UserPointsModel.updateOne({
//         qq: targetQQ
//       }, {
//         $inc: {
//           remainPoints: gainPoints
//         }
//       }).exec()
//     }else {
//       str = '你没有足够的积分！每次抽奖消耗<5>积分，请先获取积分，如签到'
//     }
//     ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
//       .at(targetQQ)
//       .plain('\n' + str + '\n')
//       .exec()
//   }
// }

// 帮助

EventFlow.help = async (context) => {
  const { message, targetQQ, commandText, commandMessage } = context
  if(isCommand(commandText, /命令/gi)) {
    let str = ''
    for(let key in commandList) {
      str += `\n${ key }：${ commandList[key] }`
    }
    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
      .at(targetQQ)
      .plain(str)
      .exec()
  }
}
