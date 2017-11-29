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
import Storage from '../../service/storage';
import { PureItem } from '../usual/item'


const rightIcon = {
    type: 'SimpleLineIcons',
    name: 'arrow-right',
    iconStyle:{
        fontSize:10
    }
}

class AccountInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: props.navigation,
            account:''
        };
        Storage.getItem('account').then(res => {
            console.log(res)
            let result = res.split('');
            result.splice(3, 0, ' ');
            result.splice(8, 0, ' ');
            this.setState({
                account: result.join('')
            })
        })
    }

    listItemArray = [
        {
            sref: 'ModifyPasswordPage',
            name: '修改密码',
            info: { name: 'ModifyPasswordPage' },
            tipBorder: 1,
            rightIcon
        },
        {
            sref: 'CPStepOne',
            name: '更换手机号',
            info: { user: 'CPStepOne' },
            tipBorder: 0,
            rightIcon
        }
    ];
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View>
                <View>
                    <Text style={styles.headerText}>
                        +86 { this.state.account }
                    </Text>
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
        marginTop:7,
        color: '#FF5B29',
        fontSize: 20,
        textAlign: 'center', 
        lineHeight:45,
        backgroundColor:"#fff",
    },
    listStyle: {
        backgroundColor: 'white',
        height: 40,
    },
    listTextStyle: {
        color: "#030303",
        fontSize: 17,
    },
});

export default AccountInfo;

