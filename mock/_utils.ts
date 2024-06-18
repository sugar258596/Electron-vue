/**
 * @description - 将秒转为分秒
 * @param {number} time - 传递的秒数
 * @returns {string} - 分秒格式
 */
export function formatTime(time: string): string {
  const timeNum = Number(time)
  const min = Math.floor(timeNum / 60)
  const sec = timeNum % 60
  return `${min}:${sec > 9 ? sec : '0' + sec}`
}

/**
 * @description - 将数字按照千分位或者万分位格式化
 * @param {string} number - 传递的数字
 * @returns {string} - 千分位或者万分位格式化后的数字
 */
export function formatNumber(n: string): string {
  const num = Number(n)
  if (num < 10000 && num > 1000) {
    const formattedNumber = Math.floor(num / 100) / 10
    return formattedNumber.toFixed(1) + 'k'
  }
  if (num >= 10000) {
    const formattedNumber = Math.floor(num / 1000) / 100
    return formattedNumber.toFixed(1) + 'k'
  }
  return n
}
