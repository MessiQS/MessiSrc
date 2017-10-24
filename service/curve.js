function getAcurve(i){
    i = i*24;
    return 1 - 0.56 * Math.pow(i,0.06)
}
export default class Curve{
    static getCurve(length){
        let i = 0,
            curveArr = [];
        while(i < length){
            curveArr.push(getAcurve(i++));
        }
        return curveArr;
    }
}