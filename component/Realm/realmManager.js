'use strict';

import realm from './realm';


export default class RealmManager {

    /// 创建
    static createQuestion(json) {

        try {
            realm.write(() => {
                json.data.forEach( function(value, index) {

                    realm.create('QuestionPaper', value);
                })
                console.log("QuestionPaper save success")
            });
        } catch (e) {
            console.log("QuestionPaper Error on creation" + e);
        }
    }

    static createExaminationPaper(examinationPaper) {

        try {
            realm.write(() => {
                 realm.create('ExaminationPaper', examinationPaper);
            });
        } catch (e) {
             console.log("ExaminationPaper Error on creation");
        }
    }

    static createUser(user) {

        try {
            realm.write(() => {
                 realm.create('User', user);
            });
        } catch (e) {
             console.log("User Error on creation");
        }
    }

    static createMemoryModel(memoryModel) {

        try {
            realm.write(() => {
                 realm.create('MemoryModel', memoryModel);
            });
        } catch (e) {
             console.log("MemoryModel Error on creation");
        }
    }

    static createSchedule(schedule) {

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
    static updateExaminationPaper(newExaminationPaper) {

        let oldExaminationPaper = realm.objectForPrimaryKey('id', newExaminationPaper.id);

        try {
            realm.write(() => {
                oldExaminationPaper = newExaminationPaper;
            });
        } catch (e) {
             console.log("ExaminationPaper Error on update");
        }
    }

    

    /// 查询数据

    // 获取当前用户
    static getCurrentUser() {

        let users = realm.objects('User');

        if (users.length == 0) {

            return null;

        } else {

            return users[0];
        }
    }

    // 通过id获取指定试卷
    static getExaminationPaper(id) {

        let examinationPaper = realm.objectForPrimaryKey('id', id);

        return examinationPaper;
    }

    static getScheduleBySpecialDate(date) {

        let schedule = realm.objects('Schedule').filtered('date=' + date)[0];

        if (schedule.length == 0) {

            console.log("getScheduleBySpecialDate: schedule is empty");
        }

        return schedule;
    }

    static getRandomPaper() {

        let exams = realm.objects('QuestionPaper');
        if (exams.length == 0) {

            console.log("QuestionPaper: schedule is empty");
        }
        return exams
    }
}

