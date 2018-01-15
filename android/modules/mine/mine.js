/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import AccountInfo from '../../../component/Account/accountInfo';
import Storage from '../../../service/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { MineListItem } from '../../../component/usual/item'
import realmManager from "../../../component/Realm/realmManager"
import { NavigationActions } from 'react-navigation'


const createLeftIcon = (name) => {
    return {
        type: 'SimpleLineIcons',
        name
    }
}
const rightIcon = {
    type: 'SimpleLineIcons',
    name: 'arrow-right',
    iconStyle: {
        fontSize: 10
    }
}
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
        Storage.getItem('account').then(res => {
            this.setState({
                account: (() => {
                    let result = res.split('');
                    result.splice(3, 0, ' ');
                    result.splice(8, 0, ' ')
                    return result.join('');
                })()
            })
        })
    }

    listItemArray = [
        {
            sref: 'AccountInfo',
            name: '账号信息',
            info: { name: 'AccountInfo' },
            leftIcon:createLeftIcon('user'),
            leftSource: require('../../../Images/account/account_info.png'),
            rightIcon,
            tipBorder: 1,
            type: "route"
        },
        {
            sref: 'CPStepThree',
            name: '版本更新',
            info: { account: 15895537043 },
            leftIcon:createLeftIcon('settings'),
            leftSource: require('../../../Images/account/account_version_update.png'),
            rightIcon,
            tipBorder: 0,
            type: "alert"
        }, {
            sref: 'Feedback',
            name: '问题反馈',
            info: { user: 'Lucy' },
            leftIcon:createLeftIcon('user-follow'),
            leftSource: require('../../../Images/account/account_feedback.png'),
            rightIcon,
            tipBorder: 0,
            type: "route"
        }
    ];

    avatarClick() {

    };

    //退出登录
    outofLogin() {
        const { navigate } = this.props.navigation;
        realmManager.deleteAllRealmData()
        let clearPromise = Storage.clearAll()
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        })

        clearPromise.then(res => {
            this.props.navigation.dispatch(resetAction)
        })
    }

    _handleAction(item) {

        const { navigate } = this.props.navigation;

        if (item.type == "route") {
            navigate(item.sref, item.info)
        }

        if (item.type == "alert") {
            
        }
    }

    renderItem(item, index) {
        return (
            <TouchableOpacity key={index} onPress={() =>
                 this._handleAction(item)
                }>
                <View style={styles.cellTitleView}>
                    <View style={[styles.spanceView, mineStyles.leftIconContainer]}>
                        <ImageBackground source={item.leftSource} style={mineStyles.leftIcon} resizeMode={'contain'} />
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.textInView}>{item.name}</Text>
                    </View>
                    <View style={[styles.spanceView, mineStyles.rightIconContainer]} >
                        <ImageBackground style={mineStyles.rightIcon} source={require("../../../Images/find_arrow_right.png")} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <ImageBackground source={require('../../../Images/avatar.png')}
                        style={styles.thumbnail} />
                    <Text style={styles.phoneNumber}>
                        +86 {this.state.account}
                    </Text>
                </View>
                <View style={styles.tableView}>
                    <View style={styles.itemTitleView}>
                        <Text style={styles.itemTitle}>
                            个人中心
                        </Text>
                    </View>
                    {
                        this.listItemArray.map((result, index) => (
                            that.renderItem(result, index)
                    ))}
                </View>
                <TouchableOpacity style={styles.exitButtonStyle} onPress={this.outofLogin.bind(this)} >
                    <Icon name={'ios-log-out'} size={20} style={styles.outLoginIcon}></Icon>
                    <Text style={styles.outLogin}>退出登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Mine;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
    },
    buttonView: {
        top: 55,
        alignItems: 'center'
    },
    outLogin: {
        fontSize: 16,
        color: "#fff",
        paddingLeft: 5
    },
    outLoginIcon: {
        color: "#fff",
    },
    phoneNumber: {
        marginTop: 3,
        fontSize: 22,
        color: '#000',
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginTop: 25,
        borderRadius: 55
    },
    head: {
        flex: 4,
        alignItems: 'center',
        width: '100%'
    },
    tableView: {
        width: '100%',
        flex: 8
    },
    exitButtonStyle: {
        flex: 1,
        backgroundColor: "#FF5B29",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    cellTitleView: {
        flexDirection: 'row',
    },
    leftIcon: {
        lineHeight: 47,
        paddingLeft: 20
    },
    rightIcon: {
        lineHeight: 47,
        paddingLeft: 20
    },
    text: {
        flex: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: "#D3D5D7",
    },
    textInView: {
        lineHeight: 46,
        fontSize: 16,
        paddingLeft: 9
    },
    spanceView: {
        height: 47,
        flex: 1,
    }
});

