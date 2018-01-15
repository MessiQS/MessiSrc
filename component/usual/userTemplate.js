import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AccountButton } from './button';



const textStyle = {
    code: {
        top: 55,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        borderWidth: 1,
        borderColor: '#FF5B29',
        borderRadius: 3,
        paddingLeft: 5,
        backgroundColor: '#fff',
        paddingRight: 5,
        height: 21,
        width: 76,
    },
    invalidCode: {
        borderColor: '#ccc',
    },
    text: {
        fontSize: 7,
        lineHeight: 7,
        color: '#FF5B29'
    },
    codeText: {
        fontSize: 10,
        color: '#FF5B29',
    },
    invalidCodeText: {
        color: "#ccc",
    }
}
export default class UserTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }
    isHaveTitle() {
        const { title } = this.state;
        if (title) {
            return (
                <Text style={styles.title}>{title.content}</Text>
            )
        }
    }
    isHaveText(initText) {
        let text;
        if (initText) {
            text = initText;
        } else {
            text = this.state.text;
        };
        if (text) {
            return (
                <Text style={[styles.text, text.style]}>{text.content}</Text>
            )
        }
    }
    isHaveVaricode() {
        const { varicode, isPending } = this.state;
        if (!varicode) {
            return;
        }
        if (isPending) {
            return (
                <View style={[textStyle.code, textStyle.invalidCode]}>
                    <Text style={[textStyle.codeText, textStyle.invalidCodeText]}>{varicode.title}</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={this.getCode} style={textStyle.code}>
                    <Text style={textStyle.codeText}>{varicode.title}</Text>
                </TouchableOpacity>
            )
        }
    }

    getCode = async () => {
        const { varicode } = this.state;
        const oldVaricode = this.props.data.varicode;
        const timeout = (time) => {
            time = parseInt(time, 10) - 1;
            if (time > 0) {
                this.setState({
                    isPending: true,//等待时间
                    varicode: {
                        ...varicode,
                        title: `(${time})`
                    }
                })
                this.timeouthash = setTimeout(timeout, 1000, time)
            } else {
                this.timeouthash = null
                this.setState({
                    isPending: false,//正常显示状态
                    varicode: {
                        ...varicode,
                        title: oldVaricode.title
                    }
                })
            }
        }
        if (varicode.title !== oldVaricode.title) {
            return;
        }
        await varicode.onPress();
        timeout(61)
    }

    componentWillUnmount() {
        if (this.timeouthash) {
            clearTimeout(this.timeouthash)
        }
    }

    inputRender(input) {
        const { text } = this.state;
        if (Array.isArray(input)) {
            var inputArr = input.map((res, index) => {

                res = Object.assign({
                    placeholder: '请输入',
                    maxLength: 21,
                    onChangeText: () => console.log('input change has no function')
                }, res)
                res.key = 'repeatInput' + index;

                return (
                    <View style={styles.input} key={res.key}>
                        {this.isHaveText(text[index])}
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={res.secureTextEntry}
                            style={styles.passwordInputStyle}
                            placeholder={res.placeholder}
                            maxLength={res.maxLength}
                            onChangeText={value => res.onChangeText(value)}
                        ></TextInput>
                    </View>
                )
            })
            return inputArr;
        } else {
            return (
                <View style={styles.input}>
                    {this.isHaveText()}
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={input.secureTextEntry}
                        style={styles.passwordInputStyle}
                        placeholder={input.placeholder}
                        maxLength={input.maxLength}
                        onChangeText={value => input.onChangeText(value)}
                    ></TextInput>
                </View>
            )
        }

    }
    render() {

        let { input, button } = this.state;

        if (!Array.isArray(input)) {
            input = Object.assign({
                placeholder: '请输入',
                maxLength: 21,
                onChangeText: () => console.log('input change has no function')
            }, input);
        };

        button = Object.assign({
            title: '确认',
            onPress: () => console.log('button is emptty')
        }, button)
        return (
            <View style={styles.container}>
                {this.isHaveTitle()}
                <View style={styles.form}>
                    {this.inputRender(input)}
                    {this.isHaveVaricode()}
                </View>
                <AccountButton
                    onPress={button.onPress}
                    title={button.title}
                    style={{ height: 45 }}
                    fontSize={16}
                ></AccountButton>
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
        backgroundColor: '#f6f6f6'
    },
    title: {
        fontSize: 18,
        color: "#000",
    },
    form: {
        marginTop: 20,
        marginBottom: 70
    },
    input: {
        flexDirection: 'row',
        paddingTop: 7,
        borderBottomColor: '#dcdcdc',
        paddingBottom: 7,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 14,
        color: "#9b9b9b",
        lineHeight: 29,
        justifyContent: 'center',
    },
    passwordInputStyle: {
        width: "100%",
        paddingBottom: 0,
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