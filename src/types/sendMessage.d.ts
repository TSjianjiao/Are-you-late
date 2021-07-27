import { Command } from './command'
// 发送消息
export interface SendMessage {
  /** 消息同步的字段 */
  syncId: number,
  /** 命令字 */
  command: keyof typeof Command,
  /** 子命令字 */
  subCommand?: null,
  /** 命令的数据对象 */
  content: SendType
}

export type SendType = SendGroupMessage  |
                       SendFriendMessage |
                       SendTempMessage   |
                       SendNudge         |
                       Recall
/**
 * 发送群消息
 */
export interface SendGroupMessage {
  sessionKey: string,
  target: number,
  messageChain: any[]
}
/**
 * 发送好友消息
 */
export interface SendFriendMessage {
  sessionKey: string,
  target: number,
  messageChain: any[]
}

/**
 * 发送临时会话消息
 */
export interface SendTempMessage {
  sessionKey: string,
  qq:number,
  group:number,
  messageChain: any[]
}

/**
 * 发送戳一戳
 */
export interface SendNudge {
  sessionKey:string,
  target:number,
  /** 戳一戳接受主体(上下文), 戳一戳信息会发送至该主体, 为群号/好友QQ号 */
  subject:number,
  kind:"Friend" | "Group" | "Stranger"
}

/**
 *  撤回消息
 */
export interface Recall {
  sessionKey:string,
  /** messageid */
  target:number
}

/**
 * 消息类型
 */
export const messageType = {
  At: '@',
  AtAll: '@全部',
  Face: 'qq表情',
  Plain: '文字',
  Image: '图片',
  FlashImage: '闪照',
  Poke: '大表情',
  Dice: '骰子',
}
