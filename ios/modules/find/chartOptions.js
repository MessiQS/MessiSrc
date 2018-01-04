export const newPaper = {
    option: {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
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
                minInterval: 1,
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
                },
                axisLabel: {
                    textStyle: {
                        color: '#8E9091',
                        fontSize: 14
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#D8D8D8',
                        type: 'dashed'
                    }
                },
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
                data: [0, 15, 40, 30, 80, 50]
            }
        ]
    }
}

export const rememberPaper = {
    option: {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
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
                minInterval: 1,
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
                },
                axisLabel: {
                    textStyle: {
                        color: '#8E9091',
                        fontSize: 14
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#D8D8D8',
                        type: 'dashed'
                    }
                },
            }
        ],
        dataZoom: [
            {
                show: false,
            },
        ],
        legend: {
            borderWidth: 0,
            borderColor: "#FFF"
        },
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
                data: [0, 15, 40, 30, 80, 100]
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