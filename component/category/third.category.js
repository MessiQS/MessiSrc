import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import realmManager from "../../component/Realm/realmManager"
import Progress from '../../component/progress/progress'
import Storage from "../../service/storage";
import { NavigationActions } from 'react-navigation'
import paperManager from "../../service/paper_manager"
import questionManager from "../../service/question_manager"

export default class ThirdCategory extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.item,
    headerTitleStyle: {
      color: '#172434',
      alignSelf: 'center',
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: '#FFF',
      opacity: 1,
      borderBottomWidth: 0,
      shadowOpacity: 0.2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 }
    },
    headerTintColor: 'black',
    gesturesEnabled: true,
    headerLeft: (
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <View style={styles.headerLeftView}>
          <Image style={{ width: 16, height: 16 }} source={require('../../Images/back_arrow.png')} />
        </View>
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props)
    this.isLockPushing = false
    this.state = ({
      data: [],
      loading: false,
    })

    this.getExamsList()
    // this.getExamsList(function(success, data, ))
  }

  getExamsList(callback) {
    const that = this
    let params = {
      sendType: this.props.navigation.state.params.title,
      province: this.props.navigation.state.params.item
    }
    paperManager.getFinalCategories(params, (success, data, error) => {
      if (success) {
        console.log("success, data", success, data)

        data.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          // a 必须等于 b
          return 0;
        })
        that.setState({
          data
        })
      }
    })
  }

  _exit() {
    realmManager.deleteAllRealmData()
    let clearPromise = Storage.clearAll()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ]
    })
    clearPromise.then(res => {
      this.props.navigation.dispatch(resetAction)
    }
    )
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

  chooseExam(item) {
    const that = this
    if (item == null) {
      return
    }
    this.setState({
      loading: true,
    })
    console.log("chooseExam item", item)
    paperManager.setCurrentPaperItem(item)
    questionManager.downloadPaper(item.id, function (success, response, error) {
      console.log("downloadPaper", success, response, error)
      if (success) {
        var array = Array();
        for (let question of response) {
          var memoryModel = Object()

          memoryModel.question = question;
          memoryModel.weighting = 0;
          memoryModel.appearedServeralTime = 0;
          memoryModel.lastBySelectedTime = 0;
          memoryModel.firstBySelectedTime = 0;
          memoryModel.records = [];
          memoryModel.examId = item.id;

          array.push(memoryModel);
        }
        questionManager.handleMemoryModels(item.id, array, function (success, data, error) {
          if (success) {
            that.setState({
              loading: false,
            })
            const { state, goBack } = that.props.navigation;
            const params = state.params || {};
            goBack(params.go_back_key);
            return
          }
          that.setState({
            loading: false,
          })
        })
      }
    })
  }

  _renderProgress() {
    if (this.state.loading == true) {
      return (
        <Progress />
      )
    } else {
      return null
    }
  }

  _renderHeader() {
    return (
      <View style={styles.listHeader}>
      </View>
    )
  }

  _renderItem(item) {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemText} numberOfLines={1}>{item.title}</Text>
        {this._renderChooseButton(item)}
      </View>
    )
  }

  _renderChooseButton(item) {

    if (item.id == questionManager.getPaperId()) {
      return (
        <View style={[styles.buyView, { borderColor: '#DDDDDD' }]}>
          <Text style={[styles.buyText, { color: "#ddd" }]}>选择</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity onPress={() =>
        this.chooseExam(item)
      }>
        <View style={styles.buyView}>
          <Text style={styles.buyText}>选择</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderProgress()}
        <FlatList
          ListHeaderComponent={this._renderHeader()}
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this._renderItem(item)}
        />
      </View>
    )
  }
}

var styles = ({
  container: {
    height: '100%',
  },
  headerLeftView: {
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  listHeader: {
    marginTop: 4,
    height: 20,
    backgroundColor: '#F6F6F6'
  },
  listTitle: {
    marginTop: 10,
    fontSize: 12,
    color: "#9B9B9B",
    marginLeft: 17,
  },
  bottomLine: {
    position: "absolute",
    right: 15,
    left: 15,
    bottom: 1,
    backgroundColor: "#979797",
    height: 0.3,
  },
  itemView: {
    backgroundColor: "white",
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    marginLeft: 19,
    width: "75%",
    fontSize: 16,
  },
  buyView: {
    alignItems: 'center',
    justifyContent: "center",
    borderColor: "#FF5B29",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    width: 50,
    height: 25,
  },
  buyText: {
    color: "#FF5B29",
    fontSize: 12,
  }
})