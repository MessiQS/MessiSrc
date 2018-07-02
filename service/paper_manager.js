import realmManager from "../component/Realm/realmManager"
import MessageService from "../service/message.service"
import HTTP from "./http"

class PaperManager {


    async updateExamIfNeed(papers) {
        let exams = realmManager.getAllExams()
        if (exams) {
            /// 遍历本地试卷
            exams.forEach(exam => {
                /// 遍历所有试卷信息
                papers.forEach(provinceInfo => {

                    if (exam.province == provinceInfo.province) {

                        provinceInfo.data.forEach(async value => {
                            if (value.id == exam.id && value.version != exam.version) {

                                console.log("province info", value)
                                const json = await MessageService.downloadPaper({
                                    paperId: value.id
                                })

                                console.log("list of topic js json", json)
                                if (json.type == true) {

                                    await realmManager.updateExaminationPaper(value, json.data)
                                }
                            }
                        })
                    }
                });
            })
        }
    }

    async downloadExam(item) {

        console.log("paper manager download exam ", item)
        const json = await MessageService.downloadPaper({
            paperId: item.id
        });

        console.log("MessageService.downloadPaper", json)
        if (json.type == false) {
            return false
        }

        const papers = await realmManager.createQuestion(json)
        let recordResponse = await MessageService.getSpecialRecordByPaperId(item.id)
        console.log("recordResponse", recordResponse)
        await realmManager.createExaminationPaper({
            id: item.id,
            title: item.title,
            questionPapers: papers,
            year: item.year || "",
            province: item.province || "",
            version: item.version || "1",
            purchased: true,
            price: parseFloat(item.price),
        })
        if (recordResponse.type == true && Object.keys(recordResponse.data) !== 0) {
            await this._handleMemoryModels(recordResponse.data)
        }
        return true
    }

    /**
     * 这个是原来登录里面处理已有用户数据的代码
     * @param {*} userInfo 
     */
    async _handleMemoryModels(userQuestionInfo) {
        let keys = Object.keys(userQuestionInfo)
        console.log("userQuestionInfo", userQuestionInfo)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            realmManager.saveMemoryModelsByExamData(userQuestionInfo[key], key);
        }
    }

    getMainCategory(callback) {

        HTTP.get("api/getSecondType", {}).then(value => {
            console.log("api/getSecondType", value)
        })
        .catch(error => {

        })
    }
}

module.exports = new PaperManager()