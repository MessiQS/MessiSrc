'use strict';

import Realm from 'realm';

/// 试题
class Question extends Realm.Object { }

Question.schema = {

    name: 'Question',
    primaryKey: 'uid',
    properties: {

        uid: 'string',                                           /// 标识 ID        
        analysis: { type: 'string', optional: true },            /// 解析
        answer: 'string',                                        /// 答案
        category_of_problem: 'string',                           /// 题目类型: "资料分析"  "常识判断" "言语理解与表达"  "数量关系" "判断推理"
        expand: { type: 'string', optional: true },              /// 拓展
        number: 'int',                                           /// 题号
        option_A: { type: 'string', optional: true },            /// 选项 A
        option_B: { type: 'string', optional: true },            /// 选项 B
        option_C: { type: 'string', optional: true },            /// 选项 C
        option_D: { type: 'string', optional: true },            /// 选项 D
        paraphrase: { type: 'string', optional: true },          /// 释义
        province: { type: 'string' },                            /// 省份
        recipe: { type: 'string', optional: true },              /// 技巧
        type_of_problem: { type: 'string', optional: true },     /// 类型 '单选题'
        type: 'string',
        name_of_paper: 'string',
        error_correction: { type: 'string', optional: true },    /// 纠错
        examination_point: { type: 'string', optional: true },   /// 考点
    }
}

/// 用户
class User extends Realm.Object { }

User.schema = {

    name: 'User',
    primaryKey: 'id',
    properties: {

        id: 'string',
        account: { type: 'string', optional: true },              /// 账号
        avatarURL: { type: 'string' },                            /// 头像
        token: { type: 'string', },
        examinationPapers: { type: 'list', objectType: 'string' } /// 购买的试卷id
    }
}

/// 试卷
class ExaminationPaper extends Realm.Object { }

ExaminationPaper.schema = {

    name: 'ExaminationPaper',
    primaryKey: 'id',
    properties: {

        id: 'string',
        title: 'string',                                        /// 名称  "江苏省2013年B类卷"
        year: 'string',                                         /// 年份
        province: 'string',                                     /// 所在省份
        version: 'string',                                      /// 当前版本
        purchased: 'bool',                                      /// 是否已购
        price: { type: 'float', optional: true, default: 0 },   /// 价格，允许免费
        questions: { type: 'list', objectType: 'Question' },    /// 试题
    }
}

/// 记忆模型
class MemoryModel extends Realm.Object { }

MemoryModel.schema = {

    name: 'MemoryModel',
    primaryKey: 'id',
    properties: {

        id: 'string',
        question: 'Question',                                   /// 题目
        weighting: { type: 'float', default: 0 },               /// 加权分数, 初始化为 0
        appearedSeveralTime: { type: 'int', default: 0 },       /// 出现次数, 初始化为 0
        lastAppearTime: { type: 'date', default: 0 },           /// 上一次出现时间，初始化为 0
    }
}

/// 进度规划
class Schedule extends Reaml.Object { }

Schedule.schema = {

    name: 'Schedule',
    primaryKey: 'id',
    properties: {

        id: 'string',
        date: { type: 'date' },
        learnTotal: { type: 'int', default: 0 },                      /// 需要被
        needLearnTotal: { type: 'int', default: 0 },                  /// 需要被记忆数量 (抗遗忘刷题数量)
        memoryModels: { type: 'list', objectType: 'MemoryModel' },    /// 记忆模型库
    }
}

export default new Realm({ schema: [Question, User, ExaminationPaper, MemoryModel, Schedule] });
