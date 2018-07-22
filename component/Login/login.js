import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	Image
} from 'react-native';
import Button from 'apsl-react-native-button';
import Storage from '../../service/storage';
import Http from "../../service/http";
import MD5 from 'crypto-js/md5';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.isLockPushing = false
	}

	static navigationOptions = {
		header: null,
		headerTintColor: 'white',
		gesturesEnabled: false,
	};

	async _skip() {

		if (this._preventPushingMulitpleTimes()) {
			return 
		}
		const { navigate } = this.props.navigation;
		
		var account = "test"
		var password = MD5("messi2101").toString();
		Http.post('api/freeRegistration', {
			account: account,
			password: password
        }, true).then(value => {
			
			if (value.type == true) {
				Storage.multiSet([
					['accountToken', value.data.token],
					['account', account],
					['userId',  value.data.user_id]
				]);
				navigate('Home', { name: 'Register' })
			}
		}).catch(err => {
            console.log("api/freeRegistration error", err)
        })
	}

	_preventPushingMulitpleTimes() {

        const that = this
        if (this.isLockPushing == true) {
            return true
        }
		this.isLockPushing = true
		
        setTimeout(() => {
            that.isLockPushing = false
		}, 1000);
		
		return false;
	}

	_navigateToLoginPage() {

		const { navigate } = this.props.navigation;
		if (this._preventPushingMulitpleTimes()) {
			return 
		}
		navigate('LoginPage', { name: 'LoginPage' })
	}
	
	_navigateToRegister() {

		const { navigate } = this.props.navigation;
		if (this._preventPushingMulitpleTimes()) {
			return 
		}
		navigate('Register', { name: 'Register' })
	}

	_renderHeader() {
		return (
			<View style={styles.headerView}>
				{/* <Text style={styles.year}>2018</Text> */}
				<Text style={styles.appName}>刷题</Text>
				{/* <Image style={styles.logo} source={require('../../Images/logo.png')} />				 */}
			</View>
		)
	}

	render() {
		
		return (
			<View style={styles.container}>
				<ImageBackground source={require('../../Images/login_background.png')} style={styles.backgroundImage} >
					{this._renderHeader()}
					<View style={styles.buttonContainer}>
						<Button style={[styles.loginButtonStyle, styles.buttonStyle]} onPress={this._navigateToLoginPage.bind(this)}>
							<View style={styles.nestedViewStyle}>
								<Text style={styles.nestedTextStyle}>登录</Text>
							</View>
						</Button>
						<Button style={[styles.registerButtonStyle, styles.buttonStyle]} onPress={this._navigateToRegister.bind(this)}>
							<View style={styles.nestedViewStyle}>
								<Text style={styles.nestedTextStyle}>注册</Text>
							</View>
						</Button>
					</View>
					<TouchableOpacity onPress={this._skip.bind(this)} style={styles.skipContainer}>
						<Image source={require('../../Images/arrow_skip.png')} style={styles.skip} />
					</TouchableOpacity>
				</ImageBackground>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
	},
	container: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
	},
	headerView: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	year: {
		color: "white",
		fontSize: 20,
		backgroundColor: 'rgba(0,0,0,0)',
		marginTop: 140
	},
	appName: {
		color: "white",
		fontSize: 32,
		backgroundColor: 'rgba(0,0,0,0)',
		marginTop: 17
	},
	logo: {
		marginTop: 12
	},
	buttonContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 50,
		height: 92,
		marginRight: 24,
		marginLeft: 24,
		marginTop: 50,
		overflow: 'hidden',
	},
	buttonStyle: {
		
		borderRadius: 4,
		height: 60,
		borderWidth: 2,
	},
	loginButtonStyle: {
		marginTop: 85,
		borderColor: 'white',
	},
	registerButtonStyle: {
		marginTop: 16,
		borderColor: 'white',
	},
	nestedViewStyle: {

	},
	nestedTextStyle: {
		fontSize: 20,
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	skipContainer: {
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		bottom: 20,
		right: 24,
		width: 22,
		height: 22,
	},
	skip: {
		width: 9,
		height: 6.5,
	}
});




