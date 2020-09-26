// 引用 Node.js 中的 path 模块，处理文件路径的小工具
const path = require("path");
// console.log(__dirname);
// let url = path.join(__dirname, './dist/js');
// console.log(url);
//设置出口和入口
module.exports = {
    //设置构建模式
    mode: 'development',//"development"开发模式(未压缩) | "production"生产模式(压缩上线) | "none"
    //入口
    entry: './src/main.js',
    //出口
    output: {//output接收的path必须是一个绝对路径
        // path: './dist/js',//C:\h52001\code\02vue\07 webpack\demo2\src\js\main.js
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    }
}