/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Echarts from 'native-echarts';
import { newPaper ,pieOption} from './chartOptions';



const clientWidth = 375;

export default class Find extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '发现'
    });

    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
    }
    componentWillMount() {

    }
    render() {
        const newPaperOption = newPaper.option;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <View style={styles.titleContent}>
                        <View style={styles.text}>
                            <Text style={styles.h2}>2017年北京省考</Text>
                            <Text style={styles.p}>历年真题</Text>
                        </View>
                        <View style={styles.circleChart}> 
                            <Echarts option={pieOption.option} height={90} />
                        </View>
                    </View>
                </View>
                <View style={styles.calendarView}>
                    <View style={styles.chartTitle}>
                        <View style={styles.chartTitleLeft}>
                            <Text style={styles.h4}>过去6日刷题亮统计</Text>
                            <Text style={styles.psmall}>历年真题</Text>
                        </View>
                        <View style={styles.chartTitleRight}>
                            <Text style={styles.h4}>本月共进行6次</Text>
                            <Text style={styles.psmall}>最后刷题日：今日</Text>
                        </View>
                    </View>
                    <Echarts style={styles.chart} option={newPaperOption} height={clientWidth*0.6} />
                </View>
                <View style={styles.chartsView}>
                    <Echarts option={newPaperOption} height={250} />
                </View>
            </View>
        );
    }
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    welcome: {
        flex: 1,
    },
    title: {
        paddingBottom:5,
        backgroundColor:"#F1F4FB",
        height:clientWidth*0.253,
    },
    titleContent:{
        flexDirection:"row",
        // paddingBottom:10,
        // paddingRight:20,
    },
    text:{
        flex: 6,
        paddingTop:20,
        paddingLeft:15,
        backgroundColor:"#fff"
    },
    h2:{
        fontSize:24,
        lineHeight:30
    },
    p:{
        marginTop:5,
        fontSize:14,
        lineHeight:20,
        color:"#8E9091"
    },
    circleChart:{
        flex: 4,
    },
    calendarView: {
        // flex: 5,
        paddingTop:20,
        backgroundColor:'green',
        height: clientWidth*0.8,
        position:'relative'
    },
    chartTitle:{
        flexDirection:"row",
        position:"absolute",
        width:'100%',
        height:55,   
        left:0,
        top:0,
        zIndex:100     
    },
    chartTitleLeft:{
        flex: 11,
        paddingTop:20,
        paddingLeft:15,
        backgroundColor:"#fff"
    },
    chartTitleRight:{
        flex: 9,
        paddingTop:20,
        backgroundColor:"#fff"
    },
    chart:{
        // marginTop:200,
    },
    h4:{
        fontSize:14,
        lineHeight:16,
    },
    psmall:{
        fontSize:14,
        lineHeight:16,
        color:"#8E9091"
    },
    calender: {
        paddingTop: 5,
        width: '100%',
        borderColor: '#eee',
    },
    chartsView: {
        height:300,
        backgroundColor:'black'        
    }
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