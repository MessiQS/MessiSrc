
import Storage from "./storage";
import { AlertIOS } from "react-native";
import { webURL } from "./constant";

export default class Http {

    static async post(api, paramObj, hasToken) {
        let url = webURL + api,
            body = ((obj) => {
                let keyArray = Object.keys(obj),
                    str = keyArray.map((res, index) => {
                        if (index !== keyArray.length - 1)
                            return res + '=' + obj[res] + '&';
                        else
                            return res + '=' + obj[res];
                    }).join('');
                return str;
            })(paramObj);
        let token = await Storage.getItem("accountToken") || '';
        params = Object.assign({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: token,
            },
            body: body,
        });
        return fetch(url, params)
            .then(res => res.json())
            .catch(err => console.log(err))

    }

    static async get(api, query, hasToken) {
        if (!query) {
            return;
        }
        let url = webURL + api;
        let params = {
            method: "GET"
        }
        if (hasToken) {
            query["user_id"] = await Storage.getItem("userId")
            const token = await Storage.getItem("accountToken")
            var myHeaders = new Headers();
            myHeaders.append("authorization",token);
            params['headers'] = myHeaders
        };
        const keyArray = Object.keys(query);
        keyArray.forEach((res, index) => {
            const condi = index === 0 ? '?' : '&';
            url = url + condi + res + '=' + query[res];
        });
        return fetch(url, params)
            .then((res) => res.json())
            .catch(err => console.log(err))
    }
}
