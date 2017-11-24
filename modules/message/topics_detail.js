import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class TopicsDeail extends React.Component {

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
            shadowOffset: {width: 0, height: 1}
		},
		headerTintColor: 'black',
        gesturesEnabled: true,
        headerLeft: (
            <TouchableOpacity onPress={ () => { navigation.goBack() }}>
                <View style={styles.headerLeftView}>
                    <Image source={require('../../Images/back_arrow.png')}/>
                </View>
            </TouchableOpacity>
        ),
    });
    
    constructor(props) {
        super(props)
        console.log(this.props.navigation.state.params.section.item.data)
        this.state = {
            data:this.props.navigation.state.params.section.item.data
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
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.value}</Text>
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
        marginTop: 11,
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
    },
    itemText: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 60,
        fontSize: 13,
    }
})