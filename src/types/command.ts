/** 命令 */
export const Command = {
  about: '关于',
  sendGroupMessage: '发群消息',
  sendFriendMessage: '发送好友消息',
  sendTempMessage: '临时会话消息',
  sendNudge: '戳一戳',
  recall: '撤回消息'
}

/** 命令响应 */
export interface CommandResponse {
  code: number
  msg: string
}
