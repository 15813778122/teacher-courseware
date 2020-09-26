import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.VUE_APP_BASE_API;

export default {
    loginIn(username, password) {
        return request({
            method: 'post',
            url: BAST_API + '/user/login',
            data: {
                username,
                password
            }
        });
    },
    getUserInf(token) {
        return request({
            method: 'get',
            url: BAST_API + '/user/info/' + token
        });
    }
}
