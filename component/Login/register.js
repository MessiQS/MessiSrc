import React, { Component } from 'react';
import {
    Alert,
    View,
    TouchableOpacity,
    StyleSheet,
    Button
} from 'react-native';
import { Item, Input, Text } from 'native-base';
import stylesContainer, { styles } from './registerCss';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import Icon from 'react-native-vector-icons/Ionicons';
import MD5 from 'crypto-js/md5';

class Register extends React.Component {
    constructor(...props) {
        super();
        this.state = this.state || {};
    }
    _onPressButton() {
        let { account, password, phone, vericode } = this.state;
        if (!account) {
            Alert.alert('请输入账号')
            return;
        } else if (!password) {
            Alert.alert('请输入密码')
            return;
        } else if (!vericode) {
            Alert.alert('请输入验证码')
            return;
        };
        if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码');
            return;
        }
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('密码格式错误', '请输入6-20位密码，不包含特殊字符');
            return;
        }
        Http.post('api/signin', {
            account: account,
            password: MD5(password).toString(),
            phone: phone,
            vericode: vericode
        }).then(console.log)
    };
    //电话号码改变
    phoneChange(phone) {
        this.setState({
            "account": phone,
            "phone": phone
        })
    };
    //密码
    passwordtChange(password) {
        this.setState({
            "password": password
        })
    }
    codeChange(vericode) {
        this.setState({
            "vericode": vericode
        })
    };
    getCode() {
        let { account } = this.state;
        if (!account) {
            Alert.alert('请输入账号')
            return;
        } else if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码');
            return;
        };
        Http.post('api/getcode', {
            account: account
        }).then(response => {
            console.log(response)
        })
    }
    static navigationOptions = ({ navigation }) => ({
        title: '注册',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    render() {
        return (
            <View style={stylesContainer.container}>
                <Item>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-phone-portrait-outline"
                            size={23}
                            style={styles.icon}
                        />
                    </View>
                    <Input placeholder="请输入您的电话号码"
                        maxLength={11}
                        keyboardType={'numeric'}
                        onChangeText={phone => this.phoneChange(phone)}></Input>
                </Item>
                <Item>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-lock-outline"
                            size={23}
                            style={styles.icon}
                        />
                    </View>
                    <Input placeholder="请输入您的密码"
                        secureTextEntry={true}
                        maxLength={21}
                        onChangeText={passpord => this.passwordtChange(passpord)}></Input>
                </Item>
                <Item>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-filing-outline"
                            size={24}
                            style={styles.icon}
                        />
                    </View>
                    <Input placeholder="请输入验证码"
                        keyboardType={'numeric'}
                        maxLength={4}
                        onChangeText={variCode => this.codeChange(variCode)}></Input>
                    <TouchableOpacity onPress={this.getCode.bind(this)}>
                        <View style={styles.vertificationCodeView}>
                            <Text style={styles.vertificationCodeText}>获取验证码</Text>
                        </View>
                    </TouchableOpacity>
                </Item>
                <View style={{ height: 56 }}></View>
                <View style={stylesContainer.registerView}>
                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <View style={styles.registerButton}>
                            <Text style={styles.registerText}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={stylesContainer.agreeView}>
                    <Text style={styles.agreeBaseText}>注册即表示同意本
                         <Text style={styles.agreeButton} >软件协议</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export default Register;