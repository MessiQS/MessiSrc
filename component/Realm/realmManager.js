'use strict';

import realm from './realm';

class RealmManager {

    createQuestion(json) {
        return new Promise((resolve, reject) =>{
            try {
                realm.write(() => {
                    let questions = []
                    json.data.forEach( function(value, index) {
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

        try {
            realm.write(() => {
                 realm.create('ExaminationPaper', examinationPaper);
            });
        } catch (e) {
             console.log("ExaminationPaper Error on creation");
        }
    }

    createUser(user) {

        try {
            realm.write(() => {
                 realm.create('User', user);
            });
        } catch (e) {
             console.log("User Error on creation");
        }
    }

    createMemoryModels(papers) {

        const that = this
        let promise = new Promise((resolve, reject) =>{    
            try {
                realm.write(() => {
                    let array = []
                    papers.forEach(function(value, index) {
                        
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

    getRandomPaper() {

        let exams = realm.objects('QuestionPaper');
        if (exams.length == 0) {

            console.log("QuestionPaper: schedule is empty");
            return null
        }
        return exams
    }

    getMemoryModels() {
        
        let models = realm.objects('MemoryModel').filtered('weighting < 7')
        if  (models.length == 0) {
            console.log("Memory Models is empty")
            return null
        }
        return models
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
}

module.exports = new RealmManager()