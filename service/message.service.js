import Http from './http';

export default class MessageService {
    static async getPaper() {
        return Http.get('api/papertype',{},true);
    }
    
    static async downloadPaper(params) {
        return Http.get('api/getpaper',params,true)
    }

    static async updateUserStorage() {
        
    }

    static async getUpdateInfo() {
        return Http.get('api/getUpdate',{},true)
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