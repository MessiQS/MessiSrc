import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Vibration,
    StyleSheet
} from 'react-native';

export default class TopicsDeail extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
		title: navigation.state.params.section.item.title,
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


    }

    render() {
        return (
            <View></View>
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
    }
})