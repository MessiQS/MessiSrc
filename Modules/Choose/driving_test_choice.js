
'use strict';

const React = require('react');
const ReactNative = require('react-native');
import {
    Text,
    View,
    SectionList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import MessageService from "../../service/message.service"
import { appVersion } from "../../service/constant"
import HTTP from "../../service/http"
import realmManager from '../../component/Realm/realmManager'
import Progress from '../../component/progress/progress'
import paperManager from "../../service/paper_manager"


const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
}

export default class DrivingTestChoice extends React.Component {

    constructor(props) {
        super(props);

        const user = realmManager.getCurrentUser()
        this.state = {
            user: user,
            papers: [],
            loading: false
        }
    }

    componentDidMount() {

        const that = this
        MessageService.getPaperByType({
            version: appVersion,
            system: "IOS",
            type: "driver",
        }).then(result => {
            
            that.setState({
                papers: result.data
            })
        })

        const user = realmManager.getCurrentUser()
        if (user) {

            HTTP.post("api/getUserBuyInfo", {
                    user_id: user.userId
                })
                .then(value => {
                    if (value.type) {
                        let array = value.data.buyedInfo
                        realm.write(() => {
                            user.examIds = JSON.stringify(array)
                        })
                    }
                })
                .catch(err => {

                })
        }
    }

    async _chooseExam(item) {

        const { navigate } = this.props.navigation;

        if (item == null) {
            return
        }
        this.setState({
            loading: true,
        })

        const isHavePaper = realmManager.isHaveExamiationPaper(item.id)

        if (isHavePaper == false) {
            let isSuccess = await paperManager.downloadExam(item)

            if (isSuccess == false) {
                Alert.alert('下载失败，请稍后重试')
            }
        }
        let user = realmManager.updateCurrentExamInfo(item)

        setTimeout(() => {
            this.setState({
                loading: false,
                user: user,
            })

            const { state, goBack } = this.props.navigation;
            const params = state.params || {};
            goBack(params.go_back_key);
        }, 1000)
    }

    _exit() {
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
        }
        )
    }

    _renderProgress() {
        if (this.state.loading == true) {
            return (
                <Progress />
            )
        } else {
            return null
        }
    }

    _renderItem(item) {

        const { user } = this.state;
        const that = this

        if (!user) {

            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>《{item.title}》</Text>
                    <TouchableOpacity onPress={() =>
                        this._exit()
                    }>
                        <View style={styles.buyView}>
                            <Text style={styles.buyText}>￥{item.price}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        if (item.id == user.currentExamId) {
            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>《{item.title}》</Text>
                    <View style={[styles.buyView, { borderColor: '#DDDDDD' }]}>
                        <Text style={[styles.buyText, { color: "#ddd" }]}>选择</Text>
                    </View>
                </View>
            )
        }

        const examIds = JSON.parse(user.examIds)
        if (examIds.includes(item.id) || item.price == 0) {
            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>《{item.title}》</Text>
                    <TouchableOpacity onPress={() =>
                        that._chooseExam(item)
                    }>
                        <View style={styles.buyView}>
                            <Text style={styles.buyText}>选择</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.itemView}>
                <Text style={styles.itemText} numberOfLines={1}>《{item.title}》</Text>
                <TouchableOpacity onPress={() =>
                    this._buy(item)
                }>
                    <View style={styles.buyView}>
                        <Text style={styles.buyText}>￥{item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderSectionHeader(section) {

        return (

            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{section.title}</Text>
                <View style={styles.bottomLine}></View>
            </View>
        )
    }

    _extraUniqueKey(item, index) {
        return "index" + index + item;
    }

    render() {

        return (
            <View style={styles.container}>
                {this._renderProgress()}
                <SectionList
                    renderItem={({ item }) => this._renderItem(item)}
                    renderSectionHeader={({ section }) => this._renderSectionHeader(section)}
                    sections={this.state.papers}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                    keyExtractor={this._extraUniqueKey}// 每个item的key
                />
            </View>
        )
    }
}

var styles = {
    container: {
        height: '100%'
    },
    listHeader: {
        marginTop: 4,
        height: 34,
        backgroundColor: 'white'
    },
    listTitle: {
        marginTop: 10,
        fontSize: 12,
        color: "#9B9B9B",
        marginLeft: 17,
    },
    bottomLine: {
        position: "absolute",
        right: 15,
        left: 15,
        bottom: 1,
        backgroundColor: "#979797",
        height: 0.3,
    },
    itemView: {
        backgroundColor: "white",
        height: 41,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        marginLeft: 19,
        width: "75%",
        fontSize: 16,
    },
    buyView: {
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "#FF5B29",
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 10,
        width: 50,
        height: 25,
    },
    buyText: {
        color: "#FF5B29",
        fontSize: 12,
    }
}


