import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Button,
    TextInput,
    Text
} from 'react-native';
import AccountCheck from '../../service/accountCheck';
import Http from '../../service/http';
import MD5 from 'crypto-js/md5';
import { LoginItem } from '../usual/item';
import { AccountButton } from '../usual/button';
import Storage from '../../service/storage';

const passwordType = ['oldPassword', 'newPassword', 'checkPassword'];
//从本地取出账号
const strArr = {
    oldPassword: '原始密码',
    newPassword: '新密码',
    checkPassword: '新密码'
}

class ModifyPasswordPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    changePassword(key, value) {
        this[key] = value;
    };

    async updatePassword() {
        let isValid = true;
        if (this[passwordType[1]] !== this[passwordType[2]]) {
            isValid = false;
            Alert, alert('两次密码输入不同');
            return;
        }
        passwordType.some(res => {
            if (!AccountCheck.isValidPassword(this[res])) {
                isValid = false;
                Alert.alert(strArr[res] + '格式错误，请输入6-21位字母与数字');
                return true;
            }
        });
        if (isValid) {
            const account = await Storage.getItem('account');

            Http.post('api/updatepassword', {
                account: account,
                oldPassword: password = MD5(this[passwordType[0]]).toString(),
                password: MD5(this[passwordType[1]]).toString()
            }).then(res => {
                if (res.type) {
                    Alert.alert('提示', '修改密码成功', [
                        {
                            text: '确定',
                            onPress: async () => {
                                this.props.navigation.goBack()
                            }
                        }
                    ]);
                } else {
                    Alert.alert('提示', '修改密码失败', [
                        {
                            text: '确定',
                        onPress: async () => {
                                this.props.navigation.goBack()                                
                            }
                        }
                    ])
                }
            })
        }
    }
    render() {
        const inputObjectArraty = [{
            secureTextEntry: true,
            placeholder: '请输入您的旧密码',
            onChangeText: (password) => this.changePassword(passwordType[0], password),
            key: 'mp0'
        }, {
            placeholder: '请输入您的新密码',
            secureTextEntry: true,
            onChangeText: (password) => this.changePassword(passwordType[1], password),
            key: 'mp1'
        }, {
            placeholder: '确认您的新密码',
            secureTextEntry: true,
            onChangeText: (password) => this.changePassword(passwordType[2], password),
            key: 'mp2'
        }]
        return (
            <View style={styles.containerStyle}>
                <View style={styles.contentStyle}>
                    {inputObjectArraty.map(res => {
                        return (
                            <LoginItem key={res.key} data={res}></LoginItem>
                        )
                    })}
                    <AccountButton
                        style={styles.checkViewStyle}
                        onPress={this.updatePassword.bind(this)}
                        title='确认修改'
                    ></AccountButton>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },
    contentStyle: {
        width: '80%',
        marginTop: 27,
    },
    form: {
        width: '100%',
    },
    item: {

    },
    checkViewStyle: {
        marginTop: 20,
        width: '100%',
        height: 45,
    },
    checkButtonStyle: {
        marginTop: 49,
        backgroundColor: '#FF5B29'
    },
    checkTextStyle: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
    },
});

export default ModifyPasswordPage;

