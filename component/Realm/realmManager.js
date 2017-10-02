'use strict';

import realm from './realm';

export default class RealmManager {


    /// 创建
    static createQuestion(question) {

        try {
            realm.write(() => {
                 realm.create('Question', question);
            });
        } catch (e) {
             console.log("Question Error on creation");
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
    static updateQuestion(question) {


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

        let examinationPaper = realm.objects('ExaminationPaper').filtered('id=' + id + '')[0];

        return examinationPaper;
    }
}

