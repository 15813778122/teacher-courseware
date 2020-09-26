import Vue from "vue";
import App from "./App.vue";
import router from "./router";//导入路由 ./router/index.js 如果名字是index那就可以省略
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  //注入插件：把router注入到vue实例中
  router,
  //把store(vuex)注入到vue实例中
  store,
  render: h => h(App)
}).$mount("#app");
