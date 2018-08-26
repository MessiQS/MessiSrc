'use strict';

import Realm from 'realm';

/// 试题
class QuestionPaper extends Realm.Object { }

QuestionPaper.schema = {

    name: 'QuestionPaper',
    primaryKey: 'id',
    properties: {

        id: 'string',                                            /// 标识 ID        
        analysis: { type: 'string', optional: true },            /// 解析
        answer: 'string',                                        /// 答案
        category: 'string',                                      /// 题目类型: "资料分析"  "常识判断" "言语理解与表达"  "数量关系" "判断推理"
        created_at: 'string',                                    /// 创建时间 时间戳
        updated_at: 'string',                                    /// 更新时间 "yyyy-MM-DD hh-mm-ss"
        question_number: 'int',                                  /// 题号
        option_A: { type: 'string', optional: true },            /// 选项 A
        option_B: { type: 'string', optional: true },            /// 选项 B
        option_C: { type: 'string', optional: true },            /// 选项 C
        option_D: { type: 'string', optional: true },            /// 选项 D
        province: { type: 'string' },                            /// 省份
        question: 'string',                                      /// 题目
        subject: { type: 'string', optional: true },             /// 类型 '单选题'
        title: 'string',                                         /// 试卷名称 "2004年国家(A卷)《行测》真题"
        question_point: { type: 'string', optional: true },      /// 考点 '历史类' '语义分析' "对应关系,同一关系"
        question_material: { type: 'string', optional: true },   /// 材料
        ignoreWarning: 'bool',                                   /// 是否忽略 正常 错误 选项提示
    }
}

/// 用户
class User extends Realm.Object { }

User.schema = {

    name: 'User',
    primaryKey: 'userId',
    properties: {

        userId: 'string',
        account: { type: 'string', optional: true },                             /// 账号
        avatarURL: { type: 'string', default: "" },                              /// 头像
        token: { type: 'string', default: "" },
        examIds: { type: 'string', default: "" },                                /// 购买的试卷
        currentExamId: { type: 'string', default: "" },
        currentExamTitle: { type: 'string', default: "" },
    }
}

/// 试卷
class ExaminationPaper extends Realm.Object { }

ExaminationPaper.schema = {

    name: 'ExaminationPaper',
    primaryKey: 'id',
    properties: {

        id: 'string',                                           /// 例如 SP00065
        title: 'string',                                        /// 名称  "江苏省2013年B类卷"
        year: 'string',                                         /// 年份
        province: 'string',                                     /// 所在省份
        version: 'string',                                      /// 当前版本
        purchased: 'bool',                                      /// 是否已购
        price: { type: 'float', optional: true, default: 0 },   /// 价格，允许免费
        questionPapers: { type: 'list', objectType: 'QuestionPaper' },    /// 试题
    }
}

/// 答题记录
class MemoryRecordModel extends Realm.Object { }

MemoryRecordModel.schema = {

    name: 'MemoryRecordModel',
    properties: {
        time: { type: 'int', default: new Date().getTime() },        /// 选择时间，初始化为 0
        isRight: { type: 'bool', default: true },                    /// 是否正确
        select: { type: 'string', default: "" }                        /// 所选的答案 'A,B,C,D'
    }
}

/// 记忆模型
class MemoryModel extends Realm.Object { }

MemoryModel.schema = {

    name: 'MemoryModel',
    primaryKey: 'id',
    properties: {

        id: 'string',
        questionPaper: 'QuestionPaper',                                 /// 题目
        weighting: { type: 'float', default: 0 },                       /// 加权分数, 初始化为 0
        appearedServeralTime: { type: 'int', default: 0 },               /// 出现次数, 初始化为 0 毫秒级
        lastBySelectedTime: { type: 'int', default: 0 },                /// 上一次被选择时间，初始化为 0 毫秒级
        firstBySelectedTime: { type: 'int', default: 0 },               /// 首次选择的时间
        records: { type: 'list', objectType: 'MemoryRecordModel' },     /// 答题记录
        examId: "string",                                               /// 试卷的Id
    }
}

/// 进度规划
class Schedule extends Realm.Object { }

Schedule.schema = {

    name: 'Schedule',
    primaryKey: 'id',
    properties: {

        id: 'string',
        date: { type: 'date' },
        memoryModels: { type: 'list', objectType: 'MemoryModel' },    /// 记忆模型库
    }
}

export default new Realm({
    schema: [QuestionPaper, User, ExaminationPaper,
        MemoryModel, Schedule, MemoryRecordModel],
    schemaVersion: 2,
    migration: function (oldRealm, newRealm) {
        // 只有在 schemaVersion 提升为 1 的时候才应用此变化
        if (oldRealm.schemaVersion < 1) {
            var oldObjects = oldRealm.objects('MemoryModel');
            var newObjects = newRealm.objects('MemoryModel');

            // 遍历所有对象，然后设置新架构中的 `appearedServeralTime` 属性
            for (var i = 0; i < oldObjects.length; i++) {
                newObjects[i].appearedServeralTime = oldObjects[i].appearedSeveralTime;
            }
        }
    }
});
