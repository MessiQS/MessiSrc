import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import MD5 from 'crypto-js/md5';
import UserTemplate from '../usual/userTemplate';

export default class FPStepThree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: undefined,
            repeatPassword: undefined
        }
    }

    // static navigationOptions = ({ navigation, screenProps }) => ({
    //     title: "忘记密码",        
    //     headerTitleStyle: {
    //         color: 'black', 
    //         alignSelf: 'center',
    //         fontSize: 20 
    //     },
    // 	headerStyle: {
    // 		backgroundColor: '#FFF',
    //         opacity: 1,
    //         borderBottomWidth: 0,
    //         shadowOpacity: 0.2,
    //         shadowColor: '#000',
    //         shadowOffset: {width: 0, height: 1}
    // 	},
    // 	headerTintColor: 'black',
    //     gesturesEnabled: true,
    //     headerLeft: (
    //         <TouchableOpacity onPress={ () => { navigation.goBack() }}>
    //             <View style={styles.headerLeftView}>
    //                 <Image style={{width:14, height:10}} source={require('../../Images/back_arrow.png')}/>
    //             </View>
    //         </TouchableOpacity>
    //     ),
    //     headerRight: navigation.state.params.headerRight
    // });

    initPassowrd(password) {
        this.setState({
            password: password
        });
    };

    checkPassowrd(password) {
        this.setState({
            repeatPassword: password
        })
    };

    async updatePassword() {
        const { repeatPassword, password } = this.state;
        if (repeatPassword !== password) {
            Alert.alert('两次输入不一致');
            return;
        }
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('请输入6-21位字母与数字')
            return;
        }
        /*  这里要不要发原始密码，待商榷 */
        /*  
            商榷结果，只发md5码 
            时间：2017年09月26日21:32:40
        */
        let secretPassword = MD5(password).toString();
        const { navigate,
            state: {
                    params
                } } = this.props.navigation;
        const res = await Http.post('api/updatepassword', {
            account: params.account,
            password: secretPassword
        })
        if (res.type) {
            //成功后跳转
            Alert.alert(
                '修改密码成功',
                '',
                [
                  {text: 'OK', onPress: () => navigate('Login',{})},
                ]
              )
        } else {
            //失败后提示
            Alert.alert(res.data);
        }
    }
    render() {
        const inputPasswors = {
            // title:{
            //     content:'请填写短信验证码'
            // },
            text: [
                {
                    content: '新密码',
                    style: {
                        color: '#FF5B29'
                    }
                },
                {
                    content: '确认密码',
                    style: {
                        color: '#FF5B29'
                    }
                }
            ],
            input: [
                {
                    onChangeText: this.initPassowrd.bind(this),
                    placeholder: "请输入密码",
                    maxLength: 11,
                    secureTextEntry: true,
                },
                {
                    onChangeText: this.checkPassowrd.bind(this),
                    placeholder: "请再次输入密码",
                    maxLength: 11,
                    secureTextEntry: true,
                }
            ],
            button: {
                title: "完成",
                onPress: this.updatePassword.bind(this)
            }
        }
        return (
            <UserTemplate data={inputPasswors} />
        );
    }
}

var styles = ({
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
})