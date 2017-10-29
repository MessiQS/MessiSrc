/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//刷题

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Echarts from 'native-echarts';

export default class Find extends Component {
   
	constructor() {
		super();
		this.state = {
			questions: {
				new: 1500,
				writed: 1000,
				deepmind: 300,
			},
			percent: (1500 + 1000) / 2800 * 100 + '%',
			all: 1500 + 1000 + 300,
		};
		setTimeout(this.callThis.bind(this), 3000)
	};

	static navigationOptions = ({ navigation }) => ({
        title: '当前题库',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
		headerTintColor: 'white',
		gesturesEnabled: false
    });

	callThis() {
		return this.setState({
			questions: {
				new: 1500,
				writed: 800,
				deepmind: 1000,
			},
			percent: (1500 + 300) / 3100 * 100 + '%',
			all: 3100
		})
	}

	render() {
		const option = {
			tooltip: {
				axisPointer: {
					type: ('line' | 'cross' | 'shadow' | 'none'),
				}
			},
			series: [

				{
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							color: function (params) {
								var colorArray = ['#ff477b', '#f69b2c', '#2d7faf'];
								return colorArray[params.dataIndex];
							}
						}
					},
					type: 'pie',
					data: [this.state.questions.writed, this.state.questions.new, this.state.questions.deepmind]
				}
			]
		};
		return (
			<View style={styles.container}>
				<Swiper
					style={styles.wrapper}
					showsButtons={false}
					autoplay={true}
					height={200} 
					showsPagination={false}
				>
					<View style={styles.slide1}>
						<Text style={styles.text}>Hello Swiper</Text>
					</View>
					<View style={styles.slide2}>
						<Text style={styles.text}>Beautiful</Text>
					</View>
					<View style={styles.slide3}>
						<Text style={styles.text}>And simple</Text>
					</View>
				</Swiper>
				<View style={styles.content}>
					<View style={styles.topcard}>
						<View style={styles.quesTitle}>
							<Text style={styles.description}>
								言语表达与理解 {this.state.questions.writed + this.state.questions.deepmind}/{this.state.all}
							</Text>
							<View style={styles.percent}>
								<View
									style={[styles.nowPercent, { width: this.state.percent }]}>
								</View>
							</View>
							<Text style={styles.percentNumber}>{parseInt(this.state.percent)}%</Text>
						</View>
						<View style={styles.circleChart}>
							<Echarts option={option} height={80} />
						</View>
					</View>
					<View contentContainerStyle={{ flex: 1 }}
						style={nativeStyle.container}
					>
						<View style={styles.separatorLine}></View>
								<View style={styles.orange}></View>
							<View>
								<Text style={styles.bodyText}>新题</Text>
							</View>
							<View style={nativeStyle.right}>
								<Text style={styles.haveDone}>
									{this.state.questions.new}/{this.state.all}
								</Text>
								
							</View>
						<View style={styles.separatorLine}></View>
				
							<View style={styles.red}></View>
							<View >
								<Text style={styles.bodyText}>抗遗忘</Text>
							</View>
							<View style={nativeStyle.right}>
								<Text style={styles.haveDone}>
									{this.state.questions.writed}/{this.state.all}
								</Text>
								
							</View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	content: {
		top: 13,
		alignItems: 'center',
		width: '100%',
		flex: 2
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	topcard: {
		width: '100%',
		height: 114,
		borderColor: '#fff',
		flexDirection: 'row',
		backgroundColor: '#FEFEFE',
	},
	quesTitle: {
		width: '70%',
		top: 8
	},
	circleChart: {
		width: '30%',
	},
	nowadays: {
		left: 20,
		height: 20,
		fontSize: 14,
		top: 0,
		fontWeight: 'bold',
	},
	description: {
		left: 20,
		height: 20,
		fontSize: 15,
		// fontWeight: 'bold',
	},
	percent: {
		top: 20,
		left: 20,
		height: 26,
		width: '79%',
		backgroundColor: '#f6f7f8',
		borderRadius: 13,
	},
	nowPercent: {
		width: '60%',
		backgroundColor: '#4cd965',
		borderRadius: 13,
		height: 26,
	},
	percentNumber: {
		width: "15%",
		left: '87%',
		color: '#8394a5',
	},
	orange: {
		width: 25,
		height: 25,
		borderRadius: 13,
		backgroundColor: '#5AAFEE',
		top: 0,
	},
	red: {
		width: 25,
		height: 25,
		borderRadius: 13,
		backgroundColor: '#D0021B',
		top: 0
	},
	bodyText: {
		height: 17,
		fontSize: 17,
	},
	haveDone: {
		fontSize: 17,
		color: '#8f8e94'
	},
	wrapper: {
		marginTop:0,
		height: 200
	},		
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	separatorLine: {
		height: 13,

	},
	listItem: {
		borderBottomWidth: 0
	},
	groupTableViewColor: {
		backgroundColor: "black",
	}
});


const nativeStyle = {
	container: {
		width: '100%',
	},
	listItem: {
		backgroundColor: '#FEFEFE',
		borderTopColor: '#dcdcdc',
		borderTopWidth: 0,
		height: 44,
		top: 0,
		bottom: 0,
	},
	right: {
		height: 44
	}
};