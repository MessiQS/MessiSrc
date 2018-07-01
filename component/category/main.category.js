
import React, { Component } from 'react'
import {
	FlatList,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

const data = [{"type":"公务员","content":[{"secondType":"公考","content":["河南","湖北","吉林","国家","湖南","辽宁","广西","广东","贵州","江苏","安徽","黑龙江","广州","内蒙古","西藏","福建","新疆","江西","山东","重庆","宁夏","陕西","浙江","北京","四川","山西","云南","上海","河北","海南","天津","深圳","青海","甘肃"]}]},{"type":"驾驶员考试","content":[{"secondType":"驾考","content":["科目四","科目一"]}]},{"type":"人力学院","content":[{"secondType":"人力资源中级职称","content":["人力资源管理专业（中级）","经济基础知识（中级）"]},{"secondType":"人力资源初级职称","content":["人力资源管理专业","经济基础知识"]}]},{"type":"会计学院","content":[{"secondType":"会计中级职称","content":["中级会计实务","经济法","财务管理"]},{"secondType":"会计从业实训","content":["会计基础","会计电算化","财经法规与职业道德"]},{"secondType":"会计初级职称","content":["初级会计实务","经济法基础"]},{"secondType":"注册会计师","content":["会计","公司战略与风险管理","审计","税法","经济法","财务成本管理"]},{"secondType":"美国管理会计师","content":["美国会计"]}]},{"type":"工程学院","content":[{"secondType":"一级建造师","content":["公路实务","机电实务","水利实务"]},{"secondType":"二级建造师","content":["公路实务","水利实务"]}]},{"type":"教师学院","content":[{"secondType":"中学教师招聘","content":["教育综合知识"]},{"secondType":"中学教师资格证","content":["教育知识与能力（中学）","综合素质"]},{"secondType":"小学教师招聘","content":["教育综合知识"]},{"secondType":"小学教师资格证","content":["教育教学知识与能力（小学）","综合素质（小学）"]},{"secondType":"幼儿教师招聘","content":["综合知识"]},{"secondType":"幼儿教师资格证","content":["保教知识与能力（幼儿园）","综合素质（幼儿园）"]}]},{"type":"求职和司法学院","content":[{"secondType":"司法考试","content":["公司法","国际法","行政法"]}]},{"type":"自考学院","content":[{"secondType":"会计专科","content":["成本会计","政治经济学","财务管理"]},{"secondType":"行政管理专科","content":["政治"]},{"secondType":"行政管理本科","content":["普通逻辑"]}]},{"type":"金融学院","content":[{"secondType":"证券一般从业","content":["证券投资顾问"]},{"secondType":"证券专项","content":["证券投资顾问业务"]},{"secondType":"银行从业","content":["个人理财","个人贷款","公司信贷","银行业法律法规与综合能力","银行管理","风险管理"]}]}]

export default class MainCategory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                style={styles.flatStyle}
                data={data}               
                renderItem={(item)=>this._renderSectionView(item)}
                keyExtractor={(item, index) => index}
            />
        )
    }

    _renderSectionView = (item) => {
        return (
            <View style={styles.section}>
                <Text style={styles.title}>{item.item.type}</Text>
                <View style={styles.subtitleContainer}>
                {
                    item.item.content.map((value, index) => {
                        return (<TouchableOpacity key={index} onPress={() => {
                                    this.routeToNextView(value)
                                }}>
                                    <Text style={styles.subtitle}> {value.secondType}</Text>
                                </TouchableOpacity>)
                    })
                }
                </View>
            </View>
        )
    }

    routeToNextView(item) {
        console.log("routeToNextView", item)
        const { navigate } = this.props.navigation;
        navigate('SecondCategory', item)
    }
}

const styles = {
    flatStyle: {
        backgroundColor: '#f6f6f6',
        height: '100%',
    },
    section: {
        height: "auto",
        backgroundColor: "white",
        paddingTop: 15,
        paddingBottom: 10,
        marginBottom: 20,
    },
    title: {
        color: "#FF5B29",
        marginLeft: 15,
        fontSize: 18,
    },
    subtitleContainer: {
        height: "auto",
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: 'wrap',
    },
    subtitle: {
        fontSize: 17,
        height: 30,
    }
}