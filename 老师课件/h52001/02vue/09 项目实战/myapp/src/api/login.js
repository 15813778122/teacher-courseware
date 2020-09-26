import request from '@/utils/request';//引入axios对象


export default {
    checkname(name) {
        return request.get('/user/checkname', {
            params: {
                name
            }
        });
    },
    reg(name, psw) {
        return request.post('/user/reg', {
            name,
            psw
        })
    },
    editPsw(data, id) {
        return request.put('/user/edit/' + id, data);
    }

}
