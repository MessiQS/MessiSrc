'use strict';

import Realm from 'realm';

/// 试题
class Question extends Realm.Object { }

Question.schema = {

    name: 'Question',
    properties: {

        uid: 'string',                                           /// 标识 ID        
        analysis: { type: 'string', optional: true },            /// 分析
        answer: 'string',                                        /// 答案
        category_of_problem: 'string',                           /// 题目类型: "资料分析"  "常识判断" "言语理解与表达"  "数量关系" "判断推理"
        expand: { type: 'string', optional: true },              /// 扩展
        number: 'int',                                           /// 题号
        option_A: { type: 'string', optional: true },            /// 选项 A
        option_B: { type: 'string', optional: true },            /// 选项 B
        option_C: { type: 'string', optional: true },            /// 选项 C
        option_D: { type: 'string', optional: true },            /// 选项 D
        paraphrase: { type: 'string', optional: true },          /// 释义
        province: { type: 'string' },                            /// 省份
        recipe: { type: 'string', optional: true },              /// 秘技
        type_of_problem: { type: 'string', optional: true },     /// 类型 '单选题'
        type: 'string',
        name_of_paper: 'string',
        error_correction: { type: 'string', optional: true },    /// 纠错
    }
}

/// 用户
class User extends Realm.Object { }

User.schema = {

    name: 'User',
    properties: {

        id: 'string',
        account: { type: 'string', optional: true },            /// 账号
        avatarURL: { type: 'string' },                          /// 头像
        token: { type: 'string', },
        examinationPapers: {type: 'list', objectType: 'string'} /// 购买的试卷
    }
}

/// 试卷
class ExaminationPaper extends Realm.Object { } 

ExaminationPaper.schema = {

    name: 'ExaminationPaper',
    properties: {

        id: 'string',
        year: 'string',
        province: 'string',
        version: 'string',
        price: { type: 'float', optional: true },
        questions: { type: 'list', objectType: 'Question' },
    }
}

export default new Realm({ schema: [Question, User, ExaminationPaper] });
