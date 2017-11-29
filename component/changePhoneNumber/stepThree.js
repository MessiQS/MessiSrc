import React from 'react';
import {
    Alert,
} from 'react-native';
import AccountCheck from '../../service/accountCheck';
import Http from '../../service/http';
import Storage from '../../service/storage';
import UserTemplate from '../usual/userTemplate';

export default class CPStepThree extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        title: '更换手机号',
        // headerStyle: {
        //     backgroundColor: '#051425',
        //     opacity: 0.9,
        // },
        // headerTintColor: 'white',
    });

    getCode() {
        const { account } = this.props.navigation.state.params;
        if (!account) {
            Alert.alert('请输入账号')
            return;
        } else if (!AccountCheck.isValidPhoneNumber(account)) {
            Alert.alert('账号格式错误', '请输入11位手机号码');
            return;
        };
        Http.post('api/getcode', {
            account: account
        }).then(response => {
            this.setState({
                account: account
            })
            console.log(response)
        })
    }
    //输入验证码
    updateData(vericode) {
        this.setState({
            vericode: vericode,
        })
    }

    updatePhone() {
        const { account, vericode } = this.state;
        const { navigate } = this.props.navigation;
        //检测验证码
        Http.post('api/checkcode', {
            account: account,
            vericode: vericode
        }).then(({ type, data }) => {
            if (type) {
                //成功则变更密码
                Storage.getItem('account').then(oldAccount => {
                    Http.post('api/updatephone', {
                        oldAccount: oldAccount,
                        account: account
                    }).then(({ type, data }) => {
                        if (type) {
                            Storage.setItem({
                                key: 'account',
                                value: account
                            });
                            Alert.alert('提示', '更新账号成功', [
                                {
                                    text: '确定',
                                    onPress: async () => {
                                        navigate('mine', { account: account })
                                    }
                                }
                            ]);
                        } else {
                            Alert.alert('提示', '更新账号失败', [
                                {
                                    text: '确定',
                                    onPress: async () => {
                                        navigate('mine', { account: account })
                                    }
                                }
                            ])
                        }
                    })
                })
                //失败弹出信息
            } else {
                Alert.alert(data);
            }
        })

    }

    render() {
        const inputPasswors = {
            title: {
                content: '填写短信验证码完成更换'
            },
            text: {
                content: '验证码',
                style: {
                    color: '#FF5B29'
                }
            },
            input: {
                onChangeText: this.updateData.bind(this),
                placeholder: "请输入短信验证码",
                maxLength: 4
            },
            button: {
                title: "完成",
                onPress: this.updatePhone.bind(this)
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
