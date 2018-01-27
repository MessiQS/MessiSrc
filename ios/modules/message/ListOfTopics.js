import React, { Component } from 'react'
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native'
import DictStyle from './dictStyle'
import MessageService from "../../../service/message.service"
import realmManager from '../../../component/Realm/realmManager'
import PropTypes from 'prop-types'
import HTTP from '../../../service/http'
import realm from '../../../component/Realm/realm'
import {TextColor} from "../../../service/constant"

export default class ListOfTopics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            papers: [],
            arrow_image_list_source:[]
        }
    }

    componentDidMount() {
        const that = this
        MessageService.getPaper().then(data => {
            var papers = []
            that.cacheData = data.data
            console.log("list of topic js get paper data", data)
            var papers = that.getCurrentPaper()
            console.log("papers", papers)
            that.setState({
                papers: papers
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
                    console.log("ListOfTopic.js api/getUserBuyInfo value.data.buyedInfo", value.data.buyedInfo)

                    realm.write(()=> {
                        user.examIds = JSON.stringify(array)
                    })
                }
            })
            .catch(err => {
    
            })
        }
    }

    static propTypes = {
        select_province: PropTypes.func,
    }

    getCurrentPaper(){
        return this.cacheData.map( (res,idx) => {
            res.length = res.length || res.data.length
            return res
        })
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value)
    }

    _select_province(item) {
        const that = this
        that.props.select_province(item)
    }
    
    _renderItemView = (item) => {
        return (
            <TouchableOpacity onPress={() =>
                        this._select_province(item)
                    } >
                <View style={styles.sectionViewStyle}>
                    <Text style={styles.sectionTitleStyle}>{item.item.title}</Text>
                    <Text style={styles.detailTitleStyle}>{item.item.length}套真题</Text>
                    <Image style={styles.arrowStyle} source={require('../../../Images/find_arrow_right.png')} ></Image>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                style={styles.flatStyle}
                data={this.state.papers}               
                renderItem={(item)=>this._renderItemView(item)}
                keyExtractor={(item, index) => index}
            />
        )
    }
}

const styles = ({
    sectionViewStyle: {
        marginTop: 4,
        height: 36,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    flatStyle: {
        backgroundColor: '#f6f6f6',
        height: '100%',
    },
    sectionTitleStyle: {
        marginLeft: 20,
        fontSize: 16,
        color: TextColor,
    },
    detailTitleStyle: {
        position: 'absolute',
        left: 110,
        color: "#9B9B9B",
        fontSize: 14,
    },
    arrowStyle: {
        position: 'absolute',
        width: 7.4,
        height: 12,
        right: 26.2,
    },
    itemViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 30,
        backgroundColor: 'white',
    },
    itemText: {
        marginTop: 10,
        marginLeft: 19,
        width: "80%",
        height: '100%',
        alignItems: 'center',
    },
    itemButton: {
        marginRight: 10,
        width: 50,
        height: 25,
        borderWidth: 1,
        borderColor: '#FF5B29',
        alignItems: 'center',
        borderRadius: 4,
    },
    itemButtonText: {
        color: '#FF5B29',
        fontSize: 12,
        marginVertical: 5,
    }
})