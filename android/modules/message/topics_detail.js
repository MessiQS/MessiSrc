import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import MessageService from "../../../service/message.service"
import realmManager from "../../../component/Realm/realmManager"
import Progress from '../../../component/progress/progress'
import HTTP from "../../../service/http"
import echartsMin from 'native-echarts/src/components/Echarts/echarts.min';
import Storage from "../../../service/storage";
import runtime from "../../../service/runtime";
import { DBChange } from "../../../service/constant";
import { NavigationActions } from 'react-navigation'


export default class TopicsDetail extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.section.item.title,
        headerTitleStyle: {
            color: '#172434',
            alignSelf: 'center',
            fontSize: 20
        },
        headerStyle: {
            backgroundColor: '#FFF',
            opacity: 1,
            borderBottomWidth: 0,
            shadowOpacity: 0.2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 }
        },
        headerTintColor: 'black',
        gesturesEnabled: true,
        headerLeft: (
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <View style={styles.headerLeftView}>
                    <Image style={{ width: 16, height: 16 }} source={require('../../../Images/back_arrow.png')} />
                </View>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props)

        this.isLockPushing = false
        const array = this.props.navigation.state.params.section.item.data
        array.sort((a, b) => {
            if (a.title > b.title) {
                return -1;
            }
            if (a.title < b.title) {
                return 1;
            }
            // a 必须等于 b
            return 0;
        })

        const user = realmManager.getCurrentUser()

        if (user) {
            this.state = ({
                data: array,
                loading: false,
                user: user,
            })
        } else {

            this.state = ({
                data: array,
                loading: false,
            })
        }
    }

    componentDidMount() {
        runtime.on('updatePaperInfo', () => {
            const user = realmManager.getCurrentUser()
            this.setState({
                user,
            })
        })
    }

    async _buy(item) {
        
        if (this._preventPushingMulitpleTimes()) {
            return 
        }

        const user = realmManager.getCurrentUser()
        item.userId = user.userId
        this.props.navigation.navigate('PayPage', item)
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
            await this._downloadExam(item)
        }
        let user = realmManager.updateCurrentExamInfo(item)

        setTimeout(() => {
            this.setState({
                loading: false,
                user: user,
            })
            
            const { state, goBack } = this.props.navigation;    
            const params = state.params || {};
            params.callback('data')
            goBack(params.go_back_key);
        }, 1000)
    }

    async _downloadExam(item) {

        const json = await MessageService.downloadPaper({
            paperId: item.id
        });

        if (json.type == true) {
            const papers = await realmManager.createQuestion(json)
            const memoryModels = await realmManager.createMemoryModels(papers, item.id)
            await realmManager.createExaminationPaper({
                id: item.id,
                title: item.title,
                questionPapers: papers,
                year: item.year,
                province: item.province,
                version: item.version,
                purchased: true,
                price: parseFloat(item.price),
            })

        } else {

            Alert.alert('下载失败，请稍后重试')
        }
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

    _preventPushingMulitpleTimes() {

        const that = this
        if (this.isLockPushing == true) {
            return true
        }
		this.isLockPushing = true
		
        setTimeout(() => {
            that.isLockPushing = false
		}, 1000);
		return false;
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

    _renderHeader() {
        return (
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{this.state.data.length}套真题</Text>
                <View style={styles.bottomLine}></View>
            </View>
        )
    }

    _renderItem(item) {

        const { user } = this.state;

        if (!user) {

            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
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
                    <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
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
                    <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
                    <TouchableOpacity onPress={() =>
                        this._chooseExam(item)
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
                <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
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

    render() {
        return (
            <View style={styles.container}>
                {this._renderProgress()}
                <FlatList
                    ListHeaderComponent={this._renderHeader()}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => this._renderItem(item)}
                />
            </View>
        )
    }
}

var styles = ({
    container: {
        height: '100%'
    },
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
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
})