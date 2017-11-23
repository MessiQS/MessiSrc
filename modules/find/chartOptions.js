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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '搜索引擎',
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
                smooth:true,
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

export const pieOption = {
    
    option :{
        tooltip: {
            trigger: 'item',
            formatter: ""
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
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
                data:[
                    {value:335},
                    {value:310},
                    {value:1548}
                ]
            }
        ]
    }
       
}