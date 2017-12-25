import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import DictStyle from './dictStyle';
import MessageService from "../../../service/message.service";
import realm from '../../../component/Realm/realm';
import realmManager from '../../../component/Realm/realmManager';
import PropTypes from 'prop-types';
import HTTP from '../../../service/http';

export default class ListOfTopics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            papers: [],
            arrow_image_list_source: []
        };
    };

    componentDidMount() {
        const that = this
        MessageService.getPaper().then(data => {
            var papers = [];
            that.cacheData = data.data;
            papers = that.getCurrentPaper();
            that.setState({
                papers: papers
            })
        });
        const user = realmManager.getCurrentUser();
        HTTP.post("api/getUserBuyInfo", {
            user_id: user ? user.userId : "1312"
        }).then(value => {
            if (value.type) {
                let array = value.buyedInfo
                realm.write(() => {
                    user.examIds = JSON.stringify(array)
                })
            }
        })
            .catch(err => {

            })
    };

    static propTypes = {
        select_province: PropTypes.func,
    }

    getCurrentPaper() {
        return this.cacheData.map((res, idx) => {
            res.length = res.length || res.data.length;
            return res;
        })
    };

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    _select_province(item) {
        const that = this
        that.props.select_province(item);
    }

    _renderItemView = (item) => {
        return (
            <TouchableOpacity onPress={() =>
                this._select_province(item)
            } >
                <View style={styles.sectionViewStyle}>
                    <Text style={styles.sectionTitleStyle}>{item.item.title}</Text>
                    <Text style={styles.detailTitleStyle}>{item.item.length}套真题</Text>
                    <Image style={styles.arrowStyle} source={require('../../../Images/arrow_right.png')} ></Image>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                data={this.state.papers}
                renderItem={(item) => this._renderItemView(item)}
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
        borderBottomWidth: 0.5,
        borderBottomColor: DictStyle.colorSet.lineColor,
        backgroundColor: 'white'
    },
    sectionTitleStyle: {
        marginLeft: 20,
        fontSize: 14,
    },
    detailTitleStyle: {
        position: 'absolute',
        left: 100,
        color: '#9B9B9B',
        fontSize: 12,
    },
    arrowStyle: {
        position: 'absolute',
        width: 4,
        height: 7,
        right: 22,
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