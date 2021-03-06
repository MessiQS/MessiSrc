import React, { Component } from 'react'
import {
    Alert,
    View,
    TouchableOpacity,
    StyleSheet,
    Button,
    TextInput,
    Text,
    ImageBackground,
    ScrollView,
    Keyboard
} from 'react-native'
import stylesContainer, { styles } from './registerCss'
import Http from '../../service/http'
import AccountCheck from '../../service/accountCheck'
import MD5 from 'crypto-js/md5'
import realmManager from "../Realm/realmManager"
import Storage from '../../service/storage'
import { NavigationActions } from 'react-navigation'
import SwiperToUnlock from '../swiperToUnlock'

class Register extends React.Component {

    constructor(...props) {
        super()
        this.state = {
            codeText: "获取验证码",
            isUnlock: false,//是否解锁
        }
    }
    unlock = () => {
        this.setState({
            isUnlock: true
        })
    }
    onRefresh = () => {
        this.setState({
            isUnlock: false
        })
    }
    async _onPressButton() {
        let { account, password, phone, vericode } = this.state
        if (!account) {
            Alert.alert('请输入账号')
            return
        } else if (!password) {
            Alert.alert('请输入密码')
            return
        } else if (!vericode) {
            Alert.alert('请输入验证码')
            return
        }
        if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码')
            return
        }
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('密码格式错误', '请输入6-20位字母数字组合，不包含特殊字符')
            return
        }

        password = MD5(password).toString()
        const responseData = await Http.post('api/signin', {
            account,
            password,
            vericode
        })

        if (responseData.type == false) {

            Alert.alert(responseData.data)
            return
        }

        if (!!responseData.type) {
            let { type, data } = await Http.post('api/login', {
                account,
                password
            })

            if (type == false) {
                //此处提示错误信息
                Alert.alert(data)
                return
            }

            const { navigate } = this.props.navigation
            if (type) {
                //将账号和token存到本地存储
                await Storage.multiSet([
                    ['accountToken', data.token],
                    ['account', account],
                    ['userId', data.user_id]
                ]);

                let examIdJson = JSON.stringify([])
                var user = {
                    userId: data.user_id,
                    token: data.token,
                    examIds: examIdJson
                }
                await realmManager.createUser(user)
                Keyboard.dismiss()
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' })
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        }

        // /********************************** */
        // //将账号和token存到本地存储
        // let setToken = await Storage.multiSet([
        //     ['accountToken', "111"],
        //     ['account', "183715873321"],
        //     ['userId',  "ss00001"]
        // ]);

        // // console.log("setToken", setToken)
        // var emptyArray = []
        // let examIdJson = JSON.stringify(emptyArray)
        // var user = {
        //     userId: "1774088",
        //     token: "1774088",
        //     examIds: examIdJson
        // }
        // await realmManager.createUser(user)
        // console.log("register.js realmManager.createUser(user)", user)

        // // setToken.then(res => {
        //     Keyboard.dismiss()
        //     const resetAction = NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({ routeName: 'Home' })
        //         ]
        //     })
        //     this.props.navigation.dispatch(resetAction)
        // // }, err => {
        // //     Alert('注册错误，请重试')
        // // })
    }

    _handleUserInfo(userId) {
        console.log("_handleUserInfo userId", userId)
        const that = this
        Http.get('api/getUserQuestionInfo', {
            user_id: userId,
        }, true).then((value) => {
            console.log("register.js value", value)
            if (value.type == true) {
                that._getPaperInfo(value)
            } else {
                console.log("api/getUserQuestionInfo error", value)
            }
        }).catch(err => {
            console.log("api/getUserQuestionInfo error", err)
        })
    }

    //电话号码改变
    phoneChange(phone) {
        this.setState({
            "account": phone,
            "phone": phone
        })
    }
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
    }

    getCode = async () => {
        if (this.state.codeText !== "获取验证码") {
            return
        }

        let { account, isUnlock } = this.state
        if (!account) {
            Alert.alert('请输入账号')
            return
        } else if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码')
            return
        } else if (!isUnlock) {
            Alert.alert('请先完成滑动验证！')
            return
        }

        const timeout = (time) => {
            time = parseInt(time, 10) - 1
            if (time > 0) {
                this.setState({
                    isPending: true,
                    codeText: `(${time})`
                })
                this.timeouthash = setTimeout(timeout, 1000, time)
            } else {
                this.timeouthash = null
                this.setState({
                    isPending: false,
                    codeText: "获取验证码"
                })
            }
        }

        const response = await Http.post('api/getcode', {
            account: account
        })
        if (!response.type) {
            Alert.alert(response.data)
        } else {
            timeout(61)
        }
    }

    renderGetCode() {
        if (this.state.isPending) {
            return (
                <View style={[styles.vertificationCodeView, styles.isValidCodeView]}>
                    <Text style={styles.vertificationCodeText}>{this.state.codeText}</Text>
                </View>
            )
        } else {
            return (<TouchableOpacity onPress={this.getCode}>
                <ImageBackground style={styles.vertificationCodeView} source={require('../../Images/verti_code_button.png')}>
                    <Text style={styles.vertificationCodeText}>{this.state.codeText}</Text>
                </ImageBackground>
            </TouchableOpacity>)
        }
    }
    componentWillUnmount() {
        if (this.timeouthash) {
            clearTimeout(this.timeouthash)
        }
    }

    _sofewareAgreementClick() {
        const { navigate } = this.props.navigation
        navigate('SoftwareAgreement', {})
    }

    render() {
        return (
            <View style={stylesContainer.container}>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <ImageBackground style={styles.icon} resizeMode={'contain'} source={require('../../Images/phone_icon.png')}></ImageBackground>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                        placeholder="请输入您的电话号码"
                        maxLength={11}
                        keyboardType={'numeric'}
                        onChangeText={phone => this.phoneChange(phone)} />
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <ImageBackground style={styles.icon} resizeMode={'contain'} source={require('../../Images/password_icon.png')}></ImageBackground>
                    </View>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        placeholder="请输入您的密码"
                        secureTextEntry={true}
                        maxLength={21}
                        onChangeText={passpord => this.passwordtChange(passpord)} />
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <ImageBackground style={styles.icon} resizeMode={'contain'} source={require('../../Images/verti_icon.png')}></ImageBackground>
                    </View>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.vertiTextInput}
                        placeholder="请输入验证码"
                        keyboardType={'numeric'}
                        maxLength={4}
                        onChangeText={variCode => this.codeChange(variCode)} />
                    <ScrollView></ScrollView>
                    {this.renderGetCode()}
                </View>
                <View style={styles.bottomLineVertification}></View>
                <View style={{ height: 6 }}></View>

                <SwiperToUnlock
                    width={280}
                    height={180}
                    onSuccess={this.unlock}
                    onRefresh={this.onRefresh}
                />

                <View style={{ height: 50 }}></View>
                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                    <ImageBackground style={styles.registerButton} source={require('../../Images/register_button.png')}>
                        <Text style={styles.registerText}>注册</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <ScrollView></ScrollView>
                <View style={stylesContainer.agreeView}>
                    <Text style={styles.agreeBaseText}>注册即表示同意本
                         <Text style={styles.agreeButton} onPress={this._sofewareAgreementClick.bind(this)}>软件协议</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

export default Register