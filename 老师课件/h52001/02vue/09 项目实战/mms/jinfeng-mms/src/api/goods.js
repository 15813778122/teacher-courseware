import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.VUE_APP_BASE_API;

export default {
    // 功能：分页获取列表
    search(page, size, searchMap) {
        return request({
            url: BAST_API + `/goods/list/search/${page}/${size}`,
            method: 'get',
            data: searchMap
        })
    },

    // 功能：新增商品
    add(pojo) {
        return request({
            url: BAST_API + '/goods',
            method: 'post',
            data: pojo
        })
    },

    // 功能：查询id为xx的商品数据
    getById(id) {
        return request({
            url: BAST_API + `/goods/${id}`, // 反单引号 ``
            method: 'get'
        })
    },
    //功能：更新id为xx的商品数据
    update(pojo) {
        return request({
            url: BAST_API + `/goods/${pojo.id}`, // 反单引号 ``
            method: 'put', // put 方式提交
            data: pojo
        })
    },

    //功能： 
    deleteById(id) {
        return request({
            url: BAST_API + `/goods/${id}`,  // 反单引号 ``
            method: 'delete', // delete 方式提交
        })
    }
}
