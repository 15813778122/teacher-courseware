//api专门用来存放各种接口
// import request from '../utils/request';//导入axios对象
import request from '@/utils/request';// @代表 ./src

//测试1
request.get('http://localhost:8888/db.json').then(response => {
    console.log(response.data, 1);
}).catch(err => {
    console.log(err);
});

//测试2
request({
    method: 'get',
    url: 'http://localhost:8888/db.json'
}).then(res => {
    console.log(res.data, 2);
}).catch(error => {
    console.log(error);
});

//测试3：工作一般用这种方式
/*
    员工管理：admin
        * 查询所有员工
        * 查询某个员工
        * 新增员工
        * 删除某个员工
        * 修改员工信息
*/
export default {
    getList() {
        return request({ //返回一个promise对象
            method: 'get',
            url: 'http://localhost:8888/db.json'
        });
    },
    getId(id) {
        //通过id获取某个商品
    },
    delId(id) {
        //通过id删除某个商品
    }
}