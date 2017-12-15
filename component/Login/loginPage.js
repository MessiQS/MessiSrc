import React from 'react';
import {
    Alert,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Keyboard
} from 'react-native';
import Http from '../../service/http';
import MD5 from 'crypto-js/md5';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCheck from '../../service/accountCheck';
import Storage from '../../service/storage';
import { LoginItem } from '../usual/item';
import SamsoButton from '../usual/button';
import styles from "./loginPageCss";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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
        Keyboard.dismiss()
        password = MD5(password).toString();
        const { type, data } = await Http.post('api/login', {
            "account": account,
            "password": password
        })
        if (type) {
            const { token } = data;
            //将账号和token存到本地存储
            let setToken = await Storage.multiSet([
                ['accountToken', token],
                ['account', account]
            ]);

            if (setToken && setToken.type === "fail") {
                Alert.alert(setToken.data)
            } else {
                navigate('Home', {})
            }
        } else {
            //此处提示错误信息
            Alert.alert(data);
        }
    };

    _sofewareAgreementClick() {
        const { navigate } = this.props.navigation;
        navigate('SoftwareAgreement', {})
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

                <View style={styles.forgotButton}
                >
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