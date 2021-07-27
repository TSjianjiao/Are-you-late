// export * as hello from "@/test/hello"
import '@/db'
import ws from '@/utils/ws'
import ToolKit from "@/utils/ws/toolkits"
import GameUser, { GameUser as GameUserIterface} from "./db/model/gameUser"
import logger from '@/utils/logger'

import SystemConfig from "./config/system.config"

import { CodeEnum } from "@/types/code"
import { SessionMsg, GroupMessage, ReceiveMessage, Plain } from "@/types/receiveMessage"
import { getSession } from "@/utils/session"

ws.addEventListener('message', async ({data: message}) => {

    ////////////////////// 检查session 必须第一步//////////////////////////
    const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(message)
    if(jsonMsg.data.code === CodeEnum.success) {
        getSession(jsonMsg)
        return
    }
    ////////////////////////////////////////////////

    const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(jsonMsg)
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
        const blockComand = find.text.split('#')
        if(blockComand.length === 2) {
            const comand = blockComand[1].split(' ')
            if(comand.length === 2) {
                const [words, value] = comand

                if(isNaN(Number(value))) {
                    ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
                    .at(filterMsg.data.sender.id)
                    .plain('押注只能是数字')
                    .face(undefined, '擦汗/ch')
                    .exec()
                    return
                }
                if(
                    words.includes('不迟到')
                    || words.includes('没有迟到')
                    || words.includes('不会迟到')
                    || words.includes('不可能迟到')
                    || words.includes('没迟到')
                    || words.includes('准时到')
                    || words.includes('准点到')
                ) {
                    await addUser({
                        qq: filterMsg.data.sender.id,
                        memberName: filterMsg.data.sender.memberName,
                        specialTitle: filterMsg.data.sender.specialTitle,
                    })
                    if(isSuccess) {
                        ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
                        .at(filterMsg.data.sender.id)
                        .plain(`押注不迟到：${value}积分`)
                        .face(undefined, '吃糖')
                        .exec()
                    }else {
                        ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
                        .at(filterMsg.data.sender.id)
                        .plain('你已押注！')
                        .face(undefined, '请/gun')
                        .exec()
                    }
                }else if(words.includes('迟到')) {
                    await addUser({
                        qq: filterMsg.data.sender.id,
                        memberName: filterMsg.data.sender.memberName,
                        specialTitle: filterMsg.data.sender.specialTitle,
                    })
                    if(isSuccess) {
                        ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
                        .at(filterMsg.data.sender.id)
                        .plain(`押注不迟到：${value}积分`)
                        .face(undefined, '吃糖')
                        .exec()
                    }else {
                        ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
                        .at(filterMsg.data.sender.id)
                        .plain(`押注迟到：${value}积分`)
                        .face(undefined, '吃糖')
                        .exec()
                    }
                }

            }
        }else {
            ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
            .at(filterMsg.data.sender.id)
            .plain('命令格式错误\n正确格式：#迟到 [积分数]')
            .face(undefined, '擦汗/ch')
            .exec()
            return
        }
    }
})

async function addUser(user: GameUserIterface) {
    const find = await GameUser.find({qq: user.qq}).exec()
    if(find.length > 0) {
        return false
    }else {
        try {
            await GameUser.create(user)
        }catch(err) {
            logger('db', 'error', err)
            return false
        }
        return true
    }
}
