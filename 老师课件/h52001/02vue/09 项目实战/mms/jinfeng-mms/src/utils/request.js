//对axios进行二次封装
import axios from 'axios/dist/axios';//引入axios
import router from '@/router';

// 按需导入 ElementUI 组件
import { Loading, Message } from 'element-ui'
// 加载数据时打开和关闭动效对象
const loading = {
    loadingInstance: null,  // Loading实例
    open: function () { // 打开加载
        // console.log('加载中', this.loadingInstance)
        if (this.loadingInstance === null) { // 创建单例, 防止切换路由重复加载
            // console.log('创建加载实例..')
            this.loadingInstance = Loading.service({
                text: '拼命加载中',
                target: '.main', // 效果显示区域
                background: 'rgba(0, 0, 0, 0.5)' // 加载效果
            })
        }
    },
    close: function () { // 关闭加载
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            // console.log('结束加载')
        }
        this.loadingInstance = null // 关闭后实例重新赋值null, 下次让它重新创建
    }
}

//创建一个axios对象，配置公共信息
const request = axios.create({ // request==axios
    baseURL: '/',
    timeout: 5000//3秒：请求超时时间，如果3秒还没有拿到数据就断开
});


// axios.get('/user') // /user  /api/user
// 请求拦截器:只要发送请求，就会触发这个拦截器
request.interceptors.request.use(config => {
    loading.open() // 打开加载效果
    return config
}, error => {
    // 出现异常
    loading.close() // 关闭加载效果
    return Promise.reject(error);
})


// 响应拦截器:如果服务器有响应，就会触发这个拦截器
request.interceptors.response.use(response => {
    loading.close() // 关闭加载效果
    //统一的异常提醒
    if (response.data.code != 2000) {//2000代表成功
        //要不就是跳转页面，要不就弹窗提示
        // this.$router.push("/404");//错误的写法，因为这个文件不是vue组件，this找不到vue实例
        // router.push("/404");//正确的写法
        //这里的异常：发送成功，并且响应了，只是出错
        Message({
            message: res.message || '系统异常',
            type: 'warning',
            duration: 5 * 1000 // 停留时长
        })
    }
    return response
}, error => {
    loading.close() // 关闭加载效果
    //如果有异常：发送请求的异常  404 500
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })

    if (error.status == 404) {
        //找不到该页面
        router.push("/404");
    }

    if (error.status == 500) {
        //服务器异常
        router.push("/500");
    }
    return Promise.reject(error);
})

//导出axios对象
export default request;