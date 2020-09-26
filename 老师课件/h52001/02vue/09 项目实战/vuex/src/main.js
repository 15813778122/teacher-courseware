import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";//引入vuex

Vue.config.productionTip = false;

new Vue({
  router,//注入到vue  this.$router
  store,//注入到vue实例里面  this.$store
  render: h => h(App)
}).$mount("#app");
