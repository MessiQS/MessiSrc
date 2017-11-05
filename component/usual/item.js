import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import loginItem from './loginItem';

//登录注册的item
export const LoginItem = loginItem;

//mine里面的item
export class MineListItem extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate(this.props.item.sref,
                    this.props.item.info
                )}>
                <View style={styles.cell}>
                    <View style={styles.cellTitleView}>
                        <Text>{this.props.item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    cell: {
        marginTop:7,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 40,
    },
    cellTitleView: {
        marginLeft: 15,
        height: '100%',
        justifyContent: 'center',
    }
});