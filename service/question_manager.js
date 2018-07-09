import HTTP from "./http"
import moment from './moment.min.js'
import paperManager from "../service/paper_manager"
import Storage from "./storage"

var daysTransfer = {
    'Sunday': '周日',
    'Monday': '周一',
    'Tuesday': '周二',
    'Wednesday': '周三',
    'Thursday': '周四',
    'Friday': '周五',
    'Saturday': '周六'
}

class QuestionManager {

    constructor() {
        const that = this
        this.currentMemoryModels = []
        this.currentMemoryModelsIndex = 0
        Storage.getItem('CurrentMemoryModels').then(value => {
            let array = JSON.parse(value)
            that.currentMemoryModels = array
        })
    }

    hasQuestions() {
        var memorys = this.getCurrentMemoryModels()
        if (Array.isArray(memorys) && memorys.length === 0) {
            return false
        }
        return true
    }

    hasWrongQuestion() {
        var memorys = this.getCurrentMemoryModels()
        if (Array.isArray(memorys) && memorys.length === 0) {
            return false
        }
        var models = memorys.filter(value => value.appearedServeralTime > 0 && value.weighting < 7)
        if (Array.isArray(models) && models.length === 0) {
            return false
        }
        return true
    }

    hasNewQuestion() {
        var memorys = this.getCurrentMemoryModels()
        if (Array.isArray(memorys) && memorys.length === 0) {
            return false
        }
        var models = memorys.filter(value => value.appearedServeralTime == 0)
        if (Array.isArray(models) && models.length === 0) {
            return false
        }
        return true
    }

    hasQuestionWithType(type) {
        if (type == "new") {
            return this.hasNewQuestion()
        }
        if (type == "wrong") {
            return this.hasWrongQuestion()
        }
    }

    getPublicOfficialsInfo(callback) {
        HTTP.get("api/papertype", {}, true).then(function (res) {
            //console.log("api/papertype", res)
            callback(res.type, res.data, null)
        })
    }

    getSpecialRecordByPaperId(paper_id, callback) {
        HTTP.get("api/getQuestionInfoByPaperid", {
            paper_id
        }, true).then(function (res) {
            console.log("api/getQuestionInfoByPaperid res.data", res.data)
            callback(res.type, res.data, null)
        })
    }

    downloadPaper(paperId, callback) {
        var that = this
        HTTP.get("api/getpaper", {
            paperId
        }, true).then(function (res) {
            callback(res.type, res.data, null)
        }).catch(error => {
            console.log("api/getpaper error", error)
        })
    }

    setCurrentMemoryModels(newValue) {
        const that = this
        /// 过滤 </br> 标签
        newValue.forEach(function (item) {
            Object.keys(item.question).forEach(function (key) {
                let value = item.question[key]
                if (that.isString(value)) {
                    item.question[key] = that.filterTag(value)
                }
            })
        })
        that.saveToCurrentMemoryModels(newValue)
    }

    handleMemoryModels(paperId, memorys, callback) {
        const that = this
        console.log("getSpecialRecordByPaperId paperId", paperId)
        that.getSpecialRecordByPaperId(paperId, function (success, data, error) {
            console.log("getSpecialRecordByPaperId data", success, data, error)
            if (success) {
                console.log("getSpecialRecordByPaperId data", data)
                let keys = Object.keys(data)
                let key = keys[0]
                let records = data[key]
                for (let key in records) {
                    let record = records[key]
                    for (let memory of memorys) {
                        if (record.question_id == memory.question.id) {
                            console.log("record.question_id == memory.question.id")
                            that.saveRecordToMemory(memory, record)
                        }
                    }
                }
                that.currentMemoryModels = memorys
                that.saveToCurrentMemoryModels(memorys)
                callback(success, memorys, null)
                return
            }
            callback(success, null, error)
        })
    }

    saveRecordToMemory(memory, record) {
        memory.firstBySelectedTime = record.firstDateTime
        memory.lastBySelectedTime = record.lastDateTime
        memory.records = JSON.parse(record.record)
        memory.weighted = record.weighted
        memory.right = record.right
    }

    saveToCurrentMemoryModels(value) {
        let newValue = JSON.stringify(value)
        Storage.setItem({
            key: 'CurrentMemoryModels',
            value: newValue
        });
    }

    isMultipleChoiceQuestion(questionPaper) {

        if (questionPaper.subject == "不定项") {
            return true
        }
        if (questionPaper.question.indexOf("不定项选择") !== -1) {
            return true
        }
        if (questionPaper.subject.indexOf("多选") !== -1) {
            return true
        }

        let splitedArray = questionPaper.answer.split(",")
        if (splitedArray.length > 1) {
            return true
        }
        return false;
    }

