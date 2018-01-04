
import Storage from "./storage";
import { AlertIOS } from "react-native";
import { webURL } from "./constant";
// export const webURL = "https://shuatiapp.cn/";
// const webURL = "http://192.168.0.183/";

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
            console.log(api, paramObj, hasToken, url)
            let token = await Storage.getItem("accountToken") || '';
            params = Object.assign({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:token,
                },
                body: body,
            });
        return fetch(url, params)
            .then(res => res.json())
            .catch(err => console.log(err))

    }

    static async get(api, params, hasToken) {
        if (!params) {
            return;
        }
        let url = webURL + api;;
        if (hasToken) {
            params["account"] = await Storage.getItem("account");
            params["token"] = await Storage.getItem("accountToken");
        };
        console.log(api, params, hasToken)
        const keyArray = Object.keys(params);
        keyArray.forEach((res, index) => {
            const condi = index === 0 ? '?' : '&';
            url = url + condi + res + '=' + params[res];
        });
        return fetch(url, { method: "GET" })
            .then((res) => res.json())
            .catch(err => console.log(err))
    }
}
