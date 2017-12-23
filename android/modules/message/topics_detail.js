import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Vibration
} from 'react-native';
import MessageService from "../../../service/message.service"
import realmManager from "../../../component/Realm/realmManager"

export default class TopicsDetail extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.section.item.title,
    });
    
    constructor(props) {
        super(props)

        const array = this.props.navigation.state.params.section.item.data
        array.sort(function(a, b) {
            if (a.value > b.value) {
                return -1;
              }
              if (a.value < b.value) {
                return 1;
              }
              // a 必须等于 b
              return 0;
        })
        this.state = {
            data:array
        }
    }

    _buy(item) {
        this.setState({
            loading: true
        })
        const json = await MessageService.downloadPaper({
            paperId: item.id
        });
        const papers = await realmManager.createQuestion(json)
        const memoryModels = await realmManager.createMemoryModels(papers, item.id)
        await realmManager.createExaminationPaper({
            id: item.id,
            title: item.value,
            questionPapers: papers
        })

        this.setState({
            loading: false
        })
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
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.value}</Text>
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