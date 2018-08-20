import MessageService from '../../../service/message.service';
import { appVersion } from "../../../service/constant";



const createLeftIcon = (source) => {
    return {
        type: 'SimpleLineIcons',
        source
    }
}

const account = {
    sref: 'AccountInfo',
    name: '账号信息',
    info: { name: 'AccountInfo' },
    leftIcon: createLeftIcon('user'),
    leftSource: require('../../../Images/account/account_info.png'),
    tipBorder: 1,
    type: "route"
}

const feedBack = {
    sref: 'Feedback',
    name: '问题反馈',
    info: { user: 'Lucy' },
    leftIcon: createLeftIcon('user-follow'),
    leftSource: require('../../../Images/account/account_feedback.png'),
    tipBorder: 0,
    type: "route"
}

export const handleAccount = async (props) => {
    const { navigate } = props.navigation;
    navigate(account.sref, account.info)
}

export const handleFeedback = async (props) => {
    const { navigate } = props.navigation
    navigate(feedBack.sref, feedBack.info)
}

export const handleUpdate = async () => {
    let versionInfoResponse = await MessageService.getUpdateInfo(appVersion);
    if (versionInfoResponse.type) {
        this.setState({
            showVersionInfo: true,
            versionInfo: versionInfoResponse.data
        })
        return true
    } else {
        this.setState({
            showVersionAlert: true,
            alertInfo: versionInfoResponse.data
        })

        this.timeout = setTimeout(() => {
            this.timeout = null
            this.setState({
                showVersionAlert: false,
            })
        }, 2000)
    }
}