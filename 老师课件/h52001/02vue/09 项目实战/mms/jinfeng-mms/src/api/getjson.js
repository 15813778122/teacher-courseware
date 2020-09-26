//引入request对象
import request from '@/utils/request';

// console.log(process.env.VUE_APP_BASE_API, '路径');
const BAST_API = process.env.VUE_APP_BASE_API;

request({
    method: 'get',
    // url: '/dev-api/db.json' //在8888端口下，请求8800下的一个json数据
    // url: '/dev-api/src/json/goods.json' //https://4r6q0l.coding-pages.com/src/json/goods.json
    //https://gz.meituan.com/ptapi/getComingFilms/dev-api?ci=20&limit=10
    url: BAST_API + '?ci=20&limit=10' //https://4r6q0l.coding-pages.com/src/json/goods.json
}).then(rep => {
    console.log(rep.data);
}).catch(err => {

});

//https://gz.meituan.com/ptapi/getComingFilms?ci=20&limit=10

export default {

}