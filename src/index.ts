// export * as hello from "@/test/hello"
import WSToolKit from "@/utils/ws/toolkits"
import ws from '@/utils/ws'

import { CodeEnum } from "@/types/code"
import { SessionMsg, GroupMessage, ReceiveMessage } from "@/types/receiveMessage"
import { getSession } from "@/utils/session"
ws.on('message', async (message: string) => {
    const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(message)
    if(jsonMsg.data.code === CodeEnum.success) {
        getSession(jsonMsg)
    }
    console.log(jsonMsg)
    WSToolKit.send('sendGroupMessage', 599869861).at(312571051).plain('你🐉吗？').exec()
})
