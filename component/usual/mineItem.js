import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ImageBackground
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { androidItem, iosItem } from '../usualCss/usualCss'

let styles;
if (Platform.OS === 'ios') {
    styles = StyleSheet.create(iosItem);
} else {
    styles = StyleSheet.create(androidItem);
}


const IconObject = {
    SimpleLineIcons
}
//mine里面的item
export default class MineListItem extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    _handleAction(item) {

        const { navigate } = this.props.navigation;

        if (item.type == "route") {
            navigate(item.sref, item.info)
        }

        if (item.type == "alert") {
            
        }
    }

    renderItem(item, index) {
        return (
            <TouchableOpacity key={index} onPress={() =>
                 this._handleAction(item)
                }>
                <View style={styles.cellTitleView}>
                    <View style={[styles.spanceView, mineStyles.leftIconContainer]}>
                        <ImageBackground source={item.leftSource} style={mineStyles.leftIcon} resizeMode={'contain'} />
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.textInView}>{item.name}</Text>
                    </View>
                    <View style={[styles.spanceView, mineStyles.rightIconContainer]} >
                        <ImageBackground style={mineStyles.rightIcon} source={require("../../../Images/find_arrow_right.png")} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate(this.props.item.sref,
                    this.props.item.info
                )}>
                <View style={styles.cellTitleView}>
                    {this.hasLeftIcon()}
                    <View style={styles.text}>
                        <Text style={styles.textInView}>{this.props.item.name}</Text>
                    </View>
                    {this.hasRightIcon()}
                </View>
            </TouchableOpacity>
        )
    }
}

var mineStyles = {

    leftIcon: {
        width: 18,
        height: 18,

    },
    leftIconContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 6,
        alignSelf: 'center'
    },
    rightIcon: {
        width: 7.4,
        height: 12,
        
    },
    rightIconContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 17,
        alignSelf: 'center'
    }
}