import { Command } from '@/types/command'
import { getSession } from '@/utils/session'
import SendMessage from '@/utils/ws/sendMessage'
import GetMessage, { GetMsg } from '@/utils/ws/getMessage'
import ws from '@/utils/ws'
import { Recall, SendFriendMessage, SendGroupMessage, SendNudge, SendTempMessage } from '@/types/sendMessage'

class ToolKit {
  constructor(){}

  send(type: 'sendGroupMessage', target: string): SendMessage
  send(type: 'sendFriendMessage', target: string): SendMessage
  send(type: 'sendTempMessage', qq: string, group: string): SendMessage
  send(type: 'sendNudge', target: string, subject: string, kind: 'Friend' | 'Group' | 'Stranger'): void
  send(type: 'recall', target: string): void
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
  get<M extends GetMsg>(msg: any) {
    return new GetMessage<M>(msg)
  }
}
export default new ToolKit()
