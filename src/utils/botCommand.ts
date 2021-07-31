
/**
 * 投注命令
 */
type words = string
type value = string
export function isBetCommand(text: string): [words, value] {
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    const comand = blockComand[1].split(' ')
    if(comand.length === 2) {
      const [words, value] = comand
      return [words, value]
    }
  }
  return ['', '']
}

/**
 * 签到命令
 */
export function isSignInCommand(text: string): Boolean {
  const regexp = /签到$/gi
  const blockComand = text.split('#')
  if(blockComand.length === 2) {
    if(regexp.test(blockComand[1])) {
      return true
    }
  }
  return false
}
