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

class AccountInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = this.state || {};
        
        this.navigation = this.props.navigation;
    }

    static navigationOptions = ({ navigation }) => ({
        title: '账号信息',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <View>
                    <Text style={styles.headerText}>12412412</Text>
                </View>
                <View style={styles.listStyle} button={true} onPress={() =>
                                navigate('ModifyPasswordPage', { name: 'ModifyPasswordPage' })
                        }>
                    <View>
                        <Text style={styles.listTextStyle}>修改密码</Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View style={{height:5}}></View>
                <View style={styles.listStyle} button={true} onPress={() =>
                                navigate('ChangePhoneNumberStepOnePage', { name: 'ChangePhoneNumberStepOnePage' })
                        }>
                    <View>
                        <Text style={styles.listTextStyle}>更换手机号</Text>
                    </View>                    
                    <View>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = ({
    headerText: {
        color: '#FFA200',
        fontSize: 18,
        textAlign: 'center', 
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

