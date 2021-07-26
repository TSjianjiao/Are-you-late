export type Code = 0 | 1 | 2| 3 | 4 | 5 | 6 | 10 | 11 | 30 | 400
export const CodeText = {
  0: '正常',
  1: '错误的verify key',
  2: '指定的Bot不存在',
  3: 'Session失效或不存在',
  4: 'Session未认证(未激活)',
  5: '发送消息目标不存在(指定对象不存在)',
  6: '指定文件不存在，出现于发送本地图片',
  10: '无操作权限，指Bot没有对应操作的限权',
  11: 'Bot被禁言，指Bot当前无法向指定群发送消息',
  30: '消息过长',
  400: '错误的访问，如参数错误等'
}
export  enum CodeEnum {
  success = 0,
  errorVerifyKey = 1,
  noBot = 2,
  sessionNotExsist = 3,
  sessionNotActive = 4,
  targetLost = 5,
  fileLost = 6,
  permissionDeny = 10,
  forbiddenWords = 11,
  longMessage = 30,
  error = 400
}
