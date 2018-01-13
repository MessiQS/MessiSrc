import Echarts, {echarts} from 'native-echarts';

export const newPaper = {
    option: {
        grid: {
            left: '10',
            right: '10',
            bottom: '3%',
            top: '5%',
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
                    show: false,
                    inside: true
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
                        lineStyle: {
                            color: '#1495EB'
                        }
                    }
                },
                smooth: false,
                symbol: 'none',
                areaStyle: {
                    normal: {
                        color: {
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
                label: {
                    normal: {
                        show: true,
                        position: 'top'
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
            left: '10',
            right: '10',
            bottom: '3%',
            top: '5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show: false,
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
                axisLabel: {
                    show: false,
                    inside: true
                },
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
                // axisLabel: {
                //     textStyle: {
                //         color: '#8E9091',
                //         fontSize: 14
                //     }
                // },
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
                itemStyle: {
                    normal: {
                        color: '#FF5B29',
                        lineStyle: {
                            color: '#FF5B29'
                        }
                    },
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                smooth: false,
                symbol: 'none',
                areaStyle: {
                    normal: {
                        color: {
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
            }
        ]
    }
}

export const pieOption = {

    option: {
        animation: false,
        trigger: 'axis',
        legend: {
            show: false
        },
        series: [
            {
                hoverOffset: 0,
                type: 'pie',
                radius: '100%',
                avoidLabelOverlap: false,

                color: [getColor('#429321','#B4EC51'), getColor('#FF5B29','#FF9453'), getColor('#1495EB','#2DC7F7')],
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
                // itemStyle: {
                //     normal: {
                //         color: '#8FDA3C'
                //     }
                // }
            }
        ]
    }
}


function getColor(dark,light){
    return {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 1,
        colorStops: [{
            offset: 0, color:dark // 0% 处的颜色
        }, {
            offset: 1, color: light // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
    }
    // var echarts = new Echarts()
    // console.log("echarts.graphic", echarts.graphic)
    // return new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
    //     offset: 0,
    //     color: '#f7f8fa'
    // }, {
    //     offset: 1,
    //     color: '#cdd0d5'
    // }])
}