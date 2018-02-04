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
    NativeModules,
    Modal
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

    componentDidMount() {

        // realmManager.deleteAllRealmData()
        // Storage.clearAll()   
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

        let { account, password } = this.state;
        const { navigate } = this.props.navigation;
        const that = this
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
        
        this.setState({
            loading: true
        })

        password = MD5(password).toString();
        const loginResponse = await Http.post('api/login', {
            "account": account,
            "password": password
        })

        console.log("loginPage.js loginResponse", loginResponse)
        
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
            let userInfo = await this._handleUserInfo(data.user_id)
            console.log("loginPage.js userInfo", userInfo)

            if (userInfo.type == false) {
                console.log("api/getUserQuestionInfo error", userInfo)
                Alert('登录错误，请重试')
                return 
            }
            
            if (Object.keys(userInfo.data.lastPaperInfo).length !== 0) {

                let item = {
                    id: userInfo.data.lastPaperInfo.id,
                    title: userInfo.data.lastPaperInfo.title 
                }
                realmManager.updateCurrentExamInfo(item)
            }

            // let paperInfo = await that._handlePaperInfo(userInfo.data.userQuestionInfo)
            // console.log("login page paperInfo", paperInfo)
            
            // if (paperInfo.type == false) {
            //     console.log("api/getSinglePaperInfo error", paperInfo);
            //     Alert('登录错误，请重试')
            //     return 
            // }

            // for (let item of paperInfo.data) {

            console.log("api/ get single page info ", userInfo.data.lastPaperInfo)
            await that._downloadExam(userInfo.data.lastPaperInfo)
            //只存第一套的
            const paper_id = userInfo.data.lastPaperInfo['id'] || null
            let userQuestionInfo = {}
            if(!!paper_id){
                userQuestionInfo[paper_id] = userInfo.data.userQuestionInfo[paper_id]
            }

            that._handleMemoryModels(userQuestionInfo);
            console.log("loginpage.js _handleMemoryModels end")
            that.setState({
                loading: false
            })

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
            this.setState({
                loading: false
            })
        }
    };

    async _handleUserInfo(userId) {
        console.log("_handleUserInfo userId", userId)
        const that = this
        let value = await Http.get('api/getUserQuestionInfo', {
            user_id: userId,
        },true)

        return value
    }

    async _handlePaperInfo(examInfo) {
        const that = this
        var keys = Object.keys(examInfo)
        console.log("loginPage.js keys", keys)
        const value = await Http.get('api/getSinglePaperInfo', {
            paperId: keys
        },true)

        return value
    }

    async _downloadExam(item) {

        const json = await MessageService.downloadPaper({
            paperId: item.id
        });
        if (json.type == true) {

            console.log('login page.js _downloadExam', json)
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
    }

    async _handleMemoryModels(userQuestionInfo) {

        const that = this
        let keys = Object.keys(userQuestionInfo)
        console.log("keys", keys)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            console.log("userInfo.data.userQuestionInfo", userQuestionInfo)

            realmManager.saveMemoryModelsByExamData(userQuestionInfo[key], key);
        }
    }

    _sofewareAgreementClick() {
        const { navigate } = this.props.navigation;
        navigate('SoftwareAgreement', {})
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
    
    _renderProgress() {
        if (this.state.loading == true) {
            return (
                <Progress />
            )
        } else {
            return null
        }
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
                {this._renderProgress()}
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