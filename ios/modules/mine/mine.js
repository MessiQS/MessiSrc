/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, version } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Vibration,
    Alert
} from 'react-native';
import AccountInfo from '../../../component/Account/accountInfo';
import Storage from '../../../service/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import realmManager from "../../../component/Realm/realmManager"
import { NavigationActions } from 'react-navigation'
import * as Progress from 'react-native-progress';
import main from '../../main';
import Http from '../../../service/http';
import MessageService from '../../../service/message.service';
import * as CustomAlert from '../../../component/progress/alert';
import { appVersion } from "../../../service/constant";

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
            navigation: props.navigation,
            showVersionInfo: false,
            showVersionAlert: false,
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
    outLoginButtonClick() {

        const that = this
        Alert.alert(
            '确定退出吗?',
            '',
            [
              {text: '确定', onPress: async () => {
                console.log("_outloginAction")
                const { navigate } = that.props.navigation;
                await realmManager.deleteAllRealmData()
                await Storage.clearAll()
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' })
                    ]
                })
                // clearPromise.then(res => {
                    that.props.navigation.dispatch(resetAction)
                //    }
                // )
              }},
              {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: true }
        )
    }

    async _handleAction(item) {

        const that = this
        const { navigate } = this.props.navigation;

        if (item.type == "route") {
            navigate(item.sref, item.info)
        }

        if (item.type == "alert") {
            let versionInfoResponse = await MessageService.getUpdateInfo();
            if (versionInfoResponse.type == true) {
                let versionInfo = versionInfoResponse.data
                let date = versionInfo.date
                let size = versionInfo.size
                let updateInfo = versionInfo.updateInfo
                if (appVersion != versionInfo.version) {
                    this.setState({
                        showVersionInfo: true,
                        versionInfo: versionInfo
                    })
                } 
                return ;
            } 

            this.setState({
                showVersionAlert: true
            })

            setTimeout(() => {
                that.setState({
                    showVersionAlert: false,
                })
            }, 2000)
        }
    }

    _cancelInstall() {

        this.setState({
            showVersionInfo: false
        })
    }

    _beginInstall() {

    }

    _renderVersionProgressView() {

        return (
            <View style={popupStyles.viewContainer}>
                <ImageBackground style={popupStyles.progressViewBackground} source={require("../../../Images/popup_progress.png")} >
                    <View style={popupStyles.progressView}>
                        <Text style={popupStyles.progressViewTitle}>正在更新</Text>
                        <Progress.Bar borderColor={'white'} color={'#FF5B29'} unfilledColor={'rgba(255,198,180,.35)'} style={popupStyles.progress} height={2} progress={0.3} width={280} borderRadius={0} />
                        <Text style={popupStyles.progressNumber}>55%</Text>
                        <TouchableOpacity>
                            <View style={[popupStyles.buttonContainer, {top:1,right:26}]}>
                                <Text style={popupStyles.button}>取消更新</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    _renderVersionUpdatePopupView() {

        const versionInfo = this.state.versionInfo;
        
        return (
            <View style={popupStyles.viewContainer}>
                <ImageBackground style={popupStyles.viewBackground} source={require("../../../Images/popup.png")} >
                    <View style={popupStyles.view}>
                        <Text style={popupStyles.viewTitle}>发现新版本</Text>
                        <ScrollView style={popupStyles.scroll}>
                            <Text style={popupStyles.versionInfo}>版本：{versionInfo.version} 大小：{versionInfo.size}</Text>
                            <Text style={popupStyles.versionInfo}>时间：{versionInfo.date}</Text>
                            <Text style={popupStyles.versionInfo}>本次更新：</Text>
                            {
                                versionInfo.updateInfo.map((res, index) => {
                                    return <Text key={index} style={popupStyles.versionInfo}>{index+1}. {res}</Text>
                                })
                            }
                        </ScrollView>
                        <TouchableOpacity onPress={this._cancelInstall.bind(this)}>
                            <View style={[popupStyles.buttonContainer, {top: 164, right:90}]}>
                                <Text style={popupStyles.button}>稍后安装</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[popupStyles.buttonContainer, {top: 164, right:8}]}>
                                <Text style={popupStyles.button}>立刻安装</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
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
        const that = this
        return (
            <View style={styles.container}>
                {this.state.showVersionAlert == true ? <CustomAlert content="当前为最新版本" /> : null}
                {this.state.showVersionInfo == true ? this._renderVersionUpdatePopupView() : null}
                <View style={styles.head}>
                    <ImageBackground source={require('../../../Images/avatar.png')}
                        style={styles.thumbnail}
                        resizeMode={'contain'} />
                    <Text style={styles.phoneNumber}>
                        +86 {this.state.account}
                    </Text>
                </View>
                <View style={styles.tableView}>
                    {
                        this.listItemArray.map((result, index) => (
                            that.renderItem(result, index)
                        ))
                    }
                </View>
                <TouchableOpacity style={styles.exitButtonStyle} onPress={this.outLoginButtonClick.bind(this)} >
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
        marginTop: 30,
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
    },
});

var popupStyles = {

    scroll: {
        position: 'absolute',
        top: 61,
        height:140,
        width: '100%',
    },
    versionInfo: {
        marginLeft: 24,
        marginLeft: 24,
        color: 'rgba(0,0,0,.54)',
        fontSize:16,
    },
    buttonContainer: {
        position: "absolute",
        width: 75,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        color: '#FF5B29',
        fontSize: 14,
    },
    viewTitle: {
        fontSize: 20,
        marginTop: 21, 
        marginLeft: 24,
    },
    view: {
        marginTop: 24,
        marginLeft: 24,
        width: 280,
        height: 248,
    },
    viewBackground: {
        width: 328,
        height: 320,
    },
    viewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -32,
        zIndex: 99,
    },

    progressViewBackground: {
        width: 382,
        height: 217,
    },
    progressView: {
        marginLeft:23.5,
        marginTop: 24,
        width: 335,
        height: 145,
    },
    progressViewTitle: {
        fontSize: 20,
        marginTop: 19, 
        marginLeft: 28,
    },
    progress: {
        marginLeft: 28,
        marginTop: 25,
    },
    progressNumber: {
        fontSize: 16,
        color: 'rgba(0,0,0,.54)',
        marginLeft: 28,
        marginTop: 10,
    }
}

var mineStyles = {

    leftIcon: {
        width: 18,
        height: 18,

    },
    leftIconContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 6,
        alignSelf: 'center'
    },
    rightIcon: {
        width: 7.4,
        height: 12,
        
    },
    rightIconContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 17,
        alignSelf: 'center'
    }
}