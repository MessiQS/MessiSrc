export const newPaper = {
    option: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: []
        },
        toolbox: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: "#8E9091",
                    fontSize: 12
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: "#8E9091",
                    fontSize: 14
                }
            }
        ],
        series: [
            {
                type: 'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        color: '#1495EB',
                        lineStyle:{
                            color: '#1495EB'
                        }
                    }
                },
                smooth:false,
                symbol: 'none',
                areaStyle: {
                    normal:{
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#1495EB' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffffff' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                data: [0, 15, 40, 30, 80, 50, 100]
            }
        ]
    }
}

export const rememberPaper = {
    option: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: []
        },
        toolbox: {

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: "#8E9091",
                    fontSize: 12
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: "#8E9091",
                    fontSize: 14
                }

            }
        ],
        series: [
            {
                type: 'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        color: '#FF5B29',
                        lineStyle:{
                            color: '#FF5B29'
                        }
                    },
                    
                },
                smooth:false,
                symbol: 'none',
                areaStyle: {
                    normal:{
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#FF5B29' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ffffff' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                },
                data: [0, 15, 40, 30, 80, 50, 100]
            }
        ]
    }
}

export const pieOption = {
    
    option :{
        animation: false,
        trigger: 'axis',
        legend: {
            show:false
        },
        series: [
            {
                hoverOffset:0,
                type:'pie',
                radius: '100%',
                avoidLabelOverlap: false,
                color:['#8FDA3C', '#FF5B29', '#1495EB'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {

                },
                data:[
                    {value:310},
                    {value:310},
                    {value:310}
                ]
            }
        ]
    }
}