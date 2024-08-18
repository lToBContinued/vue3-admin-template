// 判断当前时间是上午、下午还是晚上
export default function getTimePeriod() {
  const date = new Date()
  const hours = date.getHours()

  if (hours >= 6 && hours < 12) {
    return '上午好'
  } else if (hours >= 12 && hours < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}
