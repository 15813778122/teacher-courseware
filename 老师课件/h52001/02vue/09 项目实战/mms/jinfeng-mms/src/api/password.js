import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.VUE_APP_BASE_API;

export default {
    // 功能：校验密码是否正确
    checkPwd(userName, password) {
        return request({
            url: BAST_API + '/user/pwd',
            method: 'post',
            data: {
                userName,
                password
            }
        })
    },
    // 功能：修改密码
    updatePwd(userName, password) {
        return request({
            url: BAST_API + '/user/pwd',
            method: 'put',
            data: {
                userName,
                password
            }
        })
    }
}
