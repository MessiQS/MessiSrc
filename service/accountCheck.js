export default class AccountCheck {
    static isValidPhoneNumber(number) {
        const phoneReg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
        return phoneReg.test(number);
    };

    static isValidPassword(password) {
        const passwordReg = new RegExp(/^[A-Za-z0-9]{6,20}$/);
        return passwordReg.test(password)
    }
}