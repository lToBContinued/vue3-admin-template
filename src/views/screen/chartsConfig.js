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

// 性别比例图表
export const sexRate = {
  xAxis: {
    show: false,
    min: 0,
    max: 100
  },
  yAxis: {
    show: false,
    type: 'category'
  },
  series: [
    {
      type: 'bar',
      data: [58],
      barWidth: '20px',
      itemStyle: {
        color: '#007AFE',
        borderRadius: 999
      },
      z: 999
    },
    {
      type: 'bar',
      data: [100],
      barWidth: '20px',
      barGap: '-100%',
      itemStyle: {
        color: '#FF4B7A',
        borderRadius: 999
      }
    }
  ],
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '0'
  }
}
