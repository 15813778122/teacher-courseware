let Mock = require('mockjs');//引入mockjs模块

let data = Mock.mock({
    //数据生成规则
    'datalist|5': [
        {
            'id|+1': 1,
            'name': '@cname',//随机生成名字
            'price|100-1000': 1,
            'statu': '@boolean',//布尔值
            'birthday': '@date',
            'bir': '@date("yyyy/MM/dd")',
            'img': "@image('200x100')",
            'title': '@ctitle(3, 6)', // 中文标题(3到6个字)
            'content': '@csentence(82, 120)', // 一段中文文本(8到12个字)
            'email': '@email', // 邮箱地址
            'area': '@region', // 区域
            'address': '@county(true)', // 省市县
        }
    ]
});

// console.log(data);
let str = JSON.stringify(data, null, 2);
console.log(str);