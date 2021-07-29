import dayjs from "dayjs"

import SystemConfig from "./config/system.config"

import ToolKit from "@/utils/ws/toolkits"
import withMessage from "@/utils/HOF/withMessage"
import { isBetCommand, isSignInCommand } from "@/utils/botCommand"

import GameUser, { GameUser as GameUserIterface} from "@/db/model/gameUser"
import SignInModel from "@/db/model/signIn"
import UserPointsModel from "@/db/model/userPoints"
import Point, { betType, betTypeText, Point as PointIterface} from "@/db/model/point"

import { addOnlyOneDocument, getOneErrorMessage } from "@/db/util"

import { GroupMessage, ReceiveMessage, Plain } from "@/types/receiveMessage"
import randomPoint from "./utils/randomPoint"
import logger from "./utils/logger"

const lateRegexp = /迟到/gi
const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到/gi

export default withMessage(async function (message) {
  // 筛选消息
  const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(message)
                          .filterByMessageChainType('GroupMessage')
                          .filterByMessageType('At')
                          .filterByTaget()
                          .filterByPlainText(text => {
                              const t = text.trim()
                              return t.includes('#')
                          })
                          .exec()
  if(filterMsg) {
      const find = filterMsg.data.messageChain.find(i => i.type === 'Plain') as Plain
      const targetQQ = filterMsg.data.sender.id
      // 添加用户
      await GameUser.findOneAndUpdate({qq: targetQQ}, {
        qq: targetQQ,
        memberName: filterMsg.data.sender.memberName,
        specialTitle: filterMsg.data.sender.specialTitle,
      }, {upsert: true}).exec()


      //////////////////////////////////// 下注流程 ////////////////////////////////////
      const [words, value] = isBetCommand(find.text)
      if(words && value) {
        // 匹配关键词
        const type = words.search((notLateRegexp)) >= 0 ? betType.不迟到 :
        words.search((lateRegexp)) >= 0 ? betType.迟到 : undefined

        if(type === undefined) return

        // 存储下注积分
        const [err, success] = await addOnlyOneDocument<PointIterface>({
          qq: targetQQ,
          betTime: {
            $gt: dayjs().startOf('date').toDate()
          }
        }, {
          qq: targetQQ,
          betPoint: Number(value),
          betType: type,
        }, Point)

        if(Boolean(err)) {
          ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
          .at(targetQQ)
          .plain(getOneErrorMessage(err))
          .face(undefined, '请/gun')
          .exec()
          return
        }

        // 成功提示
        ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
        .at(targetQQ)
        .plain(`押注${betTypeText[type]}：${value}积分`)
        .face(undefined, '吃糖')
        .exec()
      }

      //////////////////////////////////// 签到流程 ////////////////////////////////////
      if(isSignInCommand(find.text)) {
        // 随机发积分
        const userPoint = randomPoint()
        const find = await UserPointsModel.findByQQ(targetQQ)
        const { success: SignInSuccess, message: SignInMessage }  = await SignInModel.signIn(targetQQ)
        if(SignInSuccess) {
          const  {success: addPointSuccess, message: addPointMessage} = await find.addPoint(userPoint)
          ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
          .at(targetQQ)
          .plain(addPointSuccess ? `签到成功！\n获得积分${userPoint}!` : `签到失败：\n${addPointMessage}`)
          .exec()
        }else {
          ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
          .at(targetQQ)
          .plain(`签到失败：${SignInMessage}`)
          .exec()
        }
      }
  }
})
