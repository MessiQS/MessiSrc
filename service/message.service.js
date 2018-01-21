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
}