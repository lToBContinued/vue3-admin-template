// 水球图图表
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

// 年龄比例图表
export const ageRate = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: '30px',
    top: '30px',
    textStyle: {
      color: '#fff',
      fontSize: '14px'
    }
  },
  emphasis: {},
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        position: 'inside',
        show: true,
        color: '#fff'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '12岁及以下' },
        { value: 735, name: '13~18' },
        { value: 580, name: '19~30' },
        { value: 484, name: '30~50' },
        { value: 300, name: '50及以上' }
      ]
    }
  ],
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '0'
  }
}

// 地图
export const mapOption = {
  // 地图配置
  geo: {
    map: 'china', //地图类型
    roam: true,
    left: 80,
    right: 80,
    bottom: 80,
    top: 80,
    // 标签样式
    label: {
      show: true,
      color: '#19FFFC',
      fontSize: 14
    },
    // 地图高亮情况下的样式
    emphasis: {
      itemStyle: {
        color: 'red'
      },
      label: {
        fontSize: '30px',
        color: '#fff',
        fontWeight: 700
      }
    },
    // 每一个多边形的样式
    itemStyle: {
      // 渐变颜色效果
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#007AFE' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#1569C3' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  },
  series: [
    {
      type: 'lines', // 航线的系列
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点北京
            [87.617733, 43.792818] // 终点新疆
          ],
          // 统一的样式设置
          lineStyle: {
            color: '#fff',
            width: 2, // 线粗细
            cap: 'round', // 线末端的结束方式
            opacity: 0.3, // 透明度
            curveness: -0.15 // 弯曲度
          }
        },
        {
          coords: [
            [116.405285, 39.904989], // 起点北京
            [121.472644, 31.231706] // 终点上海
          ],
          // 统一的样式设置
          lineStyle: {
            color: '#fff',
            width: 2, // 线粗细
            cap: 'round', // 线末端的结束方式
            opacity: 0.3, // 透明度
            curveness: -0.15 // 弯曲度
          }
        },
        {
          coords: [
            [116.405285, 39.904989], // 起点北京
            [108.320004, 22.82402] // 终点广西
          ],
          // 统一的样式设置
          lineStyle: {
            color: '#fff',
            width: 2, // 线粗细
            cap: 'round', // 线末端的结束方式
            opacity: 0.3, // 透明度
            curveness: -0.15 // 弯曲度
          }
        },
        {
          coords: [
            [101.778916, 36.623178], // 起点青海
            [114.298572, 30.584355] // 终点湖北
          ],
          // 统一的样式设置
          lineStyle: {
            color: '#fff',
            width: 2, // 线粗细
            cap: 'round', // 线末端的结束方式
            opacity: 0.3, // 透明度
            curveness: -0.15 // 弯曲度
          }
        }
      ],
      // 线的特效
      effect: {
        show: true,
        symbol:
          'path://M922.6 698.6v-74.7l-335.9-224V138.6S586.7 64 512 64s-74.7 74.6-74.7 74.6v261.3L101.4 624v74.7l335.9-112v209.1l-112 89.6V960L512 885.3l186.6 74.6v-74.6l-112-89.6V586.6l336 112z',
        symbolSize: 20
      }
    }
  ]
}

// 游客数量趋势折线图
export const touristLine = {
  xAxis: {
    type: 'category',
    boundaryGap: 0, // x轴两侧不留白
    splitLine: false, // 不显示分割线
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // 刻度
    axisTick: {
      show: true // 显示刻度
    }
  },
  yAxis: {
    splitLine: false, // 不显示分割线
    // 轴线设置
    axisLine: {
      show: true // 显示轴线
    },
    // 刻度
    axisTick: {
      show: true // 显示刻度
    }
  },
  series: [
    {
      type: 'line',
      data: [120, 1240, 66, 99, 321, 890, 1200],
      smooth: true, // 平滑曲线
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'orange' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'transparent' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
    }
  ],
  grid: {
    left: 50,
    right: 0,
    bottom: 20,
    top: 20
  }
}

// 景点排行
export const rankOption = {
  title: {
    text: '景区排行', // 主标题
    left: '40%', // 标题位置
    link: 'https://www.baidu.com', // 点击跳转页面
    textStyle: {
      color: '#fff',
      fontSize: 20
    },
    // 子标题
    subtext: '各大景区排行',
    subtextStyle: {
      color: 'yellow',
      fontSize: 14
    }
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {},
  series: [
    // 柱状图
    {
      type: 'bar',
      data: [10, 20, 30, 40, 50, 60, 70],
      // 柱状图图形上的文本标签
      label: {
        show: true,
        position: 'insideTop', // 文字的位置
        color: 'yellow'
      },
      showBackground: true, // 是否显示背景颜色
      backgroundStyle: {
        // 底部背景颜色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'black' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      // 每个柱子的样式
      itemStyle: {
        color: function (data) {
          const arr = ['red', 'orange', 'yellow', 'green', 'purple', 'hotpink', 'skyblue']
          return arr[data.dataIndex]
        },
        // 边框样式
        borderRadius: [5, 5, 0, 0],
        borderWidth: 2,
        borderColor: '#fff'
      }
    },
    // 折现图
    {
      type: 'line',
      data: [10, 20, 30, 40, 20, 60, 70],
      smooth: true
    }
  ],
  // 提示框
  tooltip: {
    show: true
  },
  grid: {
    left: 40,
    right: 40,
    bottom: 30,
    top: 100
  }
}

// 年度游客量对比
export const yearOptions = {
  title: {
    text: '散点图',
    left: '50%',
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: {
    type: 'category',
    show: false
  },
  yAxis: {
    show: false
  },
  series: {
    type: 'scatter',
    data: [33, 88, 21, 9, 788, 1234, 16, 88, 22, 462, 75],
    symbol: 'diamond', // 标记图形设置
    symbolSize: 16, // 点大小
    // 图文标签
    label: {
      show: true,
      position: 'top',
      color: 'lightgreen'
    },
    // 点的样式
    itemStyle:{
      color: '#FF69B4'
    }
  },
  grid: {
    left: 40,
    right: 20,
    bottom: 40,
    top: 40
  }
}
