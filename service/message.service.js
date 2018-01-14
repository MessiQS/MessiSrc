import Http from './http';

export default class MessageService {
    static async getPaper(params) {
        return Http.get('api/papertype',{},true);
    }
    
    static async downloadPaper(params) {
        return Http.get('api/getpaper',params,true)
    }

    static async updateUserStorage() {
        
    }
}