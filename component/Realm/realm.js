'use strict';

import Realm from 'realm';

class Question extends Realm.Object { }

Question.schema = {
    name: 'Question',
    properties: {
        analysis: { type: 'string', optional: true },            /// 分析
        answer: 'string',                                        /// 答案
        category_of_problem: 'string',                           /// 题目类型: '资料分析' "常识判断"  "言语理解与表达"  "数量关系" "判断推理"
        expand: { type: 'string', optional: true },              /// 扩展
        number: 'int',                                           /// 题号
        option_A: { type: 'string', optional: true },
        option_B: { type: 'string', optional: true },
        option_C: { type: 'string', optional: true },
        option_D: { type: 'string', optional: true },
        paraphrase: { type: 'string', optional: true },          /// 释义
        province: { type: 'string' },                            /// 省份
        recipe: { type: 'string', optional: true },              /// 秘技
        type_of_problem: { type: 'string', optional: true },     /// 类型 '单选题'
        uid: 'string',                                           /// 标识 ID
        type: 'string',
        name_of_paper: 'string',
        error_correction: { type: 'string', optional: true },    /// 纠错
    }
}

class User extends Realm.Object { }

User.schema = {

    name: 'User',
    properties: {
        account: { type: 'string', optional: true },            /// 账号
        avatar: { type: 'string' },                             /// 头像
        token: { type: 'string', }
    }
}

export default new Realm({ schema: [Question, User] });
