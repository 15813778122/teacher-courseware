module.exports = {
    devServer: {
        port: 8888, // 端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
        https: false, //协议
        open: false, //启动服务时自动打开浏览器访问
        proxy: {//这里的代理，只能应用于开发阶段，真正上线，还有做一次代理
            [process.env.VUE_APP_BASE_API]: {//对象的属性名如果是变量，一定要加方括号
                // target: 'http://localhost:8800/',//目标服务器的地址
                // target: 'https://4r6q0l.coding-pages.com',//目标服务器的地址
                target: process.env.VUE_APP_SERVICE_URL,//目标服务器的地址
                changeOrigin: true,//开启代理
                //拼接的地址：http://localhost:8800/dev-api/db.json
                //真实的接口：http://localhost:8800/db.json
                pathRewrite: { //替换路径
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
}


// let aa = 'class';
// let bb = 'h52001';
// let obj = {
//     [aa]: bb,
//     class: 'h52001'
// }