import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import AccountInfo from '../../../component/Account/accountInfo';
import Storage from '../../../service/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { MineListItem } from '../../../component/usual/item'
import realmManger from "../../../component/Realm/realmManager"
import { NavigationActions } from 'react-navigation'

var Pingpp = require('pingpp-react-native');

const createLeftIcon = (source) => {
    return {
        type: 'SimpleLineIcons',
        source
    }
}
const rightIcon = {
    type: 'SimpleLineIcons',
    name: 'arrow-right',
    iconStyle:{
        fontSize:10
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
            tipBorder: 1
        },
        {
            sref: 'CPStepThree',
            name: '版本更新',
            info: { account: 15895537043 },
            leftIcon:createLeftIcon('settings'),
            leftSource: require('../../../Images/account/account_version_update.png'),
            rightIcon,
            tipBorder: 0
        }, {
            sref: 'Feedback',
            name: '问题反馈',
            info: { user: 'Lucy' },
            leftIcon:createLeftIcon('user-follow'),
            leftSource: require('../../../Images/account/account_feedback.png'),
            rightIcon,
            tipBorder: 0
        }
    ];

    avatarClick() {

    };

    //退出登录
    outofLogin() {
        const { navigate } = this.props.navigation;
        realmManger.deleteAllRealmData()
        let clearPromise = Storage.clearAll()
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
        })
        clearPromise.then(res => {
                this.props.navigation.dispatch(resetAction)
           }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Image source={require('../../../Images/avatar.png')}
                        style={styles.thumbnail}
                        resizeMode={'contain'} />
                    <Text style={styles.phoneNumber}>
                        +86 {this.state.account}
                    </Text>
                </View>
                <View style={styles.tableView}>
                    {
                        this.listItemArray.map(result => (
                        <MineListItem
                            navigation={this.state.navigation}
                            item={result}
                            key ={result.name}
                        />))
                    }
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
        backgroundColor: 'white',
    },
    buttonView: {
        top: 55,
        alignItems: 'center'
    },
    outLogin: {
        lineHeight: 45,
        color: "#fff",
        paddingLeft: 5
    },
    outLoginIcon: {
        paddingTop: 3,
        lineHeight: 42,
        color: "#fff",
    },
    phoneNumber: {
        marginTop: 42,
        fontSize: 22,
        color: '#172434',
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginTop: 25,
        
    },
    tableView: {
        position: 'absolute',
        width: '100%',
        top: 255,

    },
    head: {
        position: 'absolute',
        top: 24,
        alignItems: 'center',
        width: '100%'
    },
    exitButtonStyle: {
        position: 'absolute',
        height: 53,
        width: '100%',
        bottom: 0,
        backgroundColor: "#FF5B29",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});



