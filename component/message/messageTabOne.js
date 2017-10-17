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
import MockData from './mockData';
import DictStyle from './dictStyle';
import { province, city } from '../../service/config';
import Http from "../../service/http";

export default class MessageTabOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            papers: []
        };
    };

    componentDidMount() {
        
        Http.getPaper(function(data) {
            this.state.papers = data;
        });
    };
    
    _renderRow = (rowItem, rowId, sectionId) => (
        <TouchableOpacity key={rowId} onPress={() => { }}>
            <View
                style={{
                    alignItems: 'center', margin: 5, padding: 5,
                    borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor
                }}
            >
                <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
                    {rowItem.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    _renderSection = (section, sectionId) => {
        return (
            <View style={styles.sectionViewStyle}>
                <Text style={styles.sectionTitleStyle}>{city["SC0000"+sectionId]}</Text>
                <Text style={styles.detailTitleStyle}>10套真题</Text>
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
    }
})