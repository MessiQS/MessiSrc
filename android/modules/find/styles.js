import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export default styles = {
    container: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        height: '100%'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    titleContent: {
        marginTop: Math.min(Math.max((height - 64 - 78 - (2 * 304)) / 3, 3), 10),
        flexDirection: "row",
        backgroundColor: "white",
        height: 78,
    },
    arrow: {
        position: 'absolute',
        resizeMode: 'contain',
        right: 18.8,
        width: 7.4,
    },
    titleText: {
        width: '70%',
        height: '100%',
        backgroundColor: "#fff",
        marginLeft: 10,
    },
    h2: {
        fontSize: 16,
        lineHeight: 25,
        color: "#172434",
    },
    examTitle: {
        width: width - 235,
        marginTop: 17,
    },
    choosePaperButton: {
        position: 'absolute',
        right: 15,
        top: 24,
    },
    examDetail: {

    },
    p: {
        marginTop: 5,
        fontSize: 12,
        lineHeight: 20,
        color: "#8E9091"
    },
    circleChart: {
        position: 'absolute',
        top: 10,
        right: 100,
        width: 60,
        height: 60,
    },
    titleIcon: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center'
    },
    calendarView: {
        position: 'relative',
        backgroundColor: '#fff',
        marginTop: Math.min(Math.max((height - 64 - 78 - (2 * 304)) / 3, 3), 10),
    },
    chartTitleContainer: {
        flexDirection: "column",
        backgroundColor: "#fff",
        height: 75,
        zIndex: 100
    },
    chartTopContainer: {
        flexDirection: "row",
        height: 48,
    },
    chartBottomContainer: {
        flexDirection: "row",
        width: "100%",
        zIndex: 100,
    },
    h4: {
        marginTop: 12,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "400",
        color: "#172434"
    },
    psmall: {
        marginTop: 14,
        marginLeft: 35,
        fontSize: 12,
        color: "#8E9091",
        backgroundColor: 'rgba(0,0,0,0)'
    },
    average: {
        position: 'absolute',
        top: 14,
        left: 175,
        fontSize: 12,
        color: '#8E9091',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    rightTitle: {
        position: "absolute",
        top: 8,
        right: 15,
    },
    rightDetail: {
        position: "absolute",
        top: 14,
        right: 49,
        fontSize: 12,
        color: "#8E9091",
        backgroundColor: 'rgba(0,0,0,0)'
    },
    rightContainer: {
        flexDirection: "row",
        height: 68,
        width: '100%',
        position: "absolute",
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    greenBlock: {
        marginLeft: 10,
        marginTop: 31.5,
        width: 15,
        height: 15,
    },
    redBlock: {
        marginLeft: 10,
        marginTop: 14,
        width: 15,
        height: 15,
    },
    blueBlock: {
        marginLeft: 10,
        marginTop: 10,
        width: 15,
        height: 15,
    },
    separator: {
        marginRight: 10,
        marginLeft: 10,
        height: 1,
        backgroundColor: '#7A8FAC',
        zIndex: 9,
        opacity: 0.1,
    }
}

export const header = {
    header: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        paddingLeft: 35,
        flex: 7,
        color: "#172434",
    },
    icon: {
        marginRight: 20,
    },
    magnifier: {
        width: 18,
        height: 18,
    },
    more: {
        width: 22,
        height: 44,
        resizeMode: 'contain',
    }
}
export const daysTransfer = {
    'Sunday': '周日',
    'Monday': '周一',
    'Tuesday': '周二',
    'Wednesday': '周三',
    'Thursday': '周四',
    'Friday': '周五',
    'Saturday': '周六'
}