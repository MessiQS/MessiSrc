'use strict';

import realm from './realm';

export default class RealmManager {


    static setItem() {

        
    }

    static createQuestion(question) {
        try {
            realm.write(() => {
                 realm.create('Question', question);
            });
        } catch (e) {
             console.log("Error on creation");
        }
    }
}

