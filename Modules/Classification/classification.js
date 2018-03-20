import React from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from "react-native"
import { TextColor } from "../../service/constant";

export default class Classification extends React.Component {


    constructor(props) {
        super(props)
        this.items = [
            {
                title: "公务员考试",
                navigate: "Message"
            }, {
                title: "驾驶员考试",
                navigate: ""                
            }
        ]

        console.log("this.items", this.items)
    }

    render() {

        return (
            <FlatList
                style={styles.flatStyle}
                data={this.items}
                renderItem={(item) => this._renderItemView(item)}
                keyExtractor={(item, index) => index}
            />
        )
    }

    _renderItemView = (item) => {

        console.log("item", item)
        return (
            <TouchableOpacity onPress={() =>
                this._select_classification(item)
            } >
                <View style={styles.sectionViewStyle}>
                    <Text style={styles.sectionTitleStyle}>{item.item.title}</Text>
                    <Image style={styles.arrowStyle} source={require('../../Images/find_arrow_right.png')} ></Image>
                </View>
            </TouchableOpacity>
        )
    }

    _select_classification(item) {

        const { state, navigate } = this.props.navigation;
        navigate(item.item.navigate, {
            go_back_key: state.key,
        })
    }
}

const styles = ({
    flatStyle: {
        backgroundColor: '#f6f6f6',
        height: '100%',
    },
    sectionViewStyle: {
        marginTop: 4,
        height: 36,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    sectionTitleStyle: {
        marginLeft: 20,
        fontSize: 16,
        color: TextColor,
    },
    detailTitleStyle: {
        position: 'absolute',
        left: 110,
        color: "#9B9B9B",
        fontSize: 14,
    },
    arrowStyle: {
        position: 'absolute',
        width: 7.4,
        height: 12,
        right: 26.2,
    },
})