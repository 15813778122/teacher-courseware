// node 模块化编程, 导出函数:暴露.模块化开发是有必要的，但是浏览器不支持
//webpack可以帮我们打包模块资源，变成浏览器支持的形式
// module.exports = function () { //node的语法：后端语言的模块化
//     console.log('我是 bar 模块666777')
// }


//1.导出默认成员 ：前端的模块化 ES6新增的方法。用网页的方式打开;默认成员只能有一个
// export default function () {
//     console.log('我是 bar 模块---ES6')
// }

// export default {
//     name: '小乔'
// }

//2.导出非默认成员：可以一次性导出多个数据
export let a = 666;
export let b = '777';
export let arr = [1, 2, 3];
export function add(a, b) {
    return a + b;
}
