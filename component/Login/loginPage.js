import React from 'react';
import {
    Alert,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    Keyboard,
    NativeModules
} from 'react-native';
import Http from '../../service/http';
import MD5 from 'crypto-js/md5';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCheck from '../../service/accountCheck';
import Storage from '../../service/storage';
import { LoginItem } from '../usual/item';
import {SamsoButton} from '../usual/button';
import styles from "./loginPageCss";
import realmManager from "../Realm/realmManager";
import MessageService from "../../service/message.service";
import Progress from "../../component/progress/progress"
import { NavigationActions } from 'react-navigation'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.isLockPushing = false
        this.state = {
            loading: false,
        };
    }

    phoneChange(account) {
        this.setState({
            account: account
        })
    }

    passwordtChange(password) {
        this.setState({
            password: password
        })
    }

    async login() {

        if (this._preventPushingMulitpleTimes()) {
            return 
        }
        realmManager.deleteAllRealmData()
        let clearPromise = await Storage.clearAll()


        let { account, password } = this.state;
        const { navigate } = this.props.navigation;
        if (!account) {
            Alert.alert('请输入账号');
            return;
        } else if (!password) {
            Alert.alert('请输入密码');
            return;
        };
        if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码');
            return;
        }
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('密码格式错误', '请输入6-20位密码，不包含特殊字符');
            return;
        };
        password = MD5(password).toString();
        const loginResponse = await Http.post('api/login', {
            "account": account,
            "password": password
        })
        console.log("loginResponse.type", loginResponse)
        const { type, data } = loginResponse
        if (type) {
            //将账号和token存到本地存储
            let setToken
            try {
                setToken = await Storage.multiSet([
                    ['accountToken', data.token],
                    ['account', account],
                    ['userId', data.user_id]
                ]);
                Keyboard.dismiss()

            } catch (e) {
                Alert('登录错误，请重试')
                return 
            }
            data.userInfo.buyedInfo = !!data.userInfo.buyedInfo ? JSON.stringify(data.userInfo.buyedInfo) : []
            var examIdJson = JSON.stringify(data.userInfo.buyedInfo)
            console.log("loginPage.js examIdJson", examIdJson);
            var user = {
                userId: data.user_id,
                token: data.token,
                examIds: examIdJson
            }
            console.log("login page user ", user)
            await realmManager.createUser(user)
            this._handleUserInfo(data.user_id)

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })                
                ]
            })
            this.props.navigation.dispatch(resetAction)

        } else {
            //此处提示错误信息
            Alert.alert(data);
        }
    };

    _handleUserInfo(userId) {
        console.log("_handleUserInfo userId", userId)
        const that = this
        Http.get('api/getUserQuestionInfo', {
            user_id: userId,
        },true).then((value) => {
            console.log("loginPage.js value", value)
            if (value.type == "true") {
                that._getPaperInfo(value)
            } else {
                console.log("api/getUserQuestionInfo error", value)
            }

        }).catch(err => {
            console.log("api/getUserQuestionInfo error", err)
        })
    }

    async _getPaperInfo(userInfo) {
        const that = this
        var keys = Object.keys(userInfo.data)
        console.log("keys", keys)
        const value = await Http.get('api/getSinglePaperInfo', {
            paperId: keys
        },true)

        console.log("api/getSinglePaperInfo", value);

        for (let item of value.data) {

            console.log("api/ get single page info ", item)
            await that._downloadExam(item)
        }
        await that._handleMemoryModels(userInfo);

    }

    async _downloadExam(item) {

        const json = await MessageService.downloadPaper({
            paperId: item.id
        });
        const papers = await realmManager.createQuestion(json)
        const memoryModels = await realmManager.createMemoryModels(papers, item.id)
        console.log("login page ", memoryModels);
        await realmManager.createExaminationPaper({
            id: item.id,
            title: item.title,
            questionPapers: papers,
            year: item.year,
            province: item.province,
            version: item.version,
            purchased: true,
            price: parseFloat(item.price),
        })
        console.log("_downloadExam", item)
    }

    async _handleMemoryModels(userInfo) {
        console.log("_handleMemoryModels", userInfo)
        const that = this

        for (let key in userInfo.data) {

            console.log("userInfo.data[key]", userInfo.data[key])
            realmManager.saveMemoryModelsByExamData(userInfo.data[key], key);
        }
    }

    _sofewareAgreementClick() {
        const { navigate } = this.props.navigation;
        navigate('SoftwareAgreement', {})
    }

    _renderProgress() {
        if (this.state.loading == true) {
            return (
                <Progress />
            )
        } else {
            return null
        }
    }

    _preventPushingMulitpleTimes() {

        const that = this
        if (this.isLockPushing == true) {
            return true
        }
		this.isLockPushing = true
		
        setTimeout(() => {
            that.isLockPushing = false
		}, 1000);
		return false;
	}
 
    render() {
        const { navigate } = this.props.navigation;
        const inputObjectArraty = [{
            placeholder: '请输入您的电话号码',
            keyboardType: 'numeric',
            onChangeText: account => this.phoneChange(account),
            iconName: "ios-phone-portrait-outline",
            maxLength: 11,
            key: 'loginPage0'
        }, {
            placeholder: '请输入您的密码',
            secureTextEntry: true,
            iconName: "ios-lock-outline",
            onChangeText: password => this.passwordtChange(password),
            key: 'loginPage1'
        }]
        return (
            <View style={styles.container}>
                {inputObjectArraty.map(res => {
                    return (<LoginItem key={res.key} data={res}></LoginItem>)
                })}
                <View style={styles.forgotButton}>
                    <Text onPress={() =>
                        navigate('FPStepOne',
                            { name: 'FPStepOne' }
                        )}
                        style={styles.forgotText}>忘记密码</Text>
                </View>
                <SamsoButton
                    style={styles.enter}
                    onPress={this.login.bind(this)}
                    title='登录'
                ></SamsoButton>
                <ScrollView></ScrollView>
                <View style={styles.agreeView}>
                    <Text style={styles.agreeBaseText}>注册即表示同意本
                        <Text style={styles.agreeButton} onPress={this._sofewareAgreementClick.bind(this)}>软件协议</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export default LoginPage;