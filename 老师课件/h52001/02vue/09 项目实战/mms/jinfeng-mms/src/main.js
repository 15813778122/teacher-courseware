import Vue from "vue";//vue框架
import App from "./App.vue";//根组件
import router from "./router";//路由表
import store from "./store";//vuex存储库
//完整引入:elementUI,开发的时候可以这样用，但是上线前要改成按需引入，可以减小项目体积
// import ElementUI from 'element-ui';//引入elementUI框架
//按需引入
import element from './components/element'
Vue.use(element);
import 'element-ui/lib/theme-chalk/index.css';//引入ui的css
// 按需导入 ElementUI 组件
// import { Loading, Message } from 'element-ui'

//路由守卫
import './permission.js';

//提示信息：false发出警告，true关闭警告
Vue.config.productionTip = process.env.NODE_ENV != 'development';
// console.log(process.env.NODE_ENV);//development 开发
//启用UI框架
// Vue.use(ElementUI);

// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$message = Message;

new Vue({
  router,//将router对象注入到vue实例里面，后期就可以调用这个对象的方法
  store,
  render: h => h(App)
}).$mount("#app");
