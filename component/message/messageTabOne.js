import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import CollapseListView from "./collapseListView"
import ExpandableList from 'react-native-expandable-section-flatlist';
import DictStyle from './dictStyle';
import Http from "../../service/http";



export default class MessageTabOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            papers: []
        };
    };

    componentDidMount() {
        const that = this
        Http.getPaper(function(data) {
            that.setState({
                papers: data.data
            })
        });
    };
    
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    buy(sectionId, rowId) {

        const that = this
        let { papers } = that.state;
        id = papers[sectionId].data[rowId].id
        console.log("id:" + id)

        Http.downloadPaper(id)
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            alert(error)
        })
    }

    _renderRow = (rowItem, rowId, sectionId) => (
        <View style={styles.itemViewStyle}>
            <Text numberOfLines={1} style={styles.itemText}>{rowItem.value}</Text>
            <ScrollView></ScrollView>
            <TouchableOpacity key={rowId} onPress={ () => {
                this.buy(sectionId, rowId);
            }}>
                <View style={styles.itemButton}>
                    <Text style={styles.itemButtonText}>购买</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    _renderSection = (section, sectionId) => {
        return (
            <View style={styles.sectionViewStyle}>
                <Text style={styles.sectionTitleStyle}>{section}</Text>
                <Text style={styles.detailTitleStyle}>{this.state.papers[sectionId].data.length}套真题</Text>
                <ScrollView></ScrollView>
                <Image style={styles.arrowStyle} source={require('../../Images/arrow_up.png')}></Image>
            </View>
        );
    };

    render() {
        return (
            <ExpandableList
                dataSource={this.state.papers}
                headerKey="title"
                memberKey="data"
                renderRow={this._renderRow}
                renderSectionHeaderX={this._renderSection}
                openOptions={[1, 2,]}
            />
        )
    }
}

const styles = ({
    sectionViewStyle: {
        marginVertical: 5,
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
        marginLeft: 18,
        color: '#9B9B9B',
        fontSize: 12,
    },
    arrowStyle: {
        width: 22,
        height: 22,
        marginRight: 22,
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
        borderColor: '#FFA200',
        alignItems: 'center',
        borderRadius: 4,
    },
    itemButtonText: {
        color: '#FFA200',
        fontSize: 12,
        marginVertical: 5,        
    }
})