//纯文字item

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const IconObject = {
    SimpleLineIcons
}

//mine里面的item
export default class PureItem extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    isRightIcon(){
        if(this.props.item.rightIcon){
            const { type, name, iconStyle } = this.props.item.rightIcon;
            const Icon = IconObject[type];
            return (<View style={styles.spanceView}>
                <Icon name={name} size={16} style={[styles.rightIcon,iconStyle]}></Icon>
            </View>)
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate(this.props.item.sref,
                    this.props.item.info
                )}>
                <View style={styles.cellTitleView}>
                    <View style={styles.text}>
                        <Text style={styles.textInView}>{this.props.item.name}</Text>
                    </View>
                    {this.isRightIcon()}
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    cellTitleView: {
        marginTop:5,
        flexDirection: 'row',
        backgroundColor:'#fff'
    },
    text:{
        flex: 6,
    },
    textInView:{
        lineHeight: 46,
        fontSize: 16,
        paddingLeft: 15
    },
    spanceView: {
        flex: 1,
    },
    rightIcon:{
        paddingLeft: 20,
        lineHeight:47,
    }
});