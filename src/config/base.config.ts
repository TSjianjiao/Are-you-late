import dayjs from 'dayjs'

/**
 * 当天上班时间
 */
function getTodayWorkTime() {
  return dayjs().set('hours', 9).set('minutes', 30).set('seconds', 0)
}
/**
 * 当天封盘时间
 */
function getBetClosingTime() {
  return getTodayWorkTime().subtract(20,'minute')
}

const BaseConfig = {
  '迟到扣钱': 30,
  '上班时间': getTodayWorkTime,
  '封盘时间': getBetClosingTime
}
export default BaseConfig
