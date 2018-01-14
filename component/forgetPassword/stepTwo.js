import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import Http from '../../service/http';
import UserTemplate from '../usual/userTemplate';

export default class FPStepTwo extends Component {

    constructor(props) {
        super(props);
    }

    async getCode() {
        let { account } = this.props.navigation.state.params;
        if (!account) {
            console.log('请输入账号');
            /*
                保险政策
                如果这里没有账号，说明报错，需要退回到上一个路由
            */
            return;
        }
        const response = await Http.post('api/getcode', {
            account: account,
            isRegistered:true
        })
        if(!response.type){
            Alert.alert(response.data)
        }
    }

    changVericode(vericode) {
        this.vericode = vericode;
    }

    nextNaviegate() {
        const { navigate,
            state: {
                    params: {
                            account
                        }
                    }
                } = this.props.navigation;
        //验证码验证
        Http.post('api/checkcode', {
            account: account,
            vericode: this.vericode
        }).then(response => {
            if (response.type) {
                navigate('FPStepThree', {
                    account: account,
                    vericode: this.vericode
                })
            } else {
                Alert.alert(response.data);
            }
        })
    }

    render() {
        const inputPasswors = {
            title: {
                content: '请填写短信验证码'
            },
            text: {
                content: '验证码',
                style: {
                    color: '#FF5B29'
                }
            },
            input: {
                onChangeText: this.changVericode.bind(this),
                placeholder: "请输入验证码",
                maxLength: 11
            },
            button: {
                title: "下一步",
                onPress: this.nextNaviegate.bind(this)
            },
            varicode: {
                title: '获取验证码',
                onPress: this.getCode.bind(this)
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