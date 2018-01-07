import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import MessageService from "../../../service/message.service"
import realmManager from "../../../component/Realm/realmManager"
import realm from '../../../component/Realm/realm';
import Progress from '../../../component/progress/progress'
import HTTP from "../../../service/http"
import echartsMin from 'native-echarts/src/components/Echarts/echarts.min';
import Storage from "../../../service/http";
import runtime from "../../../service/runtime";
import { DBChange } from "../../../service/constant";

export default class TopicsDetail extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.section.item.title,
        headerTitleStyle: {
            color: 'black',
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
                    <Image style={{ width: 14, height: 10 }} source={require('../../../Images/back_arrow.png')} />
                </View>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props)

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

        this.state = ({
            data: array,
            loading: false,
            user: user,
        })
    }

    async _buy(item) {

        this.props.navigation.navigate('PayPage', item)

        // this.setState({
        //     loading: true
        // })
        // const user = realmManager.getCurrentUser()
        // const res = await HTTP.post("api/updateUserBuyInfo", {
        //     "user_id": user.userId,
        //     "bankname": item.id
        // })
        // if (res.type == true) {

        //     var examIdsjson = []
        //     if (!!user.examIds) {
        //         examIdsjson = JSON.parse(user.examIds)
        //     }
        //     examIdsjson.push(item.id)
        //     const exam = await realmManager.updateCurrentExamInfo(item)

        //     const isHavePaper = realmManager.isHaveExamiationPaper(item.id)

        //     if (isHavePaper == false) {
        //         this._downloadExam(item)
        //     }
        // }

        // setTimeout(() => {
        //     runtime.emit(DBChange);
        // }, 1)

        // this.setState({
        //     loading: false,
        //     user: user,
        // })
    }

    async _chooseExam(item) {

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
            runtime.emit(DBChange);
        }, 1)

        this.setState({
            loading: false,
            user: user,
        })
    }

    async _downloadExam(item) {

        const json = await MessageService.downloadPaper({
            paperId: item.id
        });
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

        if (item.id == this.state.user.currentExamId) {
            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
                    <View style={[styles.buyView, { borderColor: '#DDDDDD' }]}>
                        <Text style={[styles.buyText, { color: "#ddd" }]}>选择</Text>
                    </View>
                </View>
            )
        }

        const examIds = JSON.parse(this.state.user.examIds)
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
            <View>
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
        width: "80%",
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