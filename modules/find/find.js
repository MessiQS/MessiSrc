/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Echarts from 'native-echarts';
import { newPaper, pieOption } from './chartOptions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';



const clientWidth = 375;
const chartArray = [1,2]
export default class Find extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
    }
    componentWillMount() {

    }
    getChatDom(){
        const newPaperOption = newPaper.option;
        return chartArray.map(res => {
            return (
                <View style={styles.calendarView} key ={res}>
                    <View style={styles.chartTitle}>
                        <View style={styles.chartTitleLeft}>
                            <Text style={styles.h4}>过去6日刷题亮统计</Text>
                            <Text style={styles.psmall}>平均值:318</Text>
                        </View>
                        <View style={styles.chartTitleRight}>
                            <Text style={styles.h4}>本月共进行6次</Text>
                            <Text style={styles.psmall}>最后刷题日：今日</Text>
                        </View>
                        <View style={[styles.titleIcon,{paddingTop:15,flex:2}]}>
                            <Icon  name={'arrow-right'} size={14} ></Icon >
                        </View>
                    </View>
                    <Echarts option={newPaperOption} height={clientWidth * 0.7} />
                </View>
            )
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={header.header}>
                    <Text style={header.text}>
                        刷题统计
                    </Text>
                    <View style = {header.icon}>
                        <Icon name={'magnifier'} size={22} />
                    </View>
                    <View style = {header.icon}>
                        <Icon name={'options'} size={22} />
                    </View>
                </View>
                <ScrollView>

                    <View style={styles.titleContent}>
                        <View style={styles.text}>
                            <Text style={styles.h2}>2017年北京省考</Text>
                            <Text style={styles.p}>历年真题</Text>
                        </View>
                        <View style={styles.circleChart}>
                            <Echarts option={pieOption.option} height={clientWidth * 0.253} />
                        </View>
                        <View style={styles.titleIcon}>
                            <Icon  name={'arrow-right'} size={14} ></Icon >
                        </View>
                    </View>

                    {this.getChatDom()}
                </ScrollView>
            </View>
        );
    }
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}
const header =  {
    header:{
        height:66,
        paddingTop:30,
        marginBottom:5,
        paddingLeft:15,
        flexDirection: "row",
        backgroundColor: '#FFF',
        shadowOpacity: 0.1,
        shadowColor: '#333',
        shadowOffset: {width: 0, height: 1}
    },
    text:{
        fontSize:30,
        flex:7
    },
    icon:{
        flex:1,
    }
}
const styles = {
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    titleContent: {
        flexDirection: "row",
        backgroundColor: "#F1F4FB",
        height: clientWidth * 0.253,
        marginBottom: 5,
    },
    text: {
        flex: 6,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    h2: {
        fontSize: 24,
        lineHeight: 30
    },
    p: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 20,
        color: "#8E9091"
    },
    circleChart: {
        flex: 4,
    },
    titleIcon:{
        flex: 1,
        backgroundColor:"#FFF",
        justifyContent:'center'
    },
    calendarView: {
        // flex: 5,
        paddingTop: 20,
        backgroundColor: '#F1F4FB',
        height: clientWidth * 0.78,
        position: 'relative'
    },
    chartTitle: {
        flexDirection: "row",
        position: "absolute",
        width: '100%',
        height: 55,
        left: 0,
        top: 0,
        zIndex: 100
    },
    chartTitleLeft: {
        flex: 11,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    chartTitleRight: {
        flex: 9,
        paddingTop: 20,
        backgroundColor: "#fff"
    },
    h4: {
        fontSize: 16,
    },
    psmall: {
        fontSize: 14,
        color: "#8E9091"
    },
}

//                <View style={styles.calendarView} >
//                     <Calendar
//                         // Specify style for calendar container element. Default = {}
//                         style={styles.calender}
//                         // Specify theme properties to override specific styles for calendar parts. Default = {}
//                         theme={calenderOptiones.Theme}
//                         //current={'2017-06-17'}
//                         markedDates={{ [this.state.selected]: { selected: true } }}
//                         markingType={'string'}
//                         onDayPress={this.onDayPress}
//                     />
//                 </View>

// const calenderOptiones = {
//     Theme: {
//         calendarBackground: '#ffffff',
//         textSectionTitleColor: '#b6c1cd',
//         selectedDayBackgroundColor: '#FFA200',
//         selectedDayTextColor: '#ffffff',
//         todayTextColor: '#00adf5',
//         dayTextColor: '#7C86A2',
//         textDisabledColor: '#E1E4E7',
//         dotColor: '#00adf5',
//         selectedDotColor: '#ffffff',
//         arrowColor: '#2d4150',
//         monthTextColor: '#2d4150'
//     },
//     selected: '2017-06-17'
// };

// LocaleConfig.locales['cn'] = {
//     monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
//     monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
//     dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//     dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
// };
// LocaleConfig.defaultLocale = 'cn';