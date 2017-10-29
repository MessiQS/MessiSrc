import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { StyleSheet } from 'react-native';
export default class Item extends Component {
    constructor(props){
        super(props);
        console.log(this.props.item);
    }
    componentWillUnmount(){

    }
    render() {
        return (
            <View style={styles.listItem}>
                <View style={styles.Left}>
                    <View style={styles.orange}>
                    </View>
                </View>
                <View style={styles.listItemText}>
                    <Text>1</Text>
                </View>
                <View style={styles.Right}>
                    <View style={styles.rightContent}>
                        <Text style={styles.rightText}>131231</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        marginTop: 14,
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
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    rightContent: {
        justifyContent: 'center',
    },
    rightText: {
        color: "#8f8e94"
    },
    listItemText: {
        justifyContent: 'center',
        flex: 3
    },
    orange: {
        backgroundColor: '#5AAFEE',
        height: 26,
        width: 26,
        borderRadius: 15
    },
})