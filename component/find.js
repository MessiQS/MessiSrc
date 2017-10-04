/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import Echarts from 'native-echarts';


LocaleConfig.locales['cn'] = {
    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
    dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'cn';

export default class Find extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '发现'
    });

    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
    }
    render() {
        const option = {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                data: ['遗忘曲线', '永久记忆']
            },
            xAxis: {
                data: ["一", "二", "三", "四", "五", "六", "日"]
            },
            yAxis: {},
            series: [{
                name: '遗忘曲线',
                type: 'line',
                data: [5000, 4000, 3000, 2000, 1000, 0],
                smooth: true
            }, {
                name: '永久记忆',
                type: 'line',
                data: [20, 20, 20, 20, 20, 20, 20]
            }]
        };

        return (
            <View style={styles.container}>
                <View style={styles.calendarView} >
                    <Calendar
                        // Specify style for calendar container element. Default = {}
                        style={styles.calender}
                        // Specify theme properties to override specific styles for calendar parts. Default = {}
                        theme={calenderOptiones.Theme}
                        //current={'2017-06-17'}
                        markedDates={{[this.state.selected]: {selected: true}}}
                        markingType={'string'}
                        onDayPress={this.onDayPress}
                    />
                </View>
                {/* <View style={styles.chartsView}> */}
                    <Echarts style={styles.charts} option={option}/>
                {/* </View>   */}
                {/* <Echarts style={styles.charts} option={option}/>       */}
            </View>
        );
    }
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}
const calenderOptiones={
    Theme : {
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#FFA200',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#7C86A2',
        textDisabledColor: '#E1E4E7',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#2d4150',
        monthTextColor: '#2d4150'
    },
    selected:'2017-06-17'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',        
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    welcome:{
        flex: 1,
    },
    calendarView: {
        height: 300,
    },
    calender:{    
        paddingTop: 5,
        
        borderColor: '#eee',
        height: 350,
    },
    chartsView: {
        flex: 3,
    },
    charts: {
        flex:3,

    }
});

