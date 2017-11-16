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
            password:undefined,
            repeatPassword:undefined
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: '忘记密码',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    initPassowrd(password) {
        this.setState({
            password:password
        });
    };

    checkPassowrd(password) {
        this.setState({
            repeatPassword:password
        })
    };

    updatePassword() {
        const {repeatPassword,password} = this.state;
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
                state:{
                    params
                } } = this.props.navigation;
        Http.post('api/updatepassword', {
            account: params.account,
            password: secretPassword
        }).then(res => {
            if(res.type){
            //成功后跳转
                navigate('Login',{})
            }else{
            //失败后提示
                Alert.alert(res.data);
            }
        })
    }
    render() {
        const inputPasswors = {
            // title:{
            //     content:'请填写短信验证码'
            // },
            text:[
                {
                    content:'新密码',
                    style:{
                        color:'#FF5B29'
                    }
                },
                {
                    content:'确认密码',
                    style:{
                        color:'#FF5B29'
                    } 
                }
            ],
            input:[
                {
                    onChangeText:this.initPassowrd.bind(this),
                    placeholder:"请输入密码",
                    maxLength:11,
                    secureTextEntry:true,
                },
                {
                    onChangeText:this.checkPassowrd.bind(this),
                    placeholder:"请再次输入密码",
                    maxLength:11,
                    secureTextEntry:true,
                }
            ],
            button:{
                title:"完成",
                onPress:this.updatePassword.bind(this)
            }
        }
        return (
            <UserTemplate data = {inputPasswors} />
        );
    }
}