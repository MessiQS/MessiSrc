export default function renderChart(props) {
    return `
            jigsaw.init({
                el: document.getElementById('captcha'),
                onSuccess: function () {
                    document.getElementById('msg').innerHTML = '登录成功！'
                },
                onFail: cleanMsg,
                onRefresh: cleanMsg
            })
            function cleanMsg() {
                document.getElementById('msg').innerHTML = ''
            }
            `
}