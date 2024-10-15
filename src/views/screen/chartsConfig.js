// 水球图配置
export const touristLiquidFill = {
  series: {
    type: 'liquidFill',
    data: [0.6, 0.4, 0.2],
    radius: '90%', // 球半径大小
    color: ['#81F3C5', '#64E4D5', '#52E5EF', '#36CDEF'], // 每层波浪颜色
    amplitude: '5%', // 波浪高度
    waveLength: '80%', // 波浪长度
    // 外面那圈线的样式
    outline: {
      show: true,
      borderDistance: 8,
      itemStyle: {
        color: 'none',
        borderColor: '#294D99',
        borderWidth: 6,
        shadowBlur: 20,
        shadowColor: 'rgba(129,243,197, 1)'
      }
    }
  },
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}
