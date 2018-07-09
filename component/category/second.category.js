
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Image
} from 'react-native';


export default class SecondCategory extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.secondType,
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
                    <Image style={{ width: 16, height: 16 }} source={require('../../Images/back_arrow.png')} />
                </View>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);
        
        this.data = this.props.navigation.state.params.content
        this.title = this.props.navigation.state.params.secondType
    }
    
    componentWillMount() {
    }
    
    _renderItemView = (item) => {
        const that = this
        let params = {
            item: item.item,
            title: this.title
        }

        return (
            <TouchableOpacity onPress={() =>
                        that.selectSecondCategory(params)
                    } >
                <View style={styles.sectionViewStyle}>
                    <Text style={styles.sectionTitleStyle}>{item.item}</Text>
                    <Image style={styles.arrowStyle} source={require('../../Images/find_arrow_right.png')} ></Image>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                style={styles.flatStyle}
                data={this.data}               
                renderItem={(item)=>this._renderItemView(item)}
                keyExtractor={(item, index) => index}
            />
        )
    }

    // MARK: - Private Function
    selectSecondCategory(item) {
        const { state, navigate } = this.props.navigation;
        navigate('ThirdCategory', {
            item: item.item,
            title: item.title,
            go_back_key: state.params.go_back_key,
            callback: state.params.callback
        })
    }
}

var styles = StyleSheet.create({
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
    flatStyle: {
        backgroundColor: '#f6f6f6',
        height: '100%',
    },
    sectionViewStyle: {
        marginTop: 20,
        height: 36,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    sectionTitleStyle: {
        marginLeft: 20,
        fontSize: 16,
        color: "#172434",
    },
    arrowStyle: {
        position: 'absolute',
        width: 7.4,
        height: 12,
        right: 26.2,
    },
})