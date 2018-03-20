import Http from './http';
import realmManager from '../component/Realm/realmManager'

export default class MessageService {
    
    static async getPaper(params) {
        return Http.get('api/papertype', params, true);
    }

    static async downloadPaper(params) {
        return Http.get('api/getpaper', params, true)
    }

    static async updateUserStorage() {

    }

    static async getUpdateInfo(version) {
        return Http.get('api/getUpdate', {
            version
        }, true)
    }

    static async getSpecialRecordByPaperId(paperId) {
        return Http.get('api/getQuestionInfoByPaperid', {
            paper_id: paperId
        }, true)
    }

    /**
     * 
     * @param {*} params 
     *  title,
        id,
        question_number,
        user_id
     */
    static async wrongFeedback(params) {
        return Http.post('api/wrongFeedBack', params, true);
    }
}