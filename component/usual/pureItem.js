//纯文字item

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
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
    
    render() {
        return (
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate(this.props.item.sref,
                    this.props.item.info
                )}>
                <View style={styles.cellTitleView}>
                    <Text style={styles.textInView}>{this.props.item.name}</Text>
                    <Image source={require("../../Images/find_arrow_right.png")} resizeMode={"contain"} style={[styles.rightIcon]} />
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    cellTitleView: {
        marginTop:5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'#fff',
        height: 40,
    },
    textInView:{
        position: "absolute",
        left: 15,
        fontSize: 17,
        color: "#030303"
    },
    spanceView: {
        flex: 1,
    },
    rightIcon:{
        position: "absolute",
        right: 20,
        width: 7.4,
        height: 12,
    }
});