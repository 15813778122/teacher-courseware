import Vue from "vue";
import Vuex from "vuex";
import home from './modules/home';
// import user from './modules/user';

Vue.use(Vuex);


//new一个vuex实例，调用里面的Store方法。里面配置相关数据即可
export default new Vuex.Store({//V和S都是大写字母
  modules: {
    home,
    // user
  }
});
