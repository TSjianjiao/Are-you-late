
/**
 * 投注命令
 */
type words = string
type value = string
export function isBetCommand(text: string): [words, value] {
  if(!text) return ['', '']
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    const comand = blockComand[1].split(' ')
    if(comand.length === 2) {
      const [words, value] = comand
      if(!isNaN(Number(value))) {
        return [words, value]
      }
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
