import React, {Component} from 'react';
import Echarts from 'native-echarts';

export default class Account extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: '',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });


    render() {
        const option = {
            series : [
                {
                    type:'pie',
                    data:[289,2987,40]
                }
            ]
        };
        return (
            <Echarts option={option} height={300}/>
        );
    }
}