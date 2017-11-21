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

LocaleConfig.locales['cn'] = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
};
LocaleConfig.defaultLocale = 'cn';

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
                    <View style={styles.text}>
                        <Text style={styles.h2}>2017年北京省考</Text>
                        <Text style={styles.p}>历年真题</Text>
                    </View>
                    <View style={styles.circleChart}>
						<Echarts option={pieOption.option} height={80} />
					</View>
                </View>
                <View style={styles.chartsView}>
                    <Echarts option={newPaperOption} height={220} />
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
const calenderOptiones = {
    Theme: {
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
    selected: '2017-06-17'
};

const styles = StyleSheet.create({
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
        flex: 2,
        flexDirection:"row",
    },
    text:{
        flex: 7,
    },
    circleChart:{
        flex: 3,
    },
    calendarView: {
        flex: 5,
        // height: 300,
    },
    calender: {
        paddingTop: 5,
        width: '100%',
        borderColor: '#eee',
    },
    chartsView: {
        flex: 5,
    }
});

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