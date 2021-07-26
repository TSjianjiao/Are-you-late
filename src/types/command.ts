/** 命令 */
export const Command = {
  about: '关于',
  sendGroupMessage: '发群消息'
}

/** 命令响应 */
export interface CommandResponse {
  code: number
  msg: string
}
