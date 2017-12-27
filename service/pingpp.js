import Http from './http';
export default class Pingpay {
    static async createCharge(data) {
        /*
        *   charge参数说明
        *   order_no 商户订单号
        *   app的id 即为 appid
        *   channel支付方式 ，目前支持为 alipay 支付宝支付  或者 wx 微信app支付
        *   amount总金额
        *   client_ip 客户端的IPv4
        *   currency 货币代码 固定位cny
        *   subject 商品名称 暂定为 该套题的 SPid
        *   body 商品描述信息
        */
        const { client_ip, amount, channel, subject, body } = data;
        const resposne = await Http.post('api/createcharge',{
            client_ip,
            amount,
            channel,
            subject,
            body,
        });
        return resposne;
    }
}