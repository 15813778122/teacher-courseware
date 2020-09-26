// 引用 Node.js 中的 path 模块，处理文件路径的小工具
const path = require("path");
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    },
    module: {
        rules: [
            {//css加载器配置信息
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {//图片加载器配置信息
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {//babel插件，帮我们把ES6转成es5，让浏览器能支持
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, // 排除的目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 内置好的转译工具
                    }
                }
            }
        ]
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            // 此插件作用是将 index.html 打包到 bundle.js 所在目录中,
            // 同时也会在 index.html 中自动的 <script> 引入 bundle.js
            // 注意：其中的文件名 bundle 取决于上面output.filename中指定的名称
            template: './index.html'
        })
    ],
    // 实时重新加载
    devServer: {
        contentBase: './dist'
    }
}