    getCurrentMemoryModels() {
        return this.currentMemoryModels || []
    }

    getCurrentPaperTitle() {
        return this.currentMemoryModels[0].question.title || "暂无数据"
    }

    getPaperId() {
        return this.currentMemoryModels[0].examId
    }

    getRandomMemoryModel(type) {
        if (type == "new") {
            let memorys = this.getCurrentMemoryModels()
            var newModels = memorys.filter(value => value.appearedServeralTime == 0)
            this.currentMemoryModelsIndex = Math.floor(Math.random() * newModels.length)
            var model = newModels[this.currentMemoryModelsIndex]
            return model
        }

        if (type == "wrong") {
            let memorys = this.getCurrentMemoryModels()
            var newModels = memorys.filter(value => value.appearedServeralTime > 0 && value.weighting < 7)
            this.currentMemoryModelsIndex = Math.floor(Math.random() * newModels.length)
            var model = newModels[this.currentMemoryModelsIndex]
            return model
        }
    }

    getMemoryModel(number) {
        var models = this.getCurrentMemoryModels().filter(value => value.question.question_number == number)

        return models[0]
    }

    select(option, memoryModel) {
        var score = 0
        var isRight = false
        if (option == memoryModel.question.answer) {

            score = 7 - memoryModel.appearedServeralTime
            score = Math.max(1, score)
            isRight = true
        }
        var record = {
            select: option,
            isRight: isRight
        }
        var time = new Date()
        memoryModel.weighting = memoryModel.weighting + score
        if (memoryModel.firstBySelectedTime == 0) {
            memoryModel.firstBySelectedTime = time.getTime()
        }
        memoryModel.appearedServeralTime += 1
        memoryModel.lastBySelectedTime = time.getTime()
        memoryModel.records.push(record)

        var currentModels = this.getCurrentMemoryModels()

        for (var i = 0; i < currentModels.length; i++) {
            if (currentModels[i].question.id == memoryModel.question.id) {
                currentModels[i] = memoryModel
            }
        }
        this.saveToCurrentMemoryModels(currentModels)
        this.sendToService(isRight, memoryModel)
    }

    sendToService(isRight, model) {
        let records = []
        model.records.forEach(value => {
            let record = {
                time: value.time,
                isRight: value.isRight,
                select: value.select
            }
            records.push(record)
        })

        var param = {
            paper_id: model.examId,
            question_id: model.question.id,
            question_number: model.question.question_number,
            weighted: model.weighting,
            lastDateTime: model.lastBySelectedTime,
            record: JSON.stringify(records),
            firstDateTime: model.firstBySelectedTime,
        }
        if (isRight == true) {
            param.correct = "1"
            param.wrong = "0"
        } else {
            param.correct = "0"
            param.wrong = "1"
        }
        HTTP.post("api/getUpdateInfoCache", param, true).then(value => {

        }).catch(e => {
            console.log("api/getUpdateInfoCache error", e)
        })
    }

    isEmpty(value) {
        return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
    }

    filterTag(str) {
        return str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n").replace(/<br/g, "\n\n").replace(/<!--StartFragment -->/g, "")
    }

    isString(str) {
        return (typeof str == 'string') && str.constructor == String;
    }

