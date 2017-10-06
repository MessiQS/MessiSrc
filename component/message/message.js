/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//题库
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Body,
    Thumbnail,
    Content,
    List,
    ListItem,
    Right,
    Icon,
    Button
} from 'native-base';
import Swiper from 'react-native-swiper';
import ModalDropdown from 'react-native-modal-dropdown';
import styles, { nativeStyle } from './messageCss';
import RepeatItem from './repeatItem';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.listModel = [
            {
                name: '刷题',
                haveRead: 100,
                number: 1000,
                isBuyed: true,
                key: 0,
            },
            {
                name: '刷题1',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 1,
            },
            {
                name: '刷题12',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 2,
            },
            {
                name: '刷题13',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 3,
            },
            {
                name: '刷题14',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 4,
            },
            {
                name: '刷题15',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 5,
            },
            {
                name: '刷题16',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 10,
            },
            {
                name: '刷题1',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 6,
            },
            {
                name: '刷题17',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 7,
            },
            {
                name: '刷题18',
                haveRead: 200,
                number: 1000,
                isBuyed: false,
                key: 8,
            }
        ];
        this.listModel.forEach( res => res.call = this.buyCallback.bind(this))
    };

    buyCallback(havBuyed) {
        if (havBuyed) {

        } else {

        }
        const { navigate } = this.props.navigation;
        navigate('PayPage', { name: 'PayPage' })
        console.log(havBuyed)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.modelView}>
                    <ModalDropdown
                        style={nativeStyle.noBorederRight}
                        defaultValue={"省份"}
                        options={['option 1', 'option 2']}
                        textStyle={nativeStyle.textStyle}
                        dropdownStyle={nativeStyle.dropdownStyle}
                    />
                    <ModalDropdown
                        style={nativeStyle.select}
                        defaultValue={"年份"}
                        options={['option 3', 'option 2']}
                        textStyle={nativeStyle.textStyle}
                        dropdownStyle={nativeStyle.dropdownStyleRight}
                    />
                </View>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    autoplay={true}
                    height={200}
                    showsPagination={false}
                    scrollsToTop={true}
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
                <Container contentContainerStyle={{ flex: 1 }}
                    style={nativeStyle.container}
                >
                    <Content>
                        <RepeatItem model={this.listModel} />
                    </Content>
                </Container>
            </View>
        );
    }
}



