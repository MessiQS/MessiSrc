
import Storage from "./storage";
import {AlertIOS} from "react-native";
const webURL = "http://samso.cn/";

export default class Http {

    static post(api,paramObj){
        let url = webURL + api,
            body = ((obj)=>{
                let keyArray = Object.keys(obj),
                    str = keyArray.map((res,index)=>{
                        if(index !== keyArray.length - 1)
                            return res + '=' + obj[res] + '&';
                        else
                            return res + '=' + obj[res];
                    }).join('');
                return str;
            })(paramObj),
            params = Object.assign({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, 
                body:body,            
            });
        return fetch(url,params)
                .then( res => res.json())
                .catch( err => console.log(err))

    }

    static async getPaper(callback) {

        account = await Storage.getItem("account");
        token = await Storage.getItem("accountToken");

        let url = webURL+"api/papertype?account=" + account + "&token="+ token;

        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch((error) => {  
            alert(error)  
        })
    }

    static async download() {
        
    }
}