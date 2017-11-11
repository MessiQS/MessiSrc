import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class Analysis extends React.Component {

    constructor(props) {
        super(props);

    }

    static propTypes = {
        analysis: PropTypes.string,
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.separotar}></View>
                <Text style={styles.titleText}>查看本题解析</Text>
                <Text style={styles.analysis}>{this.props.analysis}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create ({

    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separotar: {
        marginTop:16,
        height: 0.5,
        backgroundColor: "#979797",
        width: "60%",
    },
    titleText: {
        marginTop:6,
        fontSize:15,
        color:"#FF9600",
    },
    analysis: {
        marginTop:35,
        marginRight: 44,
        marginLeft: 44,
        marginBottom: 44,
        fontSize:16,
        lineHeight: 20,
    }
})