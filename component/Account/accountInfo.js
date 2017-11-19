import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import { PureItem } from '../usual/item'

class AccountInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation
        }
        console.log(props.navigation)
    }

    static navigationOptions = ({ navigation }) => ({
        title: '账号信息',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    listItemArray = [
        {
            sref: 'ModifyPasswordPage',
            name: '修改密码',
            info: { name: 'ModifyPasswordPage' },
            tipBorder: 1
        },
        {
            sref: 'CPStepOne',
            name: '更换手机号',
            info: { user: 'CPStepOne' },
            tipBorder: 0
        }
    ];
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View>
                <View>
                    <Text style={styles.headerText}>12412412</Text>
                </View>
                <PureItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[0]}
                    />
                <PureItem
                    navigation={this.state.navigation}
                    item={this.listItemArray[1]}
                />
            </View>
        );
    }
}

var styles = ({
    headerText: {
        color: '#FFA200',
        fontSize: 25,
        textAlign: 'center', 
        lineHeight:49,
        backgroundColor:"#fff",
    },
    listStyle: {
        backgroundColor: 'white',
        height: 40,
    },
    listTextStyle: {
        fontSize: 17,
    },
});

export default AccountInfo;

