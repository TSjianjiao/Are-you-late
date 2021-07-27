import dayjs from "dayjs"

/**
 * 当天上班时间
 */
export function getTodayWorkTime() {
  return dayjs().set('hours', 9).set('minutes', 30).set('seconds', 0)
}

const BaseConfig = {
  '迟到扣钱': 30,
  '上班时间': getTodayWorkTime
}
export default BaseConfig
