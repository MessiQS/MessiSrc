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
        var fiveDayAgo = timeStamp - 86400 * 5

        object.beforeDaysAverage = models.filtered('lastBySelectedTime>' + fiveDayAgo + '&&' + 'lastBySelectedTime<' + timeStamp) / 5

        var finishedModels = models.filtered('weighting>=7')
        var unfishedModels = models.filtered('weighting<7')
        var x = finishedModels.length
        var y = unfishedModels.length


        var sortedModels = unfishedModels
        console.log("sortedModels", sortedModels)
        var lastModel = null
        if (sortedModels.length > 0) {

            lastModel = sortedModels[0]
        }
        object.lastSelectDate = moment(lastModel.lastBySelectedTime.toString(), "X").startOf('day').fromNow(); 
        console.log("time", object.lastSelectDate)

        // object.lastSelectDate = ""
        // console.log("lastModel", lastModel)
        // if (lastModel != null) {

        //     var date = new Date(lastModel.lastBySelectedTime)
        //     object.lastSelectDate = getDateFormat(date)

        //     var selectTime = lastModel.lastBySelectedTime
        //     if (timeStamp < selectTime) {
        //         object.lastSelectDate = "今日"
        //     }

        //     var oneDayAgo = timeStamp - 86400 * 1
        //     if (timeStamp > selectTime && selectTime > oneDayAgo) {
        //         object.lastSelectDate = "昨日"
        //     }

        //     if (lastModel.lastBySelectedTime == 0) {
        //         object.lastSelectDate = "暂无数据"
        //     }
        // }

        return object
    }

    getDateFormat(date) {

        // 获取当前月份
        var nowMonth = date.getMonth() + 1;

        // 获取当前是几号
        var strDate = date.getDate();

        // 添加分隔符“-”
        var seperator = "-";

        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }

        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        return date.getFullYear() + seperator + nowMonth + seperator + strDate;

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