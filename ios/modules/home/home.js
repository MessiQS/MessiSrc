/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//刷题

import React, { Component } from 'react';
import {
	Text,
	View,
} from 'react-native';
import Echarts from 'native-echarts';
import { nativeStyle, styles } from './homeCss';
import Item from './listItem';

let itemArr = [];
export default class Find extends Component {

	constructor(props) {
		super(props);
		this.state = {
			questions: {
				new: 1500,
				writed: 1000,
				deepmind: 300,
			},
			percent: (1500 + 1000) / 2800 * 100 + '%',
			all: 1500 + 1000 + 300,
		};
		itemArr = [{
			title:'新题',
			completed:1100,
			length:3300,
			bgcolor:"#5AAFEE",
			navigation:this.props.navigation
		},
		{
			title:'抗遗忘',
			completed:1100,
			length:3300,
			bgcolor:"#D0021b",
			navigation:this.props.navigation
		}];
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
		return (
			<View style={styles.container}>
				<View style={styles.banner}>
					<Swiper
						showsButtons={false}
						autoplay={true}
						showsPagination={false}
					>
						<View style={styles.slide1}>
							<Text style={styles.text}>Hello Swiper</Text>
						</View>
						<View style={styles.slide1}>
							<Text style={styles.text}>Beautiful</Text>
						</View>
						<View style={styles.slide1}>
							<Text style={styles.text}>And simple</Text>
						</View>
					</Swiper>
				</View>
				<View style={styles.detail}>
					<View style={styles.quesTitle}>
						<Text style={styles.title}>
							专项练习
						</Text>
						<Text style={styles.description}>
							言语表达与理解 {this.state.questions.writed + this.state.questions.deepmind}/{this.state.all}
						</Text>
						<View style={styles.percentDiv}>
							<View style={styles.percent}>
								<View
									style={[styles.nowPercent, { width: this.state.percent }]}>
								</View>
							</View>
							<Text style={styles.percentNumber}>{parseInt(this.state.percent)}%</Text>
						</View>
					</View>
				</View>
				<View style={styles.intoQuestion}>
					<Item item={itemArr[0]}/>
					<Item item={itemArr[1]}/>
				</View>
			</View>
		);
	}
}