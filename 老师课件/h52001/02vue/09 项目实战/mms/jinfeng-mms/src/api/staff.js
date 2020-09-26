import request from '@/utils/request'
const BAST_API = process.env.VUE_APP_BASE_API;
export default {
    search(page, size, searchMap) {
        return request({
            url: BAST_API + `/staff/list/search/${page}/${size}`,
            method: 'get',
            data: searchMap
        })
    },

    add(pojo) {
        return request({
            url: BAST_API + '/staff',
            method: 'post',
            data: pojo
        })
    },

    getById(id) {
        return request({
            url: BAST_API + `/staff/${id}`,
            method: 'get'
        })
    },
    // 更新操作
    update(pojo) {
        return request({
            url: BAST_API + `/staff/${pojo.id}`,
            method: 'put',
            data: pojo
        })
    },

    deleteById(id) {
        return request({
            url: BAST_API + `/staff/${id}`,
            method: 'delete'
        })
    }
}