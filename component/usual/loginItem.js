import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginItem extends Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
    }

    render() {
        let { data } = this;

        data = Object.assign({
            placeholder: "请输入",
            keyboardType: null,
            maxLength: 21,
            secureTextEntry:false,
            onChangeText: () => console.log('input change has no function')
        }, data);
        return (
            <View style={styles.item}>
                <View style={styles.iconViewStyle}>
                    <Icon 
                        name={data.iconName}
                        style={styles.icon}
                    />
                </View>
                <TextInput
                    secureTextEntry={data.secureTextEntry}
                    placeholder={data.placeholder}
                    keyboardType={data.keyboardType}
                    maxLength={data.maxLength}
                    onChangeText={data.onChangeText}></TextInput>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        marginTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        borderBottomWidth :1,
        borderBottomColor:'#dcdcdc'
    },
    iconViewStyle: {
        marginRight: 5,
        marginLeft: 10,
        width: 23,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 23,
        opacity: 0.7,
    },
});