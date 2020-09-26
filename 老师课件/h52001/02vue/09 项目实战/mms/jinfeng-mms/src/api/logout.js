import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.VUE_APP_BASE_API;

export default {
    loginOut(token) {//退出接口
        return request({
            method: 'post',
            url: BAST_API + '/user/logout',
            data: {
                token
            }
        });
    }
}
