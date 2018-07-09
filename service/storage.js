import { AsyncStorage, Alert } from 'react-native';
export default class Storage {
    static getItem(key) {
        if (!key) {
            console.log('没有key');
            return;
        }
        try {
            return AsyncStorage.getItem(key);
        } catch (error) {
            console.log(error)
        }
    }
    static setItem({ key, value }) {
        if (!key) {
            console.log('没有key');
            return;
        }
        try {
            return AsyncStorage.setItem(key, value);
        } catch (error) {
            return false;
            console.log(error)
        }
    }
    static multiSet(argu){
        try {
            return AsyncStorage.multiSet(argu);
        } catch (error) {
            return {
                type:"fail",
                data:"存储登录信息错误"
            };
        }
    }
    
    static multiGet(argu){
        try{
            return AsyncStorage.multiGet(argu).then( result => {
                let obj = new Object();
                result.forEach( res => {
                    obj[res[0]] = res[1];
                })
                return obj;
            });
        }catch(error){
            return false;
        }
    }
    static removeItem(key) {
        if (!key) {
            console.log('没有key');
            return;
        }
        try {
            return AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    static clearAll() {
        try {
            return AsyncStorage.clear();
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}