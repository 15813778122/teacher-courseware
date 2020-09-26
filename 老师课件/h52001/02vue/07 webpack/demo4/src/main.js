// let bar = require('./bar.js');//导入
// bar();

//1、导入默认的成员

// import bar from './bar'

// console.log(bar);
// bar();

// import obj from './bar';
// console.log(obj);

//2.导入非默认的成员

// let obj = {
//     name: '妲己',
//     age: '16'
// }

// let { name, age } = obj;//解构

// console.log(name, age);

import { a, b, arr, add } from './bar';
console.log(a, b, arr);

console.log(add(3, 5));