export * as hello from "@/test/hello"
import WSToolKit from "@/utils/ws"
import ws from '@/utils/ws'
// ws.on('message', (message: string) => {

    // const groupMsg = filterByMessageType<GroupMessage>('GroupMessage', message)

    // if(groupMsg && groupMsg.data.sender.id === 312571051) {
    //   ws.send(JSON.stringify({
    //     syncId: -1,
    //     command: 'sendGroupMessage',
    //     content: {
    //       sessionKey: getSession(jsonMsg),
    //       target: 599869861,
    //       messageChain: [
    //         {
    //           "type": "At",
    //           "target": 312571051,
    //           "display": ""
    //         },
    //         {
    //           "type":"Plain",
    //           "text":"骗狗是伞兵"
    //         },
    //       ]
    //     }
    //   }))
    // }

// })
WSToolKit.send(1).send(2).exec()
console.log(WSToolKit.sendMessageList)
