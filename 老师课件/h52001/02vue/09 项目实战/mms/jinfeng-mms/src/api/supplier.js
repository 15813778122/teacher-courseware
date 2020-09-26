import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.VUE_APP_BASE_API;

export default {

    // 功能：发送ajax获取列表渲染
    getList() {
        return request({
            url: BAST_API + '/supplier/list',
            method: 'get'
        })
    },

    // 功能：发送ajax分页查询
    search(page, size, searchMap) {
        return request({
            url: BAST_API + `/supplier/list/search/${page}/${size}`,
            method: 'get',
            data: searchMap
        })
    },

    // 功能：发送ajax新增供应商
    add(pojo) {
        return request({
            url: BAST_API + '/supplier',
            method: 'post',
            data: pojo
        })
    },

    // 功能：发送ajax查询id是xx的供应商
    getById(id) {
        return request({
            url: BAST_API + `/supplier/${id}`, // 反单引号 ``
            method: 'get'
        })
    },

    // 功能：发送ajax更新id为xxx的供应商
    update(pojo) {
        return request({
            url: BAST_API + `/supplier/${pojo.id}`, // 反单引号 ``
            method: 'put', // put 方式提交
            data: pojo
        })
    },

    //功能：发送ajax删除id为xx的供应商信息
    deleteById(id) {
        return request({
            url: BAST_API + `/supplier/${id}`,  // 反单引号 ``
            method: 'delete', // delete 方式提交
        })
    }
}
