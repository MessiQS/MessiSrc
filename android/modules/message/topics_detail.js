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


export default class TopicsDetail extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.section.item.title,
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

        this.setState({
            loading: true
        })
        
        const user = realmManager.getCurrentUser()
        const res = await HTTP.post("api/updateUserBuyInfo",{
            "user_id":user.userId,
            "bankname":item.id
        })
        console.log("res", res)
        if (res.type == true) {

            var examIdsjson = []
            if (!!user.examIds) {
                examIdsjson = JSON.parse(user.examIds)
            }
            examIdsjson.push(item.id)
            try {
                realm.write(() => {
                    user.examIds = JSON.stringify(examIdsjson)
                    user.currentExamId = item.id
                    user.currentExamTitle = item.title
                })
            } catch (e) {
                console.log("buy", e)
            }

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
        
        this.setState({
            loading: false,
            user: user,
        })
    }

    _chooseExam(item) {

        const user = realmManager.getCurrentUser()

        if (!!item) {

            try {
                realm.write(() => {
                    user.currentExamId = item.id
                    user.currentExamTitle = item.title
                })
            } catch (e) {
                console.log("choose", e)
            }

            this.setState({
                user: user,
            })

        } else {
            
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
            console.log("item.id == this.state.user.currentExamId")
            return (
                <View style={styles.itemView}>
                    <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
                    <View style={[styles.buyView, {borderColor: '#DDDDDD'}]}>
                        <Text style={[styles.buyText,{color: '#DDDDDD'}]}>选择</Text>
                    </View>
                </View>
            )
        }

        if (this.state.user.examIds.includes(item.id)) {
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
                        <Text style={styles.buyText}>购买</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <FlatList
            ListHeaderComponent={this._renderHeader()}
            data={this.state.data}
            keyExtractor={(item, index) => index}            
            renderItem={({item}) => this._renderItem(item)}
          />
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
        marginLeft: 15,
    },
    bottomLine: {
        position:"absolute",
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
        marginLeft: 15,
        width: "80%",
        fontSize: 13,
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