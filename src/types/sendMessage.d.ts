import { Command } from './command'
// 发送消息
export interface SendMessage<C> {
  /** 消息同步的字段 */
  syncId: number,
  /** 命令字 */
  command: keyof typeof Command,
  /** 子命令字 */
  subCommand?: null,
  /** 命令的数据对象 */
  content: C
}


/**
 * 发送群消息
 */
export interface SendGroupMessage {
  sessionKey: string,
  target: number,
  messageChain: any[]
}
