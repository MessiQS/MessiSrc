import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    View,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state =  Object.assign(this.props.item);
    }
    // componentWillUnmount(){
        
    // }
    // componentDidMount(){

    // }
    navigate(){
        this.state.navigation.navigate('Detail',{a:1})
    }
    // onPress={() => {
        // this.props.navigation.navigate('Detail', { user: 1 })
    // }}
    render() {
        return (
            <TouchableHighlight style={{marginTop:14}} onPress={() => {this.navigate(111)}}>
                <View style={styles.listItem}>
                    <View style={styles.Left}>
                        <View style={[styles.orange,{backgroundColor:this.state.bgcolor}]}>
                        </View>
                    </View>
                    <View style={styles.listItemText}>
                        <Text>{this.state.title}</Text>
                    </View>
                    <View style={styles.Right}>
                        <View style={styles.rightContent}>
                            <Text style={styles.rightText}>{this.state.completed}/{this.state.length}</Text>
                        </View>
                        <View style={styles.rightContent}>
                            <Icon name="chevron-thin-right" size={16} style={styles.icon} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        // justifyContent:'flex-start',
        height: 44,
        backgroundColor: "#fff",
    },
    Left: {
        borderRadius: 13,
        flex: 1,
        justifyContent: 'center',
        left: 20
    },
    Right: {
        flex: 2,
        justifyContent: 'flex-end',
        flexDirection: "row",
    },
    rightContent: {
        justifyContent: 'center',
        marginRight:10
    },
    rightText: {
        color: "#8f8e94",
    },
    icon:{
        color: "#8f8e94",
        justifyContent: 'center',
    },
    listItemText: {
        justifyContent: 'center',
        flex: 3
    },
    orange: {
        // backgroundColor: '#5AAFEE',
        height: 26,
        width: 26,
        borderRadius: 15
    },
})