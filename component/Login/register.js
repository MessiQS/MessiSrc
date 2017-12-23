import React, { Component } from 'react';
import {
    Alert,
    View,
    TouchableOpacity,
    StyleSheet,
    Button,
    TextInput,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import stylesContainer, { styles } from './registerCss';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import Icon from 'react-native-vector-icons/Ionicons';
import MD5 from 'crypto-js/md5';
import realmManager from "../Realm/realmManager";

class Register extends React.Component {

    constructor(...props) {
        super();
        this.state =  {
            codeText:"获取验证码",
        };
    }
    async _onPressButton() {
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
            Alert.alert('密码格式错误', '请输入6-20位字母数字组合，不包含特殊字符');
            return;
        }
        password = MD5(password).toString()
        const responseData = await Http.post('api/signin', {
            account,
            password,
            vericode: vericode
        })
        if(!!responseData.type){
            Http.post('api/login', {
                account,
                password
            }).then(({ type, data }) => {
                const { navigate } = this.props.navigation;
                if (type) {
                    //将账号和token存到本地存储
                    let setToken = Storage.multiSet([
                        ['accountToken', data.token],
                        ['account', account]
                    ]);
                    setToken.then(res => {
                        Keyboard.dismiss()
                        navigate('Home', {})
                    }, err => {
                        Alert('登录错误，请重试')
                    })
                    const examIdJson = JSON.stringify(data.userInfo.buyedInfo)
                    var user = {
                        userId: data.user_id,
                        token: data.token,
                        examIds: examIdJson
                    }
                    realmManager.createUser(user)
    
                } else {
                    //此处提示错误信息
                    Alert.alert(data);
                }
            })
        }

        // Keyboard.dismiss()
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
    getCode = () => {
        if(this.state.codeText !== "获取验证码"){
            return;
        }

        let { account } = this.state;
        if (!account) {
            Alert.alert('请输入账号')
            return;
        } else if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码');
            return;
        };

        const timeout = (time) => {
            time = parseInt(time,10) - 1;
            if(time > 0 ){
                this.setState({
                    codeText:`(${time})`
                })
                this.timeouthash = setTimeout(timeout,1000,time)
            }else{
                this.timeouthash = null
                this.setState({
                    codeText:"获取验证码"
                })
            }
        }
        Http.post('api/getcode', {
            account: account
        }).then(response => {
            timeout(61)
            console.log(response)
        })
    }

    componentWillUnmount(){
        if(this.timeouthash){
            clearTimeout(this.timeouthash)
        }
    }

    _sofewareAgreementClick() {
        const { navigate } = this.props.navigation;
        navigate('SoftwareAgreement', {})
    }

    render() {
        return (
            <View style={stylesContainer.container}>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-phone-portrait-outline"
                            size={23}
                            style={styles.icon}
                        />
                    </View>
                    <TextInput 
                        style={styles.textInput} 
                        underlineColorAndroid={'transparent'}
                        placeholder="请输入您的电话号码"
                        maxLength={11}
                        keyboardType={'numeric'}
                        onChangeText={phone => this.phoneChange(phone)}></TextInput>
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-lock-outline"
                            size={23}
                            style={styles.icon}
                        />
                    </View>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput} 
                        placeholder="请输入您的密码"
                        secureTextEntry={true}
                        maxLength={21}
                        onChangeText={passpord => this.passwordtChange(passpord)}></TextInput>
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-filing-outline"
                            size={24}
                            style={styles.icon}
                        />
                    </View>
                    <TextInput 
                        underlineColorAndroid={'transparent'}
                        style={styles.vertiTextInput} 
                        placeholder="请输入验证码"
                        keyboardType={'numeric'}
                        maxLength={4}
                        onChangeText={variCode => this.codeChange(variCode)}></TextInput>
                    <ScrollView></ScrollView>
                    <TouchableOpacity onPress={this.getCode}>
                        <View style={styles.vertificationCodeView}>
                            <Text style={styles.vertificationCodeText}>{this.state.codeText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomLineVertification}></View>
                <View style={{ height: 56 }}></View>
                <View style={stylesContainer.registerView}>
                    <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                        <View style={styles.registerButton}>
                            <Text style={styles.registerText}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView></ScrollView>
                <View style={stylesContainer.agreeView}>
                    <Text style={styles.agreeBaseText}>注册即表示同意本
                         <Text style={styles.agreeButton} onPress={this._sofewareAgreementClick.bind(this)}>软件协议</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export default Register;