    getChartInfo() {

        let object = new Object()
        var timeStamp = parseInt(new Date().setHours(0, 0, 0, 0))
        let memorys = this.getCurrentMemoryModels()
        var finishedModels = []
        var unfinishedModels = []

        memorys.forEach((value, index) => {

            if (value.weighting >= 7 && value.appearedServeralTime > 0) {
                finishedModels.push(value)
            }
            if (value.weighting < 7 && value.appearedServeralTime > 0) {
                unfinishedModels.push(value)
            }
        })

        var x = finishedModels.length
        var y = unfinishedModels.length

        var futureArray = []
        futureArray.push(x + y)
        futureArray.push(Math.round(x + (0.6 * y)))
        futureArray.push(Math.round(x + (0.45 * y)))
        futureArray.push(Math.round(x + (0.36 * y)))
        futureArray.push(Math.round(x + (0.34 * y)))
        futureArray.push(Math.round(x + (0.28 * y)))

        object.futureArray = futureArray

        var beforeArray = []
        var oneDay = 24 * 60 * 60 * 1000

        var before_5 = []
        var before_4 = []
        var before_3 = []
        var before_2 = []
        var before_1 = []
        var todayNumber = []

        memorys.forEach((value, index) => {

            if (value.firstBySelectedTime < timeStamp - 4 * oneDay && value.firstBySelectedTime > timeStamp - 5 * oneDay) {
                before_5.push(value)
            }
            if (value.firstBySelectedTime < timeStamp - 3 * oneDay && value.firstBySelectedTime > timeStamp - 4 * oneDay) {
                before_4.push(value)
            }
            if (value.firstBySelectedTime < timeStamp - 2 * oneDay && value.firstBySelectedTime > timeStamp - 3 * oneDay) {
                before_3.push(value)
            }
            if (value.firstBySelectedTime < timeStamp - 1 * oneDay && value.firstBySelectedTime > timeStamp - 2 * oneDay) {
                before_2.push(value)
            }
            if (value.firstBySelectedTime < timeStamp && value.firstBySelectedTime > timeStamp - 1 * oneDay) {
                before_1.push(value)
            }
            if (value.firstBySelectedTime > timeStamp) {
                todayNumber.push(value)
            }
        })
        beforeArray.push(before_5.length)
        beforeArray.push(before_4.length)
        beforeArray.push(before_3.length)
        beforeArray.push(before_2.length)
        beforeArray.push(before_1.length)
        beforeArray.push(todayNumber.length)

        object.beforeArray = beforeArray

        var a = []
        var b = []
        var c = []

        let wrongQuestions = []
        memorys.forEach(value => {
            if (value.records.length == 0) {
                a.push(value)
            } else if (value.records.length == 1) {
                b.push(value)
            } else {
                c.push(value)
            }

            if (value.weighting < 7 && value.appearedServeralTime > 0) {
                wrongQuestions.push(value)
            }
        })

        object.newQuestionCount = a.length
        /// 剩余次数
        object.wrongQuestionCount = y

        object.newLastSelectDate = "暂无数据"
        object.wrongLastSelectDate = "暂无数据"

        var wrongSum = beforeArray.map(function (value, index) {
            return value
        }).reduce(function (a, b) {
            return a + b
        })

        var wrongAvg = wrongSum / beforeArray.length
        object.newAverage = Math.round(wrongAvg)

        var newSum = futureArray.reduce(function (a, b) { return a + b })
        var newAvg = newSum / futureArray.length
        /// 平均错题数
        object.wrongAverage = Math.round(newAvg)

        if (b.length != 0) {
            b.sort((a1, b1) => {
                return b1.firstBySelectedTime - a1.firstBySelectedTime
            })
            var model = b[0]
            var date = new Date(model.firstBySelectedTime)
            object.newLastSelectDate = this.getDateFormat(date)
        }
        if (c.length != 0) {
            c.sort((a1, b1) => {
                return b1.lastBySelectedTime - a1.lastBySelectedTime
            })
            var model = c[0]
            var date = new Date(model.lastBySelectedTime)
            object.wrongLastSelectDate = this.getDateFormat(date)
        }

        object.pieArray = [{ value: x }, { value: object.wrongQuestionCount }, { value: a.length }]

        return object
    }

    getDateFormat(date) {

        return moment(date).calendar(null, {
            sameDay: '今日',
            lastDay: '昨日',
            lastWeek: '1周前',
            sameElse(moment_input) {

                /// 当前年份减输入年份
                var diff = moment().diff(moment_input, 'days')
                if (diff < 7) {
                    return diff + "天前"
                }
                var diff_1 = moment().diff(moment_input, 'weeks')
                if (diff_1 <= 5) {
                    return diff_1 + "周前"
                }
                var diff_2 = moment().diff(moment_input, 'months')
                if (diff_2 <= 12) {
                    return diff_2 + "月前"
                }
                var diff_3 = moment().diff(moment_input, 'months')

                return diff_3 + "年前"
            },
        })
    }

    getChartBeforeWeekday() {

        let weekArray = []
        for (var i = 5; i > 0; i--) {
            let day = moment().subtract(i, 'days').format('dddd')
            let d = {
                value: daysTransfer[day],
                textStyle: {
                    fontSize: 12,
                    color: '#8E9091'
                }
            }
            weekArray.push(d)
        }
        weekArray.push({
            value: '今日',
            textStyle: {
                fontSize: 12,
                color: '#172434'
            }
        })

        return weekArray
    }

    getChartFutureWeekday() {

        let weekArray = [{
            value: '今日',
            textStyle: {
                fontSize: 12,
                color: '#172434'
            }
        }]
        for (var i = 1; i < 6; i++) {
            let day = moment().add(i, 'days').format('dddd')
            let d = {
                value: daysTransfer[day],
                textStyle: {
                    fontSize: 12,
                    color: '#8E9091'
                }
            }
            weekArray.push(d)
        }
        return weekArray
    }

    feedbackQuestion(model, callback) {
        let params = {
            title: model.question.title,
            id: model.question.id,
            question_number: model.question.question_number.toString(),
        }

        HTTP.post("api/wrongFeedBack", params, true).then(function (res) {
            callback(res.type, res.data, null)
        })
    }
}

module.exports = new QuestionManager()