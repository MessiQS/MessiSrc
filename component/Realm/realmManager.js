'use strict'

import realm from './realm'
import moment from "moment"
import index from 'react-native-image-zoom-viewer';

class RealmManager {

    createQuestion(json) {
        console.log("realm manager json", json)
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let questions = []
                    json.data.forEach(function (value, index) {

                        let question = realm.create('QuestionPaper', value)
                        questions.push(question)
                    })
                    console.log("QuestionPaper save success")
                    resolve(questions)
                })
            } catch (e) {
                console.log("QuestionPaper Error on creation" + e)
                reject(e)
            }
        })
    }

    createExaminationPaper(examinationPaper) {

        const that = this
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {

                    let exam = realm.create('ExaminationPaper', examinationPaper)
                    resolve(exam)
                })
            } catch (e) {
                console.log("ExaminationPaper Error on creation", e)
                reject(e)
            }
        })
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let rmUser = realm.create('User', user)
                    resolve(rmUser)
                })
            } catch (e) {
                console.log("User Error on creation", e)
                reject(e)
            }
        })
    }

    createMemoryModels(papers, examId) {

        const that = this
        let promise = new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let array = []
                    papers.forEach(function (value, index) {

                        let memoryModel = realm.create('MemoryModel', {
                            id: that.uuidv4(),
                            questionPaper: value,
                            examId: examId,
                        })
                        array.push(memoryModel)
                    })
                    resolve(array)
                    console.log("MemoryModel save success")
                })

            } catch (e) {
                reject("FAIL" + e)
                console.log("MemoryModel Error on creation")
            }
        })

        return promise
    }

    createSchedule(schedule) {

        try {
            realm.write(() => {
                realm.create('Schedule', schedule)
            })
        } catch (e) {
            console.log("Schedule Error on creation")
        }
    }


    /// 更新
    // 更新试卷
    updateExaminationPaper(exam, newExams) {

        let examWithPapers = realm.objectForPrimaryKey('ExaminationPaper', exam.id)

        console.log("updateExaminationPaper begin")

        return new Promise((resolve, reject) => {

            try {
                realm.write(() => {

                    examWithPapers.year = exam.year
                    examWithPapers.title = exam.title
                    examWithPapers.province = exam.province
                    examWithPapers.version = exam.version
                    examWithPapers.price = parseFloat(exam.price)
                    examWithPapers.questionPapers.sorted("question_number")

                    if (newExams.length == examWithPapers.questionPapers.length) {
                        newExams.forEach((newQuestion, index, array) => {

                            if (examWithPapers.questionPapers[index].id == newQuestion.id) {
                                examWithPapers.questionPapers[index].analysis = newQuestion.analysis
                                examWithPapers.questionPapers[index].answer = newQuestion.answer
                                examWithPapers.questionPapers[index].category = newQuestion.category
                                examWithPapers.questionPapers[index].created_at = newQuestion.created_at
                                examWithPapers.questionPapers[index].updated_at = newQuestion.updated_at
                                examWithPapers.questionPapers[index].question_number = newQuestion.question_number
                                examWithPapers.questionPapers[index].option_A = newQuestion.option_A
                                examWithPapers.questionPapers[index].option_B = newQuestion.option_B
                                examWithPapers.questionPapers[index].option_C = newQuestion.option_C
                                examWithPapers.questionPapers[index].option_D = newQuestion.option_D
                                examWithPapers.questionPapers[index].province = newQuestion.province
                                examWithPapers.questionPapers[index].question = newQuestion.question
                                examWithPapers.questionPapers[index].subject = newQuestion.subject
                                examWithPapers.questionPapers[index].title = newQuestion.title
                                examWithPapers.questionPapers[index].question_point = newQuestion.question_point
                                examWithPapers.questionPapers[index].question_material = newQuestion.question_material
                            }
                        })
                    } else {

                    }

                    resolve(examWithPapers)
                })

            } catch (e) {
                reject(e)
            }
        })
    }

    updateUserExamIds(examIds) {

        let examIdsJSON = JSON.stringify(examIds)
        var user = this.getCurrentUser()
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    user.examIds = examIdsJSON
                    resolve(user)
                })
            } catch (e) {
                reject(e)
                console.log("ExaminationPaper Error on update")
            }
        })
    }

    updateMemoryModel(model, record, newWeighting) {

        var time = new Date()

        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    model.weighting = newWeighting
                    if (model.appearedSeveralTime == 0) {
                        model.firstBySelectedTime = time.getTime()
                    }
                    model.appearedSeveralTime += 1
                    model.lastBySelectedTime = time.getTime()
                    model.records.push(record)
                    resolve(model)
                })
            } catch (e) {
                reject(e)
                console.log("ExaminationPaper Error on update")
            }
        })
    }

    updateQuestions(json) {

        return new Promise((resolve, reject) => {
            try {

                realm.beginTransaction()
                let questions = []
                json.data.forEach(function (value, index) {

                    let question = realm.create('QuestionPaper', value)
                    questions.push(question)
                })
                console.log("QuestionPaper save success")
                resolve(questions)
                realm.commitTransaction()

            } catch (e) {
                console.log("QuestionPaper Error on creation" + e)
                reject(e)
            }
        })
    }

    /// 查询数据
    // 获取当前用户
    getCurrentUser() {

        let users = realm.objects('User')
        if (users.length == 0) {
            return null
        } else {
            return users[0]
        }
    }

    getAllExams() {

        let exams = realm.objects('ExaminationPaper')
        console.log("realmManager.js get all exams", exams)
        if (exams.length == 0) {
            return null
        } else {
            return exams
        }
    }

    isHaveExamiationPaper(id) {
        let examinationPaper = realm.objectForPrimaryKey('ExaminationPaper', id)
        console.log("isHaveExamiationPaper", id)
        if (examinationPaper) {
            return true
        } else {
            return false
        }
    }

    saveMemoryModelsByExamData(examData, examId) {

        console.log("save memory models by exam data ", examData, examId)
        const that = this
        return new Promise((resolve, reject) => {
            try {
                var memoryModels = that.getMemoryModelsByExam(examId)
                if (memoryModels) {
                    memoryModels.forEach( async (model) => {
                        
                        for (let key in examData) {
                            if (model.examId == examData[key].paper_id &&
                                model.questionPaper.question_number == examData[key].question_number) {
                                console.log("examData[key], model", examData[key], model)
                                await that._saveMemoryData(examData[key], model)
                            }
                        }
                    })
                }

            } catch (e) {
                console.log("saveMemoryModelsByExamData Error on update", e)
                reject(e)
            }
        })
    }

    _saveMemoryData(questionData, memoryModel) {
        console.log("realmManager.js questionData, memoryModel", questionData, memoryModel)
        return new Promise((resolve, reject) => {
            try {
                let record = JSON.parse(questionData.record)

                realm.write(() => {
                    memoryModel.weighting = questionData.weighted
                    memoryModel.appearedSeveralTime = record.length
                    memoryModel.lastBySelectedTime = questionData.lastDateTime
                    memoryModel.firstBySelectedTime = questionData.firstDateTime
                    memoryModel.records = record
                    console.log("save memory data", memoryModel)
                })
            } catch (e) {
                console.log("ExaminationPaper Error on creation", e)
                reject(e)
            }
        })
    }

    updateCurrentExamInfo(item) {

        const user = this.getCurrentUser()

        try {
            realm.write(() => {
                user.currentExamId = item.id
                user.currentExamTitle = item.title
            })
        } catch (e) {
            console.log("choose", e)
        }
        return user
    }

    // 通过id获取指定试卷
    getExaminationPaper(id) {

        let examinationPaper = realm.objectForPrimaryKey('ExaminationPaper', id)

        if (examinationPaper) {
            return examinationPaper
        } else {
            return null
        }
    }

    getScheduleBySpecialDate(date) {

        let schedule = realm.objects('Schedule').filtered('date=' + date)[0]

        if (schedule.length == 0) {

            console.log("getScheduleBySpecialDate: schedule is empty")
            return null
        }

        return schedule
    }

    getTodaySchedule() {

        let schedules = realm.objects('Schedule').filtered('date=' + date)[0]

        return schedules
    }

    updateSchdule(model) {

    }

    getRandomPaper() {

        let exams = realm.objects('QuestionPaper')
        if (exams.length == 0) {

            console.log("QuestionPaper: schedule is empty")
            return null
        }
        return exams
    }

    getMemoryModels() {

        let models = realm.objects('MemoryModel')
        if (models.length == 0) {
            console.log("Memory Models is empty")
            return null
        }
        return models
    }

    getMemoryModelsByExam(examId) {

        let models = realm.objects("MemoryModel").filtered("examId=$0", examId)
        if (models.length == 0) {
            console.log("getMemoryModelsByExam Memory Models is empty")
            return null
        }
        return models
    }

    getCurrentMemoryModel(category) {

        let user = this.getCurrentUser()
        if (category == "new") {
            let models = realm.objects('MemoryModel')
                .filtered("appearedSeveralTime=0 && examId=$0", user.currentExamId)
                .sorted('lastBySelectedTime', false)

            if (models.length == 0) {
                console.log("Memory Models is empty")
                return null
            }
            return models[0]
        }
        if (category == "wrong") {

            let models = realm.objects('MemoryModel')
                .filtered("weighting<7 && appearedSeveralTime>0 && examId=$0", user.currentExamId)
                .sorted('lastBySelectedTime', false)

            if (models.length == 0) {
                console.log("Memory Models is empty")
                return null
            }
            return models[0]
        }
    }

    getNewQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime=0')

        return models.length
    }

    getWrongQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime>0 && weighting<7')

        return models.length
    }

    getFindInfo(examId) {

        if (examId == '') {
            return
        }

        let object = new Object()

        let models = realm.objects("MemoryModel").filtered("examId=$0", examId)

        var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000
        var todayNumber = models.filtered('lastBySelectedTime>$0', timeStamp).length
        var finishedModels = models.filtered('weighting>=7 && appearedSeveralTime > 0')
        var unfishedModels = models.filtered('weighting<7 && appearedSeveralTime > 0')
        var x = finishedModels.length
        var y = unfishedModels.length

        var futureArray = []
        futureArray.push(x + y)
        futureArray.push(Math.round(x + (0.6 * y)))
        futureArray.push(Math.round(x + (0.45 * y)))
        futureArray.push(Math.round(x + (0.36 * y)))
        futureArray.push(Math.round(x + (0.34 * y)))
        futureArray.push(Math.round(x + (0.28 * y)))

        object.futureArray = futureArray

        var beforeArray = []
        var oneDay = 24 * 60 * 60


        /// 五天前
        var before_5 = models.filtered('firstBySelectedTime<$0&&firstBySelectedTime>$1', (timeStamp - 4 * oneDay), (timeStamp - 5 * oneDay)).length
        beforeArray.push(before_5)
        var before_4 = models.filtered('firstBySelectedTime<$0&&firstBySelectedTime>$1', (timeStamp - 3 * oneDay), (timeStamp - 4 * oneDay)).length
        beforeArray.push(before_4)
        var before_3 = models.filtered('firstBySelectedTime<$0&&firstBySelectedTime>$1', (timeStamp - 2 * oneDay), (timeStamp - 3 * oneDay)).length
        beforeArray.push(before_3)
        var before_2 = models.filtered('firstBySelectedTime<$0&&firstBySelectedTime>$1', (timeStamp - oneDay), (timeStamp - 2 * oneDay)).length
        beforeArray.push(before_2)
        var before_1 = models.filtered('firstBySelectedTime<$0&&firstBySelectedTime>$1', timeStamp, (timeStamp - oneDay)).length
        beforeArray.push(before_1)
        beforeArray.push(todayNumber)
        object.beforeArray = beforeArray

        var a = []
        var b = []
        var c = []

        models.forEach(value => {
            if (value.examId == examId) {
                if (value.records.length == 0) {
                    a.push(value)
                } else if (value.records.length == 1) {
                    b.push(value)
                } else {
                    c.push(value)
                }
            }
        })

        object.newQuestionCount = a.length
        object.wrongQuestionCount = models.filtered('weighting<7 && appearedSeveralTime > 0').length
        object.newLastSelectDate = "暂无数据"
        object.wrongLastSelectDate = "暂无数据"

        var wrongSum = beforeArray.reduce(function (a, b) { return a + b })
        var wrongAvg = wrongSum / beforeArray.length

        object.newAverage = Math.round(wrongAvg)

        var newSum = futureArray.reduce(function (a, b) { return a + b })
        var newAvg = newSum / futureArray.length

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

    deleteAllRealmData() {

        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    realm.deleteAll()
                    resolve()
                })
            } catch (e) {
                reject(e)
                console.log("ExaminationPaper Error on update")
            }
        })
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }
}

module.exports = new RealmManager()