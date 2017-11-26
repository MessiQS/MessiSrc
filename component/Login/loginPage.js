import React from 'react';
import {
    Alert,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import Http from '../../service/http';
import MD5 from 'crypto-js/md5';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCheck from '../../service/accountCheck';
import Storage from '../../service/storage';
import { LoginItem } from '../usual/item';
import  SamsoButton  from '../usual/button';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.state || {};
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '登录',        
        headerTitleStyle: {
            color: 'black', 
            alignSelf: 'center',
            fontSize: 20 
        },
		headerStyle: {
			backgroundColor: '#FFF',
            opacity: 1,
            borderBottomWidth: 0,
            shadowOpacity: 0.2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1}
		},
		headerTintColor: 'black',
        gesturesEnabled: true,
        headerLeft: (
            <TouchableOpacity onPress={ () => { navigation.goBack() }}>
                <View style={styles.headerLeftView}>
                    <Image source={require('../../Images/back_arrow.png')}/>
                </View>
            </TouchableOpacity>
        ),
        headerRight: navigation.state.params.headerRight
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
                    ['accountToken', token],
                    ['account', account]
                ]);
                setToken.then(res => {
                    navigate('MyTab', {})
                }, err => {
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
        const inputObjectArraty = [{
            placeholder: '请输入您的电话号码',
            keyboardType: 'numeric',
            onChangeText: account => this.phoneChange(account),
            iconName:"ios-phone-portrait-outline",
            maxLength:11,
            key:'loginPage0'
        },{
            placeholder: '请输入您的密码',
            secureTextEntry:true,
            iconName:"ios-lock-outline",
            onChangeText:password => this.passwordtChange(password),
            key:'loginPage1'
        }]
        return (
            <View style={styles.container}>
                {inputObjectArraty.map( res => {
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
                    title = '登录'
                ></SamsoButton>

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
        backgroundColor: "white"
    },
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
    forgotButton: {
        marginTop:15,
        height: 20,
        backgroundColor: null,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    forgotText: {
        color: '#9B9B9B',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    enter:{
        marginTop:56,
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
        color: "#FF5B29"
    }
};

export default LoginPage;