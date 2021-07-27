import { Command } from '@/types/command'
import { getSession } from '@/utils/session'
import SendMessage from '@/utils/ws/sendMessage'
import ws from '@/utils/ws'
import { Recall, SendFriendMessage, SendGroupMessage, SendNudge, SendTempMessage } from '@/types/sendMessage'

class ToolKit {
  constructor(){}

  send(type: 'sendGroupMessage', target: number): SendMessage
  send(type: 'sendFriendMessage', target: number): SendMessage
  send(type: 'sendTempMessage', qq: number, group: number): SendMessage
  send(type: 'sendNudge', target: number, subject: number, kind: "Friend" | "Group" | "Stranger"): void
  send(type: 'recall', target: number): void
  /** 发送消息 */
  send(type:string, ..._rest: any[]) {
    let msg = {
      syncId: '-1',
      command: type,
      content: null
    }
    switch(type) {
      case 'sendGroupMessage': {
        ((msg.content) as SendGroupMessage) = {
          sessionKey: getSession(),
          target: _rest[0],
          messageChain: [],
        }
        return new SendMessage(msg)
      }
      case 'sendFriendMessage': {
        ((msg.content) as SendFriendMessage) = {
          sessionKey: getSession(),
          target: _rest[0],
          messageChain: [],
        }
        return new SendMessage(msg)
      }
      case 'sendTempMessage': {
        ((msg.content) as SendTempMessage) = {
          sessionKey: getSession(),
          qq: _rest[0],
          group: _rest[1],
          messageChain: [],
        }
        return new SendMessage(msg)
      }
      case 'sendNudge': {
        ((msg.content) as SendNudge) = {
          sessionKey: getSession(),
          target: _rest[0],
          subject: _rest[1],
          kind: _rest[2],
        }
        return
      }
      case 'recall': {
        ((msg.content) as Recall) = {
          sessionKey: getSession(),
          target: _rest[0],
        }
        return
      }
    }
  }

  /** 获取某个消息 */
}
export default new ToolKit()
