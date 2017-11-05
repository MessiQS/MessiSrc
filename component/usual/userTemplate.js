import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native';
import SamsoButton from './button';
export default class UserTemplate extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    isHaveTitle() {
        const { title } = this.data;
        if (title) {
            return (
                <Text style={styles.title}>{title.content}</Text>
            )
        }
    }
    isHaveText() {
        const { text } = this.data;
        if (text) {
            return (
                <Text style={[styles.text, text.style]}>{text.content}</Text>
            )
        }
    }
    isHaveVaricode() {
        const { varicode } = this.data;
        const textStyle = {
            code: {
                top: 55,
                position: 'absolute',
                right: 0,
                borderWidth: 1,
                borderColor: '#ffa200',
                borderRadius: 3,
                paddingLeft: 5,
                backgroundColor: '#fff',
                paddingRight: 5
            },
            text: {
                fontSize: 12,
                lineHeight: 22,
                color: '#ffa200'
            }
        }
        if (varicode) {
            return (
                <SamsoButton
                    onPress={varicode.onPress}
                    title={varicode.title}
                    style={textStyle.code}
                    textStyle={textStyle.text}
                ></SamsoButton>
            )
        }
    }
    render() {

        let { input, button } = this.data;

        input = Object.assign({
            placeholder: '请输入',
            maxLength: 21,
            onChangeText: () => console.log('input change has no function')
        }, input);
        button = Object.assign({
            title: '确认',
            onPress: () => console.log('button is emptty')
        }, button)
        return (
            <View style={styles.container}>
                {this.isHaveTitle()}
                <View style={styles.input}>
                    {this.isHaveText()}
                    <TextInput
                        secureTextEntry={input.secureTextEntry}
                        style={styles.passwordInputStyle}
                        placeholder={input.placeholder}
                        maxLength={input.maxLength}
                        onChangeText={value => input.onChangeText(value)}
                    ></TextInput>
                    {this.isHaveVaricode()}
                </View>
                <SamsoButton
                    onPress={button.onPress}
                    title={button.title}
                ></SamsoButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: "14.28%",
        paddingRight: "14.28%",
        paddingTop: 36,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        color: "#000",
    },
    input: {
        marginTop: 20,
        // flex:1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 7,
        borderBottomColor: '#dcdcdc',
        marginBottom: 70
    },
    text: {
        fontSize: 14,
        color: "#9b9b9b",
        lineHeight: 29,
        justifyContent: 'center',
    },
    passwordInputStyle: {
        paddingTop: 3,
        fontSize: 14,
        lineHeight: 29,
        justifyContent: 'center',
        marginLeft: 16,
    },
    padd: {
        backgroundColor: "red"
    }
})