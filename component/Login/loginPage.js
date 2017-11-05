import React from 'react';
import {
    Alert,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import Http from '../../service/http';
import MD5 from 'crypto-js/md5';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCheck from '../../service/accountCheck';
import Storage from '../../service/storage';


class LoginPage extends React.Component {

    constructor(...props) {
        super();
        this.state = this.state || {};
    }

    static navigationOptions = ({ navigation }) => ({
        title: '登录',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });
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
    login() {
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
        Http.post('api/login', {
            "account": account,
            "password": password
        }).then(({ type, data, token }) => {
            if (type) {
                //将账号和token存到本地存储
                let setToken = Storage.multiSet([
                                                ['accountToken',token],
                                                ['account',account]
                                            ]);
                setToken.then( res => {
                    navigate('MyTab',{})
                },err => {
                    Alert('登录错误，请重试')
                })
            } else {
                //此处提示错误信息
                Alert.alert(data);
            }
        })
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-phone-portrait-outline"
                            style={styles.icon}
                        />
                    </View>
                    <TextInput placeholder="请输入您的电话号码" 
                            keyboardType={'numeric'} 
                            maxLength={11} 
                            onChangeText={account => this.phoneChange(account)}></TextInput>
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.item}>
                    <View style={styles.iconViewStyle}>
                        <Icon name="ios-lock-outline"
                            style={styles.icon}
                        />
                    </View>
                    <TextInput placeholder="请输入您的密码" 
                            secureTextEntry={true}
                            maxLength={21} 
                            onChangeText={password => this.passwordtChange(password)}></TextInput>
                </View>
                <View style={styles.bottomLine}></View>
                <View style={styles.forgotButtonView}>
                    <TouchableOpacity style={styles.forgotButton}    
                        onPress={() =>
                        navigate('ForgotPasswordStepOnePage', { name: 'ForgotPasswordStepOnePage' })
                    }>
                        <Text style={styles.forgotText}>忘记密码</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginButtonView} >
                    <TouchableOpacity onPress={this.login.bind(this)}>
                        <View style={styles.loginButton}>
                            <Text style={styles.loginText}>登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.agreeView}>
                    <Text style={styles.agreeBaseText}>注册即表示同意本
                        <Text style={styles.agreeButton} >软件协议</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = {

    container: {
        paddingTop: 69,
        flex: 1,
        paddingHorizontal: 48,
    },
    form: {
        flex: 2,
    },
    item: {
        marginTop: 20,
        height:50,
        flexDirection: 'row',
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
    forgotButtonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
    },
    forgotButton: {
        height: 20,
        backgroundColor: null,
    },
    forgotText: {
        color: '#9B9B9B',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    bottomLine: {
        height:1,
        backgroundColor: "#D8D8D8",
    },
    loginButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
    },
    loginButton: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: '#FFA200',
        height: 55,
        width: 290,
        borderRadius: 8,
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    agreeView: {
        bottom: 10,
        width: '133%',
        position: 'absolute',
    },
    agreeText: {
        width: 100,
        height: 50,
        color: '#FFA200',
    },
    agreeBaseText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
    },
    agreeButton: {
        fontSize: 14,
        color: "#ffa200"
    }
};

export default LoginPage;