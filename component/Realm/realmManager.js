'use strict';

import realm from './realm';
import moment from "moment";

class RealmManager {

    createQuestion(json) {
        console.log("realm manager json", json);
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let questions = []
                    json.data.forEach(function (value, index) {

                        let question = realm.create('QuestionPaper', value);
                        questions.push(question)
                    })
                    console.log("QuestionPaper save success")
                    resolve(questions)
                });
            } catch (e) {
                console.log("QuestionPaper Error on creation" + e);
                reject(e);
            }
        })
    }

    createExaminationPaper(examinationPaper) {

        const that = this
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {

                    let exam = realm.create('ExaminationPaper', examinationPaper);
                    resolve(exam)
                });
            } catch (e) {
                console.log("ExaminationPaper Error on creation", e);
                reject(e)
            }
        })
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    realm.create('User', user);
                    resolve();
                });
            } catch (e) {
                console.log("User Error on creation", e);
                reject(e);
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
                console.log("MemoryModel Error on creation");
            }
        })

        return promise
    }

    createSchedule(schedule) {

        try {
            realm.write(() => {
                realm.create('Schedule', schedule);
            });
        } catch (e) {
            console.log("Schedule Error on creation");
        }
    }


    /// 更新

    // 更新试卷
    updateExaminationPaper(newExaminationPaper) {

        let oldExaminationPaper = realm.objectForPrimaryKey('ExaminationPaper', newExaminationPaper.id);

        try {
            realm.write(() => {
                oldExaminationPaper = newExaminationPaper;
            });
        } catch (e) {
            console.log("ExaminationPaper Error on update");
        }
    }

    updateUserExamIds(examIds) {
        
        let examIdsJSON = JSON.stringify(examIds)
        var user = this.getCurrentUser();
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    user.examIds = examIdsJSON
                    resolve(user)
                });
            } catch (e) {
                reject(e);
                console.log("ExaminationPaper Error on update");
            }
        });
    }

    updateMemoryModel(model, record, newWeighting) {

        var time = new Date()

        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    model.weighting = newWeighting
                    model.appearedSeveralTime += 1
                    model.lastBySelectedTime = time.getTime()
                    model.records.push(record)
                    resolve(model)
                });
            } catch (e) {
                reject(e);
                console.log("ExaminationPaper Error on update");
            }
        });
    }

    /// 查询数据
    // 获取当前用户
    getCurrentUser() {

        let users = realm.objects('User');
        if (users.length == 0) {
            return null;
        } else {
            return users[0];
        }
    }

    isHaveExamiationPaper(id) {
        let examinationPaper = realm.objectForPrimaryKey('ExaminationPaper', id);
        console.log("isHaveExamiationPaper", id)
        if (examinationPaper) {
            return true
        } else {
            return false
        }
    }

    saveMemoryModelsByExamData(examData, examId) {

        console.log("save memory models by exam data ", examData, examId);
        const that = this
        return new Promise((resolve, reject) => {
            try {
                var memoryModels = that.getMemoryModelsByExam(examId)
                memoryModels.forEach((model) => {

                    for (let key in examData) {
                        if (model.examId == examData[key].bankname &&
                            model.questionPaper.question_number == examData[key].qname) {
                            console.log("examData[key], model", examData[key], model)
                            that._saveMemoryData(examData[key], model);
                        }
                    }
                })

                // for(let model of memoryModels) {

                    
                //     // for (let questionModel of examData) {
                //     //     console.log("question model", questionModel);
                //     // }

                //     // if (model.examId == examData.bankname && model.questionPaper.question_number == examData.qname) {
                //     //     that._saveMemoryData(examData);
                //     // }
                // }

            } catch (e) {
                console.log("ExaminationPaper Error on creation", e);
                reject(e)
            }
        })
    }

    _saveMemoryData(questionData, memoryModel) {

        realm.write(() => {
            memoryModel.weighting = questionData.weighted
            memoryModel.appearedSeveralTime = questionData.right + questionData.wrong
            memoryModel.lastBySelectedTime = parseInt(questionData.dateTime)

            for (let rightTime = 0; rightTime < questionData.right; rightTime++) {

                memoryModel.records.push({
                    isRight: true
                })
            }

            for (let wrongTime = 0; wrongTime < questionData.wrong; wrongTime++) {

                memoryModel.records.push({
                    isRight: false
                })
            }
            console.log("save memory data", memoryModel);
        });
    }


    // 通过id获取指定试卷
    getExaminationPaper(id) {

        let examinationPaper = realm.objectForPrimaryKey('ExaminationPaper', id);

        if (examinationPaper) {
            return examinationPaper
        } else {
            return null
        }
    }

    getScheduleBySpecialDate(date) {

        let schedule = realm.objects('Schedule').filtered('date=' + date)[0];

        if (schedule.length == 0) {

            console.log("getScheduleBySpecialDate: schedule is empty");
            return null
        }

        return schedule;
    }

    getTodaySchedule() {

        let schedules = realm.objects('Schedule').filtered('date=' + date)[0];

        return schedules
    }

    updateSchdule(model) {

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

    getRandomPaper() {

        let exams = realm.objects('QuestionPaper');
        if (exams.length == 0) {

            console.log("QuestionPaper: schedule is empty");
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

        let user = this.getCurrentUser();
        if (category == "new") {
            let models = realm.objects('MemoryModel')
            .filtered("appearedSeveralTime=0 && examId=$0", user.currentExamId)
            .sorted('lastBySelectedTime', false)

            if (models.length == 0) {
                console.log("Memory Models is empty")
                return null;
            }
            return models[0]
        } 
        if (category == "wrong") {

            let models = realm.objects('MemoryModel')
            .filtered("weighting<7 && appearedSeveralTime>0 && examId=$0", user.currentExamId)
            .sorted('lastBySelectedTime', false)

            if (models.length == 0) {
                console.log("Memory Models is empty")
                return null;
            }
            return models[0]
        }
    }

    getNewQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime=0');

        return models.length
    }

    getWrongQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime>0 && weighting<7');

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
        var before_5 = models.filtered('lastBySelectedTime<$0&&lastBySelectedTime>$1', (timeStamp - 4 * oneDay), (timeStamp - 5 * oneDay)).length
        beforeArray.push(before_5)
        var before_4 = models.filtered('lastBySelectedTime<$0&&lastBySelectedTime>$1', (timeStamp - 3 * oneDay), (timeStamp - 4 * oneDay)).length
        beforeArray.push(before_4)
        var before_3 = models.filtered('lastBySelectedTime<$0&&lastBySelectedTime>$1', (timeStamp - 2 * oneDay), (timeStamp - 3 * oneDay)).length
        beforeArray.push(before_3)
        var before_2 = models.filtered('lastBySelectedTime<$0&&lastBySelectedTime>$1', (timeStamp - oneDay), (timeStamp - 2 * oneDay)).length
        beforeArray.push(before_2)
        var before_1 = models.filtered('lastBySelectedTime<$0&&lastBySelectedTime>$1', timeStamp, (timeStamp - oneDay)).length
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

        var newSum = futureArray.reduce(function(a, b) { return a + b; });
        var newAvg = newSum / futureArray.length;

        object.newAverage = Math.round(newAvg)
        
        var wrongSum = beforeArray.reduce(function(a, b) { return a + b; });
        var wrongAvg = wrongSum / beforeArray.length;
        object.wrongAverage = Math.round(wrongAvg)

        if (b.length != 0) {
            b.sort((a1, b1) => {
                return b1.lastBySelectedTime - a1.lastBySelectedTime
            })
            var model = b[0]
            var date = new Date(model.lastBySelectedTime)
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

        object.pieArray = [{ value: x }, { value: object.wrongQuestionCount }, { value: a.length }];

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
        });
    }

    deleteAllRealmData() {

        realm.write(() => {
            realm.deleteAll();
        });
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = new RealmManager()