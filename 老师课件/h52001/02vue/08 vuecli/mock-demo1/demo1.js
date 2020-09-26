let Mock = require('mockjs');//引入mockjs模块

let data = Mock.mock({
    //数据生成规则
    'datalist|5': [
        {
            'id|+1': 1,
            'name|2': '迪丽热巴',//重复输入两次
            'phone|11': '8',//生成11手机号码
            'age|1-120': 1,//年龄在1-120之间
            'salary|100-2000.1-2': 1,//设置价格在100到2000，小数点1到2位
            'statu|1': true,//true和false各占一半
            'goods|4': [
                {//在属性里面随机抽两个属性
                    'gid': 101,
                    'gname': '华为',
                    'price|2000-8000.1': 1
                }
            ],
            'tel': /1[3-9]\d{9}/,
            'idcard': /[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)/
        }
    ]
});

// console.log(data);
let str = JSON.stringify(data, null, 2);
console.log(str);