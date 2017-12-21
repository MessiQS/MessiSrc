'use strict';

import realm from './realm';
import moment from "moment";

class RealmManager {

    createQuestion(json) {
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
        let promise = new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let exam = realm.create('ExaminationPaper', examinationPaper);
                    resolve(exam)
                });
            } catch (e) {
                console.log("ExaminationPaper Error on creation");
                reject(e)
            }
        })

        return promise
    }

    createUser(user) {

        try {
            realm.write(() => {
                realm.create('User', user);
            });
        } catch (e) {
            console.log("User Error on creation", e);
        }
    }

    createMemoryModels(papers) {

        const that = this
        let promise = new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    let array = []
                    papers.forEach(function (value, index) {

                        let memoryModel = realm.create('MemoryModel', {
                            id: that.uuidv4(),
                            questionPaper: value,
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

        let oldExaminationPaper = realm.objectForPrimaryKey('id', newExaminationPaper.id);

        try {
            realm.write(() => {
                oldExaminationPaper = newExaminationPaper;
            });
        } catch (e) {
            console.log("ExaminationPaper Error on update");
        }
    }

    /// 更新进程
    updateSchedule(callback) {

    }

    /// 查询数据

    // 获取当前用户
    getCurrentUser() {

        let users = realm.objects('User');
        // console.log("user", users)
        if (users.length == 0) {

            return null;

        } else {

            return users[0];
        }
    }

    // 通过id获取指定试卷
    getExaminationPaper(id) {

        let examinationPaper = realm.objectForPrimaryKey('id', id);

        return examinationPaper;
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

    getNewQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime=0');

        return models.length
    }

    getWrongQuestionCount() {

        let models = realm.objects('MemoryModel').filtered('appearedSeveralTime>0 && weighting<7');

        return models.length
    }

    getPassFiveDaysAverage() {

    }

    getFindInfo() {
        let object = new Object()
        let models = realm.objects('MemoryModel')

        object.newQuestionCount = models.filtered('appearedSeveralTime=0').length;
        object.wrongQuestionCount = models.filtered('appearedSeveralTime>0 && weighting<7').length;

        var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000
        var todayNumber = models.filtered('lastBySelectedTime>' + timeStamp).length
        var finishedModels = models.filtered('weighting>=7')
        var unfishedModels = models.filtered('weighting<7')
        var x = finishedModels.length
        var y = unfishedModels.length

        var futureArray = []
        futureArray.push(todayNumber)
        futureArray.push(x+(0.6*y))
        futureArray.push(x+(0.45*y))
        futureArray.push(x+(0.36*y))
        futureArray.push(x+(0.34*y))
        futureArray.push(x+(0.28*y))

        object.futureArray = futureArray

        var beforeArray = []
        /// 五天前
        var before_5 = models.filtered('lastBySelectedTime<' + (timeStamp - 4 * 24 * 60 * 60) + "&&" + 'lastBySelectedTime>' + (timeStamp - 5 * 24 * 60 * 60)).length
        beforeArray.push(before_5)
        var before_4 = models.filtered('lastBySelectedTime<' + (timeStamp - 3 * 24 * 60 * 60) + "&&" + 'lastBySelectedTime>' + (timeStamp - 4 * 24 * 60 * 60)).length
        beforeArray.push(before_4)
        var before_3 = models.filtered('lastBySelectedTime<' + (timeStamp - 2 * 24 * 60 * 60) + "&&" + 'lastBySelectedTime>' + (timeStamp - 3 * 24 * 60 * 60)).length
        beforeArray.push(before_3)
        var before_2 = models.filtered('lastBySelectedTime<' + (timeStamp - 24 * 60 * 60) + "&&" + 'lastBySelectedTime>' + (timeStamp - 2 * 24 * 60 * 60)).length
        beforeArray.push(before_2)
        var before_1 = models.filtered('lastBySelectedTime<' + timeStamp + "&&" + 'lastBySelectedTime>' + (timeStamp - 24 * 60 * 60)).length
        beforeArray.push(before_1)
        beforeArray.push(todayNumber)
        object.beforeArray = beforeArray

        console.log("----------------")
        var a = models.filtered('records.Count() != 0')
        console.log("a.length", a.length)
        console.log("----------------")

        // var sortedModels = models.sorted(function(a, b) {
        //     return a.lastBySelectedTime.toString() < b.lastBySelectedTime.toString()
        // })
        // console.log("sortedModels", sortedModels)

        object.newLastSelectDate = "暂无数据"
        object.wrongLastSelectDate = "暂无数据"



        if (unfishedModels.length != 0) {
            var model = unfishedModels[0]
            var date = new Date(model.lastBySelectedTime)
            object.newLastSelectDate = this.getDateFormat(date)
        }
        if (finishedModels.length != 0) {
            var model = finishedModels[0]
            var date = new Date(model.lastBySelectedTime)
            object.wrongLastSelectDate = this.getDateFormat(date)
        }

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
                if (diff<7) {
                    return diff + "天前"
                } 
                var diff_1 = moment().diff(moment_input, 'weeks')
                if (diff_1<=5) {
                    return diff_1 + "周前"
                }
                var diff_2 = moment().diff(moment_input, 'months')
                if (diff_2<=12) {
                    return diff_2 + "月前"
                }
                var diff_3 = moment().diff(moment_input, 'months')
                
                return diff_3 + "年前"
            },
        });
    }

    deleteAllRealmData() {

    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

module.exports = new RealmManager()