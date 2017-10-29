import {
	StyleSheet,
} from 'react-native';
export const nativeStyle = {
	container: {
        width: '100%',
        backgroundColor:"#000",
        height:200
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

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
    },
    banner:{
        flex:20,
    },
    detail:{
        flex:13,
        backgroundColor:"#f5f5f5",
        flexDirection:"row",
        paddingTop:13,
    },
    quesTitle: {
        paddingLeft:20,
        paddingTop:4,
        flex:7,
        backgroundColor:'#fff'
    },
    title:{
        fontSize:18,
        height:20,
        color:"#F5A623",
    },
    description: {
		height: 23,
        fontSize: 15,
        paddingTop:7
    },
    percent: {
        marginTop:16,
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
	circleChart: {
        flex: 3,
        backgroundColor:"red"
	},
    intoQuestion:{
        flex:23,
        backgroundColor:"#fff"
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
	nowadays: {
		left: 20,
		height: 20,
		fontSize: 14,
		top: 0,
		fontWeight: 'bold',
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
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
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