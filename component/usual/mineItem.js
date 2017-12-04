import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform
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

    hasLeftIcon() {
        if (this.props.item.leftIcon) {
            const { type, name } = this.props.item.leftIcon;
            const Icon = IconObject[type];
            return (<View style={styles.spanceView}>
                <Icon name={name} size={16} style={styles.leftIcon}></Icon>
            </View>)
        } else {
            return (<View style={styles.spanceView}></View>)
        }
    }

    hasRightIcon() {
        if (this.props.item.rightIcon) {
            const { type, name, iconStyle } = this.props.item.rightIcon;
            const Icon = IconObject[type];
            return (<View style={styles.spanceView}>
                <Icon name={name} size={16} style={[styles.rightIcon, iconStyle]}></Icon>
            </View>)
        } else {
            return (<View style={styles.spanceView}></View>)
        }
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