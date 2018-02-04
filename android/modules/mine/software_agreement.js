import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

const agreements = [
    "尊敬的用户，刷题库提供的网站及相应的手机应用用户。在注册前请您仔细阅读如下服务条款，并确认您已经完全了解本协议之规定。本服务协议双方为本网站及相应的手机应用与本网站及相应的手机应用户，本服务协议具有合同效力。",
    "您确认本服务协议后，本服务协议即在您和本网站及相应的手机应用之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站及相应的手机应用咨询。",
    "无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击\"注册\"按钮并按照本网站及相应的手机应用注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。",
    "1．本网站及相应的手机应用服务条款的确认和接纳本网站及相应的手机应用各项服务的所有权和运作权归本网站及相应的手机应用拥有。",
    "2. 在刷题库应用使用过程中将产生的通信数据流量费用，该服务与费用由您的通信运营商提供，本公司不提供通信服务和流量费用的收取。",
    "3. 用户同意提供及时、详尽及准确的个人资料，同意接收来自本网站及相应的手机应用的信息。",
    "4. 本网站及相应的手机应用不公开用户的姓名和电话，以下情况除外：\n  用户授权本网站及相应的手机应用透露这些信息。\n  相应的法律及程序要求本网站及相应的手机应用提供用户的个人资料。",
    "5. 如果用户提供的资料包含有不正确的信息，本网站及相应的手机应用保留结束用户使用本网站及相应的手机应用信息服务资格的权利。",
    "6. 尊重用户个人隐私是本网站及相应的手机应用的一项基本政策。所以，本网站及相应的手机应用一定不会在未经合法用户授权时公开、编辑或透露其注册资料及保存在本网站及相应的手机应用中的非公开内容，除非有法律许可要求或本网站及相应的手机应用在诚信的基础上认为透露这些信息在以下三种情况是必要的：\n(1)遵守有关法律规定，遵从本网站及相应的手机应用合法服务程序。\n(2)保持维护本网站及相应的手机应用的商标所有权。\n(3)在紧急情况下竭力维护用户个人和社会大众的隐私安全。",
    "7. 你一旦注册成功成为用户，请保管好自己的帐号和密码安全，并将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。你可随时根据指示改变你的密码，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，请立即通告本网站及相应的手机应用。",
    "8. 用户明确同意信息服务的使用由用户个人承担风险。本网站及相应的手机应用不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。本网站不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。",
    "9. 本网站及相应的手机应用对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站及相应的手机应用服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站及相应的手机应用形象受损，所以本网站及相应的手机应用事先提出这种损害的可能性，同时会尽量避免这种损害的发生。",
    "10. 本网站及相应的手机应用有判定用户的行为是否符合本网站及相应的手机应用服务条款的要求和精神的权利，如果用户违背本网站及相应的手机应用服务条款的规定，本网站及相应的手机应用有权中断其服务的帐号。",
    "11. 用户必须遵循：\n(1)使用信息服务不作非法用途。\n(2)不干扰或混乱网络服务。\n(3)遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。",
    "12. 用户或本网站及相应的手机应用可随时根据实际情况中断一项或多项服务。本网站及相应的手机应用不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站及相应的手机应用服务不满，用户可以行使如下权利：\n(1)不再使用本网站及相应的手机应用信息服务。\n(2)通知本网站及相应的手机应用停止对该用户的服务。结束用户服务后，用户使用本网站及相应的手机应用服务的权利马上中止。从那时起，用户没有权利，本网站及相应的手机应用也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。",
    "13. 本网站及相应的手机应用定义的信息内容包括：文字、软件、相片、图表；在广告中全部内容；本网站及相应的手机应用为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在本网站及相应的手机应用和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。",
    "14. 本网站及相应的手机应用信息服务条款要与中华人民共和国的法律解释一致。用户和本网站及相应的手机应用一致同意服从本网站及相应的手机应用所在地有管辖权的法院管辖。如发生本网站及相应的手机应用服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款则依旧保持对用户的约束力。",
    "15. 用户在本网站及相应的手机应用上交易平台上不得发布下列违法信息：\n(1)反对宪法所确定的基本原则的；\n(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；\n(3)损害国家荣誉和利益的；\n(4)煽动民族仇恨、民族歧视，破坏民族团结的；\n(5)破坏国家宗教政策，宣扬邪教和封建迷信的；\n(6)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；\n(7)侮辱或者诽谤他人，侵害他人合法权益的；\n(8)含有法律、行政法规禁止的其他内容的。"
    ]

export default class SoftwareAgreement extends React.Component {

    constructor(props) {
		super(props);
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: "#FFF"}}>
                <View style={styles.agreement}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>《刷题库软件用户服务协议》</Text>
                    </View>
                    {
                        agreements.map((value, index)=> {
                        return <Text style={styles.detail} key={index} >{value}</Text>
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

var styles = {
    agreement: {
        marginRight: 10,
        marginLeft: 10,
    },
    titleView: {
        justifyContent:'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
        color: "#172434",
    },
    detail: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        color: "#172434",
        lineHeight: 24,
    }
}
