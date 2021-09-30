type words = string
type value = string

export const commandList = {
  '投注': '#[迟到 | 没迟到] [投注点数]',
  '查询积分': '#查询积分',
  '签到': '#签到',
  '查询投注': '#查询投注',
  '结算': '#结算 [迟到 | 没迟到]',
}
/**
 * 一句话命令
 */
export function isCommand(text: string, match: string | RegExp): Boolean {
  if(!text) return
  const blockComand = text.split('#')
  if(match instanceof RegExp) {
    return match.test(blockComand[1])
  }else {
    return blockComand[1] === match
  }
}

/**
 * 带一个参数的命令
 */
export function getParamCommand(text: string): [words, value] {
  if(!text) return ['', '']
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    const comand = blockComand[1].split(' ')
    if(comand.length === 2) {
      const [words, value] = comand
      return [words, value]
    }else {
      return [comand[0], '']
    }
  }
  return ['', '']
}

/**
 * 投注命令
 */

export function isBetCommand(text: string): [words, value] {
  if(!text) return ['', '']
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    const comand = blockComand[1].split(' ')
    if(comand.length === 2) {
      const [words, value] = comand
      // if(!isNaN(Number(value))) {
      return [words, value]
      // }
    }
  }
  return ['', '']
}



/**
 * 签到命令
 */
export function isSignInCommand(text: string): Boolean {
  if(!text) return
  const regexp = /签到$/gi
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    if(regexp.test(blockComand[1])) {
      return true
    }
  }
  return false
}


/**
 * 查询积分
 */
export function isQueryPoints(text: string): Boolean {
  if(!text) return
  const blockComand = text.split('#')
  return blockComand[1] === '查询积分'
}


/**
 * 查询投注情况
 */
export function isQueryBet(text: string): Boolean {
  if(!text) return
  const blockComand = text.split('#')
  return blockComand[1] === '查询投注'
}
